/**
 * AUKEN Machinery — HG-STAR Inspired Theme
 * Main JavaScript
 */
(function(){
'use strict';

// ===== LANGUAGE DATA =====
const translations = {
  en: {
    'meta.title': 'AUKEN Machinery — Brick Making Machines, Wood Chippers & Metal Shredders',
    'meta.desc': 'Professional manufacturer of brick making machines, wood chippers and metal shredders. Nigeria office. Global export.',
    'header.tagline': 'Machinery',
    'nav.home':'Home','nav.products':'Products','nav.solutions':'Solutions','nav.about':'About Us','nav.offices':'Overseas','nav.contact':'Contact','nav.quote':'Get Quote',
    'hero.slide1.title':'Reliable Brick &<br>Crusher Machinery','hero.slide1.desc':'High-capacity equipment for brick production, waste recycling<br>and construction material processing.','hero.slide1.btn1':'View Models','hero.slide1.btn2':'Send Inquiry',
    'hero.tabs.featured':'Featured Machines','hero.tabs.why':'Why Choose AUKEN','hero.tabs.global':'Global Supply',
    'hero.slide2.title':'Wood Chippers<br>& Crushers','hero.slide2.desc':'Drum & disc chippers. 1–30 tons/hour.<br>For biomass, forestry and pallet processing.','hero.slide2.btn1':'View Products','hero.slide2.btn2':'Get Free Quote',
    'hero.slide3.title':'Metal Shredding<br>Systems','hero.slide3.desc':'Twin-shaft shredders for scrap metal, e-waste & tires.<br>Rugged construction, easy maintenance.','hero.slide3.btn1':'View Products','hero.slide3.btn2':'Get Free Quote',
    'solutions.title':'Our Solutions','solutions.desc':'Complete machinery solutions for construction, biomass and recycling industries',
    'solutions.c1.title':'Brick Making Line','solutions.c1.desc':'Complete concrete block production: mixer → conveyor → block machine → stacker',
    'solutions.c2.title':'Wood Processing','solutions.c2.desc':'Chipping & crushing for biomass fuel, particle board and composting applications',
    'solutions.c3.title':'Metal Recycling','solutions.c3.desc':'Shredding systems for scrap metal, e-waste, tires — high throughput, low maintenance',
    'solutions.c4.title':'Custom Engineering','solutions.c4.desc':'OEM & ODM services — design machines to your specifications, voltage & mold requirements',
    'solutions.learn':'Learn More →',
    'detail.brick.tag':'High Capacity','detail.brick.title':'Concrete Block Making Series','detail.brick.desc':'From semi-automatic to fully automatic — QT series delivers 4,000 to 28,800 bricks per 8-hour shift. Hydraulic pressing + vibration technology for consistent density and strength.',
    'detail.wood.tag':'Heavy-Duty','detail.wood.title':'Wood Chipper & Crusher Series','detail.wood.desc':'Drum and disc chippers with diesel or electric power. Output 1 to 30 tons/hour. Durable alloy steel blades with quick-change design. Ideal for biomass, forestry and pallet recycling.',
    'detail.metal.tag':'Recycling','detail.metal.title':'Metal Shredder Series','detail.metal.desc':'Twin-shaft shredders with high-torque, low-speed cutting. Handles scrap steel, aluminum, copper, e-waste, tires. Automatic reverse protection. Custom screen sizes control output particle size.',
    'detail.inquire':'Inquire Now',
    'cats.title':'Product Categories','cats.desc':'Professional machinery for construction, forestry and recycling',
    'cats.c1.short':'Brick Making','cats.c2.short':'Wood Chippers','cats.c3.short':'Metal Shredders',
    'products.ribbon.hot':'Hot','products.ribbon.new':'New',
    'products.brick.p1':'Fully Automatic Block Machine QT4-25','products.brick.p2':'Semi-Automatic Brick Machine QT4-35','products.brick.p3':'Hydraulic Block Machine QT10-15',
    'products.wood.p1':'Drum Wood Chipper WC-800','products.wood.p2':'Disc Wood Chipper DC-600','products.wood.p3':'Wood Crusher / Hammer Mill CR-500',
    'products.metal.p1':'Double Shaft Shredder SS-800','products.metal.p2':'Heavy Duty Shredder SS-1000','products.metal.p3':'Scrap Metal Crusher SS-600',
    'about.title':'About AUKEN Machinery',
    'about.p1':'Professional heavy machinery manufacturer integrating R&D, production, sales and service. Specializing in brick making machines, wood chippers, crushers and metal shredders.',
    'about.p2':'Over 15 years of manufacturing experience, ISO & CE certified facilities, and a dedicated Nigeria office. We deliver partnerships that help your business grow.',
    'about.stat1':'Years Experience','about.stat2':'Export Countries','about.stat3':'Machines Delivered','about.stat4':'Overseas Office',
    'overseas.title':'Overseas Division','overseas.desc':'We\'re not just an exporter — we have boots on the ground in key markets',
    'overseas.active':'● Active','overseas.ng.title':'Nigeria Office — West Africa HQ',
    'overseas.ng.subtitle':'Lagos, Nigeria. Serving Nigeria, Ghana, Cameroon, Benin, Togo and beyond.',
    'overseas.ng.s1':'Local Office & Warehouse','overseas.ng.s2':'Chinese & Local Engineers','overseas.ng.s3':'Spare Parts Inventory','overseas.ng.s4':'After-Sales & Warranty',
    'overseas.future.title':'Expanding Our Global Footprint','overseas.future.label':'Coming Soon',
    'commit.title':'AUKEN Commitment','commit.desc':'What you get when you partner with us',
    'commit.c1.title':'Free Technical Training','commit.c1.desc':'Comprehensive operation and maintenance training — in person at your site or via video.',
    'commit.c2.title':'Professional After-Sales','commit.c2.desc':'24-hour response guarantee. Technical team always online for troubleshooting and service.',
    'commit.c3.title':'Quality Assurance','commit.c3.desc':'1-year full warranty, 1-3 years core components. ISO & CE certified. Every machine tested.',
    'commit.c4.title':'Free Sample Testing','commit.c4.desc':'Send us raw materials — we test and share video results before you commit. No risk, just confidence.',
    'faq.title':'Frequently Asked Questions',
    'faq.q1':'Are you a factory or trading company?','faq.a1':'We are a professional original manufacturer with our own production workshops, R&D team and complete assembly lines. All machines are independently designed, produced and tested. We welcome factory visits and video tours.',
    'faq.q2':'Can you customize the machine for my market?','faq.a2':'Yes. We offer full customization: voltage adaptation, mold design for local brick sizes, color and branding, and configuration adjustments for different raw materials.',
    'faq.q3':'What is the warranty period?','faq.a3':'1-year comprehensive warranty for the entire machine, 1-3 years for core components. Free repair or replacement for non-human damage. Lifetime technical support.',
    'faq.q4':'How long is delivery time?','faq.a4':'Standard machines: 7-15 working days. Customized orders: 15-30 working days. We provide production updates and arrange sea/air shipping with full documentation.',
    'faq.q5':'How to get a quote?','faq.a5':'Fill in the form below or contact us via WhatsApp/Email. Tell us the machine type, capacity and destination port. Quote within 24 hours.',
    'inquiry.title':'Send Us a Message','inquiry.desc':'Tell us your requirements. We\'ll reply with detailed specs, pricing and shipping options within 24 hours.',
    'inquiry.address':'Zhengzhou, Henan, China',
    'form.name':'Full Name *','form.email':'Email *','form.whatsapp':'WhatsApp *','form.country':'Country *','form.product':'-- Select Product --','form.message':'Tell us about your requirements... *','form.submit':'Send Inquiry →','form.note':'We reply within 24 hours. Your information is confidential.',
    'form.success':'Thank You!','form.successMsg':'Your inquiry has been received. We\'ll contact you within 24 hours.',
    'footer.col1':'Products','footer.col2':'Quick Links','footer.col3':'Contact Us',
    'footer.desc':'Professional manufacturer of brick making machines, wood chippers and metal shredders. ISO & CE certified. Exporting to 30+ countries.',
    'quote.title':'Your Quote List','quote.empty':'No products added yet. Click "+ Add to Quote" on any product.','quote.submit':'Request Quote for Selected Items',
    'cookie.text':'This website uses cookies to improve your experience. By continuing, you agree to our use of cookies.',
    'cookie.accept':'Accept All','cookie.settings':'Settings'
  },
  zh: {
    'meta.title':'奥肯机械 — 制砖机、木材破碎机、金属撕碎机制造商',
    'meta.desc':'郑州奥肯机械设备有限公司——专业制造制砖机、木材破碎机、金属撕碎机。尼日利亚设有海外事业部，全球出口。',
    'header.tagline':'机械设备',
    'nav.home':'首页','nav.products':'产品','nav.solutions':'解决方案','nav.about':'关于我们','nav.offices':'海外事业部','nav.contact':'联系我们','nav.quote':'获取报价',
    'hero.slide1.title':'可靠的制砖与<br>破碎机械设备','hero.slide1.desc':'为砖块生产、废物回收和建筑材料加工提供高产能设备。','hero.slide1.btn1':'查看型号','hero.slide1.btn2':'发送询盘',
    'hero.tabs.featured':'精选机型','hero.tabs.why':'为什么选择奥肯','hero.tabs.global':'全球供应',
    'hero.slide2.title':'木材破碎机<br>系列','hero.slide2.desc':'鼓式和盘式破碎机，1–30吨/小时。<br>适用于生物质、林业废弃物和托盘处理。','hero.slide2.btn1':'查看产品','hero.slide2.btn2':'免费获取报价',
    'hero.slide3.title':'金属撕碎<br>系统','hero.slide3.desc':'双轴撕碎机，用于废金属、电子垃圾和轮胎。<br>坚固耐用，易于维护。','hero.slide3.btn1':'查看产品','hero.slide3.btn2':'免费获取报价',
    'solutions.title':'我们的解决方案','solutions.desc':'为建筑、生物质和回收行业提供完整的机械解决方案',
    'solutions.c1.title':'制砖生产线','solutions.c1.desc':'完整的混凝土砌块生产：搅拌机 → 输送带 → 制砖机 → 码垛机',
    'solutions.c2.title':'木材加工','solutions.c2.desc':'破碎和粉碎，用于生物质燃料、刨花板和堆肥应用',
    'solutions.c3.title':'金属回收','solutions.c3.desc':'用于废金属、电子垃圾、轮胎的破碎系统——高产量、低维护',
    'solutions.c4.title':'定制工程','solutions.c4.desc':'OEM & ODM 服务——根据您的规格定制电压、模具和配置',
    'solutions.learn':'了解更多 →',
    'detail.brick.tag':'高产高效','detail.brick.title':'混凝土砌块制砖系列','detail.brick.desc':'从半自动到全自动——QT系列每8小时班次可生产4,000到28,800块砖。液压压制+振动技术确保密度和强度一致。',
    'detail.wood.tag':'重载耐用','detail.wood.title':'木材破碎机系列','detail.wood.desc':'鼓式和盘式破碎机，可选柴油或电动。产量1到30吨/小时。耐用合金钢刀片，快速更换设计。适用于生物质、林业和托盘回收。',
    'detail.metal.tag':'环保回收','detail.metal.title':'金属撕碎机系列','detail.metal.desc':'双轴撕碎机，高扭矩低速切削。处理废钢、铝、铜、电子垃圾、轮胎。自动反转防卡保护。定制筛网尺寸控制出料粒度。',
    'detail.inquire':'立即询价',
    'cats.title':'产品分类','cats.desc':'建筑、林业和回收行业的专业机械',
    'cats.c1.short':'制砖设备','cats.c2.short':'木材破碎','cats.c3.short':'金属撕碎',
    'products.ribbon.hot':'热销','products.ribbon.new':'新品',
    'products.brick.p1':'全自动砌块成型机 QT4-25','products.brick.p2':'半自动制砖机 QT4-35','products.brick.p3':'液压砌块机 QT10-15',
    'products.wood.p1':'鼓式木材破碎机 WC-800','products.wood.p2':'盘式木材削片机 DC-600','products.wood.p3':'锤式木材粉碎机 CR-500',
    'products.metal.p1':'双轴金属撕碎机 SS-800','products.metal.p2':'重型金属撕碎机 SS-1000','products.metal.p3':'废金属破碎机 SS-600',
    'about.title':'关于奥肯机械',
    'about.p1':'郑州奥肯机械设备有限公司是集研发、生产、销售和服务于一体的专业重型机械制造商，主营制砖机、木材破碎机和金属撕碎机。',
    'about.p2':'拥有超过15年制造经验，ISO和CE认证工厂，以及尼日利亚海外事业部，我们提供的不仅是设备，更是帮助您业务成长的合作伙伴。',
    'about.stat1':'年行业经验','about.stat2':'出口国家','about.stat3':'台设备交付','about.stat4':'海外办事处',
    'overseas.title':'海外事业部','overseas.desc':'我们不仅仅是出口商——我们在关键市场有本地团队',
    'overseas.active':'● 运营中','overseas.ng.title':'尼日利亚事业部 — 西非总部',
    'overseas.ng.subtitle':'尼日利亚拉各斯。服务尼日利亚、加纳、喀麦隆、贝宁、多哥等国家。',
    'overseas.ng.s1':'本地办公室和仓库','overseas.ng.s2':'中国和本地工程师','overseas.ng.s3':'备件库存','overseas.ng.s4':'售后和保修',
    'overseas.future.title':'拓展全球布局','overseas.future.label':'即将开放',
    'commit.title':'奥肯承诺','commit.desc':'与我们合作您将获得',
    'commit.c1.title':'免费技术培训','commit.c1.desc':'提供全面的操作和维护培训——现场或视频指导，让您的团队快速上手。',
    'commit.c2.title':'专业售后服务','commit.c2.desc':'24小时响应保证。技术团队始终在线——故障排除、备件供应和现场服务。',
    'commit.c3.title':'品质保证','commit.c3.desc':'整机1年保修，核心部件1-3年。ISO & CE 认证。每台机器出厂前严格测试。',
    'commit.c4.title':'免费样品测试','commit.c4.desc':'寄送您的原材料——我们免费打样并分享视频结果。零风险，只有信心。',
    'faq.title':'常见问题',
    'faq.q1':'你们是工厂还是贸易公司？','faq.a1':'我们是专业的原始制造商，拥有自己的生产车间、研发团队和完整的装配线。所有机器均独立设计、生产和测试。欢迎工厂参观和视频考察。',
    'faq.q2':'能为我的市场定制机器吗？','faq.a2':'可以。我们提供全面定制：适配您国家的电压、当地砖型的模具设计、颜色和品牌定制，以及针对不同原材料的配置调整。',
    'faq.q3':'保修期多久？','faq.a3':'整机1年全面保修，核心部件1-3年。非人为损坏免费维修或更换。终身技术支持。',
    'faq.q4':'交货时间多长？','faq.a4':'标准机型：7-15个工作日。定制订单：15-30个工作日。我们提供生产进度更新，安排海运/空运并提供全套单证。',
    'faq.q5':'如何获取报价？','faq.a5':'填写下方表单或通过 WhatsApp/Email 联系我们。告知机器类型、产量和目的港。24小时内回复报价。',
    'inquiry.title':'发送询盘','inquiry.desc':'告诉我们您的需求。我们将在24小时内回复详细的规格、报价和运输方案。',
    'inquiry.address':'中国河南郑州',
    'form.name':'姓名 *','form.email':'邮箱 *','form.whatsapp':'WhatsApp *','form.country':'国家 *','form.product':'-- 选择产品 --','form.message':'请描述您的需求... *','form.submit':'提交询盘 →','form.note':'我们会在24小时内回复。您的信息将保密。',
    'form.success':'感谢您的询盘！','form.successMsg':'我们已收到您的询盘，将在24小时内与您联系。',
    'footer.col1':'产品','footer.col2':'快速链接','footer.col3':'联系我们',
    'footer.desc':'专业制砖机、木材破碎机和金属撕碎机制造商。ISO & CE 认证。出口至30多个国家。',
    'quote.title':'您的询价清单','quote.empty':'尚未添加产品。点击任意产品上的"+ 加入询价"。','quote.submit':'提交选中产品的询价',
    'cookie.text':'本网站使用 Cookie 改善您的体验。继续浏览即表示您同意使用 Cookie。','cookie.accept':'全部接受','cookie.settings':'设置'
  },
  fr: {
    'meta.title':'AUKEN Machinery — Machines à briques, broyeurs à bois et déchiqueteurs de métal',
    'nav.home':'Accueil','nav.products':'Produits','nav.solutions':'Solutions','nav.about':'À propos','nav.offices':'International','nav.contact':'Contact','nav.quote':'Devis',
    'hero.slide1.title':'Machines à<br>Briques','hero.slide1.desc':'4 000 – 28 800 briques par équipe. Série QT4-25 à QT10-15.','hero.slide1.btn1':'Voir Produits','hero.slide1.btn2':'Devis Gratuit',
    'hero.slide2.title':'Broyeurs<br>à Bois','hero.slide2.desc':'Broyeurs à tambour et à disque. 1–30 tonnes/heure.','hero.slide2.btn1':'Voir Produits','hero.slide2.btn2':'Devis Gratuit',
    'hero.slide3.title':'Déchiqueteurs<br>de Métal','hero.slide3.desc':'Broyeurs double arbre pour ferraille, DEEE et pneus.','hero.slide3.btn1':'Voir Produits','hero.slide3.btn2':'Devis Gratuit',
    'solutions.title':'Nos Solutions','solutions.desc':'Solutions complètes pour la construction, la biomasse et le recyclage',
    'solutions.c1.title':'Ligne de Briques','solutions.c1.desc':'Production complète de blocs : malaxeur → convoyeur → machine → empileur',
    'solutions.c2.title':'Traitement Bois','solutions.c2.desc':'Broyage pour biocarburant, panneaux de particules et compostage',
    'solutions.c3.title':'Recyclage Métal','solutions.c3.desc':'Systèmes de déchiquetage pour ferraille, DEEE, pneus',
    'solutions.c4.title':'Ingénierie Sur Mesure','solutions.c4.desc':'Services OEM & ODM selon vos spécifications',
    'solutions.learn':'En Savoir Plus →',
    'detail.brick.tag':'Haute Capacité','detail.brick.title':'Série de machines à blocs de béton','detail.brick.desc':'De semi-automatique à entièrement automatique. 4 000 à 28 800 briques par équipe de 8 heures.',
    'detail.wood.tag':'Robuste','detail.wood.title':'Série de broyeurs à bois','detail.wood.desc':'Broyeurs à tambour et à disque, diesel ou électrique. 1 à 30 tonnes/heure.',
    'detail.metal.tag':'Recyclage','detail.metal.title':'Série de déchiqueteurs de métal','detail.metal.desc':'Broyeurs double arbre à couple élevé. Acier, aluminium, cuivre, DEEE, pneus.',
    'detail.inquire':'Demander un Devis',
    'cats.title':'Catégories de Produits','cats.desc':'Machines pour la construction, la foresterie et le recyclage',
    'cats.c1.short':'Briqueterie','cats.c2.short':'Broyeurs Bois','cats.c3.short':'Déchiqueteurs',
    'products.ribbon.hot':'Top','products.ribbon.new':'Nouveau',
    'about.stat1':'Ans d\'Expérience','about.stat2':'Pays d\'Export','about.stat3':'Machines Livrées','about.stat4':'Bureau International',
    'overseas.title':'Division Internationale','overseas.active':'● Actif','overseas.ng.title':'Bureau Nigeria — Siège Afrique de l\'Ouest',
    'overseas.future.title':'Expansion Mondiale','overseas.future.label':'Bientôt',
    'commit.title':'Engagement AUKEN',
    'faq.title':'Questions Fréquentes',
    'inquiry.title':'Envoyez-nous un Message',
    'form.submit':'Envoyer →','form.note':'Nous répondons sous 24h.',
    'quote.title':'Votre Liste de Devis','quote.empty':'Aucun produit ajouté.','quote.submit':'Demander un Devis',
    'cookie.accept':'Tout Accepter'
  },
  es: {
    'meta.title':'AUKEN Machinery — Máquinas de ladrillos, astilladoras de madera y trituradoras de metal',
    'nav.home':'Inicio','nav.products':'Productos','nav.solutions':'Soluciones','nav.about':'Nosotros','nav.offices':'Internacional','nav.contact':'Contacto','nav.quote':'Cotización',
    'hero.slide1.title':'Máquinas de<br>Ladrillos','hero.slide1.desc':'4,000 – 28,800 ladrillos por turno. Serie QT4-25 a QT10-15.','hero.slide1.btn1':'Ver Productos','hero.slide1.btn2':'Cotización Gratis',
    'hero.slide2.title':'Astilladoras<br>de Madera','hero.slide2.desc':'Astilladoras de tambor y disco. 1–30 toneladas/hora.','hero.slide2.btn1':'Ver Productos','hero.slide2.btn2':'Cotización Gratis',
    'hero.slide3.title':'Trituradoras<br>de Metal','hero.slide3.desc':'Trituradoras de doble eje para chatarra, RAEE y neumáticos.','hero.slide3.btn1':'Ver Productos','hero.slide3.btn2':'Cotización Gratis',
    'solutions.title':'Nuestras Soluciones',
    'detail.inquire':'Solicitar Cotización',
    'cats.title':'Categorías de Productos',
    'about.stat1':'Años de Experiencia','about.stat2':'Países de Exportación','about.stat3':'Máquinas Entregadas','about.stat4':'Oficina Internacional',
    'overseas.title':'División Internacional','overseas.active':'● Activo','overseas.ng.title':'Oficina Nigeria — Sede África Occidental',
    'commit.title':'Compromiso AUKEN',
    'faq.title':'Preguntas Frecuentes',
    'inquiry.title':'Envíenos un Mensaje',
    'form.submit':'Enviar →','form.note':'Respondemos en 24h.'
  },
  ar: {
    'meta.title':'AUKEN — ماكينات الطوب وكسارات الخشب وتمزيق المعادن',
    'nav.home':'الرئيسية','nav.products':'المنتجات','nav.solutions':'الحلول','nav.about':'من نحن','nav.offices':'مكاتبنا','nav.contact':'اتصل بنا','nav.quote':'طلب عرض سعر',
    'hero.slide1.title':'ماكينات<br>الطوب','hero.slide1.desc':'٤,٠٠٠ – ٢٨,٨٠٠ طوبة لكل وردية. سلسلة QT4-25 إلى QT10-15.','hero.slide1.btn1':'عرض المنتجات','hero.slide1.btn2':'عرض سعر مجاني',
    'hero.slide2.title':'كسارات<br>الخشب','hero.slide2.desc':'كسارات اسطوانية وقرصية. ١–٣٠ طن/ساعة.','hero.slide2.btn1':'عرض المنتجات','hero.slide2.btn2':'عرض سعر مجاني',
    'hero.slide3.title':'أنظمة تمزيق<br>المعادن','hero.slide3.desc':'تمزيق ثنائي المحور للخردة والنفايات الإلكترونية والإطارات.','hero.slide3.btn1':'عرض المنتجات','hero.slide3.btn2':'عرض سعر مجاني',
    'solutions.title':'حلولنا',
    'detail.inquire':'استفسر الآن',
    'cats.title':'فئات المنتجات',
    'about.stat1':'سنوات الخبرة','about.stat2':'دولة تصدير','about.stat3':'آلة تم تسليمها','about.stat4':'مكتب خارجي',
    'overseas.title':'القسم الدولي','overseas.active':'● نشط','overseas.ng.title':'مكتب نيجيريا — المقر الرئيسي لغرب أفريقيا',
    'commit.title':'التزام AUKEN',
    'faq.title':'الأسئلة الشائعة',
    'inquiry.title':'أرسل لنا رسالة',
    'form.submit':'إرسال →','form.note':'نرد خلال ٢٤ ساعة.'
  },
  ru: {
    'meta.title':'AUKEN Machinery — Станки для кирпича, дробилки древесины и измельчители металла',
    'nav.home':'Главная','nav.products':'Продукция','nav.solutions':'Решения','nav.about':'О нас','nav.offices':'Зарубеж','nav.contact':'Контакты','nav.quote':'Запрос',
    'hero.slide1.title':'Станки для<br>Кирпича','hero.slide1.desc':'4 000 – 28 800 кирпичей за смену. Серия QT4-25 до QT10-15.','hero.slide1.btn1':'Смотреть','hero.slide1.btn2':'Бесплатный Запрос',
    'hero.slide2.title':'Дробилки<br>Древесины','hero.slide2.desc':'Барабанные и дисковые дробилки. 1–30 тонн/час.','hero.slide2.btn1':'Смотреть','hero.slide2.btn2':'Бесплатный Запрос',
    'hero.slide3.title':'Измельчители<br>Металла','hero.slide3.desc':'Двухвальные измельчители для металлолома, электроники и шин.','hero.slide3.btn1':'Смотреть','hero.slide3.btn2':'Бесплатный Запрос',
    'solutions.title':'Наши Решения',
    'detail.inquire':'Запросить',
    'cats.title':'Категории Продуктов',
    'about.stat1':'Лет Опыта','about.stat2':'Стран Экспорта','about.stat3':'Машин Поставлено','about.stat4':'Зарубежный Офис',
    'overseas.title':'Зарубежное Подразделение','overseas.active':'● Активно','overseas.ng.title':'Офис в Нигерии — Штаб Западной Африки',
    'commit.title':'Обязательства AUKEN',
    'faq.title':'Часто Задаваемые Вопросы',
    'inquiry.title':'Отправьте Нам Сообщение',
    'form.submit':'Отправить →','form.note':'Отвечаем в течение 24 часов.'
  }
};

// French, Spanish, Arabic, Russian — fill missing keys from English
['fr','es','ar','ru'].forEach(function(lang){
  if (!translations[lang]) return;
  var base = translations.en;
  var t = translations[lang];
  Object.keys(base).forEach(function(k){
    if (typeof base[k] === 'string' && !t[k]) {
      // For structural keys, use English fallback or leave as-is
      // For form/meta that should always exist, set a fallback
      if (k.startsWith('form.') || k.startsWith('footer.') || k.startsWith('products.') || k.startsWith('about.') || k.startsWith('commit.') || k.startsWith('faq.') || k.startsWith('inquiry.') || k.startsWith('overseas.')) {
        t[k] = base[k];
      }
    }
  });
});

// ===== MULTI-LANGUAGE =====
var currentLang = 'en';

function switchLang(lang){
  currentLang = lang;
  var t = translations[lang] || translations.en;

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else if (el.tagName === 'SELECT' && el.querySelector('option[value=""]')) {
        el.querySelector('option[value=""]').textContent = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
    var key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Update language UI
  var flags = {en:'🇺🇸',zh:'🇨🇳',fr:'🇫🇷',es:'🇪🇸',ar:'🇸🇦',ru:'🇷🇺'};
  var codes = {en:'EN',zh:'中文',fr:'FR',es:'ES',ar:'AR',ru:'RU'};
  var flagEl = document.getElementById('currentFlag');
  var langEl = document.getElementById('currentLang');
  if (flagEl) flagEl.innerHTML = flags[lang] || '🌐';
  if (langEl) langEl.textContent = codes[lang] || lang.toUpperCase();

  // RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir','rtl');
  } else {
    document.documentElement.setAttribute('dir','ltr');
  }

  // Update form placeholders
  updateFormPlaceholders(t);
}

function updateFormPlaceholders(t){
  var inputs = document.querySelectorAll('#inquiryForm input, #inquiryForm textarea, #inquiryForm select');
  inputs.forEach(function(input){
    var name = input.getAttribute('name');
    var keyMap = {name:'form.name',email:'form.email',whatsapp:'form.whatsapp',country:'form.country',product:'form.product',message:'form.message'};
    var key = keyMap[name];
    if (key && t[key]) {
      input.placeholder = t[key];
    }
  });
}

// Language switcher clicks
document.addEventListener('click',function(e){
  var btn = e.target.closest('.lang-menu button');
  if (btn) {
    switchLang(btn.getAttribute('data-lang'));
  }
});

// ===== HERO CAROUSEL =====
(function(){
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero .dot');
  var prev = document.querySelector('.hero-arrow-prev');
  var next = document.querySelector('.hero-arrow-next');
  var current = 0;
  var total = slides.length;
  var interval;
  var autoplayDelay = 5000;

  function goTo(idx){
    slides.forEach(function(s,i){ s.classList.toggle('active', i===idx); });
    dots.forEach(function(d,i){ d.classList.toggle('active', i===idx); });
    current = idx;
  }

  function nextSlide(){ goTo((current + 1) % total); }
  function prevSlide(){ goTo((current - 1 + total) % total); }

  if (prev) prev.addEventListener('click',function(){ prevSlide(); resetAutoplay(); });
  if (next) next.addEventListener('click',function(){ nextSlide(); resetAutoplay(); });

  dots.forEach(function(dot){
    dot.addEventListener('click',function(){
      goTo(parseInt(this.getAttribute('data-dot')));
      resetAutoplay();
    });
  });

  function startAutoplay(){
    stopAutoplay();
    interval = setInterval(nextSlide, autoplayDelay);
  }
  function stopAutoplay(){ if (interval) clearInterval(interval); }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  if (total > 1) startAutoplay();
})();

// ===== MEGA MENU TABS =====
document.addEventListener('click',function(e){
  var tab = e.target.closest('.mega-tab');
  if (tab) {
    e.preventDefault();
    var mega = tab.closest('.mega-menu-inner');
    var cat = tab.getAttribute('data-mega');
    if (mega) {
      mega.querySelectorAll('.mega-tab').forEach(function(t){ t.classList.toggle('active', t===tab); });
      mega.querySelectorAll('.mega-content').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-mega-content')===cat); });
    }
  }
});

// ===== PRODUCT CATEGORY TABS =====
document.addEventListener('click',function(e){
  var tab = e.target.closest('.cat-tab');
  if (tab) {
    var section = tab.closest('.categories');
    var cat = tab.getAttribute('data-cat');
    if (section) {
      section.querySelectorAll('.cat-tab').forEach(function(t){ t.classList.toggle('active', t===tab); });
      section.querySelectorAll('.cat-content').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-cat-content')===cat); });
    }
  }
});

// ===== FAQ ACCORDION =====
document.addEventListener('click',function(e){
  var q = e.target.closest('.faq-question');
  if (q) {
    var item = q.parentElement;
    var wasActive = item.classList.contains('active');
    // Close all in same list
    var list = item.parentElement;
    if (list) {
      list.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('active'); });
    }
    if (!wasActive) item.classList.add('active');
  }
});

