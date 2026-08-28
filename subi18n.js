/* subi18n.js — 供未加载 main.js 的子页面（型号/产品图集、试机/操作视频、询盘页）使用。
 * 作用：根据 sessionStorage 中保存的语言（与 main.js 共用键名 auken_lang），
 *   1) 设置 <html lang / dir>（阿拉伯语自动 rtl）；
 *   2) 将 <title data-i18n="pt_*"> 与 [data-i18n="back"] 翻译成对应语言。
 * 这些页面包含自身的 JS 渲染逻辑（图集/视频标题），无法复用 main.js 的 applyLang，
 * 故用本文件只处理“标题 + 返回”这两处站点级文案，互不干扰。 */
(function () {
  var T = {
    pt_gallery:         { zh: '型号图集 · Auken Machinery', en: 'Model Gallery · Auken Machinery', fr: 'Galerie de modèles · Auken Machinery', ar: 'معرض النماذج · Auken Machinery' },
    pt_video:           { zh: '试机视频 · Auken Machinery', en: 'Test Run Videos · Auken Machinery', fr: 'Vidéos d\'essai · Auken Machinery', ar: 'فيديوهات التجربة · Auken Machinery' },
    pt_support_gallery: { zh: '产品图集 · Auken Machinery', en: 'Product Gallery · Auken Machinery', fr: 'Galerie de produits · Auken Machinery', ar: 'معرض المنتجات · Auken Machinery' },
    pt_support_video:   { zh: '操作视频 · Auken Machinery', en: 'Operation Videos · Auken Machinery', fr: 'Vidéos de fonctionnement · Auken Machinery', ar: 'فيديوهات التشغيل · Auken Machinery' },
    pt_inquiry:         { zh: '提交询盘 · Auken Machinery', en: 'Submit Inquiry · Auken Machinery', fr: 'Soumettre une demande · Auken Machinery', ar: 'أرسل استفساراً · Auken Machinery' },
    back:               { zh: '← 返回', en: '← Back', fr: '← Retour', ar: '← رجوع' }
  };
  var LANGS = ['zh', 'en', 'fr', 'ar'];

  function getLang() {
    var l = null;
    try { l = sessionStorage.getItem('auken_lang'); } catch (e) {}
    if (!l || LANGS.indexOf(l) < 0) l = document.documentElement.lang || 'zh';
    if (LANGS.indexOf(l) < 0) l = 'zh';
    return l;
  }

  function apply() {
    var l = getLang();
    document.documentElement.lang = l;
    document.documentElement.dir = (l === 'ar') ? 'rtl' : 'ltr';

    var t = document.querySelector('title[data-i18n]');
    if (t) {
      var k = t.getAttribute('data-i18n');
      if (T[k] && T[k][l]) document.title = T[k][l];
    }
    var b = document.querySelector('[data-i18n="back"]');
    if (b && T.back && T.back[l]) b.textContent = T.back[l];
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
