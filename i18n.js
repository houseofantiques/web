/* =========================
   i18n.js — AR / EN ONLY (FULL for index + footer)
   - Works with old keys (brandAr, navAbout...) AND new keys (brand.name...)
   - Binds [data-lang="ar|en"] buttons
   - Applies [data-i18n="key"] textContent
   - Saves language in localStorage
========================= */

(function () {
  "use strict";

  const SUPPORTED = ["ar", "en"];
  const DEFAULT_LANG = "ar";
  const STORAGE_KEY = "hoa_lang";

  const DICT = {
    ar: {
      /* ====== Brand (old + new) ====== */
      brandAr: "بيت التحفيات",
      brandEn: "House of Antiques",
      "brand.name": "بيت التحفيات",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
      navAbout: "نبذة",
      navExplore: "استكشف",
      navStats: "الأرقام",
      navTimeline: "الخط الزمني",
      navTour: "جولة افتراضية",
      navContact: "تواصل معنا",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "بيت التحفيات",
      heroTitleBig2: "ذاكرة بغداد",
      heroLead:
        "بيت بغدادي يجمع التحف النادرة والسجاد والنحاس والخشب والكريستال والأعمال الفنية… بتجربة متحفية فاخرة.",
      ctaExplore: "استكشف الأقسام",
      ctaMore: "اقرأ أكثر",

      heroInfo1K: "ساعات الزيارة",
      heroInfo1V: "حسب الحجز",
      heroInfo2K: "الموقع",
      heroInfo2V: "بغداد",
      heroInfo3K: "جولة 360",
      heroInfo3V: "داخل الموقع",

      /* ====== Entrances ====== */
      entrancesTitle: "بوابات بيت التحفيات",
      entrancesDesc: "اختر طريقك إلى الذاكرة… ولكل باب حكاية.",

      ex1K: "نبذة",
      ex1T: "نبذة عن بيت التحفيات",
      ex1P: "قصة بيت بغدادي جمع التحف النادرة… من ذاكرة العائلة إلى وجهة ثقافية اليوم.",
      ex1M1: "قصة • إرث",
      ex1M2: "قراءة 3 دقائق",
      moreAbout: "المزيد",

      ex2K: "المتجر",
      ex2T: "تسوّق التحف",
      ex2P: "قطع نادرة مختارة بعناية… اكتشف السجاد والنحاس والخشب والكريستال وغيرها.",
      ex2M1: "قطع نادرة",
      ex2M2: "تحديثات مستمرة",
      goStore: "ادخل المتجر",

      ex3K: "الحجز",
      ex3T: "احجزي زيارتك",
      ex3P: "زيارة متحفية • تصوير • فعالية خاصة… احجزي بسهولة واختر وقتك.",
      ex3M1: "زيارة • تصوير",
      ex3M2: "حجز سريع",
      goBooking: "اذهب للحجز",

      ex4K: "صحافة",
      ex4T: "تغطيات وأخبار",
      ex4P: "مقالات • فيديو • أرشيف… تابع كل ما كُتب وقيل عن بيت التحفيات.",
      ex4M1: "مقالات",
      ex4M2: "فيديو",
      goPress: "ادخل",

      ex5K: "المزاد",
      ex5T: "المزاد القادم",
      ex5P: "قطع مختارة بعناية تُعرض قبل المزاد… تفاصيل الحضور والحجز قريباً.",
      ex5M1: "عرض مسبق",
      ex5M2: "حجز • تفاصيل",
      goAuction: "تفاصيل المزاد",

      ex6K: "جولة 360",
      ex6T: "جولة افتراضية داخل البيت",
      ex6P: "استكشف المكان قبل الزيارة… جولة تفاعلية داخل بيت التحفيات.",
      ex6M1: "Matterport",
      ex6M2: "داخل الصفحة",
      goTour: "ابدأ الجولة",

      /* ====== About + Stats ====== */
      aboutTitle: "بيت غنيّ بالتفاصيل",
      aboutDesc: "من متجر أنتيك إلى وجهة متحفية وثقافية…",
      s1: "عمر البيت (سنة)",
      s2: "عدد الغرف",
      s3: "عدد التحف التقريبي",
      s4: "عدد الزوار التقريبي منذ الثمانينات",
      c1t: "قرن من العمارة البغدادية",
      c1p: "شُيّد بيت التحفيات عام 1920، ويضم 14 غرفة تحيط بحوش بغدادي وحديقة داخلية، محافظًا على طراز العمارة البغدادية الأصيلة بتفاصيلها، ومساحاتها الواسعة، وتوزيعها التقليدي الذي يجعل من البيت نفسه قطعة تراثية حيّة.",
      c2t: "مقتنيات من حول العالم",
      c2p: "أكثر من 12,000 قطعة أنتيك تضم مجموعات بيت التحفيات آلاف القطع النادرة من السجاد، والنحاس، والفضة، والخشب، والكريستال، والأعمال الفنية، جُمعت بعناية على مدى عقود من العراق، والشرق الأوسط، وأوروبا، وآسيا، باقتناء مباشر قائم على المعرفة والتوثيق لا على الصدفة.",
      c3t: "محطة للثقافة والزائرين",
      c3p: "وجهة معروفة منذ الثمانينات استقبل بيت التحفيات منذ ثمانينات القرن الماضي عشرات الآلاف من الزوّار من دبلوماسيين، وسفراء، وباحثين، وسياح من مختلف دول العالم، ليكون محطة ثقافية معروفة لكل من يهتم بالتاريخ، والفن، والاقتناء الأصيل",

      /* ====== Footer (new keys) ====== */
      "footer.cta.title": "جاهز تستكشف بيت التحفيات؟",
      "footer.cta.sub": "احجز زيارتك أو شاهد الجولة الافتراضية",
      "footer.cta.book": "احجز الآن",
      "footer.cta.tour": "الجولة الافتراضية",
      "footer.note":
        "منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.",
      "footer.quick": "روابط سريعة",
      "footer.about": "نبذة",
      "footer.press": "الصحافة",
      "footer.store": "المتجر",
      "footer.auction": "المزاد",
      "footer.legal": "القانون والسياسات",
      "footer.terms": "الأحكام",
      "footer.privacy": "الخصوصية",
      "footer.contact": "تواصل",
      "footer.addr": "بغداد — شارع أبو نؤاس",
"footer.copy": "© 2026 بيت التحفيات — جميع الحقوق محفوظة",

/* =========================
   ABOUT PAGE (AR) — ADD
========================= */
"nav.home": "الرئيسية",

"about.title": "بيت التحفيات — ذاكرة بغداد",
"about.mapCta": "موقع البيت على الخريطة",

"about.kicker": "نبذة",
"about.subtitle": "حكاية بيت… وحكاية عائلة",

"about.meta1.label": "المكان",
"about.meta1.value": "بغداد — أبو نؤاس",
"about.meta2.label": "التأسيس",
"about.meta2.value": "1989",
"about.meta3.label": "الطراز",
"about.meta3.value": "بيت بغدادي (1920)",

"about.body1": "بيت التحفيات ليس مجرد مكان لعرض القطع، بل ذاكرة حيّة لبغداد…",

"about.table.key1": "المحتوى",
"about.table.val1": "تحف، سجاد، نحاس، فضة، كريستال، أعمال فنية",
"about.table.key2": "الهوية",
"about.table.val2": "متحف + متجر + قصة عائلة",
"about.table.key3": "الرؤية",
"about.table.val3": "إحياء التراث وإعادة تقديمه بمعايير معاصرة",

"about.chip1": "قصة عائلة",
"about.chip2": "متحف حي",
"about.chip3": "تراث بغداد",

"ui.more": "اكمل القصة",
"ui.less": "إخفاء",

"cta.tour": "الجولة الافتراضية",
"cta.press": "الصحافة",

/* ===== STAGE 0: HOUSE ===== */
"house.kicker": "البيت",
"house.title": "بيت التحفيات",
"house.sub": "بيت بغدادي — 1920",
"house.body": `بيت التحفيات هو دار بغدادية تراثية يعود تاريخ بنائها إلى عام 1920، شُيّدت وفق أسلوب العمارة البغدادية التقليدية الذي كان سائدًا في أوائل القرن العشرين، والمعتمد على الفناء الداخلي (الحوش)، والغرف المحيطة به، واستخدام المواد المحلية مثل الطابوق الفرشي، والخشب الطبيعي، والزخارف اليدوية البسيطة التي تجمع بين الوظيفة والجمال.

في عام 1989، قام طارق الألماني بشراء هذا البيت التراثي، ليحوّله من مسكن قديم إلى مشروع ثقافي متكامل، حيث أُعيد تأهيله بعناية ليصبح متحفًا ومحلًا متخصصًا بالتحف (أنتيك)، محافظًا في الوقت نفسه على هوية المبنى الأصلية دون تشويه أو تغيير جوهري في معالمه المعمارية.

يمتد بيت التحفيات على مساحة واسعة تضم 14 غرفة موزعة حول حوش بغدادي داخلي وحديقة، وهو توزيع يعكس النمط السكني التقليدي لبيوت بغداد القديمة، حيث كانت الخصوصية، والتهوية الطبيعية، والإنارة، عناصر أساسية في التصميم. وتتميّز الغرف بارتفاع أسقفها، وتنوّع استخداماتها، مما أتاح تحويلها لاحقًا إلى مساحات عرض مختلفة للقطع الفنية والتحف.

يحتوي البيت على مجموعات متنوعة من التحف تشمل السجاد، النحاسيات، الفضة، الأعمال الخشبية، الكريستال، والقطع الفنية النادرة، جرى عرضها بما يتناسب مع طبيعة المكان، بحيث يكون البيت نفسه جزءًا من تجربة العرض، لا مجرد حاوية للقطع.

بيت التحفيات ليس مبنى حديثًا أُعد للعرض، بل بيت تاريخي أُعيد توظيفه ثقافيًا، ليشكّل نموذجًا حيًا لدمج العمارة التراثية مع وظيفة المتحف والمتجر، محافظًا على ذاكرة المكان، ومقدّمًا نموذجًا أصيلًا لبيوت بغداد في القرن الماضي.`,

"house.m1k": "الموقع",
"house.m1v": "شارع أبو نؤاس",
"house.m2k": "محطة",
"house.m2v": "1989 — افتتاح البيت",

/* ===== STAGE 1: GRANDFATHER ===== */
"grand.kicker": "المؤسس",
"grand.title": "محمد علي طاهر الجزراوي الملقب بالألماني",
"grand.sub": "1896 — 1988",
"grand.body": `محمد علي طاهر الجزراوي، المعروف بلقب الألماني، يُعد من أبرز تجّار التحف في العراق في القرن العشرين، وقد ارتبط اسمه بعالم التراث والاقتناء المعرفي ارتباطًا وثيقًا، حتى أصبح مرجعًا في هذا المجال.

وُلد عام 1896 في جزيرة ابن عمر (جزيرة بوطان) التابعة حاليًا لتركيا، ونشأ في بيئة علمية، حيث تلقّى تعليمه في كردستان، وختم القرآن الكريم، وتعلّم على أيدي عدد من علماء الدين المعروفين في زمانه. ومنذ شبابه، عُرف بحبّه للعلم والمعرفة، فتنقّل بين القرى والأرياف باحثًا عن التعلم واكتساب الخبرة، قبل أن يشدّ الرحال إلى بغداد، حيث استقر في جامع الإمام أبي حنيفة النعمان، وكان طالبًا مجتهدًا ومثابرًا.

امتلك الجد محمد علي طاهر معرفة واسعة بعدة لغات، إذ أتقن اللغة التركية، والفارسية، والإنكليزية، إلى جانب العربية والكردية بلهجاتها، وهو ما ساعده على الاطلاع على ثقافات متعددة، وفهم أعمق للتاريخ والآثار، ومكّنه من التواصل مع تجّار ومقتنين من خلفيات مختلفة.

بدأ شغفه الحقيقي بعالم التحف من جمع السجاد والتحف القديمة، ثم تطوّر هذا الشغف إلى تجارة حقيقية اتخذها مهنة ومصدر رزق، دون أن يفقد بعدها المعرفي. لم يكن جمعه للتحف بدافع التجارة فقط، بل كان قائمًا على المعرفة، والتوثيق، وحفظ القيمة التاريخية، ولذلك عُدّ من أوائل روّاد هذا المجال في العراق.

امتلك ذاكرة استثنائية، وقدرة دقيقة على تمييز القطع، ومعرفة أعمارها، ومناشئها، وتاريخ تداولها، حتى أنه كان يعرف من اقتنى القطعة ومن باعها وفي أي فترة، وهي قدرة نادرة جعلته محل ثقة واحترام واسعَين. وكان معروفًا بتواضعه، وبشغفه الدائم بالحديث عن التحف، وتفاصيلها، وقصصها، دون كلل أو ملل، حتى في أواخر أيامه.

إلى جانب ذلك، كان ملمًّا بعدد كبير من الصناعات والحرف اليدوية الشعبية، ويدرك قيمتها المادية والتاريخية، ويرى فيها جزءًا أساسيًا من هوية المجتمع وذاكرته. وقد انعكس هذا الوعي في طريقته في الاقتناء، حيث لم يكن ينظر إلى القطعة كغرض، بل كوثيقة حيّة.

وكان من أحلامه أن تتحوّل التحف إلى واجهة ثقافية وسياحية، تحفظ التراث وتعرّف به، وقد عبّر عن ذلك بقوله إنه لو امتلك الإمكانيات، لأسّس دارًا واسعة تكون واجهة سياحية مهمّة تليق بقيمة هذا الإرث.

اليوم، يُعد محمد علي طاهر الجزراوي (الألماني) أحد الأسماء المؤسسة في تاريخ تجارة التحف في العراق، ورمزًا للمعرفة المرتبطة بالتراث، وقد شكّل إرثه الأساس الذي بُني عليه ما أصبح لاحقًا بيت التحفيات، استمرارًا لحلمٍ بدأه بعلم، وكرّسه بشغف، وتركه أمانةً للأجيال من بعده.`,

"grand.m1k": "محطة",
"grand.m1v": "محلات خان البغدادي",
"grand.m2k": "الأمنية",
"grand.m2v": "“لو كنت صاحب ثروة…”",

/* ===== STAGE 2: FATHER ===== */
"father.kicker": "الامتداد العملي لإرث التحف",
"father.title": "طارق محمد علي الألماني",
"father.sub": "1954 — 2014",
"father.body": `نشأ طارق الألماني في بيئة ارتبطت بالتحف منذ طفولته المبكرة، حيث كان ملازمًا لوالده، التاجر والباحث في عالم التراث محمد علي طاهر الجزراوي (الألماني). لم تكن التحف بالنسبة له عالمًا طارئًا أو هواية لاحقة، بل جزءًا من الحياة اليومية، تعلّم تفاصيله من الممارسة المباشرة لا من الكتب وحدها.

منذ سنواته الأولى، رافق والده في الأسواق، والمنازل القديمة، ومجالس التجّار، وتعرّف عن قرب على أساليب اقتناء القطع، وطرق تمييزها، وقيمتها التاريخية، وأصول صناعتها. هذا الاحتكاك المبكر كوّن لديه خبرة تراكمية، جعلته يفهم عالم الأنتيك كمنظومة متكاملة تشمل المعرفة، والذوق، والمسؤولية تجاه التراث.

قبل امتلاكه بيت التحفيات، كان لطارق الألماني محلات متخصصة بالأنتيك في منطقة الميدان، إحدى أبرز مناطق بغداد التجارية والتراثية، حيث مارس العمل بشكل مستقل، وبنى سمعة معروفة بين التجّار والمهتمين. وقد عُرف بلقب الألماني استمرارًا للقب والده، ليصبح الاسم علامة مرتبطة بالثقة والمعرفة في مجال التحف.

تعلّم طارق الألماني على يد والده أسس التعامل مع القطع النادرة، وأهمية حفظها، وعدم التفريط بقيمتها التاريخية مقابل الربح السريع. كما تعرّف على تنوّع المدارس الفنية، والحرف اليدوية، والمواد المستخدمة في السجاد، والنحاس، والفضة، والخشب، والكريستال، وغيرها من الأصناف التي شكّلت لاحقًا نواة مجموعاته الخاصة.

مع تقدّمه في العمر، لم يكتفِ بدور المرافق أو التلميذ، بل بدأ بممارسة التقييم والاقتناء بنفسه، مستفيدًا من إرث معرفي متين وتجربة عملية طويلة. وبمرور الوقت، تشكّلت لديه شخصية مستقلة في عالم التحف، تجمع بين احترام الأصل والقدرة على التوسّع المدروس.

في عام 1989، شكّل شراءه للبيت التراثي وتحويله إلى بيت التحفيات نقطة تحوّل مفصلية في مسيرته، حيث انتقل من المحلات التجارية إلى مشروع ثقافي ومعرفي واضح المعالم، يجمع بين المتحف والمتجر، ويضع التحف في سياق معماري يليق بقيمتها التاريخية. وقد حافظ في هذا المشروع على روح البيت البغدادي، وعلى فلسفة والده في الجمع بين المعرفة والحفظ، دون الإخلال بهوية المكان.

استمر بيت التحفيات في عهد طارق الألماني كمركز معروف لاقتناء وعرض التحف حتى عام 2004، حين توقّف العمل به نتيجة الظروف التي مرّ بها العراق آنذاك.

تمثّل تجربة طارق الألماني حلقة الوصل بين الجيل المؤسّس والجيل اللاحق، إذ لم يكن مجرد وريث لمجموعة تحف، بل حاملًا لاسمٍ وتجربةٍ ومعرفةٍ متراكمة، أسهمت في ترسيخ مكانة بيت التحفيات كعنوان معروف في عالم الأنتيك في بغداد.`,

"father.m1k": "محطة",
"father.m1v": "1989 — شراء البيت",
"father.m2k": "عصر",
"father.m2v": "1989–2004 — ازدهار البيت",

/* ===== STAGE 3: AZAD ===== */
"azad.kicker": "الجيل الثالث",
"azad.title": "أزاد طارق محمد علي الألماني",
"azad.sub": "إحياء البيت — 2022",
"azad.body": `يُمثّل أزاد طارق الألماني الجيل الثالث في مسيرة عائلة الألماني في عالم التحف، وهو الامتداد الذي أعاد وصل الماضي بالحاضر بعد مرحلة انقطاع طويلة فرضتها الظروف.

وُلد أزاد عام 1987، وهو نفس العام الذي تحوّل فيه البيت التراثي إلى بيت التحفيات، ما جعل طفولته وذكرياته الأولى مرتبطة بالمكان بشكل مباشر. قضى سنواته الأولى داخل البيت، مرافقًا لوالده طارق الألماني، ومتعرّفًا منذ الصغر على القطع، والغرف، والحوش البغدادي، وطريقة عرض التحف، وهو ما شكّل وعيه المبكر بقيمة المكان قبل أن يدرك أبعاده الثقافية.

في عام 2004، أُغلق بيت التحفيات نتيجة الحرب والظروف الأمنية التي مرّ بها العراق، وتوقّف المشروع رغم مكانته المعروفة آنذاك. وبعد سنوات، وتحديدًا مع وفاة والده في عام 2014، أصبحت مسؤولية الإرث معلّقة بين الذاكرة والواقع، في وقت كان أزاد يعيش خارج العراق.

تنقّل أزاد بين الولايات المتحدة ومصر، حيث عمل كـمنتج في مصر، ورجل أعمال في كل من أمريكا ومصر، مكتسبًا خبرة عملية في الإدارة، والإنتاج، وبناء المشاريع، بعيدًا عن عالم التحف بشكل مباشر، لكن دون أن ينقطع عن جذوره الثقافية.

لاحقًا، عاد أزاد إلى بغداد بدافع إعادة إحياء بيت التحفيات، لا كمشروع جديد، بل كمكان له تاريخ وهوية. عمل على ترميم البيت مع الحفاظ الكامل على شكله المعماري الأصلي، واحترام تفاصيله البغدادية، وفي الوقت نفسه أضاف لمسة معاصرة مدروسة في أسلوب العرض والتنظيم، بما ينسجم مع متطلبات الحاضر دون المساس بروح المكان.

لم تقتصر جهوده على الترميم فقط، بل استمر في اقتناء وشراء القطع النادرة، وتوسيع المجموعة بما يحافظ على مستوى البيت وقيمته التاريخية، مستندًا إلى الإرث المعرفي الذي نشأ عليه، وإلى خبرته العملية في إدارة المشاريع.

يمثّل أزاد طارق الألماني مرحلة التحوّل من الحفظ إلى الإحياء، حيث لم يكن هدفه إعادة فتح المكان فحسب، بل إعادة تعريف بيت التحفيات كمساحة ثقافية حيّة، تستند إلى تاريخ يمتد لثلاثة أجيال، وتخاطب الحاضر بلغة معاصرة، دون أن تنفصل عن جذورها.`,

"azad.m1k": "",
"azad.m1v": "",
"azad.m2k": "",
"azad.m2v": "2022 — ترميم وإعادة فتح",

"today.kicker": "اليوم",
"today.title": "البيت اليوم",
"today.body": "اليوم، بيت التحفيات لم يعد مجرد ذاكرة محفوظة، بل مساحة حيّة تستقبل الزائر، تحكي قصة بغداد عبر التحف، وتفتح أبوابها لجيل جديد يرى في التراث مستقبلًا، لا ماضيًا فقط.",
"today.cta.tour": "الجولة الافتراضية لبيت التحفيات",
"today.cta.press": "الصحافة والتغطيات",

"today.slider.prev": "السابق",
"today.slider.next": "التالي",
"today.slider.open": "فتح الصورة",
"today.slider.alt": "صورة من بيت التحفيات",
"today.slider.dots": "مؤشر الصور",

"today.lightbox.close": "إغلاق",
"today.lightbox.alt": "صورة مكبرة",

/* ====== Auction page ====== */
"auction.label1": "المزاد",
"auction.label2": "النص",

"auction.big": "مزاد الطارق — قريبًا",
"auction.mid": "تجربة مزايدة حصرية على قطع نادرة تحمل ذاكرة بغداد",
"auction.btn": "منصة المزاد",

"auction.s1": "أعمال نادرة · قطع أصلية · اختيار دقيق",
"auction.s2": "تحف · لوحات · مقتنيات تاريخية",
"auction.s3": "ومزايدة مباشرة في بث حي",
"auction.s4": "قطع مختارة بعناية",
"auction.phone": "+964 777 704 5599",
"auction.addr": "بغداد - شارع أبو نؤاس",

/* ===== Press page ===== */
"press.brandAria": "العودة للرئيسية",
"press.navAria": "التنقل الرئيسي",
"press.heroAria": "مقدمة الصحافة",
"press.controlsAria": "أدوات التصفية",
"press.yearFilterAria": "تصفية حسب السنة",
"press.archiveAria": "أرشيف الصحافة",
"press.brochuresAria": "أرشيف البروشورات المطبوعة",
"press.lbAria": "عرض مادة صحفية",

"press.brandT1": "بيت التحفيات",
"press.brandT2": "House of Antiques",

"nav.home": "الرئيسية",
"nav.about": "نبذة",
"nav.press": "الصحافة",
"nav.tour": "الجولة",
"nav.contact": "تواصل",

"press.heroTitle": "الصحافة",
"press.heroSub": "قصاصات كتبت ذاكرة بيت التحفيات",
"press.badge": "أرشيف موثق",
"press.desc": "هنا نعرض ما نُشر عن بيت التحفيات في الصحف والمجلات عبر السنين: عناوين، تواريخ، وصور مواد أصلية.",
"press.searchPh": "ابحث باسم الجريدة… عنوان… سنة…",
"press.hintK": "نصيحة",
"press.hint": "اضغط على أي مادة لعرضها بحجم كامل.",
"press.yearTitle": "السنة",

"press.materialsTitle": "المواد",
"press.materialsSub": "شبكة عرض متحفية — فهرسة + بحث سريع",

"press.printedArchive": "أرشيف مطبوع",
"press.brochuresTitle": "بروشورات بيت التحفيات",
"press.brochuresSpan": "الثمانينات — التسعينات — 2001",
"press.brochuresDesc": "يضم أرشيف بيت التحفيات ثلاث بروشورات مطبوعة فقط، تم إصدارها في فترات زمنية مختلفة: الأولى في الثمانينات، الثانية في التسعينات، والثالثة في عام 2001. هذه المطبوعات لم تكن دعائية فقط، بل وثائق تعريفية رافقت تطوّر هوية بيت التحفيات عبر العقود.",

"press.b1.year": "الثمانينات",
"press.b1.title": "بروشور بيت التحفيات — الإصدار الأول",
"press.b1.body": "وثيقة تعريفية مبكرة تسبق مرحلة الانتشار الواسع للمطبوعات الثقافية، وتُظهر كيف كان بيت التحفيات يقدّم نفسه كوجهة مختلفة داخل بغداد.",
"press.b1.alt": "بروشور بيت التحفيات — الثمانينات",

"press.b2.year": "التسعينات",
"press.b2.title": "بروشور بيت التحفيات",
"press.b2.body": "أحد البروشورات الأصلية التي طُبعت للتعريف ببيت التحفيات، عندما كان التوثيق الورقي هو الوسيلة الأهم لحفظ هوية المكان.",
"press.b2.alt": "بروشور بيت التحفيات — التسعينات",

"press.b3.year": "2001",
"press.b3.title": "بروشور بيت التحفيات — إصدار 2001",
"press.b3.body": "إصدار يوثّق مرحلة أكثر نضجًا في تقديم بيت التحفيات، ويعكس تطور لغة العرض والاهتمام بتفاصيل الهوية البغدادية.",
"press.b3.alt": "بروشور بيت التحفيات — 2001",

"press.footT1": "بيت التحفيات — أرشيف الصحافة",
"press.footT2": "إذا عندك نسخة نادرة أو قصاصة تخص البيت، راسلنا لإضافتها للأرشيف.",

"press.lbClose": "إغلاق",
"press.lbImgAlt": "مادة صحفية",
"press.lbDetails": "تفاصيل"

    },

    en: {
      /* ====== Brand (old + new) ====== */
      brandAr: "House of Antiques",
      brandEn: "House of Antiques",
      "brand.name": "House of Antiques",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
      navAbout: "About",
      navExplore: "Explore",
      navStats: "Stats",
      navTimeline: "Timeline",
      navTour: "Virtual Tour",
      navContact: "Contact",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "House of Antiques",
      heroTitleBig2: "Baghdad’s Memory",
      heroLead:
        "A Baghdadi house that gathers rare antiques, rugs, brass, wood, crystal, and artworks… in a refined museum-like experience.",
      ctaExplore: "Explore Sections",
      ctaMore: "Read More",

      heroInfo1K: "Visiting Hours",
      heroInfo1V: "By booking",
      heroInfo2K: "Location",
      heroInfo2V: "Baghdad",
      heroInfo3K: "360 Tour",
      heroInfo3V: "On-site",

      /* ====== Entrances ====== */
      entrancesTitle: "House of Antiques Gates",
      entrancesDesc: "Choose your path into memory… every gate has a story.",

      ex1K: "About",
      ex1T: "About the House",
      ex1P: "A Baghdadi house that gathered rare pieces… from family memory to a cultural destination today.",
      ex1M1: "Story • Heritage",
      ex1M2: "3 min read",
      moreAbout: "More",

      ex2K: "Store",
      ex2T: "Shop Antiques",
      ex2P: "Curated rare pieces… discover rugs, brass, wood, crystal, and more.",
      ex2M1: "Rare items",
      ex2M2: "Ongoing updates",
      goStore: "Enter Store",

      ex3K: "Booking",
      ex3T: "Book Your Visit",
      ex3P: "Museum visit • Photoshoot • Private event… book easily and pick your time.",
      ex3M1: "Visit • Photoshoot",
      ex3M2: "Fast booking",
      goBooking: "Go to Booking",

      ex4K: "Press",
      ex4T: "Coverage & News",
      ex4P: "Articles • Video • Archive… follow what’s been written and said about the House.",
      ex4M1: "Articles",
      ex4M2: "Video",
      goPress: "Enter",

      ex5K: "Auction",
      ex5T: "Upcoming Auction",
      ex5P: "Carefully selected items shown before the auction… attendance & booking details soon.",
      ex5M1: "Preview",
      ex5M2: "Booking • Details",
      goAuction: "Auction Details",

      ex6K: "360 Tour",
      ex6T: "Virtual Tour Inside",
      ex6P: "Explore before you visit… an interactive tour inside the House.",
      ex6M1: "Matterport",
      ex6M2: "In-page",
      goTour: "Start Tour",

      /* ====== About + Stats ====== */
      aboutTitle: "A House Rich in Detail",
      aboutDesc: "From an antique store to a museum & cultural destination…",
      s1: "House age (years)",
      s2: "Rooms",
      s3: "Approximate number of antiques",
s4: "Approximate number of visitors since the 1980s",

c1t: "A Century of Baghdadi Architecture",
c1p: "House of Antiques was built in 1920 and consists of 14 rooms surrounding a traditional Baghdadi courtyard and an inner garden. The house preserves the authentic Baghdadi architectural style with its rich details, spacious layout, and traditional distribution, making the building itself a living heritage piece.",

c2t: "Collections from Around the World",
c2p: "More than 12,000 antique pieces form the collections of House of Antiques, including thousands of rare carpets, copper, silver, wood, crystal, and artworks. These items were carefully collected over decades from Iraq, the Middle East, Europe, and Asia through direct acquisition based on knowledge and documentation rather than chance.",

c3t: "A Cultural Destination for Visitors",
c3p: "A well-known destination since the 1980s, House of Antiques has welcomed tens of thousands of visitors, including diplomats, ambassadors, researchers, and tourists from around the world, establishing itself as a recognized cultural stop for those interested in history, art, and authentic collecting.",

      /* ====== Footer ====== */
      "footer.cta.title": "Ready to explore the House of Antiques?",
      "footer.cta.sub": "Book your visit or view the virtual tour",
      "footer.cta.book": "Book Now",
      "footer.cta.tour": "Virtual Tour",
      "footer.note":
        "A cultural platform documenting the story of the house, the family, and the antiques—plus visits and events.",
      "footer.quick": "Quick Links",
      "footer.about": "About",
      "footer.press": "Press",
      "footer.store": "Store",
      "footer.auction": "Auction",
      "footer.legal": "Legal & Policies",
      "footer.terms": "Terms",
      "footer.privacy": "Privacy",
      "footer.contact": "Contact",
      "footer.addr": "Baghdad — Abu Nuwas St.",
      "footer.copy": "© 2026 House of Antiques — All rights reserved",



      /* =========================
   ABOUT PAGE (EN) — ADD
========================= */
"nav.home": "Home",

"about.title": "House of Antiques — Baghdad’s Memory",
"about.mapCta": "View the House on the Map",

"about.kicker": "About",
"about.subtitle": "A House Story… and a Family Story",

"about.meta1.label": "Location",
"about.meta1.value": "Baghdad — Abu Nuwas",
"about.meta2.label": "Founded",
"about.meta2.value": "1989",
"about.meta3.label": "Style",
"about.meta3.value": "Baghdadi House (1920)",

"about.body1": "The House of Antiques is not merely a place to display pieces—it's a living memory of Baghdad…",

"about.table.key1": "Collections",
"about.table.val1": "Antiques, rugs, brass, silver, crystal, artworks",
"about.table.key2": "Identity",
"about.table.val2": "Museum + Store + A Family Story",
"about.table.key3": "Vision",
"about.table.val3": "Reviving heritage and presenting it with contemporary standards",

"about.chip1": "A family story",
"about.chip2": "A living museum",
"about.chip3": "Baghdad heritage",

"ui.more": "Continue the story",
"ui.less": "Show less",

"cta.tour": "Virtual Tour",
"cta.press": "Press",

/* ===== STAGE 0: HOUSE ===== */
"house.kicker": "The House",
"house.title": "House of Antiques",
"house.sub": "Baghdadi House — 1920",
"house.body": `The House of Antiques is a heritage Baghdadi residence whose construction dates back to 1920. It was built in the traditional Baghdadi architectural style common in the early twentieth century—centered around an inner courtyard, surrounded rooms, and the use of local materials such as baked brick, natural wood, and modest hand-crafted ornamentation that blends function with beauty.

In 1989, Tariq Al-Almani purchased this heritage house and transformed it from an old residence into a complete cultural project. The house was carefully restored to become a museum and a specialized antiques store—while preserving the building’s original identity without distortion or major alteration to its architectural features.

The House spans a generous area that includes 14 rooms arranged around an inner Baghdadi courtyard and a garden—reflecting the classic residential pattern of old Baghdad homes, where privacy, natural ventilation, and daylight were essential design principles. The rooms are characterized by high ceilings and varied uses, which later allowed them to be repurposed into distinct exhibition spaces for artworks and antiques.

The house contains diverse collections, including rugs, brassware, silver, wooden works, crystal, and rare artistic pieces—displayed in harmony with the nature of the place, so that the house itself becomes part of the viewing experience rather than merely a container for objects.

This is not a modern building prepared for display; it is a historical home that has been culturally repurposed—offering a living model of how heritage architecture can merge with the function of a museum and a store, preserving the memory of place and presenting an authentic example of Baghdad’s homes from the last century.`,

"house.m1k": "Location",
"house.m1v": "Abu Nuwas Street",
"house.m2k": "Milestone",
"house.m2v": "1989 — Opening",

/* ===== STAGE 1: GRANDFATHER ===== */
"grand.kicker": "Founder",
"grand.title": "Mohammed Ali Taher Al-Jazrawi (Al-Almani)",
"grand.sub": "1896 — 1988",
"grand.body": `Mohammed Ali Taher Al-Jazrawi, known by the nickname “Al-Almani,” is regarded as one of Iraq’s most prominent antiques dealers in the twentieth century. His name became closely linked to heritage and knowledge-based collecting, until he became a trusted reference in this field.

He was born in 1896 in Jazirat Ibn Umar (Botan Island), now within Turkey. He grew up in an academic environment, studied in Kurdistan, memorized the Qur’an, and learned under well-known religious scholars of his time. From his youth, he was recognized for his love of knowledge, traveling between villages and rural areas to learn and gain experience before heading to Baghdad. There, he settled near the Imam Abu Hanifa Mosque as a diligent student.

He possessed broad linguistic knowledge, mastering Turkish, Persian, and English, in addition to Arabic and Kurdish dialects. This expanded his cultural awareness, deepened his understanding of history and artifacts, and enabled him to connect with collectors and dealers from diverse backgrounds.

His true passion began with collecting rugs and old artifacts, then developed into a real trade he pursued as a profession and livelihood—without losing its intellectual dimension. His collecting was not driven by commerce alone, but by knowledge, documentation, and preserving historical value, making him among the early pioneers of this field in Iraq.

He had an exceptional memory and remarkable precision in identifying pieces—their age, origin, and circulation history—often knowing who owned a piece and when it changed hands. This rare ability earned him broad trust and respect. He was also known for humility and a lasting enthusiasm for speaking about antiques, their details, and their stories, even late in life.

He understood many traditional crafts and recognized both their material and historical value, seeing them as essential to a society’s identity and memory. This awareness shaped the way he acquired pieces—viewing each item not as an object, but as a living document.

He dreamed of transforming antiques into a cultural and touristic front—preserving heritage and introducing it to the world. He once expressed that if he had the means, he would establish a grand house worthy of this legacy.

Today, Mohammed Ali Taher Al-Jazrawi (Al-Almani) remains a foundational name in Iraq’s antiques history—a symbol of knowledge connected to heritage. His legacy formed the base upon which the House of Antiques was later built, continuing a dream that began with learning, was devoted with passion, and was entrusted to the generations that followed.`,

"grand.m1k": "Milestone",
"grand.m1v": "Khan Al-Baghdadi shops",
"grand.m2k": "Wish",
"grand.m2v": "“If I were wealthy…”",

/* ===== STAGE 2: FATHER ===== */
"father.kicker": "The Practical Continuation of the Legacy",
"father.title": "Tariq Mohammed Ali Al-Almani",
"father.sub": "1954 — 2014",
"father.body": `Tariq Al-Almani grew up surrounded by antiques from his earliest childhood, closely accompanying his father, Mohammed Ali Taher Al-Jazrawi (Al-Almani)—a dealer and researcher in heritage. For Tariq, antiques were not a later hobby or a sudden world; they were part of daily life, learned through direct practice—not books alone.

From his early years, he accompanied his father through markets, old houses, and merchants’ gatherings, learning acquisition methods, how to distinguish pieces, their historical value, and the origins of their craftsmanship. This early exposure built a cumulative expertise and helped him understand antiques as a complete system combining knowledge, taste, and responsibility toward heritage.

Before owning the House of Antiques, Tariq ran specialized antiques shops in Al-Maydan—one of Baghdad’s most prominent commercial and heritage districts—where he worked independently and developed a strong reputation among dealers and enthusiasts. The nickname “Al-Almani” continued as a mark of trust and knowledge in the field.

Under his father’s guidance, he learned the principles of dealing with rare pieces, preserving them, and not sacrificing their historical value for quick profit. He also explored the diversity of artistic schools, handcraft traditions, and materials used in rugs, brass, silver, wood, crystal, and more—forming the core of his later collections.

As he matured, he moved beyond being a companion or student and began evaluating and acquiring pieces himself, benefiting from a solid intellectual legacy and long practical experience. Over time, he built an independent identity in the antiques world—balancing respect for origins with careful, thoughtful expansion.

In 1989, purchasing the heritage house and transforming it into the House of Antiques became a defining turning point. He shifted from commercial shops to a clearly outlined cultural and knowledge-based project that combined museum and store, placing antiques within an architectural context worthy of their value. He preserved the spirit of the Baghdadi house and continued his father’s philosophy of merging knowledge with preservation.

The House of Antiques remained a well-known center for acquiring and exhibiting antiques under Tariq until 2004, when the project paused due to the circumstances Iraq faced at the time.

Tariq’s experience represents the link between the founding generation and the next—he was not merely an heir to a collection, but a bearer of a name, a practice, and accumulated knowledge that reinforced the House’s position as a recognized destination in Baghdad’s antiques world.`,

"father.m1k": "Milestone",
"father.m1v": "1989 — Purchased the house",
"father.m2k": "Era",
"father.m2v": "1989–2004 — The peak",

/* ===== STAGE 3: AZAD ===== */
"azad.kicker": "Third Generation",
"azad.title": "Azad Tariq Mohammed Ali Al-Almani",
"azad.sub": "Revival — 2022",
"azad.body": `Azad Tariq Al-Almani represents the third generation in the Al-Almani family’s journey in the world of antiques—a continuation that reconnected past and present after a long pause imposed by circumstances.

Azad was born in 1987—the same year the heritage house became the House of Antiques—making his earliest memories deeply tied to the place. He spent his early years inside the house, accompanying his father Tariq, learning the pieces, the rooms, the courtyard, and the way antiques were displayed—forming an early awareness of the house’s value even before fully grasping its cultural depth.

In 2004, the House of Antiques closed due to war and security conditions in Iraq, and the project paused despite its strong reputation at the time. Later, and especially after his father’s passing in 2014, the legacy became suspended between memory and reality while Azad was living outside Iraq.

Azad moved between the United States and Egypt, working as a producer in Egypt and as a businessman in both the U.S. and Egypt, gaining practical experience in management, production, and building ventures—away from antiques directly, yet without disconnecting from his cultural roots.

Eventually, he returned to Baghdad driven by the desire to revive the House of Antiques—not as a new project, but as a place with history and identity. He restored the house while fully preserving its original architectural form and Baghdadi details, and at the same time introduced a carefully measured contemporary touch in organization and display—aligned with the present without harming the spirit of the place.

His efforts were not limited to restoration; he continued acquiring rare pieces and expanding the collection while maintaining the house’s level and historical value—drawing on his upbringing within this legacy and on his practical experience in running projects.

Azad represents the transition from preservation to revival: the goal was not only reopening the doors, but redefining the House of Antiques as a living cultural space—rooted in three generations of history and speaking to the present in a modern language while remaining faithful to its origins.`,

"azad.m1k": "",
"azad.m1v": "",
"azad.m2k": "",
"azad.m2v": "2022 — Restoration & reopening",

"today.kicker": "Today",
"today.title": "The House Today",
"today.body": "Today, the House of Antiques is no longer just a preserved memory, but a living space that welcomes visitors, tells Baghdad’s story through antiques, and opens its doors to a new generation that sees heritage as a future — not only the past.",
"today.cta.tour": "Virtual Tour of the House",
"today.cta.press": "Press & Coverage",

"today.slider.prev": "Previous",
"today.slider.next": "Next",
"today.slider.open": "Open image",
"today.slider.alt": "Image from the House of Antiques",
"today.slider.dots": "Gallery indicators",

"today.lightbox.close": "Close",
"today.lightbox.alt": "Enlarged image",

/* ====== Auction page ====== */
"auction.label1": "AUCTION",
"auction.label2": "BODY",

"auction.big": "Al-Tariq Auction — Coming Soon",
"auction.mid": "An exclusive bidding experience on rare pieces that carry Baghdad’s memory.",
"auction.btn": "Auction Platform",

"auction.s1": "Rare works · Authentic pieces · Curated selection",
"auction.s2": "Antiques · Paintings · Historical collectibles",
"auction.s3": "Live bidding in a real-time broadcast",
"auction.s4": "Carefully selected pieces",
"auction.phone": "+964 777 704 5599",
"auction.addr": "Baghdad — Abu Nuwas St.",
    },
    

    /* ===== Press page ===== */
"press.brandAria": "Back to home",
"press.navAria": "Main navigation",
"press.heroAria": "Press introduction",
"press.controlsAria": "Filter tools",
"press.yearFilterAria": "Filter by year",
"press.archiveAria": "Press archive",
"press.brochuresAria": "Printed brochures archive",
"press.lbAria": "Press item viewer",

"press.brandT1": "House of Antiques",
"press.brandT2": "House of Antiques",

"nav.home": "Home",
"nav.about": "About",
"nav.press": "Press",
"nav.tour": "Tour",
"nav.contact": "Contact",

"press.heroTitle": "Press",
"press.heroSub": "Clippings that documented the House’s memory",
"press.badge": "Verified Archive",
"press.desc": "Here we showcase what has been published about the House of Antiques in newspapers and magazines over the years: titles, dates, and original material images.",
"press.searchPh": "Search by newspaper… title… year…",
"press.hintK": "Tip",
"press.hint": "Click any item to view it in full size.",
"press.yearTitle": "Year",

"press.materialsTitle": "Items",
"press.materialsSub": "Museum-style grid — indexing + quick search",

"press.printedArchive": "Printed Archive",
"press.brochuresTitle": "House of Antiques Brochures",
"press.brochuresSpan": "1980s — 1990s — 2001",
"press.brochuresDesc": "The House of Antiques archive includes only three printed brochures released in different periods: the first in the 1980s, the second in the 1990s, and the third in 2001. These publications were not merely promotional — they are identity documents that accompanied the house’s evolution over decades.",

"press.b1.year": "1980s",
"press.b1.title": "House of Antiques Brochure — First Edition",
"press.b1.body": "An early introductory document that predates the wide spread of cultural print media, showing how the House presented itself as a unique destination in Baghdad.",
"press.b1.alt": "House of Antiques brochure — 1980s",

"press.b2.year": "1990s",
"press.b2.title": "House of Antiques Brochure",
"press.b2.body": "One of the original brochures printed to introduce the House of Antiques when paper documentation was the primary way to preserve a place’s identity.",
"press.b2.alt": "House of Antiques brochure — 1990s",

"press.b3.year": "2001",
"press.b3.title": "House of Antiques Brochure — 2001 Edition",
"press.b3.body": "An edition documenting a more mature phase in presenting the House, reflecting the evolution of language and the attention to Baghdadi identity details.",
"press.b3.alt": "House of Antiques brochure — 2001",

"press.footT1": "House of Antiques — Press Archive",
"press.footT2": "If you have a rare copy or a clipping related to the House, message us to add it to the archive.",

"press.lbClose": "Close",
"press.lbImgAlt": "Press item",
"press.lbDetails": "Details"

  }

/* =========================
   Helpers
========================= */

function normalize(lang) {
  return SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
}
/* =========================
   Apply language
========================= */

function applyLang(lang) {
  const L = normalize(lang);
  const dict = DICT[L] || DICT[DEFAULT_LANG] || {};

  // html lang + dir
  document.documentElement.lang = L;
  document.documentElement.dir = (L === "ar") ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
  const key = el.getAttribute("data-i18n");
  const val =
    (DICT[L] && DICT[L][key] != null) ? DICT[L][key] :
    (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key] != null) ? DICT[DEFAULT_LANG][key] :
    key;
  el.textContent = val;
});


  // placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });

  // aria-label
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
  });

  // title attribute
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] != null) el.setAttribute("title", dict[key]);
  });

  // img alt
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] != null) el.setAttribute("alt", dict[key]);
  });

  // save language
  try { localStorage.setItem("hoa_lang", L); } catch {}

  // update active button UI
  document.querySelectorAll("[data-lang]").forEach((b) => {
    const isOn = (b.getAttribute("data-lang") || "").toLowerCase() === L;
    b.classList.toggle("is-active", isOn);
    b.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
}

/* =========================
   Language buttons
========================= */

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLang(btn.getAttribute("data-lang"));
  });
});

/* =========================
   Init on load
========================= */

(function () {
  try {
    const saved = (localStorage.getItem("hoa_lang") || DEFAULT_LANG).toLowerCase();
    applyLang(saved);
  } catch {
    applyLang(DEFAULT_LANG);
  }
   })();
})();