// ===== QUOTE SIDEBAR =====
var quoteItems = [];
window.addToQuote = function(name){
  if (quoteItems.indexOf(name) === -1) {
    quoteItems.push(name);
    renderQuote();
  }
  openQuote();
};

function removeQuote(name){
  quoteItems = quoteItems.filter(function(item){ return item !== name; });
  renderQuote();
}

function renderQuote(){
  var list = document.getElementById('quoteList');
  var empty = document.getElementById('quoteEmpty');
  if (!list) return;

  if (quoteItems.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
  } else {
    if (empty) empty.style.display = 'none';
    list.innerHTML = quoteItems.map(function(item){
      return '<li><span>'+item+'</span><button onclick="removeQuoteItem(\''+item.replace(/'/g,"\\'")+'\')">×</button></li>';
    }).join('');
  }
}

window.removeQuoteItem = function(name){
  removeQuote(name);
};

function openQuote(){
  var sidebar = document.getElementById('quoteSidebar');
  if (sidebar) sidebar.classList.add('open');
}

function closeQuote(){
  var sidebar = document.getElementById('quoteSidebar');
  if (sidebar) sidebar.classList.remove('open');
}

document.addEventListener('click',function(e){
  if (e.target.id === 'quoteOverlay' || e.target.id === 'quoteClose') {
    closeQuote();
  }
});

// ===== QUOTE SUBMIT → FILL INQUIRY FORM =====
document.addEventListener('click',function(e){
  if (e.target.id !== 'quoteSubmitBtn') return;

  // If no items selected, alert and stay
  if (quoteItems.length === 0) {
    alert('Please add at least one product to your quote list first.');
    return;
  }

  // Build the product summary string
  var productList = quoteItems.join(', ');

  // Auto-select product category based on items
  var productSelect = document.querySelector('#inquiryForm [name="product"]');
  if (productSelect) {
    var hasBrick = quoteItems.some(function(i){ return /QT|Brick|Block/i.test(i); });
    var hasWood  = quoteItems.some(function(i){ return /WC|DC|CR|Wood|Chipper|Crusher|Hammer/i.test(i); });
    var hasMetal = quoteItems.some(function(i){ return /SS|Shredder|Metal|Scrap/i.test(i); });
    if (hasBrick && !hasWood && !hasMetal) productSelect.value = 'brick';
    else if (hasWood && !hasBrick && !hasMetal) productSelect.value = 'wood';
    else if (hasMetal && !hasBrick && !hasWood) productSelect.value = 'metal';
    else productSelect.value = 'other';
  }

  // Pre-fill the message textarea with selected products
  var msgField = document.querySelector('#inquiryForm [name="message"]');
  if (msgField && !msgField.value.trim()) {
    msgField.value = 'I am interested in the following products: ' + productList + '. Please send me quotation, specifications and shipping details.';
  }

  // Close the quote sidebar
  closeQuote();

  // Scroll to the inquiry form
  var inquirySection = document.getElementById('inquiry');
  if (inquirySection) {
    inquirySection.scrollIntoView({behavior:'smooth',block:'start'});
  }

  // Highlight the form to draw attention
  var formWrap = document.querySelector('.inquiry-form-wrap');
  if (formWrap) {
    formWrap.style.transition = 'box-shadow 0.4s';
    formWrap.style.boxShadow = '0 0 0 3px #ff7a00';
    setTimeout(function(){ formWrap.style.boxShadow = ''; }, 2500);
  }
});

// ===== SCROLL TO PRODUCT SECTION =====
window.scrollToProduct = function(id){
  closeQuote();
  var el = document.getElementById(id);
  if (!el) return;

  // 1) Activate the matching category tab FIRST so the target
  //    element becomes visible (otherwise scrollIntoView does nothing
  //    and the click appears to have no effect).
  var section = document.querySelector('.categories');
  if (section) {
    var tabMap = {'featured-brick':'brick','featured-wood':'wood','featured-metal':'metal'};
    var cat = tabMap[id];
    if (cat) {
      section.querySelectorAll('.cat-tab').forEach(function(t){ t.classList.toggle('active', t.getAttribute('data-cat')===cat); });
      section.querySelectorAll('.cat-content').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-cat-content')===cat); });
    }
  }

  // 2) Now scroll to the (now visible) element on the next frame.
  requestAnimationFrame(function(){
    el.scrollIntoView({behavior:'smooth',block:'start'});
  });
};

// ===== INQUIRY FORM =====
var inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit',function(e){
    e.preventDefault();
    var whatsapp = this.querySelector('[name="whatsapp"]');
    if (whatsapp && !whatsapp.value.trim()) {
      whatsapp.style.borderColor = '#ff7a00';
      whatsapp.focus();
      return;
    }
    var btn = this.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    var formData = new FormData(this);
    var data = {};
    formData.forEach(function(v,k){ data[k] = v; });

    // Fetch client IP and geo info before submitting
    fetch('https://ipapi.co/json/')
      .then(function(r){ return r.json(); })
      .then(function(geo){
        if (geo && geo.ip) {
          data['Client IP'] = geo.ip;
          data['Country'] = (geo.country_name || '') + ' (' + (geo.country_code || '') + ')';
          data['City'] = geo.city || '';
          data['Region'] = geo.region || '';
          data['ISP'] = geo.org || '';
        }
      })
      .catch(function(){ /* IP fetch failed, continue without it */ })
      .finally(function(){
        // Always add browser info
        data['Browser'] = navigator.userAgent;
        data['Language'] = navigator.language;
        data['Page URL'] = window.location.href;
        data['Referrer'] = document.referrer || 'Direct visit';
        data['Submitted At'] = new Date().toISOString();

        fetch('https://formsubmit.co/ajax/sales@aukenmachinery.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(function(res){ return res.json(); })
        .then(function(res){
          inquiryForm.style.display = 'none';
          var success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
        })
        .catch(function(err){
          btn.textContent = originalText;
          btn.disabled = false;
          alert('Submission failed. Please try again or contact us via WhatsApp.');
        });
      });
  });
}

