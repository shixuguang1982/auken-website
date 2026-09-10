// AUKEN 访客统计 Worker
// 作用：拦截 aukemachinery.com 所有请求，把"日期/匿名IP/页面/时间"写入 D1，
//       静态页照常转发 GitHub Pages 返回（访客无感），并提供密码保护的 /stats 后台。
// 运行环境：Cloudflare Workers（边缘节点，非洲访客就近执行，不拖慢访问）。

// ---------- 工具函数 ----------

// 匿名化 IP：IPv4 仅遮住最后一段（保留前三段，如 41.22.33.x），IPv6 取短哈希。
// 目的：既能按 /24 网段去重独立访客，又不留存完整个人信息，合规风险最低（看不到完整 IP）。
function anonymize(ip) {
  if (!ip) return 'unknown';
  if (ip.indexOf('.') >= 0) {
    const p = ip.split('.');
    return p[0] + '.' + p[1] + '.' + p[2] + '.x';
  }
  return 'v6:' + hash(ip).slice(0, 8);
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

function isBot(ua) {
  return /bot|crawl|spider|slurp|bingpreview|headless|python|curl|wget/i.test(ua || '');
}

// 是否浏览器导航请求（只统计页面浏览，不统计 css/js/img 等资源）
function isPageView(request) {
  const accept = request.headers.get('accept') || '';
  return accept.indexOf('text/html') >= 0;
}

// ---------- 统计查询 ----------
async function getStats(db) {
  const total = await db.prepare('SELECT COUNT(*) c FROM visits').first();
  const uniq = await db.prepare('SELECT COUNT(DISTINCT ip) c FROM visits').first();
  const dailyRows = await db.prepare(
    'SELECT day, COUNT(*) c FROM visits GROUP BY day ORDER BY day DESC LIMIT 30'
  ).all();
  const pageRows = await db.prepare(
    "SELECT path, COUNT(*) c FROM visits WHERE path NOT LIKE '/api/%' AND path NOT LIKE '/stats%' GROUP BY path ORDER BY c DESC LIMIT 20"
  ).all();
  return {
    total: total ? total.c : 0,
    uniq: uniq ? uniq.c : 0,
    daily: dailyRows.results || [],
    pages: pageRows.results || []
  };
}

// ---------- /stats 后台页（内置 HTML，密码校验后返回）----------
const STATS_HTML = `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AUKEN 访客统计</title>
<style>
  :root{--brand:#ff6a13;--steel:#1b4b8f;--ink:#14181d;--paper:#f6f7f9}
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--paper);color:var(--ink);padding:24px}
  h1{font-size:22px;margin:0 0 4px}
  .sub{color:#6b7280;font-size:13px;margin-bottom:20px}
  .cards{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:24px}
  .card{background:#fff;border:1px solid #e6e8eb;border-radius:12px;padding:16px 20px;min-width:150px}
  .card .n{font-size:28px;font-weight:700;color:var(--steel)}
  .card .l{font-size:13px;color:#6b7280;margin-top:4px}
  h2{font-size:16px;margin:24px 0 10px}
  .chart{background:#fff;border:1px solid #e6e8eb;border-radius:12px;padding:16px}
  .bar{display:flex;align-items:center;gap:10px;margin:6px 0;font-size:13px}
  .bar .d{width:92px;color:#6b7280;flex:none}
  .bar .t{height:14px;background:linear-gradient(90deg,var(--brand),#ff944d);border-radius:7px}
  .bar .v{width:54px;text-align:right;color:#374151;flex:none}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e6e8eb;border-radius:12px;overflow:hidden;font-size:13px}
  th,td{padding:10px 14px;text-align:left;border-bottom:1px solid #eef0f2}
  th{background:#fafbfc;color:#6b7280;font-weight:600}
  td.path{font-family:ui-monospace,Menlo,Consolas,monospace}
  .err{padding:40px;text-align:center;color:#b91c1c}
  a{color:var(--steel)}
</style>
</head>
<body>
  <h1>AUKEN 访客统计后台</h1>
  <div class="sub" id="sub">加载中…</div>
  <div class="cards" id="cards"></div>
  <h2>每日访问次数</h2>
  <div class="chart" id="daily"></div>
  <h2>各页面访问排行</h2>
  <table><thead><tr><th>页面</th><th>浏览量</th></tr></thead><tbody id="pages"></tbody></table>
<script>
  const key = new URLSearchParams(location.search).get('key') || '';
  fetch('/api/stats?key=' + encodeURIComponent(key))
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d => {
      document.getElementById('sub').textContent = '数据更新于 ' + new Date().toLocaleString();
      document.getElementById('cards').innerHTML =
        card(d.total, '总访问次数') + card(d.uniq, '独立访客(IP/24)');
      const max = Math.max(1, ...d.daily.map(x => x.c));
      document.getElementById('daily').innerHTML = d.daily.slice().reverse().map(x =>
        '<div class="bar"><span class="d">' + x.day + '</span>' +
        '<span class="t" style="width:' + Math.max(6, x.c / max * 240) + 'px"></span>' +
        '<span class="v">' + x.c + '</span></div>'
      ).join('') || '<div class="bar">暂无数据</div>';
      document.getElementById('pages').innerHTML = d.pages.map(x =>
        '<tr><td class="path">' + x.path + '</td><td>' + x.c + '</td></tr>'
      ).join('') || '<tr><td colspan="2">暂无数据</td></tr>';
    })
    .catch(e => {
      document.getElementById('sub').textContent = '';
      document.body.innerHTML = '<div class="err">读取失败（' + e + '）。<br>请确认网址后带了正确的 ?key=密码</div>';
    });
  function card(n, l){ return '<div class="card"><div class="n">' + n + '</div><div class="l">' + l + '</div></div>'; }
</script>
</body>
</html>`;

// ---------- 主处理 ----------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.searchParams.get('key') || '';

    // 1) 统计接口
    if (url.pathname === '/api/stats') {
      if (key !== env.STATS_KEY) {
        return new Response('Unauthorized', { status: 401 });
      }
      try {
        const data = await getStats(env.DB);
        return new Response(JSON.stringify(data), {
          headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
        });
      } catch (e) {
        return new Response('DB error: ' + e.message, { status: 500 });
      }
    }

    // 2) 统计后台页（需密码）
    if (url.pathname === '/stats') {
      if (key !== env.STATS_KEY) {
        return new Response('访问受限：请在网址后加 ?key=你的查看密码', { status: 401 });
      }
      return new Response(STATS_HTML, {
        headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }
      });
    }

    // 3) 记录访客（仅浏览器页面浏览，且非爬虫）
    const ua = request.headers.get('user-agent') || '';
    if (isPageView(request) && !isBot(ua) && request.method === 'GET') {
      try {
        const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
        const day = new Date().toISOString().slice(0, 10);
        await env.DB.prepare('INSERT INTO visits (day, ip, path, ts) VALUES (?, ?, ?, ?)')
          .bind(day, anonymize(ip), url.pathname, Date.now())
          .run();
      } catch (e) {
        // 记录失败不影响访客正常打开页面
      }
    }

    // 4) 转发原站（GitHub Pages），访客无感
    return fetch(request);
  }
};
