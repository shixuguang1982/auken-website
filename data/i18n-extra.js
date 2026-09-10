/* 新版式新增词条（老站 i18n 里没有的），由 app.js 合并进 window.I18N
   改文案时直接改这里，四种语言都写上；阿语会触发 RTL 布局 */
window.I18N_EXTRA = {
  /* ---- 导航 ---- */
  nav_home:      { zh: '首页',     en: 'Home',       fr: 'Accueil',    ar: 'الرئيسية' },
  nav_products:  { zh: '产品中心', en: 'Machines',    fr: 'Machines',   ar: 'المنتجات' },
  nav_molds:     { zh: '砖型模具', en: 'Moulds',      fr: 'Moules',     ar: 'القوالب' },
  nav_supporting:{ zh: '配套设备', en: 'Equipment',   fr: 'Équipements',ar: 'المعدات المساعدة' },
  nav_contact:   { zh: '联系我们', en: 'Contact',     fr: 'Contact',    ar: 'اتصل بنا' },

  /* ---- 首页 Hero ---- */
  hero_eyebrow:  { zh: '中国郑州 · 制砖设备制造商', en: 'Zhengzhou, China · Block Machine Manufacturer', fr: 'Zhengzhou, Chine · Fabricant de machines à blocs', ar: 'تشنغتشو، الصين · شركة تصنيع ماكينات الطوب' },
  hero_title:    { zh: '从一台砖机<br>到一整条<em>生产线</em>', en: 'From one machine<br>to a full <em>production line</em>', fr: "D'une machine<br>à une <em>ligne complète</em>", ar: 'من ماكينة واحدة<br>إلى <em>خط إنتاج كامل</em>' },
  hero_lead:     { zh: '20 余种机型，日产 300 到 19000 块。我们为非洲砖厂提供成型、搅拌、输送、码垛的整套方案，并负责安装培训与配件供应。', en: 'Over 20 models, from 300 to 19,000 blocks per day. We supply complete solutions for African block factories — forming, mixing, conveying and stacking — with installation training and spare parts.', fr: "Plus de 20 modèles, de 300 à 19 000 blocs par jour. Nous fournissons des solutions complètes pour les briqueteries africaines — formage, malaxage, convoyage et palettisation — avec installation, formation et pièces détachées.", ar: 'أكثر من 20 طرازاً، من 300 إلى 19000 طوبة يومياً. نوفر حلولاً متكاملة لمصانع الطوب في أفريقيا — التشكيل والخلط والنقل والتكديس — مع التركيب والتدريب وقطع الغيار.' },
  hero_cta1:     { zh: '浏览机型目录', en: 'Browse Machines', fr: 'Voir les machines', ar: 'تصفح الماكينات' },
  hero_cta2:     { zh: 'WhatsApp 联系我们', en: 'Contact us on WhatsApp', fr: 'Contactez-nous sur WhatsApp', ar: 'تواصل معنا عبر واتساب' },

  /* ---- 首页区块 ---- */
  sec_cats_eyebrow: { zh: '产品分类', en: 'Product Range', fr: 'Gamme de produits', ar: 'فئات المنتجات' },
  sec_cats_title:   { zh: '按产量选设备', en: 'Choose by output', fr: 'Choisissez selon la production', ar: 'اختر حسب الإنتاج' },
  sec_cats_lead:    { zh: '从手动单机到全自动液压生产线，六个系列覆盖不同投资规模。', en: 'From a single manual press to a fully automatic hydraulic line — six ranges to match any investment size.', fr: "D'une presse manuelle à une ligne hydraulique automatique — six gammes pour chaque budget.", ar: 'من مكبس يدوي واحد إلى خط هيدروليكي أوتوماتيكي بالكامل — ست فئات تناسب كل ميزانية.' },

  sec_models_eyebrow: { zh: '热门机型', en: 'Popular Models', fr: 'Modèles populaires', ar: 'الطرازات الأكثر طلباً' },
  sec_models_title:   { zh: '卖得最好的几台', en: 'Our best sellers', fr: 'Nos meilleures ventes', ar: 'الأكثر مبيعاً' },
  sec_models_lead:    { zh: '以下机型出口量最大，参数可直接索取。', en: 'These models ship the most. Specifications available on request.', fr: 'Ces modèles sont les plus exportés. Spécifications sur demande.', ar: 'هذه الطرازات هي الأكثر تصديراً. المواصفات متوفرة عند الطلب.' },

  sec_why_eyebrow: { zh: '为什么选奥肯', en: 'Why AUKEN', fr: 'Pourquoi AUKEN', ar: 'لماذا AUKEN' },
  sec_why_title:   { zh: '设备之外，我们更看重开工率', en: 'Beyond machines, we care about uptime', fr: 'Au-delà des machines, votre productivité', ar: 'ما وراء الماكينات، نهتم باستمرار الإنتاج' },
  sec_why_lead:    { zh: '机器到了非洲只是开始，能不能连续出砖才是关键。', en: 'Delivery is only the beginning — running every day is what matters.', fr: "La livraison n'est qu'un début — produire chaque jour compte vraiment.", ar: 'التسليم هو البداية فقط — التشغيل اليومي هو الأهم.' },

  sec_cases_eyebrow: { zh: '客户案例', en: 'Case Studies', fr: 'Références clients', ar: 'دراسات حالة' },
  sec_market_eyebrow:{ zh: '出口市场', en: 'Export Markets', fr: "Marchés d'exportation", ar: 'أسواق التصدير' },
  sec_market_title:  { zh: '设备已发往 40 多个国家', en: 'Shipping to 40+ countries', fr: 'Expédié dans plus de 40 pays', ar: 'نشحن إلى أكثر من 40 دولة' },
  sec_market_lead:   { zh: '非洲、南美、加勒比地区的砖厂正在使用奥肯设备。', en: 'Block factories across Africa, South America and the Caribbean run on AUKEN machines.', fr: 'Des briqueteries en Afrique, en Amérique du Sud et dans les Caraïbes utilisent AUKEN.', ar: 'مصانع الطوب في أفريقيا وأمريكا الجنوبية والكاريبي تعمل بماكينات AUKEN.' },

  /* ---- 六大优势 ---- */
  why1_h: { zh: '工厂直供', en: 'Factory direct', fr: 'Direct usine', ar: 'مباشرة من المصنع' },
  why1_p: { zh: '自有工厂生产，无中间商加价。配置清单完整，没有隐藏费用。', en: 'We build in our own factory — no middleman margin. The full configuration is listed, no hidden costs.', fr: 'Nous produisons dans notre usine — sans intermédiaire. La configuration complète est détaillée, sans frais cachés.', ar: 'نصنع في مصنعنا — بدون وسطاء. التكوين الكامل موضّح بدون رسوم خفية.' },
  why2_h: { zh: '非洲工况适配', en: 'Built for African conditions', fr: 'Adapté aux conditions africaines', ar: 'مصمم لظروف أفريقيا' },
  why2_p: { zh: '针对当地电压、砂石原料与高温粉尘环境做过专门适配，可提供柴油动力方案。', en: 'Adapted to local voltage, aggregate and hot dusty sites. Diesel drive options available.', fr: "Adapté à la tension locale, aux granulats et aux sites chauds et poussiéreux. Motorisation diesel disponible.", ar: 'مكيّف مع الجهد المحلي والمواد الخام والبيئة الحارة المتربة. يتوفر خيار الديزل.' },
  why3_h: { zh: '整线方案设计', en: 'Complete line design', fr: 'Conception de ligne complète', ar: 'تصميم خط كامل' },
  why3_p: { zh: '从配料、搅拌、成型到码垛，按您的产能与预算配整线，而不是只卖一台机器。', en: 'Batching, mixing, forming and stacking — we design the whole line around your output target and budget, not just one machine.', fr: 'Dosage, malaxage, formage et palettisation — nous concevons la ligne entière selon vos objectifs et votre budget.', ar: 'الخلط والتشكيل والتكديس — نصمم الخط كاملاً حسب هدف الإنتاج والميزانية.' },
  why4_h: { zh: '安装指导与培训', en: 'Installation & training', fr: 'Installation et formation', ar: 'التركيب والتدريب' },
  why4_p: { zh: '远程视频指导安装，中/英/法语工程师在线，附全套操作手册与视频教程。', en: 'Remote video-guided installation with engineers in Chinese, English and French, plus manuals and video tutorials.', fr: 'Installation guidée par vidéo avec ingénieurs en chinois, anglais et français, plus manuels et tutoriels vidéo.', ar: 'تركيب موجّه بالفيديو مع مهندسين بالصينية والإنجليزية والفرنسية، مع كتيبات وفيديوهات تعليمية.' },
  why5_h: { zh: '原厂配件保障', en: 'Genuine spare parts', fr: 'Pièces détachées d\'origine', ar: 'قطع غيار أصلية' },
  why5_p: { zh: '常备易损件库存，支持空运/海运，常规 3–7 天到港，只供原厂配件。', en: 'Wear parts kept in stock, air or sea freight, 3–7 days to port. Genuine parts only.', fr: 'Pièces d\'usure en stock, envoi aérien ou maritime, 3 à 7 jours vers le port. Pièces d\'origine uniquement.', ar: 'قطع الغيار متوفرة في المخزون، شحن جوي أو بحري، 3–7 أيام إلى الميناء. قطع أصلية فقط.' },
  why6_h: { zh: '7×24 快速响应', en: '24/7 fast response', fr: 'Réponse rapide 24h/24', ar: 'استجابة سريعة على مدار الساعة' },
  why6_p: { zh: 'WhatsApp / 微信全天候接收故障视频与照片，2 小时内响应，多数问题远程解决。', en: 'Send fault videos on WhatsApp or WeChat any time. We reply within 2 hours and solve most issues remotely.', fr: 'Envoyez vos vidéos de panne sur WhatsApp ou WeChat à toute heure. Réponse sous 2 heures, la plupart des problèmes résolus à distance.', ar: 'أرسل فيديو العطل عبر واتساب أو وي تشات في أي وقت. نرد خلال ساعتين ونحل معظم المشاكل عن بُعد.' },

  /* ---- 通用 ---- */
  btn_view_all:  { zh: '查看全部机型', en: 'View all models', fr: 'Voir tous les modèles', ar: 'عرض جميع الطرازات' },
  btn_view_all_cases: { zh: '查看全部案例', en: 'View all cases', fr: 'Voir tous les cas', ar: 'عرض جميع الحالات' },
  btn_view:      { zh: '查看详情',     en: 'View details',   fr: 'Voir le détail',      ar: 'عرض التفاصيل' },
  btn_inquiry:   { zh: '联系我们', en: 'Contact us', fr: 'Nous contacter', ar: 'تواصل معنا' },
  btn_back:      { zh: '返回',         en: 'Back',           fr: 'Retour',             ar: 'رجوع' },
  price_from:    { zh: '起',           en: 'from',           fr: 'à partir de',        ar: 'يبدأ من' },
  price_nego:    { zh: '价格面议',     en: 'On request',     fr: 'Sur demande',        ar: 'حسب الطلب' },
  spec_title:    { zh: '技术参数',     en: 'Specifications', fr: 'Spécifications',     ar: 'المواصفات الفنية' },
  related_title: { zh: '相关机型',     en: 'Related models', fr: 'Modèles liés',       ar: 'طرازات ذات صلة' },
  no_data:       { zh: '没有符合条件的设备', en: 'No machines match your filters', fr: 'Aucune machine ne correspond', ar: 'لا توجد ماكينات مطابقة' },

  /* ---- 目录页筛选 ---- */
  filter_all:     { zh: '全部分类',   en: 'All categories', fr: 'Toutes catégories', ar: 'كل الفئات' },
  filter_search:  { zh: '搜索型号…',  en: 'Search model…',  fr: 'Rechercher…',       ar: 'ابحث عن طراز…' },
  filter_sort:    { zh: '排序',       en: 'Sort',           fr: 'Trier',             ar: 'ترتيب' },
  sort_default:   { zh: '推荐排序',   en: 'Recommended',    fr: 'Recommandé',        ar: 'موصى به' },
  sort_price_up:  { zh: '价格从低到高', en: 'Price: low to high', fr: 'Prix croissant', ar: 'السعر من الأقل' },
  sort_price_down:{ zh: '价格从高到低', en: 'Price: high to low', fr: 'Prix décroissant', ar: 'السعر من الأعلى' },
  sort_cap_down:  { zh: '产能从高到低', en: 'Output: high to low', fr: 'Production décroissante', ar: 'الإنتاج من الأعلى' },
  result_count:   { zh: '共 {n} 台设备', en: '{n} machines found', fr: '{n} machines', ar: '{n} ماكينة' },

  /* ---- 详情页 ---- */
  pd_wa:      { zh: 'WhatsApp 询问这台', en: 'Ask about this on WhatsApp', fr: 'Demander sur WhatsApp', ar: 'استفسر عبر واتساب' },
  pd_form:    { zh: '填写询价单',       en: 'Send an inquiry',    fr: 'Envoyer une demande', ar: 'إرسال استفسار' },
  pd_note:    { zh: '配置含整机与标准配置，不含海运与清关费用。', en: 'Configuration covers the machine and standard configuration, excluding sea freight and customs clearance.', fr: 'La configuration couvre la machine et sa configuration standard, hors fret maritime et dédouanement.', ar: 'يشمل التكوين الماكينة وتكوينها القياسي، دون الشحن البحري والتخليص الجمركي.' },
  pd_video:   { zh: '运行视频',         en: 'Machine video',      fr: 'Vidéo de la machine', ar: 'فيديو الماكينة' },

  /* ---- 模具页 ---- */
  mold_title: { zh: '砖型与模具', en: 'Brick Types & Moulds', fr: 'Types de blocs et moules', ar: 'أنواع الطوب والقوالب' },
  mold_lead:  { zh: '一台主机换不同模具即可生产多种砖型，模具可按需定制。', en: 'One machine produces many block types — just change the mould. Custom moulds available.', fr: 'Une seule machine produit plusieurs types de blocs — il suffit de changer le moule. Moules sur mesure disponibles.', ar: 'ماكينة واحدة تنتج أنواعاً عديدة من الطوب — يكفي تغيير القالب. كما تتوفر قوالب حسب الطلب.' },
  mold_size:  { zh: '规格', en: 'Size', fr: 'Dimensions', ar: 'المقاس' },
  mold_use:   { zh: '用途', en: 'Application', fr: 'Usage', ar: 'الاستخدام' },
  mold_all:   { zh: '全部系列', en: 'All series', fr: 'Toutes séries', ar: 'كل السلاسل' },

  /* ---- 联系 / 表单 ---- */
  ct_title:   { zh: '联系我们', en: 'Contact Us', fr: 'Nous contacter', ar: 'اتصل بنا' },
  ct_lead:    { zh: '告诉我们您的产能目标、原料与预算，我们 24 小时内给出配置方案。', en: 'Tell us your output target, raw material and budget — we will send a configuration proposal within 24 hours.', fr: 'Indiquez votre objectif de production, vos matières premières et votre budget — nous envoyons une proposition sous 24 heures.', ar: 'أخبرنا بهدف الإنتاج والمواد الخام والميزانية — سنرسل عرض تكوين خلال 24 ساعة.' },
  form_name:    { zh: '姓名',       en: 'Name',         fr: 'Nom',           ar: 'الاسم' },
  form_email:   { zh: '邮箱',       en: 'Email',        fr: 'E-mail',        ar: 'البريد الإلكتروني' },
  form_phone:   { zh: '电话 / WhatsApp', en: 'Phone / WhatsApp', fr: 'Téléphone / WhatsApp', ar: 'الهاتف / واتساب' },
  form_country: { zh: '国家',       en: 'Country',      fr: 'Pays',          ar: 'الدولة' },
  form_interest:{ zh: '感兴趣的设备', en: 'Machine of interest', fr: 'Machine souhaitée', ar: 'الماكينة المطلوبة' },
  form_msg:     { zh: '需求说明',   en: 'Message',      fr: 'Message',       ar: 'الرسالة' },
  form_submit:  { zh: '发送询盘',   en: 'Send Inquiry', fr: 'Envoyer',       ar: 'إرسال' },
  form_ok:      { zh: '已收到！我们会尽快回复，也可直接 WhatsApp 联系我们。', en: 'Received! We will reply soon — or reach us on WhatsApp directly.', fr: 'Bien reçu ! Nous répondrons rapidement — ou contactez-nous sur WhatsApp.', ar: 'تم الاستلام! سنرد قريباً — أو تواصل معنا عبر واتساب.' },
  form_err:     { zh: '请填写姓名和联系方式。', en: 'Please fill in your name and contact details.', fr: 'Veuillez indiquer votre nom et vos coordonnées.', ar: 'يرجى إدخال الاسم وبيانات الاتصال.' },
  ct_hours:   { zh: '工作时间', en: 'Business hours', fr: 'Heures d\'ouverture', ar: 'ساعات العمل' },
  ct_hours_v: { zh: '周一至周六 8:30–18:00（北京时间）', en: 'Mon–Sat 8:30–18:00 (Beijing Time)', fr: 'Lun–Sam 8h30–18h00 (heure de Pékin)', ar: 'الإثنين–السبت 8:30–18:00 (توقيت بكين)' },

  /* ---- CTA ---- */
  cta_h:   { zh: '说说您的产量目标，我们来配线', en: 'Tell us your output target — we will build the line', fr: 'Dites-nous votre objectif — nous concevons la ligne', ar: 'أخبرنا بهدف إنتاجك — نصمم لك الخط' },
  cta_p:   { zh: '把每天想做多少块砖、场地多大、预算多少告诉我们，24 小时内给方案。', en: 'Tell us how many blocks per day, your site size and budget. We will send a proposal within 24 hours.', fr: 'Indiquez le nombre de blocs par jour, la taille du site et le budget. Nous envoyons une proposition sous 24 heures.', ar: 'أخبرنا بعدد الطوب يومياً ومساحة الموقع والميزانية. سنرسل عرضاً خلال 24 ساعة.' },

  /* ---- 页脚 ---- */
  foot_about:   { zh: '关于',     en: 'About',     fr: 'À propos',  ar: 'حول' },
  foot_links:   { zh: '快速链接', en: 'Links',     fr: 'Liens',     ar: 'روابط' },
  foot_contact: { zh: '联系方式', en: 'Contact',   fr: 'Contact',   ar: 'اتصل بنا' },
  foot_desc:    { zh: '郑州奥肯机械设备有限公司，专注制砖机与破碎设备制造与出口。', en: 'Zhengzhou AUKEN Machinery — block machines and crushing equipment, built and exported worldwide.', fr: 'Zhengzhou AUKEN Machinery — machines à blocs et équipements de concassage, fabriqués et exportés dans le monde entier.', ar: 'شركة Zhengzhou AUKEN Machinery — ماكينات الطوب ومعدات التكسير، نصنعها ونصدّرها إلى العالم.' },
  foot_rights:  { zh: '版权所有', en: 'All rights reserved', fr: 'Tous droits réservés', ar: 'جميع الحقوق محفوظة' },

  /* ---- 语言名 ---- */
  lang_zh: { zh: '中文',   en: 'Chinese',  fr: 'Chinois',  ar: 'الصينية' },
  lang_en: { zh: '英语',   en: 'English',  fr: 'Anglais',  ar: 'الإنجليزية' },
  lang_fr: { zh: '法语',   en: 'French',   fr: 'Français', ar: 'الفرنسية' },
  lang_ar: { zh: '阿拉伯语', en: 'Arabic', fr: 'Arabe',    ar: 'العربية' }
};
