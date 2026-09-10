/* 询盘购物车：跨页面共享（localStorage），右下角浮动图标 + 抽屉列表 + 一键询盘 */
(function () {
  'use strict';
  var KEY = 'auken_inquiry_cart';

  var I18N = {
    zh: { title: '我的询盘', empty: '还没有加入任何产品', tip: '已选 {n} 款产品', send: '一键询盘', del: '删除',
          msg: '您好，我对以下奥肯设备感兴趣，请报价：\n' },
    en: { title: 'My Inquiry', empty: 'No products added yet', tip: '{n} product(s) selected', send: 'Send Inquiry', del: 'Remove',
          msg: 'Hello, I am interested in the following Auken machines, please quote:\n' },
    fr: { title: 'Ma demande', empty: 'Aucun produit ajouté', tip: '{n} produit(s) sélectionné(s)', send: 'Envoyer la demande', del: 'Retirer',
          msg: 'Bonjour, je suis intéressé par les machines Auken suivantes, merci de me faire un devis :\n' },
    ar: { title: 'استفساري', empty: 'لم تتم إضافة منتجات', tip: 'تم تحديد {n} منتج', send: 'إرسال الاستفسار', del: 'حذف',
          msg: 'مرحبًا، أهتم بالآلات التالية من أكن، يرجى تقديم عرض سعر:\n' }
  };

  function lang() {
    var l = document.documentElement.lang;
    if (I18N[l]) return l;
    try { l = sessionStorage.getItem('auken_lang') || 'en'; } catch (e) { l = 'en'; }
    return I18N[l] ? l : 'en';
  }
  function getCart() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function setCart(arr) { try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {} }

  function addItem(name, tag) {
    if (!name) return;
    var arr = getCart();
    if (!arr.some(function (it) { return it.name === name; })) {
      arr.push({ name: name, tag: tag || '' });
      setCart(arr);
    }
    render();
  }
  function removeItem(name) {
    setCart(getCart().filter(function (it) { return it.name !== name; }));
    render();
  }

  var fab, badge, drawer, mask, listEl, countEl, sendBtn, titleEl;

  function build() {
    if (document.getElementById('cartFab')) return;
    fab = document.createElement('button');
    fab.id = 'cartFab'; fab.className = 'cart-fab'; fab.type = 'button';
    fab.setAttribute('aria-label', 'inquiry cart');
    fab.innerHTML = '&#128722;<span class="cart-badge" id="cartBadge" hidden>0</span>';
    document.body.appendChild(fab);

    mask = document.createElement('div'); mask.className = 'cart-mask'; mask.id = 'cartMask';
    document.body.appendChild(mask);

    drawer = document.createElement('div'); drawer.className = 'cart-drawer'; drawer.id = 'cartDrawer';
    drawer.innerHTML =
      '<div class="cart-head"><h3 id="cartTitle">我的询盘</h3>' +
      '<button class="cart-close" id="cartClose" type="button" aria-label="close">&times;</button></div>' +
      '<div class="cart-list" id="cartList"></div>' +
      '<div class="cart-foot"><div class="cart-count-tip" id="cartCount"></div>' +
      '<button class="cart-send" id="cartSend" type="button">一键询盘</button></div>';
    document.body.appendChild(drawer);

    titleEl = drawer.querySelector('#cartTitle');
    listEl = drawer.querySelector('#cartList');
    countEl = drawer.querySelector('#cartCount');
    sendBtn = drawer.querySelector('#cartSend');
    badge = fab.querySelector('#cartBadge');

    fab.addEventListener('click', function (e) { e.stopPropagation(); openDrawer(); });
    mask.addEventListener('click', closeDrawer);
    drawer.querySelector('#cartClose').addEventListener('click', closeDrawer);
    sendBtn.addEventListener('click', sendInquiry);
  }

  function openDrawer() { drawer.classList.add('open'); mask.classList.add('open'); render(); }
  function closeDrawer() { drawer.classList.remove('open'); mask.classList.remove('open'); }

  function sendInquiry() {
    if (!getCart().length) return;
    // 跳转到询盘表单页，表单会读取购物车预填产品清单
    window.location.href = 'contact.html?cart=1';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function render() {
    if (!fab) build();
    var arr = getCart();
    var t = I18N[lang()] || I18N.en;
    if (!arr.length) {
      fab.hidden = true;
      if (drawer) drawer.classList.remove('open');
      if (mask) mask.classList.remove('open');
      return;
    }
    fab.hidden = false;
    if (arr.length) { badge.hidden = false; badge.textContent = arr.length; }
    else { badge.hidden = true; }
    if (titleEl) titleEl.textContent = t.title;
    if (countEl) countEl.textContent = arr.length ? t.tip.replace('{n}', arr.length) : '';
    if (sendBtn) { sendBtn.disabled = !arr.length; sendBtn.textContent = t.send; }
    if (!listEl) return;
    listEl.innerHTML = '';
    if (!arr.length) {
      var e = document.createElement('div'); e.className = 'cart-empty'; e.textContent = t.empty;
      listEl.appendChild(e); return;
    }
    arr.forEach(function (it) {
      var row = document.createElement('div'); row.className = 'cart-item';
      var tag = it.tag ? '<span class="cart-item-tag">' + esc(it.tag) + '</span>' : '';
      row.innerHTML = '<div class="cart-item-main"><span class="cart-item-name">' + esc(it.name) + '</span>' + tag + '</div>' +
        '<button class="cart-del" type="button" title="' + esc(t.del) + '" aria-label="' + esc(t.del) + '">&times;</button>';
      row.querySelector('.cart-del').addEventListener('click', function () { removeItem(it.name); });
      listEl.appendChild(row);
    });
  }

  /* 暴露给各页面"加入询盘"按钮调用 */
  window.AukenCart = { add: addItem, remove: removeItem, render: render, open: openDrawer };

  function init() { build(); render(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