// ===== SCROLL ANIMATIONS =====
function handleReveal(){
  var reveals = document.querySelectorAll('.reveal:not(.visible)');
  reveals.forEach(function(el){
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll',handleReveal);
window.addEventListener('load',handleReveal);

// ===== STICKY HEADER =====
var header = document.getElementById('header');
var lastScroll = 0;

window.addEventListener('scroll',function(){
  var scrollY = window.scrollY;
  if (scrollY > 80) {
    if (header) header.classList.add('scrolled');
  } else {
    if (header) header.classList.remove('scrolled');
  }
  lastScroll = scrollY;

  // Back to top
  var btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('show', scrollY > 500);

  // Nav active state
  updateNavActive(scrollY);
});

// ===== NAV ACTIVE STATE =====
function updateNavActive(scrollY){
  var sections = ['hero','solutions','products','about','overseas','inquiry'];
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  var currentSection = '';

  sections.forEach(function(id){
    var el = document.getElementById(id) || document.querySelector('.' + id);
    if (!el) return;
    if (el.classList.contains(id)) {
      el = document.getElementById(id);
    }
    if (!el) return;
    var top = el.offsetTop - 120;
    var bottom = top + el.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      currentSection = id;
    }
  });

  navLinks.forEach(function(link){
    var href = link.getAttribute('href');
    if (href) {
      link.classList.toggle('active', href === '#' + currentSection);
    }
  });
}

// ===== BACK TO TOP =====
var backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click',function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

// ===== MOBILE MENU =====
var menuToggle = document.getElementById('menuToggle');
var nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click',function(){
    this.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close mobile menu on link click
  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click',function(){
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
      }
    });
  });
}

// ===== COOKIE CONSENT =====
var cookieBar = document.getElementById('cookieBar');
var cookieAccept = document.getElementById('cookieAccept');
if (cookieBar && cookieAccept) {
  if (!localStorage.getItem('auken_cookie')) {
    setTimeout(function(){ cookieBar.classList.add('show'); }, 1000);
  }
  cookieAccept.addEventListener('click',function(){
    localStorage.setItem('auken_cookie','1');
    cookieBar.classList.remove('show');
  });
  var cookieSettings = document.getElementById('cookieSettings');
  if (cookieSettings) {
    cookieSettings.addEventListener('click',function(){
      localStorage.setItem('auken_cookie','1');
      cookieBar.classList.remove('show');
    });
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',function(){
  handleReveal();
  updateFormPlaceholders(translations.en);
});

})();
