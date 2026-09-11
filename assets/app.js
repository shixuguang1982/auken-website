/* =========================================================
   AUKEN 新站 · 全站逻辑
   - 四语言切换（zh/en/fr/ar，阿语自动 RTL）
   - 导航 / 页脚 / 浮动 WhatsApp 统一注入
   - 各页内容由 Excel 导出的数据渲染
   ========================================================= */
(function () {
  'use strict';

  var LANGS = ['zh', 'en', 'fr', 'ar'];
  var LANG_NAME = { zh: '中文', en: 'English', fr: 'Français', ar: 'العربية' };
  var RTL = { ar: true };

  var I18N = {};
  if (window.I18N) for (var k in window.I18N) I18N[k] = window.I18N[k];
  if (window.I18N_EXTRA) for (var k2 in window.I18N_EXTRA) I18N[k2] = window.I18N_EXTRA[k2];
  // FAQ 词条体积大，只在 faq.html 引入 i18n-faq.js 时才有
  if (window.I18N_FAQ) for (var k3 in window.I18N_FAQ) I18N[k3] = window.I18N_FAQ[k3];

  var C = window.CONTENT || {};
  var SITE = C.site || {};

  /* ---------------- 语言 ---------------- */
  function getLang() {
    var m = location.search.match(/[?&]lang=([a-z]{2})/);
    if (m && LANGS.indexOf(m[1]) >= 0) return m[1];
    try {
      var saved = localStorage.getItem('auken_lang');
      if (saved && LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    return 'en'; // 外贸站默认英文
  }
  var lang = getLang();

  function setLang(next) {
    if (LANGS.indexOf(next) < 0) next = 'en';
    lang = next;
    try { localStorage.setItem('auken_lang', next); } catch (e) {}
    document.documentElement.lang = next;
    document.documentElement.dir = RTL[next] ? 'rtl' : 'ltr';
    renderNav();     // 导航/页脚里也有文案，一起重渲染
    renderFooter();
    applyI18n();
    renderAll();
  }

  /** 取词条：优先当前语言，其次英文，再次中文 */
  function t(key, fallback) {
    if (!key) return fallback || '';
    var item = I18N[key];
    if (!item) return fallback || '';
    return item[lang] || item.en || item.zh || fallback || '';
  }
  function tf(key, fallback, vars) {
    var s = t(key, fallback);
    if (vars) for (var v in vars) s = s.split('{' + v + '}').join(vars[v]);
    return s;
  }

  /** 静态骨架上带 data-i18n 的元素统一翻译 */
  function applyI18n() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = t(el.getAttribute('data-i18n'), el.textContent.trim());
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.placeholder !== undefined && el.hasAttribute('data-i18n-ph')) el.placeholder = val;
        else el.value = val;
      } else {
        el.innerHTML = val;
      }
    }
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) {
      phs[j].placeholder = t(phs[j].getAttribute('data-i18n-ph'), phs[j].placeholder);
    }
  }

  /* ---------------- 工具 ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function qs(name) {
    var m = location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function num(s) {
    var m = String(s || '').replace(/,/g, '').match(/(\d+(\.\d+)?)/);
    return m ? parseFloat(m[1]) : 0;
  }

  /** 内容型字段：优先 i18n 词条，其次英文原文，最后中文 */
  function c(zh, en, key) {
    if (key && I18N[key]) {
      var v = I18N[key][lang] || I18N[key].en;
      if (v) return v;
    }
    if (lang === 'zh') return zh || en || '';
    return en || zh || '';
  }

  var CATS = C.cats || [];
  var MODELS = C.models || [];
  var MOLDS = C.molds || [];
  var SUP = C.supporting || [];
  var FAQ = C.faq || [];
  var CASES = C.cases || [];

  /** 分类名 */
  function catName(slug) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].slug === slug) return c(CATS[i].name_zh, CATS[i].name_en, CATS[i].i18n);
    return slug;
  }
  /** 机型所在分类的中文键 -> slug */
  function modelCat(m) {
    var raw = (m.cat_raw || '').replace('brick-', '');
    var map = { 'manual': 'manual', 'semi': 'semi', 'auto': 'auto', 'hydraulic': 'hydraulic', 'supporting': 'supporting', 'mold': 'mold' };
    return map[raw] || raw;
  }
  function modelById(id) {
    for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i];
    return null;
  }
  function modelCap(m) {
    if (!m.params || !m.params[0]) return '';
    var p = m.params[0];
    return lang === 'zh' ? p.v_zh : (lang === 'fr' ? (p.v_fr || p.v_en) : p.v_en || p.v_zh);
  }
  function paramLabel(p) { return c(p.k, p.k, p.i18n); }
  function paramValue(p) {
    if (lang === 'zh') return p.v_zh;
    if (lang === 'fr') return p.v_fr || p.v_en || p.v_zh;
    return p.v_en || p.v_zh;
  }

  var WA_NUM = (SITE.whatsapp || '+86 193 3719 6225').replace(/[^\d]/g, '');
  function waLink(text) {
    return 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(text || '');
  }
  function waText(model) {
    var base = {
      zh: '你好，我想了解', en: 'Hello, I am interested in', fr: 'Bonjour, je suis intéressé par', ar: 'مرحباً، أنا مهتم بـ'
    };
    return (base[lang] || base.en) + ' ' + (model ? model + ' ' : '') + '(AUKEN)';
  }

  /* ---------------- 外壳：导航 / 页脚 / 悬浮按钮 ---------------- */
  var NAV = [
    { page: 'home', href: 'index.html', key: 'nav_home' },
    { page: 'products', href: 'products.html', key: 'nav_products' },
    { page: 'supporting', href: 'supporting.html', key: 'nav_supporting' },
    { page: 'molds', href: 'molds.html', key: 'nav_molds' },
    { page: 'cases', href: 'cases.html', key: 'nav3' },
    { page: 'about', href: 'about.html', key: 'nav1' },
    { page: 'faq', href: 'faq.html', key: 'nav5' },
    { page: 'contact', href: 'contact.html', key: 'nav_contact' }
  ];

  function renderNav() {
    var oldNav = document.querySelector('.nav');
    if (oldNav) oldNav.remove(); // 切语言时重渲染，避免重复插入
    var cur = document.body.getAttribute('data-page') || 'home';
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.page === cur ? ' class="is-active"' : '') + ' data-nav="' + n.page + '">' + esc(t(n.key)) + '</a>';
    }).join('');
    var html =
      '<div class="nav"><div class="container nav-inner">' +
        '<a class="logo" href="index.html"><img src="img/auken-logo.png" alt="AUKEN" width="64" height="64"></a>' +
        '<nav class="nav-menu" id="navMenu">' + links + '</nav>' +
        '<div class="nav-tools">' +
          '<div class="lang"><button class="lang-btn" id="langBtn" type="button">' + esc(LANG_NAME[lang]) + ' ▾</button>' +
          '<div class="lang-menu" id="langMenu" hidden>' +
            LANGS.map(function (l) {
              return '<button type="button" data-lang="' + l + '"' + (l === lang ? ' class="is-on"' : '') + '>' + esc(LANG_NAME[l]) + '</button>';
            }).join('') +
          '</div></div>' +
          '<button class="burger" id="burger" type="button" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div></div>';
    document.body.insertAdjacentHTML('afterbegin', html);

    $('#langBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      var menu = $('#langMenu');
      menu.hidden = !menu.hidden;
    });
    $('#langMenu').addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      $('#langMenu').hidden = true;
      setLang(btn.getAttribute('data-lang'));
    });
    document.addEventListener('click', function () {
      var m = $('#langMenu');
      if (m && !m.hidden) m.hidden = true;
    });
    $('#burger').addEventListener('click', function () {
      $('#navMenu').classList.toggle('is-open');
    });
  }

  function renderFooter() {
    var oldFoot = document.querySelector('.foot');
    if (oldFoot) oldFoot.remove();
    var oldFab = document.querySelector('.wa-fab');
    if (oldFab) oldFab.remove();
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + esc(t(n.key)) + '</a></li>';
    }).join('');
    var html =
      '<footer class="foot"><div class="container">' +
        '<div class="foot-grid">' +
          '<div><a class="logo" href="index.html" style="margin-bottom:14px"><img src="img/auken-logo.png" alt="AUKEN" width="72" height="72" style="height:72px"></a>' +
            '<p>' + esc(t('foot_desc')) + '</p></div>' +
          '<div><h4>' + esc(t('foot_links')) + '</h4><ul>' + links + '</ul></div>' +
          '<div><h4>' + esc(t('sec_cats_eyebrow')) + '</h4><ul>' +
            CATS.slice(0, 6).map(function (cat) {
              return '<li><a href="products.html?cat=' + encodeURIComponent(cat.slug) + '">' + esc(c(cat.name_zh, cat.name_en, cat.i18n)) + '</a></li>';
            }).join('') +
          '</ul></div>' +
          '<div><h4>' + esc(t('foot_contact')) + '</h4><div class="foot-contact">' +
            '<div><span>WhatsApp</span><br><b>' + esc(SITE.whatsapp || '') + '</b></div>' +
            '<div><span>Email</span><br><b>' + esc(SITE.email || '') + '</b></div>' +
            '<div><span>' + esc(t('foot_about')) + '</span><br>' + esc(SITE.address || '') + '</div>' +
            '<a class="btn btn--wa btn--sm" style="margin-top:6px" href="' + waLink(waText('')) + '" target="_blank" rel="noopener">WhatsApp</a>' +
          '</div></div>' +
        '</div>' +
        '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(SITE.company || 'AUKEN') + '. ' + esc(t('foot_rights')) + '.</span>' +
        '<span>' + esc(SITE.address || '') + '</span></div>' +
      '</div></footer>' +
      '<a class="wa-fab" href="' + waLink(waText('')) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
        '<svg viewBox="0 0 32 32"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-.962-1.566-1.613-.452-.706-.262-.79-.262-.79.293-.293.624-.779.793-1.117.054-.107.108-.214.108-.317 0-.118-.04-.213-.108-.213-.108 0-.213.04-.213.04-.214 0-.376-.04-.589-.04-.215 0-.485.054-.754.162-.27.108-.59.27-.644.7-.054.43.214.86.43 1.39.214.535.43 1.07.86 1.555.43.484 1.016 1.07 1.66 1.555.644.484 1.394.967 2.144 1.34.75.376 1.61.752 2.466.752.857 0 1.61-.214 2.144-.537.535-.32.858-.806.805-1.31-.054-.484-.43-.86-.967-.967z"/><path d="M26.576 5.363c-2.59-2.59-6.04-4.018-9.71-4.018-7.575 0-13.737 6.16-13.737 13.736 0 2.413.622 4.752 1.806 6.812L2.5 28.5l6.823-1.79a13.69 13.69 0 0 0 6.55 1.665h.005c7.575 0 13.737-6.16 13.737-13.735 0-3.668-1.43-7.117-4.04-9.276zM15.873 26.396a11.46 11.46 0 0 1-5.84-1.6l-.42-.247-4.05 1.063 1.083-3.948-.273-.435a11.49 11.49 0 0 1-1.76-6.082c0-6.342 5.165-11.508 11.515-11.508 3.077 0 5.97 1.2 8.144 3.374s3.374 5.066 3.374 8.143c0 6.343-5.166 11.24-11.515 11.24z"/></svg>' +
      '</a>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ---------------- 组件：机型卡 ---------------- */
  function modelCard(m) {
    var cap = modelCap(m);
    var specs = m.params.slice(1, 3).map(function (p) {
      return '<div><span>' + esc(paramLabel(p)) + '</span><b>' + esc(paramValue(p)) + '</b></div>';
    }).join('');
    return '' +
      '<a class="m-card" href="product.html?m=' + encodeURIComponent(m.id) + '">' +
        '<div class="m-card-img"><img src="' + esc(m.img) + '" alt="' + esc(m.model) + '" loading="lazy">' +
          '<span class="m-tag">' + esc(catName(modelCat(m))) + '</span></div>' +
        '<div class="m-card-body">' +
          '<div class="m-model">' + esc(m.model) + '</div>' +
          '<div class="m-cap">' + esc(cap) + '</div>' +
          '<div class="m-specs">' + specs + '</div>' +
          '<div class="m-card-foot"><button type="button" class="btn btn--sm btn--inquiry js-add-inquiry" data-name="' + esc(m.model) + '" data-tag="' + esc(catName(modelCat(m))) + '">' + esc(t('bm_inquiry')) + '</button>' +
          '<span class="m-more">' + esc(t('btn_view')) + ' →</span></div>' +
        '</div>' +
      '</a>';
  }

  function caseCard(cc, i) {
    return '' +
      '<article class="case-card">' +
        '<img src="' + esc(cc.img) + '" alt="' + esc(c(cc.title_zh, cc.title_zh, cc.i18n_t)) + '" loading="lazy">' +
        '<div class="case-body">' +
          '<span class="case-country">' + esc(c(cc.title_zh, cc.title_zh, cc.i18n_t)) + '</span>' +
          '<h3>' + esc(c(cc.meta_zh, cc.meta_zh, cc.i18n_m)) + '</h3>' +
          '<p>' + esc(c(cc.desc_zh, cc.desc_zh, cc.i18n_d)) + '</p>' +
        '</div>' +
      '</article>';
  }

  /* ---------------- 页面：首页 ---------------- */
  var FEATURED = ['QM4-35A', 'QM4-35B', 'QM4-40A', 'QM4-40B', 'QMY4-45B', 'QMY-1'];

  function pageHome() {
    var g = $('#catGrid');
    if (g) {
      g.innerHTML = CATS.map(function (cat) {
        return '<a class="cat-card" href="' + (cat.slug === 'supporting' ? 'supporting.html' : cat.slug === 'mold' ? 'molds.html' : 'products.html?cat=' + encodeURIComponent(cat.slug)) + '">' +
          '<img src="' + esc(cat.img) + '" alt="' + esc(c(cat.name_zh, cat.name_en, cat.i18n)) + '" loading="lazy">' +
          '<div class="cat-body"><h3>' + esc(c(cat.name_zh, cat.name_en, cat.i18n)) + '</h3>' +
          '<p>' + esc(cat.price) + '</p>' +
          '<div class="cat-meta"><span class="cat-price">' + esc(cat.price) + '</span>' +
          '<span class="cat-go">' + esc(t('btn_view')) + ' →</span></div></div></a>';
      }).join('');
    }
    var mg = $('#modelGrid');
    if (mg) {
      var list = FEATURED.map(modelById).filter(Boolean);
      if (!list.length) list = MODELS.slice(0, 6);
      mg.innerHTML = list.map(modelCard).join('');
    }
    var cg = $('#caseGrid');
    if (cg) cg.innerHTML = CASES.slice(0, 6).map(caseCard).join('');
  }

  /* ---------------- 页面：产品中心 ---------------- */
  function pageProducts() {
    var wrap = $('#modelGrid');
    if (!wrap) return;
    var catSel = $('#filterCat'), kw = $('#filterSearch'), sort = $('#filterSort'), bar = $('#resultBar');

    if (catSel && !catSel.dataset.ready) {
      catSel.innerHTML = '<option value="">' + esc(t('filter_all')) + '</option>' +
        CATS.filter(function (x) { return ['manual', 'semi', 'auto', 'hydraulic'].indexOf(x.slug) >= 0; })
          .map(function (x) { return '<option value="' + esc(x.slug) + '">' + esc(c(x.name_zh, x.name_en, x.i18n)) + '</option>'; }).join('');
      catSel.dataset.ready = '1';
      var pre = qs('cat');
      if (pre) catSel.value = pre;
    }
    if (kw) kw.placeholder = t('filter_search');

    function draw() {
      var cat = catSel ? catSel.value : '';
      var q = kw ? kw.value.trim().toLowerCase() : '';
      var order = sort ? sort.value : '';
      var list = MODELS.filter(function (m) {
        if (cat && modelCat(m) !== cat) return false;
        if (q) {
          var hay = (m.model + ' ' + catName(modelCat(m)) + ' ' + (m.params[0] ? m.params[0].v_zh + ' ' + m.params[0].v_en : '')).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      /* 默认按分类顺序排：手动 → 半自动 → 全自动切块 → 全自动液压（大型设备靠后） */
      var CAT_ORDER = ['manual', 'semi', 'auto', 'hydraulic'];
      if (order === 'pasc') list.sort(function (a, b) { return num(a.price) - num(b.price); });
      else if (order === 'pdesc') list.sort(function (a, b) { return num(b.price) - num(a.price); });
      else if (order === 'capdesc') list.sort(function (a, b) { return num(modelCap(b)) - num(modelCap(a)); });
      else list.sort(function (a, b) {
        return CAT_ORDER.indexOf(modelCat(a)) - CAT_ORDER.indexOf(modelCat(b));
      });

      if (bar) bar.textContent = tf('result_count', '', { n: list.length });
      wrap.innerHTML = list.length ? list.map(modelCard).join('')
        : '<div class="empty" style="grid-column:1/-1">' + esc(t('no_data')) + '</div>';
    }
    if (catSel) catSel.onchange = draw;
    if (kw) kw.oninput = draw;
    if (sort) sort.onchange = draw;
    draw();
  }

  /* ---------------- 页面：机型详情 ---------------- */
  function pageProduct() {
    var root = $('#pdRoot');
    if (!root) return;
    var m = modelById(qs('m')) || MODELS[0];
    if (!m) { root.innerHTML = '<div class="empty">' + esc(t('no_data')) + '</div>'; return; }

    /* 「空心砌块」系列的英文名，用于跳转模具页时预选该系列 */
    var hollowSer = '';
    MOLDS.forEach(function (x) { if (!hollowSer && x.series_zh === '空心砌块') hollowSer = x.series_en || ''; });
    if (!hollowSer) hollowSer = 'Hollow Block';

    var rows = m.params.map(function (p) {
      var extra = '';
      if (p.i18n === 'bm_mold') {
        extra = ' <a class="btn btn--xs btn--steel" href="molds.html?series=' +
          encodeURIComponent(hollowSer) + '">' + esc(t('btn_view_mold')) + '</a>';
      }
      var cell;
      if (extra) {
        cell = '<div class="spec-mold-cell"><span class="spec-mold-text">' + esc(paramValue(p)) + '</span>' + extra + '</div>';
      } else {
        cell = esc(paramValue(p));
      }
      return '<tr><th>' + esc(paramLabel(p)) + '</th><td>' + cell + '</td></tr>';
    }).join('');

    var related = MODELS.filter(function (x) { return x.id !== m.id && modelCat(x) === modelCat(m); }).slice(0, 3);
    if (!related.length) related = MODELS.filter(function (x) { return x.id !== m.id; }).slice(0, 3);

    root.innerHTML =
      '<div class="container crumb"><a href="index.html">' + esc(t('nav_home')) + '</a> / ' +
        '<a href="products.html">' + esc(t('nav_products')) + '</a> / ' +
        '<a href="products.html?cat=' + encodeURIComponent(modelCat(m)) + '">' + esc(catName(modelCat(m))) + '</a> / <b>' + esc(m.model) + '</b></div>' +
      '<div class="container pd">' +
        '<div class="pd-gallery"><div class="pd-main"><img id="pdImg" src="' + esc(m.img) + '" alt="' + esc(m.model) + '"></div></div>' +
        '<div class="pd-info">' +
          '<span class="pd-tag">' + esc(catName(modelCat(m))) + '</span>' +
          '<h1>' + esc(m.model) + '</h1>' +
          '<p class="pd-lead">' + esc(modelCap(m)) + '</p>' +
          '<h3 style="font-size:17px;margin-bottom:10px">' + esc(t('spec_title')) + '</h3>' +
          '<table class="spec-table"><tbody>' + rows + '</tbody></table>' +
          '<div class="pd-actions">' +
            '<button type="button" class="btn btn--inquiry js-add-inquiry" data-name="' + esc(m.model) + '" data-tag="' + esc(catName(modelCat(m))) + '">' + esc(t('bm_inquiry')) + '</button>' +
            '<a class="btn btn--wa" href="' + waLink(waText(m.model)) + '" target="_blank" rel="noopener">WhatsApp ' + esc(t('btn_inquiry')) + '</a>' +
            '<a class="btn btn--ghost" href="contact.html?m=' + encodeURIComponent(m.model) + '">' + esc(t('pd_form')) + '</a>' +
            '<a class="btn btn--steel" href="cases.html">' + esc(t('nav3')) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="container section section--tight"><div class="sec-head"><h2 style="font-size:24px">' + esc(t('related_title')) + '</h2></div>' +
        '<div class="m-grid">' + related.map(modelCard).join('') + '</div></div>';
  }

  /* ---------------- 页面：模具 ---------------- */
  function pageMolds() {
    var g = $('#moldGrid');
    if (!g) return;
    var tabs = $('#moldTabs');
    var series = [];
    MOLDS.forEach(function (m) { if (series.indexOf(m.series_zh) < 0) series.push(m.series_zh); });
    /* 期望的 tab 顺序：空心砌块 → 彩色路面砖 → 路缘石（未在列表里的保持数据顺序排后） */
    var PREF = ['空心砌块', '彩色路面砖', '路缘石'];
    series.sort(function (a, b) {
      var ia = PREF.indexOf(a), ib = PREF.indexOf(b);
      if (ia < 0) ia = PREF.length;
      if (ib < 0) ib = PREF.length;
      return ia - ib;
    });

    function draw(only) {
      var list = MOLDS.filter(function (m) { return !only || m.series_zh === only; });
      g.innerHTML = list.map(function (m) {
        return '<div class="mold-card"><img src="' + esc(m.img) + '" alt="' + esc(m.code) + '" loading="lazy">' +
          '<div class="mold-body"><b>' + esc(m.code) + '</b>' +
          '<span>' + esc(m.size) + '</span>' +
          '<i>' + esc(c(m.series_zh, m.series_en, m.i18n)) + '</i>' +
          '<button type="button" class="btn btn--sm btn--inquiry js-add-inquiry" data-name="' + esc(m.code) + '" data-tag="' + esc(m.size) + '">' + esc(t('bm_inquiry')) + '</button>' +
          '</div></div>';
      }).join('') || '<div class="empty" style="grid-column:1/-1">' + esc(t('no_data')) + '</div>';
    }
    if (tabs) {
      tabs.innerHTML = '<button type="button" data-s="" class="is-on">' + esc(t('mold_all')) + '</button>' +
        series.map(function (s) {
          var en = '';
          MOLDS.forEach(function (m) { if (m.series_zh === s) en = m.series_en; });
          var key = '';
          MOLDS.forEach(function (m) { if (m.series_zh === s) key = m.i18n; });
          return '<button type="button" data-s="' + esc(s) + '">' + esc(c(s, en, key)) + '</button>';
        }).join('');
      tabs.onclick = function (e) {
        var b = e.target.closest('button[data-s]');
        if (!b) return;
        $$('button', tabs).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        draw(b.getAttribute('data-s'));
      };
    }
    /* 支持 ?series=空心砌块 / Hollow Block 预选系列（详情页「查看砖型」用）
       无参数时默认落在第一个系列（空心砌块）；?series=all 显示全部 */
    var init = series[0] || '';
    var want = qs('series') || '';
    if (want === 'all') init = '';
    else if (want) {
      var found = '';
      MOLDS.forEach(function (x) {
        if (!found && (x.series_zh === want || x.series_en === want)) found = x.series_zh;
      });
      if (found) init = found;
    }
    if (init && tabs) {
      $$('button', tabs).forEach(function (x) {
        if (x.getAttribute('data-s') === init) x.classList.add('is-on');
        else x.classList.remove('is-on');
      });
    }
    draw(init);
  }

  /* ---------------- 页面：配套设备 ---------------- */
  function pageSupporting() {
    var g = $('#supGrid');
    if (!g) return;
    g.innerHTML = SUP.map(function (s) {
      return '<article class="m-card">' +
        '<div class="m-card-img"><img src="' + esc(s.img) + '" alt="' + esc(s.code) + '" loading="lazy">' +
        '<span class="m-tag">' + esc(s.code) + '</span></div>' +
        '<div class="m-card-body">' +
          '<div class="m-model">' + esc(c(s.name_zh, s.name_en, s.name_i18n)) + '</div>' +
          '<p class="m-cap">' + esc(c(s.desc_zh, s.desc_zh, s.desc_i18n)) + '</p>' +
          '<div class="m-card-foot m-card-foot--full"><button type="button" class="btn btn--sm btn--inquiry js-add-inquiry" data-name="' + esc(s.code) + '" data-tag="' + esc(c(s.name_zh, s.name_en, s.name_i18n)) + '">' + esc(t('bm_inquiry')) + '</button></div>' +
        '</div></article>';
    }).join('');
  }

  /* ---------------- 页面：案例 / 关于 / 服务 / 代理 ---------------- */
  function pageCases() {
    var g = $('#caseGrid');
    if (g) g.innerHTML = CASES.map(caseCard).join('');
  }

  function pageAbout() {
    var stats = (C.pages && C.pages.about ? C.pages.about : []).filter(function (r) { return r.section === 'stat'; });
    var sr = $('#statRow');
    if (sr && stats.length) {
      sr.innerHTML = stats.map(function (s, i) {
        return '<div class="stat"><b>' + esc(s.body) + '</b><span>' + esc(s.title) + '</span></div>';
      }).join('');
    }
  }

  function pageFaq() {
    var list = $('#faqList'), tabs = $('#faqTabs');
    if (!list) return;
    var GROUPS = (C.faqGroups && C.faqGroups.length) ? C.faqGroups : ['FAQ'];
    var GROUP_EN = {
      '砖机设备常见技术问题与解决方案': 'Technical FAQ & Solutions for Block Machines',
      '代理商合作流程与加盟指南': 'Agency Cooperation & Joining Guide',
      '购机资金安全与权益保障说明': 'Funds Safety & Rights Protection When Buying'
    };
    function grpTitle(g) { return lang === 'zh' ? g : (GROUP_EN[g] || g); }

    function drawGroup(g, i) {
      var guide = C.guides && C.guides[g];
      var body;
      if (guide && guide.length) {
        body = guide.map(function (sec) {
          if (sec.lead) return '<p class="guide-lead">' + esc(c(sec.lead, sec.lead, sec.i18n_lead)) + '</p>';
          var t = c(sec.t_zh, sec.t_zh, sec.i18n_t);
          var b = c(sec.b_zh, sec.b_zh, sec.i18n_b);
          return '<div class="guide-sec"><h3 class="guide-sec-title">' + esc(t) + '</h3>' +
            '<div class="guide-sec-body">' + b + '</div></div>';
        }).join('');
      } else {
        var items = FAQ.filter(function (f) { return f.group === g; });
        body = items.length
          ? items.map(function (f) {
              var q = c(f.q_zh, f.q_zh, f.i18n_q), a = c(f.a_zh, f.a_zh, f.i18n_a);
              return '<div class="faq-item"><button class="faq-q" type="button">' + esc(q) + '<i></i></button>' +
                '<div class="faq-a">' + a + '</div></div>';
            }).join('')
          : '<p class="faq-empty">' + esc(c('内容整理中，敬请期待。', 'Content coming soon.', 'faq_empty_tip')) + '</p>';
      }
      return '<section class="faq-group" id="faqG' + i + '">' +
        '<h2 class="faq-group-title">' + esc(grpTitle(g)) + '</h2>' + body + '</section>';
    }

    if (tabs) {
      tabs.innerHTML = GROUPS.map(function (g, i) {
        return '<button type="button" data-g="faqG' + i + '" class="' + (i === 0 ? 'is-on' : '') + '">' + esc(grpTitle(g)) + '</button>';
      }).join('');
      tabs.onclick = function (e) {
        var b = e.target.closest('button[data-g]');
        if (!b) return;
        var el = document.getElementById(b.getAttribute('data-g'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }
    list.innerHTML = GROUPS.map(drawGroup).join('');
    $$('.faq-q', list).forEach(function (btn) {
      btn.onclick = function () { btn.parentNode.classList.toggle('is-open'); };
    });
  }

  /* ---------------- 表单 ---------------- */
  function bindForm() {
    var form = $('#inquiryForm');
    if (!form) return;

    // 机型下拉：自动列出全部机型；从详情页 ?m=XXX 过来时预选
    var sel = $('#fInterest');
    if (sel && sel.tagName === 'SELECT' && !sel.dataset.ready) {
      sel.innerHTML = '<option value="">—</option>' +
        MODELS.map(function (m) { return '<option value="' + esc(m.model) + '">' + esc(m.model) + '</option>'; }).join('');
      sel.dataset.ready = '1';
    }
    var pre = qs('m');
    if (pre && sel && sel.tagName === 'SELECT') {
      var hit = false;
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === pre) hit = true;
      if (!hit) {
        var opt = document.createElement('option');
        opt.value = pre; opt.textContent = pre;
        sel.appendChild(opt);
      }
      sel.value = pre;
    } else if (pre) {
      var hid = document.createElement('input');
      hid.type = 'hidden'; hid.name = 'machine'; hid.value = pre;
      form.appendChild(hid);
    }

    // 从询盘购物车预填（"一键询盘"跳过来 ?cart=1）：把已选设备写进留言框
    var cartPre = qs('cart');
    if (cartPre && !pre) {
      var arr = [];
      try { arr = JSON.parse(localStorage.getItem('auken_inquiry_cart') || '[]'); } catch (e) {}
      if (arr.length) {
        var MSG = {
          zh: '您好，我对以下奥肯设备感兴趣，请报价：',
          en: 'Hello, I am interested in the following Auken machines, please quote:',
          fr: 'Bonjour, je suis intéressé par les machines Auken suivantes, merci de me faire un devis :',
          ar: 'مرحبًا، أهتم بالآلات التالية من أكن، يرجى تقديم عرض سعر:'
        };
        var lbl = MSG[lang] || MSG.en;
        var lines = arr.map(function (it) { return '- ' + it.name + (it.tag ? ' (' + it.tag + ')' : ''); });
        var msgEl = $('#fMsg');
        if (msgEl) msgEl.value = lbl + '\n' + lines.join('\n');
        var selPre = $('#fInterest');
        if (selPre && selPre.tagName === 'SELECT') {
          var first = arr[0].name, ok = false;
          for (var i2 = 0; i2 < selPre.options.length; i2++) if (selPre.options[i2].value === first) ok = true;
          if (!ok) { var opt = document.createElement('option'); opt.value = first; opt.textContent = first; selPre.appendChild(opt); }
          selPre.value = first;
        }
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('#formMsg');
      var name = ($('#fName') || {}).value || '';
      var contact = (($('#fEmail') || {}).value || '') || (($('#fPhone') || {}).value || '');
      if (!name.trim() || !contact.trim()) {
        msg.className = 'form-msg is-err';
        msg.textContent = t('form_err');
        return;
      }
      msg.className = 'form-msg is-ok';
      msg.textContent = t('form_ok');
      form.reset();
      // 上线后把这里换成真实收件渠道（formsubmit / 自有接口）；本地预览只做提示
    });
  }

  /* ---------------- 加入询盘（统一委托，避免卡片本身是 <a> 时误跳转） ---------------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.js-add-inquiry');
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    if (window.AukenCart) AukenCart.add(b.getAttribute('data-name'), b.getAttribute('data-tag'));
  });

  /* ---------------- 启动 ---------------- */
  var PAGES = {
    home: pageHome, products: pageProducts, product: pageProduct,
    molds: pageMolds, supporting: pageSupporting, cases: pageCases,
    about: pageAbout, faq: pageFaq
  };

  function renderAll() {
    var page = document.body.getAttribute('data-page') || 'home';
    if (PAGES[page]) PAGES[page]();
    bindForm();
  }

  function boot() {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL[lang] ? 'rtl' : 'ltr';
    renderNav();
    renderFooter();
    applyI18n();
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.AUKEN = { setLang: setLang, lang: function () { return lang; }, t: t };
})();
