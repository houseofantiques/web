/* i18n.js - House of Antiques (AR / EN / CKB Sorani + KU alias)
   - Lightweight i18n helper (no libs)
   - Works site-wide (any page that includes this file)
   - Translates:
     [data-i18n] textContent
     [data-i18n-html] innerHTML
     [data-i18n-placeholder] placeholder
     [data-i18n-title] title
     [data-i18n-aria] aria-label
     [data-i18n-alt] alt
     option[data-i18n] textContent

   Usage:
     I18N.setLang('ar'|'en'|'ckb'|'ku')
     I18N.t('key')

   Notes:
   - KU is an alias for CKB (so your buttons can use data-lang="ku" or "ckb")
   - RTL for ar/ckb/ku, LTR for en
*/

(function () {
  "use strict";

  const STORAGE_KEY = "hoa_lang";
  const SUPPORTED = ["ar", "en", "ckb", "ku"]; // ku = alias to ckb

  const DICT = {
    /* =========================
       AR
    ========================= */
    ar: {
      /* ---------- Global / Home ---------- */
      brand1: "بيت التحفيات",
      brand2: "House of Antiques",

      lang_ar: "AR",
      lang_en: "EN",
      lang_ckb: "کوردی",
      lang_ku: "کوردی",

      exhTitle: "استكشف بيت التحفيات",
      exhDesc: "محطات مختارة… كل محطة تقودك لتجربة مختلفة.",
      moreAbout: "المزيد",
      goStore: "ادخل المتجر",
      goBooking: "اذهب للحجز",
      goPress: "ادخل",
      goAuction: "تفاصيل المزاد",
      goTour: "ابدأ الجولة",

      ex1K: "نبذة",
      ex1T: "نبذة عن بيت التحفيات",
      ex1P: "قصة بيت بغدادي جمع التحف النادرة… من ذاكرة العائلة إلى وجهة ثقافية اليوم.",
      ex1M1: "قصة • إرث",
      ex1M2: "قراءة 3 دقائق",

      ex2K: "المتجر",
      ex2T: "تسوّق التحف",
      ex2P: "قطع نادرة مختارة بعناية… اكتشف السجاد والنحاس والخشب والكريستال وغيرها.",
      ex2M1: "قطع نادرة",
      ex2M2: "تحديثات مستمرة",

      ex3K: "الحجز",
      ex3T: "احجزي زيارتك",
      ex3P: "زيارة متحفية • تصوير • فعالية خاصة… احجزي بسهولة واختر وقتك.",
      ex3M1: "زيارة • تصوير",
      ex3M2: "حجز سريع",

      ex4K: "صحافة",
      ex4T: "تغطيات وأخبار",
      ex4P: "مقالات • فيديو • أرشيف… تابع كل ما كُتب وقيل عن بيت التحفيات.",
      ex4M1: "مقالات",
      ex4M2: "فيديو",

      ex5K: "المزاد",
      ex5T: "المزاد القادم",
      ex5P: "قطع مختارة بعناية تُعرض قبل المزاد… تفاصيل الحضور والحجز قريباً.",
      ex5M1: "عرض مسبق",
      ex5M2: "حجز • تفاصيل",

      ex6K: "جولة 360",
      ex6T: "جولة افتراضية داخل البيت",
      ex6P: "استكشف المكان قبل الزيارة… جولة تفاعلية داخل بيت التحفيات.",
      ex6M1: "Matterport",
      ex6M2: "داخل الصفحة",

      story_label1: "نبذة عن البيت",
      story_title1: "بيت التحفيات… ذاكرة بغداد",
      story_text1:
        "بيت التحفيات ليس مجرد متجر أو قاعة عرض—إنه تجربة ثقافية تعيش داخلها تفاصيل التراث: أبواب، سجاد، نحاس، كريستال وأعمال فنية… ضمن أجواء تُشبه المتاحف.",

      story_label2: "3 أجيال",
      story_title2: "قصة عائلة… من الجد إلى الأحفاد",
      story_text2:
        "تمتد الحكاية عبر ثلاثة أجيال: حلم الجد، شغف الأب، ثم عودة الأحفاد لإحياء المكان وترميمه… ليبقى بيت التحفيات واجهة تراثية وفنية في بغداد.",

      stats_title: "بيتٌ غني بالتفاصيل",
      stats_sub: "أرقام تُلخّص التجربة — قابلة للتحديث لاحقاً.",
      stat_age: "عمر البيت (سنة)",
      stat_rooms: "عدد الغرف",
      stat_antiques: "عدد التحف",
      stat_visitors: "عدد الزوار منذ الثمانينات",

      /* ---------- About page (structured keys) ---------- */
      "nav.home": "الرئيسية",
      "nav.about": "نبذة",
      "nav.gallery": "المعرض",

      "about.kicker": "نبذة",
      "about.title": "بيت التحفيات — ذاكرة بغداد",
      "about.meta1.label": "المكان",
      "about.meta1.value": "بغداد — أبو نؤاس",
      "about.meta2.label": "التأسيس",
      "about.meta2.value": "1989",
      "about.meta3.label": "الطراز",
      "about.meta3.value": "بيت بغدادي (1920)",
      "about.heroCaption": "صورة من بيت التحفيات",

      "about.body1":
        "بيت التحفيات ليس مجرد مكان لعرض القطع، بل ذاكرة حيّة لبغداد. بيتٌ بغدادي قديم يجمع التحف النادرة، ويمزج بين المتحف والمتجر وقصة عائلة امتدت عبر ثلاثة أجيال.",

      "about.table.key1": "المحتوى",
      "about.table.val1": "تحف، سجاد، نحاس، فضة، كريستال، أعمال فنية",
      "about.table.key2": "الهوية",
      "about.table.val2": "متحف + متجر + قصة عائلة",
      "about.table.key3": "الرؤية",
      "about.table.val3": "إحياء التراث وإعادة تقديمه بمعايير معاصرة",

      "about.chip1": "قصة عائلة",
      "about.chip2": "متحف حي",
      "about.chip3": "تراث بغداد",

      "ui.more": "اقرأ المزيد",
      "ui.less": "أقل",

      "house.kicker": "البيت",
      "house.title": "بيت التحفيات",
      "house.sub": "بيت بغدادي — 1920",
      "house.body":
        "بيت التحفيات هو بيت بغدادي قديم يعود تاريخ بنائه إلى عام 1920. يتميز بفناء داخلي وأجواء تراثية وتفاصيل معمارية تعبّر عن روح بغداد، ليكون اليوم مساحة تجمع بين العرض المتحفي والتجربة الثقافية.",
      "house.m1k": "الموقع",
      "house.m1v": "شارع أبو نؤاس",
      "house.m2k": "محطة",
      "house.m2v": "1989 — افتتاح البيت",

      "grand.kicker": "المؤسس",
      "grand.title": "محمد علي طاهر الألماني",
      "grand.sub": "1889 — 1988",
      "grand.body":
        "محمد علي طاهر الألماني (1889–1988) حمل شغفًا مبكرًا بالقطع القديمة. مع انتقاله إلى بغداد بدأ جمع التحف من البيوت والمحال، ثم امتلك في الأربعينات عدة محلات للأنتيك في خان البغدادي، وكان شاهدًا على مشهد ثقافي بغدادي مميز من بينها لقاءه الشهير مع الفنانة الراحلة ليلى العطار.",
      "grand.m1k": "محطة",
      "grand.m1v": "محلات خان البغدادي",
      "grand.m2k": "الأمنية",
      "grand.m2v": "«لو كنت صاحب ثروة…»",

      "father.kicker": "المؤسس الفعلي",
      "father.title": "طارق محمد علي الألماني",
      "father.sub": "1954 — 2014",
      "father.body":
        "طارق محمد علي الألماني (1954–2014) نشأ بين محلات الأنتيك منذ طفولته، وواصل مهنة العائلة حتى حقق أمنية والده بشراء بيت التحفيات عام 1989. في عهده توسعت المجموعة من السجاد لتضم النحاس والفضة والخشب والكريستال والأعمال الفنية، ليصبح البيت علامة معروفة قصدها الزوار من داخل العراق وخارجه.",
      "father.m1k": "محطة",
      "father.m1v": "1989 — شراء البيت",
      "father.m2k": "عصر",
      "father.m2v": "1989–2004 — ازدهار البيت",

      "azad.kicker": "الجيل الثالث",
      "azad.title": "أزاد طارق محمد علي الألماني",
      "azad.sub": "إحياء البيت — 2022",
      "azad.body":
        "أزاد طارق محمد علي الألماني يمثل الجيل الثالث من عائلة الألماني. حافظ على صلة البيت رغم الظروف، ثم عاد بدعم وتشجيع من إخوته ليبدأ مشروع الترميم وإعادة فتح بيت التحفيات، مؤمنًا بأن التراث لا يُغلق بل يُبعث من جديد.",
      "azad.m1k": "بداية",
      "azad.m1v": "محل أنتيك بعمر 11",
      "azad.m2k": "محطة",
      "azad.m2v": "2022 — ترميم وإعادة فتح",

      /* ---------- Timeline (FULL) ---------- */
      "timeline.kicker": "التايم لاين",
      "timeline.title": "محطات بيت التحفيات",
      "timeline.lead": "تسلسل زمني يلخص قصة البيت والعائلة عبر أكثر من قرن.",
      "timeline.showAll": "عرض كل المحطات",
      "timeline.toggle.show": "عرض كل المحطات",
      "timeline.toggle.hide": "إخفاء المحطات",
      "cta.tour": "الجولة الافتراضية",

      "timeline.y1889.tag": "الولادة",
      "timeline.y1889.text":
        "وُلد محمد علي طاهر الألماني عام 1889 في دياربكر شمال العراق، ليحمل معه لاحقًا شغفًا مبكرًا بالقطع القديمة والذوق التراثي الذي سيشكّل أساس إرث عائلي طويل.",

      "timeline.y1920s.tag": "الوصول إلى بغداد",
      "timeline.y1920s.text":
        "مع انتقاله إلى بغداد في عشرينات القرن الماضي، بدأ محمد علي طاهر الألماني بجمع القطع القديمة من البيوت والمحال، واضعًا أولى لبنات مشروعه التراثي داخل المدينة.",

      "timeline.y1940s.tag": "محلات الأنتيك",
      "timeline.y1940s.text":
        "في الأربعينات امتلك عدة محلات متخصصة بالسجاد والنحاس والكريستال في خان البغدادي، ليصبح أحد الأسماء المرتبطة بحركة الأنتيك البغدادية، وشاهدًا على لقاءه الشهير مع الفنانة الراحلة ليلى العطار.",

      "timeline.y1954.tag": "ولادة الامتداد",
      "timeline.y1954.text":
        "وُلد طارق محمد علي الألماني عام 1954 في منطقة الميدان، ونشأ بين محلات الأنتيك يعمل مع والده منذ طفولته، ليكبر داخل المهنة ويجعلها جزءًا من هويته.",

      "timeline.y1971.tag": "الأمنية المعلنة",
      "timeline.y1971.text":
        "في عام 1971، وخلال لقاء لجريدة التآخي مع محمد علي طاهر الألماني، عبّر عن أمنيته الشهيرة قائلًا: «لو كنتُ صاحبَ ثروةٍ كبيرة لأنشأتُ دارًا واسعة تضمّ كل هذه التحف»، وهي الفكرة التي ستتحول لاحقًا إلى بيت التحفيات.",

      "timeline.y1988.tag": "الرحيل",
      "timeline.y1988.text":
        "في عام 1988، توفي محمد علي طاهر الألماني تاركًا خلفه إرثًا من الشغف والقطع النادرة، وفكرة بيتٍ يجمع هذا التاريخ لم ترَ النور بعد.",

      "timeline.y1989.tag": "تحقيق الحلم",
      "timeline.y1989.text":
        "بعد وفاة والده بسنتين، اشترى طارق محمد علي الألماني بيت التحفيات عام 1989، وهو بيت بغدادي قديم يعود بناؤه إلى عام 1920، ليحقق أمنية والده ويجمع داخله كل التحف والأنتيك.",

      "timeline.y1989_2004.tag": "عصر الازدهار",
      "timeline.y1989_2004.text":
        "شهد بيت التحفيات أوج حضوره الثقافي والتراثي، إذ أصبح مقصدًا للسياح والفنانين والدبلوماسيين والوفود من مختلف دول العالم، وتناولته الصحف والمجلات والكتب بوصفه علامة ثقافية بارزة في بغداد.",

      "timeline.y2004.tag": "الإغلاق",
      "timeline.y2004.text":
        "في عام 2004، وبسبب الحرب والأوضاع غير المستقرة في العراق، أُغلق بيت التحفيات واضطرت العائلة إلى مغادرة البلاد، لتتوقف الحركة داخل البيت دون أن تنطفئ روحه.",

      "timeline.y2014.tag": "انتقال الوصية",
      "timeline.y2014.text":
        "توفي طارق محمد علي الألماني عام 2014، تاركًا بيت التحفيات أمانةً بيد الجيل الثالث، محمّلًا بتاريخ عائلي وإرث ثقافي كبير.",

      "timeline.y2022.tag": "العودة والإحياء",
      "timeline.y2022.text":
        "في عام 2022، عاد أزاد طارق محمد علي الألماني بدعم وتشجيع من إخوته، ليبدأ مشروع ترميم بيت التحفيات وإعادة فتحه، محافظًا على روحه الأصلية ومؤمنًا بأن التراث لا يُغلق بل يُبعث من جديد.",

      /* ---------- Store / Auction (كما هو) ---------- */
      page_title: "بيت التحفيات | متجر التحف",
      store_name: "متجر بيت التحفيات",
      store_sub: "متجر التحف والقطع النادرة",
      hero_title: "اقتني قطعة تروي تاريخ",
      hero_desc: "اكتشف تحفنا: سجاد، اكسسوارات، فضة، نحاس، أعمال فنية، كريستال...",
      search_placeholder: "ابحث باسم القطعة أو الكود...",

      theme_toggle: "تبديل المظهر",
      lang_label: "اللغة",

      categories: "التصنيفات",
      auction_info: "معلومات المزاد",
      store_items_count: "قطع المتجر",
      auction_items_count: "قطع المزاد القادم",
      view_auction: "استعرض قطع المزاد",
      auction_note_1: "يتم تحديث القطع المشاركة باستمرار",
      auction_note_2: "قائمة المزاد تتحدث حسب تجهيز القطع.",

      available_items: "القطع المتاحة",
      sort_label: "الترتيب",
      show_label: "عرض",
      show_all: "الكل",
      show_favorites: "المفضلة",
      sort_featured: "مميز",
      sort_newest: "الأحدث",
      sort_price_asc: "السعر:من الاقل للاعلى ",
      sort_price_desc: "السعر:من الأعلى للاقل",

      badge_auction: "مزاد",
      status_available: "متوفرة",
      status_reserved: "محجوزة للمعاينة",
      status_sold: "انتقلت لمقتنٍ",
      sold: "مباعة",

      btn_details: "تفاصيل",
      btn_order: "اطلب",
      fav_on: "❤️ في المفضلة",
      fav_off: "♡ إضافة للمفضلة",

      no_results: "لا يوجد نتائج",
      try_filter: "جرّب تبدّيل التصنيف أو تقليل كلمات البحث.",
      results_count: "نتيجة",
      results_count_plural: "نتائج",

      copied_link: "تم نسخ رابط القطعة ✅",
      cannot_copy: "تعذر النسخ تلقائياً. انسخ الرابط يدوياً.",

      close: "إغلاق",
      item_image_alt: "صورة القطعة",
      more_images: "صور إضافية",

      code_label: "الكود",
      price_label: "السعر",

      tab_details: "تفاصيل",
      tab_order: "اطلب",
      info_tabs: "تبويبات المعلومات",

      share_item: "مشاركة القطعة",
      share_whatsapp: "مشاركة واتساب",
      copy_link: "نسخ الرابط",
      share: "مشاركة",

      similar_suggestions: "اقتراحات مشابهة",

      customer_data: "بيانات الزبون",
      full_name: "الاسم الكامل",
      phone: "رقم الهاتف",
      governorate: "المحافظة",
      area: "المنطقة",
      nearest_landmark: "أقرب نقطة دالة",
      notes_optional: "ملاحظات (اختياري)",
      order_whatsapp: "ارسل الطلب",
      copy_order_details: "نسخ تفاصيل الطلب",

      ph_full_name: "مثال: طارق محمد علي",
      ph_phone: "07xxxxxxxxx",
      ph_governorate: "مثال: بغداد",
      ph_area: "مثال: أبو نؤاس",
      ph_landmark: "مثال: قرب مجمع كورنيش أبو نؤاس",
      ph_notes: "مثال: أريد معاينة القطعة / تغليف هدية...",

      mobile_order: "اطلب الآن",

      footer_brand: "بيت التحفيات",
      footer_link_title: "House of Antiques",
      footer_tagline: "بغداد - أبو نؤاس / للذاكرة، للتوثيق، وللأثر",

      auction_page_title: "بيت التحفيات | المزاد",
      auction_title: "قطع المزاد",
      back_to_store: "الرجوع للمتجر",
      auction_hint: "هذه القائمة تخص القطع المشاركة في المزاد فقط.",

      alert_missing_fields: "يرجى إكمال الحقول المطلوبة.",
      alert_missing_name: "الاسم الكامل مطلوب.",
      alert_missing_phone: "رقم الهاتف مطلوب.",
      alert_missing_gov: "المحافظة مطلوبة.",
      alert_missing_area: "المنطقة مطلوبة.",
      alert_missing_landmark: "أقرب نقطة دالة مطلوبة.",
      sending: "جارٍ إرسال الطلب...",
      email_sent: "تم إرسال الطلب إلى البريد بنجاح ✅",
      email_failed: "تعذر إرسال الإيميل، سيتم المتابعة عبر واتساب."
    },

    /* =========================
       EN
    ========================= */
    en: {
      /* ---------- Global / Home ---------- */
      brand1: "House of Antiques",
      brand2: "Baghdad Heritage House",

      lang_ar: "AR",
      lang_en: "EN",
      lang_ckb: "Kurdî",
      lang_ku: "Kurdî",

      nav_about: "About",
      nav_store: "Store",
      nav_booking: "Booking",
      nav_press: "Press",
      nav_auction: "Auction",
      nav_tour: "Virtual Tour",

      kicker: "Heritage Destination — Baghdad",
      h1a: "Welcome to",
      h1b: "House of Antiques",
      sub: "A museum-like experience with rare collectibles, a family story, and virtual tours—plus a curated store to explore unique pieces.",

      cta_store: "Explore Store",
      cta_booking: "Book a Visit",

      cards_title: "Explore House of Antiques",
      cards_sub: "About — Store — Booking — Press — Auction — Tour",

      cf_about_t: "About",
      cf_about_d: "Story — Generations — Photos",
      cf_store_t: "Store",
      cf_store_d: "Browse rare pieces",
      cf_booking_t: "Booking",
      cf_booking_d: "Visits — Photoshoots — Events",
      cf_press_t: "Press",
      cf_press_d: "News — Coverage — Photos",
      cf_auction_t: "Auction",
      cf_auction_d: "Next date / Soon",
      cf_tour_t: "Virtual Tour",
      cf_tour_d: "360° inside the house",

      story_label1: "About the House",
      story_title1: "House of Antiques… Baghdad’s Memory",
      story_text1:
        "More than a store or gallery—this is a cultural experience filled with heritage details: doors, rugs, copper, crystal, and artworks in a museum-like atmosphere.",

      story_label2: "3 Generations",
      story_title2: "A Family Story… from Grandfather to Grandchildren",
      story_text2:
        "A three-generation journey: the grandfather’s dream, the father’s passion, and the grandchildren’s return to restore and revive the place—keeping it a cultural landmark in Baghdad.",

      stats_title: "A House rich in details",
      stats_sub: "Numbers that summarize the experience — can be updated later.",
      stat_age: "House age (years)",
      stat_rooms: "Rooms",
      stat_antiques: "Antiques",
      stat_visitors: "Visitors since the 80s",

      /* ---------- About keys ---------- */
      "nav.home": "Home",
      "nav.about": "About",
      "nav.gallery": "Gallery",

      "about.kicker": "About",
      "about.title": "House of Antiques — Baghdad’s Memory",
      "about.meta1.label": "Location",
      "about.meta1.value": "Baghdad — Abu Nuwas",
      "about.meta2.label": "Founded",
      "about.meta2.value": "1989",
      "about.meta3.label": "Style",
      "about.meta3.value": "Baghdadi House (1920)",
      "about.heroCaption": "A glimpse of the House of Antiques",

      "about.body1":
        "The House of Antiques is more than a place to display objects—it is a living memory of Baghdad. A historic Baghdadi home that brings together rare pieces and blends a museum experience, a curated store, and a family story across three generations.",

      "about.table.key1": "Collection",
      "about.table.val1": "Antiques, rugs, copper, silver, crystal, artworks",
      "about.table.key2": "Identity",
      "about.table.val2": "Museum + Store + Family story",
      "about.table.key3": "Vision",
      "about.table.val3": "Reviving heritage and presenting it with modern standards",

      "about.chip1": "Family story",
      "about.chip2": "Living museum",
      "about.chip3": "Baghdad heritage",

      "ui.more": "Read more",
      "ui.less": "Less",

      "house.kicker": "The House",
      "house.title": "House of Antiques",
      "house.sub": "Baghdadi House — 1920",
      "house.body":
        "The House of Antiques is a historic Baghdadi home built in 1920. With a central courtyard and authentic architectural details, it carries the spirit of Baghdad—today offering a cultural experience that blends museum display with curated storytelling.",
      "house.m1k": "Address",
      "house.m1v": "Abu Nuwas Street",
      "house.m2k": "Milestone",
      "house.m2v": "1989 — House opened",

      "grand.kicker": "Founder",
      "grand.title": "Muhammad Ali Taher Al-Almani",
      "grand.sub": "1889 — 1988",
      "grand.body":
        "Muhammad Ali Taher Al-Almani (1889–1988) developed an early passion for heritage pieces. After moving to Baghdad, he began collecting antiques from homes and shops. In the 1940s he owned multiple antique stores in Khan Al-Baghdadi, and he became linked to Baghdad’s antique scene—remembered also for his notable meeting with the late artist Laila Al-Attar.",
      "grand.m1k": "Milestone",
      "grand.m1v": "Khan Al-Baghdadi shops",
      "grand.m2k": "Wish",
      "grand.m2v": "“If I had great wealth…”",

      "father.kicker": "The Builder",
      "father.title": "Tariq Muhammad Ali Al-Almani",
      "father.sub": "1954 — 2014",
      "father.body":
        "Tariq Muhammad Ali Al-Almani (1954–2014) grew up among antique shops, working with his father from childhood. In 1989 he fulfilled his father’s wish by purchasing the House of Antiques. Under his stewardship, the collection expanded beyond rugs to include copper, silver, wood, crystal, and artworks—turning the house into a landmark visited by locals and international guests.",
      "father.m1k": "Milestone",
      "father.m1v": "1989 — House purchased",
      "father.m2k": "Era",
      "father.m2v": "1989–2004 — Golden era",

      "azad.kicker": "Third Generation",
      "azad.title": "Azad Tariq Muhammad Ali Al-Almani",
      "azad.sub": "Revival — 2022",
      "azad.body":
        "Azad Tariq Muhammad Ali Al-Almani represents the third generation of the Al-Almani family. Despite the years of difficulty, he kept the connection alive—then returned with support from his siblings to restore and reopen the House of Antiques, believing heritage is not meant to fade, but to be revived.",
      "azad.m1k": "Start",
      "azad.m1v": "Antique shop at 11",
      "azad.m2k": "Milestone",
      "azad.m2v": "2022 — Restoration & reopening",

      /* ---------- Timeline (FULL) ---------- */
      "timeline.kicker": "Timeline",
      "timeline.title": "House Milestones",
      "timeline.lead":
        "A timeline that summarizes the story of the house and the family across more than a century.",
      "timeline.showAll": "Show all milestones",
      "timeline.toggle.show": "Show all milestones",
      "timeline.toggle.hide": "Hide milestones",
      "cta.tour": "Virtual tour",

      "timeline.y1889.tag": "Birth",
      "timeline.y1889.text":
        "Muhammad Ali Taher Al-Almani was born in 1889 in Diyarbakir (north of Iraq), carrying an early passion for antiques and a heritage-driven taste that would shape a long family legacy.",

      "timeline.y1920s.tag": "Arrival in Baghdad",
      "timeline.y1920s.text":
        "After moving to Baghdad in the 1920s, Muhammad Ali Taher Al-Almani began collecting antiques from homes and markets—laying the first foundations of his heritage project within the city.",

      "timeline.y1940s.tag": "Antique shops",
      "timeline.y1940s.text":
        "In the 1940s he owned several specialized shops for rugs, copper, and crystal in Khan Al-Baghdadi, becoming a notable name in Baghdad’s antique movement—and a witness to his well-known meeting with the late artist Laila Al-Attar.",

      "timeline.y1954.tag": "The legacy is born",
      "timeline.y1954.text":
        "Tariq Muhammad Ali Al-Almani was born in 1954 in Al-Maidan. He grew up between antique shops, working with his father from childhood, and made the craft part of his identity.",

      "timeline.y1971.tag": "The declared wish",
      "timeline.y1971.text":
        "In 1971, in an interview with Al-Ta’akhi newspaper, Muhammad Ali Taher Al-Almani expressed his famous wish: “If I had great wealth, I would build a large house to hold all these antiques”—an idea that would later become the House of Antiques.",

      "timeline.y1988.tag": "Passing",
      "timeline.y1988.text":
        "In 1988, Muhammad Ali Taher Al-Almani passed away, leaving behind rare pieces, deep passion, and the dream of a house that would gather this history—still unrealized at the time.",

      "timeline.y1989.tag": "The dream fulfilled",
      "timeline.y1989.text":
        "Two years after his father’s death, Tariq Muhammad Ali Al-Almani purchased the House of Antiques in 1989—a historic Baghdadi home built in 1920—fulfilling his father’s wish and gathering the collection under one roof.",

      "timeline.y1989_2004.tag": "The golden era",
      "timeline.y1989_2004.text":
        "The House of Antiques reached its cultural peak, becoming a destination for tourists, artists, diplomats, and international delegations. It was featured in newspapers, magazines, and books as a notable cultural landmark in Baghdad.",

      "timeline.y2004.tag": "Closure",
      "timeline.y2004.text":
        "In 2004, due to war and instability in Iraq, the House of Antiques was closed and the family had to leave the country—activity stopped, but the spirit of the place endured.",

      "timeline.y2014.tag": "The legacy entrusted",
      "timeline.y2014.text":
        "Tariq Muhammad Ali Al-Almani passed away in 2014, leaving the House of Antiques as a trust in the hands of the third generation—carrying a family history and a major cultural legacy.",

      "timeline.y2022.tag": "Return & revival",
      "timeline.y2022.text":
        "In 2022, Azad Tariq Muhammad Ali Al-Almani returned with support and encouragement from his siblings, beginning the restoration and reopening of the House of Antiques—preserving its original spirit and believing heritage is meant to be revived.",

      /* ---------- Store / Auction (as-is) ---------- */
      page_title: "House of Antiques | Store",
      store_name: "House of Antiques Store",
      store_sub: "Antiques & rare items store",
      hero_title: "Own a piece of history",
      hero_desc: "Explore: rugs, accessories, silver, copper, artworks, crystal...",
      search_placeholder: "Search by item name or code...",

      theme_toggle: "Toggle theme",
      lang_label: "Language",

      categories: "Categories",
      auction_info: "Auction info",
      store_items_count: "Store items",
      auction_items_count: "Upcoming auction items",
      view_auction: "View auction items",
      auction_note_1: "Items are updated continuously",
      auction_note_2: "Auction list updates as items are prepared.",

      available_items: "Available items",
      sort_label: "Sort",
      show_label: "Show",
      show_all: "All",
      show_favorites: "Favorites",
      sort_featured: "Featured",
      sort_newest: "Newest",
      sort_price_asc: "Price: Low to High",
      sort_price_desc: "Price: High to Low",

      badge_auction: "Auction",
      status_available: "Available",
      status_reserved: "Reserved for viewing",
      status_sold: "Collected",
      sold: "Sold",

      btn_details: "Details",
      btn_order: "Order",
      fav_on: "❤️ Saved",
      fav_off: "♡ Save",

      no_results: "No results",
      try_filter: "Try changing the category or reducing your search keywords.",
      results_count: "result",
      results_count_plural: "results",

      copied_link: "Item link copied ✅",
      cannot_copy: "Couldn’t copy automatically. Please copy the link manually.",

      close: "Close",
      item_image_alt: "Item image",
      more_images: "More images",

      code_label: "Code",
      price_label: "Price",

      tab_details: "Details",
      tab_order: "Order",
      info_tabs: "Information tabs",

      share_item: "Share item",
      share_whatsapp: "Share WhatsApp",
      copy_link: "Copy link",
      share: "Share",

      similar_suggestions: "Similar suggestions",

      customer_data: "Customer details",
      full_name: "Full name",
      phone: "Phone",
      governorate: "Governorate",
      area: "Area",
      nearest_landmark: "Nearest landmark",
      notes_optional: "Notes (optional)",
      order_whatsapp: "send order",
      copy_order_details: "Copy order details",

      ph_full_name: "Example: Tariq Mohammed Ali",
      ph_phone: "07xxxxxxxxx",
      ph_governorate: "Example: Baghdad",
      ph_area: "Example: Abu Nuwas",
      ph_landmark: "Example: Near Abu Nuwas Corniche",
      ph_notes: "Example: I want to view the item / gift wrap...",

      mobile_order: "Order now",

      footer_brand: "House of Antiques",
      footer_link_title: "House of Antiques",
      footer_tagline: "Baghdad - Abu Nuwas / memory, documentation, and legacy",

      auction_page_title: "House of Antiques | Auction",
      auction_title: "Auction items",
      back_to_store: "Back to store",
      auction_hint: "This list includes auction items only.",

      alert_missing_fields: "Please complete the required fields.",
      alert_missing_name: "Full name is required.",
      alert_missing_phone: "Phone number is required.",
      alert_missing_gov: "Governorate is required.",
      alert_missing_area: "Area is required.",
      alert_missing_landmark: "Nearest landmark is required.",
      sending: "Sending your order...",
      email_sent: "Order email sent successfully ✅",
      email_failed: "Couldn’t send email. We’ll continue via WhatsApp."
    },

    /* =========================
       CKB (Sorani - Arabic script)
    ========================= */
    ckb: {
      /* ---------- Global / Home ---------- */
      brand1: "بێتێ کۆنەکان",
      brand2: "House of Antiques",

      lang_ar: "AR",
      lang_en: "EN",
      lang_ckb: "کوردی",
      lang_ku: "کوردی",

      nav_about: "دەربارە",
      nav_store: "فرۆشگا",
      nav_booking: "حجز",
      nav_press: "ڕۆژنامەوانی",
      nav_auction: "مزاد",
      nav_tour: "گەشتی ئەلیکترۆنی",

      kicker: "شوێنی میراثی — بەغدا",
      h1a: "بەخێربێیت بۆ",
      h1b: "بێتێ کۆنەکان",
      sub: "ئەزموونێکی مۆزەخانەیی لەگەڵ پارچە دەگمەنەکان، چیرۆکی خێزان، و گەشتە ئەلیکترۆنییەکان—هەروەها فرۆشگایەک بۆ دۆزینەوەی پارچە تایبەتەکان.",

      cta_store: "بینینی فرۆشگا",
      cta_booking: "حجز بکە",

      cards_title: "بینینی بێتێ کۆنەکان",
      cards_sub: "دەربارە — فرۆشگا — حجز — ڕۆژنامەوانی — مزاد — گەشت",

      cf_about_t: "دەربارە",
      cf_about_d: "چیرۆک — نەوەکان — وێنە",
      cf_store_t: "فرۆشگا",
      cf_store_d: "پارچە دەگمەنەکان ببینە",
      cf_booking_t: "حجز",
      cf_booking_d: "سەردان — وێنەگرتن — چالاکی",
      cf_press_t: "ڕۆژنامەوانی",
      cf_press_d: "هەواڵ — ڕاپۆرت — وێنە",
      cf_auction_t: "مزاد",
      cf_auction_d: "کاتی داهاتوو / نزیکە",
      cf_tour_t: "گەشتی ئەلیکترۆنی",
      cf_tour_d: "360° ناو بێت",

      story_label1: "دەربارەی بێت",
      story_title1: "بێتێ کۆنەکان… بیرەوەری بەغدا",
      story_text1:
        "تەنها فرۆشگا یان هۆڵی پێشانە نییە—ئەزموونێکی کەلتوورییە: دەرگا، قالی، مس، کریستال و کاری هونەری… لە ناو هەوایەکی وەک مۆزەخانە.",

      story_label2: "٣ نەوە",
      story_title2: "چیرۆکی خێزان… لە باپیرەوە بۆ نوەکان",
      story_text2:
        "چیرۆکەکە لە سێ نەوەدا دەدرێژێت: خەونی باپیرە، خۆشەویستی باوک، و گەڕانەوەی نوەکان بۆ ژیانەوە و چاککردنی شوێن… تا بێتە وێنەیەکی کەلتووری لە بەغدا.",

      stats_title: "بێتێک پڕ لە وردەکاری",
      stats_sub: "ژمارەکان کورتەی ئەزموون—دەتوانرێت داهاتوو نوێ بکرێنەوە.",
      stat_age: "تەمەنی بێت (ساڵ)",
      stat_rooms: "ژوورەکان",
      stat_antiques: "کۆنەکان",
      stat_visitors: "سەردانکاران لە ٨٠کانەوە",

      /* ---------- About keys ---------- */
      "nav.home": "سەرەکی",
      "nav.about": "دەربارە",
      "nav.gallery": "گەلەری",

      "about.kicker": "دەربارە",
      "about.title": "بێتێ کۆنەکان — بیرەوەری بەغدا",
      "about.meta1.label": "شوێن",
      "about.meta1.value": "بەغدا — ئەبو نؤاس",
      "about.meta2.label": "دامەزراندن",
      "about.meta2.value": "١٩٨٩",
      "about.meta3.label": "شێواز",
      "about.meta3.value": "ماڵی بەغدادی (١٩٢٠)",
      "about.heroCaption": "وێنەیەک لە بێتێ کۆنەکان",

      "about.body1":
        "بێتێ کۆنەکان تەنها شوێنێک بۆ پیشاندانی پارچەکان نییە—بیرەوەرییەکی زیندووی بەغدایە. ماڵێکی کۆنی بەغدادییە کە پارچە دەگمەنەکان کۆ دەکاتەوە و تێکەڵەیەک لە ئەزموونی مۆزەخانە، فرۆشگای تایبەت، و چیرۆکی خێزان لە سێ نەوەدا پێشکەش دەکات.",

      "about.table.key1": "ناوەڕۆک",
      "about.table.val1": "کۆنەکان، قالی، مس، زیو، کریستال، کاری هونەری",
      "about.table.key2": "ناسنامە",
      "about.table.val2": "مۆزەخانە + فرۆشگا + چیرۆکی خێزان",
      "about.table.key3": "بینین",
      "about.table.val3": "ژیانەوەکردنی میراث و پێشکەشکردنی بە پێوەرە نوێکان",

      "about.chip1": "چیرۆکی خێزان",
      "about.chip2": "مۆزەخانەی زیندوو",
      "about.chip3": "میراثی بەغدا",

      "ui.more": "زیاتر بخوێنەوە",
      "ui.less": "کەمتر",

      "house.kicker": "ماڵ",
      "house.title": "بێتێ کۆنەکان",
      "house.sub": "ماڵی بەغدادی — ١٩٢٠",
      "house.body":
        "بێتێ کۆنەکان ماڵێکی کۆنی بەغدادییە کە لە ساڵی ١٩٢٠ دروست کراوە. بە فەنا/حوشێکی ناوەوە و وردەکارییە معمارییە ڕەسەنەکان، ڕۆحی بەغدا هەڵدەگرێت—ئێستا دەبێتە شوێنێک بۆ ئەزموونی کەلتووری کە مۆزەخانە و چیرۆکگێڕی تێکەڵ دەکات.",
      "house.m1k": "شوێن",
      "house.m1v": "شەقامی ئەبو نؤاس",
      "house.m2k": "خاڵ",
      "house.m2v": "١٩٨٩ — کردنەوەی بێت",

      "grand.kicker": "دامەزرێنەر",
      "grand.title": "محەمەد عەلی طاهر ئەڵمانی",
      "grand.sub": "١٨٨٩ — ١٩٨٨",
      "grand.body":
        "محەمەد عەلی طاهر ئەڵمانی (١٨٨٩–١٩٨٨) خۆشەویستییەکی زوو بۆ پارچە کۆنەکان هەبوو. دوای گواستنەوە بۆ بەغدا دەستی کرد بە کۆکردنەوەی کۆنەکان لە ماڵ و دوکان. لە ٤٠کانەوە چەند دوکانێکی تایبەت بە قالی و مس و کریستال لە خان بەغدادی هەبوو و ناوی بەسترا بە بزوتنەوەی کۆنەکانی بەغدا—هەروەها بە شایەتی چاوپێکەوتنەکەی لەگەڵ هونەرمەندی کۆچی دوایی لیلا العطار.",
      "grand.m1k": "خاڵ",
      "grand.m1v": "دوکانەکانی خان بەغدادی",
      "grand.m2k": "ئاڕەزوو",
      "grand.m2v": "«ئەگەر خاوەنی سامان بووم…»",

      "father.kicker": "دامەزرێنەری سەرەکی",
      "father.title": "طارق محەمەد عەلی ئەڵمانی",
      "father.sub": "١٩٥٤ — ٢٠١٤",
      "father.body":
        "طارق محەمەد عەلی ئەڵمانی (١٩٥٤–٢٠١٤) لە منداڵییەوە لە ناو دوکانەکانی کۆنەکان گەورە بوو و لەگەڵ باوکی کار دەکرد. لە ١٩٨٩ ئاڕەزووی باوکی جێبەجێ کرد بە کڕینی بێتێ کۆنەکان. لە سەردەمی ئەو، کۆکراوەکە لە قالی زیاتر بوو بۆ مس و زیو و دار و کریستال و کاری هونەری، تا بێتە نیشانەیەکی ناسراو بۆ سەردانکارانی ناوخۆ و دەرەوە.",
      "father.m1k": "خاڵ",
      "father.m1v": "١٩٨٩ — کڕینی بێت",
      "father.m2k": "سەردەم",
      "father.m2v": "١٩٨٩–٢٠٠٤ — سەردەمی گەشە",

      "azad.kicker": "نەوەی سێیەم",
      "azad.title": "ئازاد طارق محەمەد عەلی ئەڵمانی",
      "azad.sub": "ژیانەوە — ٢٠٢٢",
      "azad.body":
        "ئازاد طارق محەمەد عەلی ئەڵمانی نەوەی سێیەمی خێزانی ئەڵمانییە. لەگەڵ هەموو قەیرانەکاندا پەیوەندییەکەی لەگەڵ بێت نەبڕی، و دوایین لە ٢٠٢٢ بە پشتگیری براکان و خوشکان گەڕایەوە بۆ چاککردن و کردنەوەی دووبارە—باوەڕی وایە میراث نابێت داخراو بێت، دەبێت ژیانەوە بکرێتەوە.",
      "azad.m1k": "دەستپێک",
      "azad.m1v": "لە تەمەنی ١١ ساڵیدا دوکانی کۆنەکان",
      "azad.m2k": "خاڵ",
      "azad.m2v": "٢٠٢٢ — چاککردن و کردنەوەی دووبارە",

      /* ---------- Timeline (FULL) ---------- */
      "timeline.kicker": "هێڵی کات",
      "timeline.title": "خاڵەکانی بێتێ کۆنەکان",
      "timeline.lead":
        "هێڵێکی کات کە چیرۆکی بێت و خێزان لە زیاتر لە سەدەیەکدا کورت دەکاتەوە.",
      "timeline.showAll": "هەموو خاڵەکان پیشان بدە",
      "timeline.toggle.show": "هەموو خاڵەکان پیشان بدە",
      "timeline.toggle.hide": "خاڵەکان بشارەوە",
      "cta.tour": "گەشتی ئەلیکترۆنی",

      "timeline.y1889.tag": "لەدایکبوون",
      "timeline.y1889.text":
        "محەمەد عەلی طاهر ئەڵمانی لە ساڵی ١٨٨٩ لە دیاربەکر لەدایک بوو، و خۆشەویستییەکی زوو بۆ پارچە کۆنەکان و ذوقی میراثی هەبوو کە بنەمای میراثێکی خێزانی درێژ دروست کرد.",

      "timeline.y1920s.tag": "هاتن بۆ بەغدا",
      "timeline.y1920s.text":
        "لە ٢٠کانەوە دوای گواستنەوە بۆ بەغدا، دەستی کرد بە کۆکردنەوەی پارچە کۆنەکان لە ماڵ و بازاڕ—یەکەم بنەمای پڕۆژە میراثییەکەی لە ناو شارەکەدا دانا.",

          "timeline.y1940s.tag": "دوکانەکانی کۆنەکان",
      "timeline.y1940s.text":
        "لە ساڵانی ٤٠دا چەند دوکانێکی تایبەت بە قالی، مس و کریستال لە خان بەغدادی هەبوو. بە یەکێک لە ناوەکان ناسرا کە بە بزوتنەوەی کۆنەکانی بەغدا پەیوەست بوو، و هەروەها شایەتی چاوپێکەوتنەکەی لەگەڵ هونەرمەندی کۆچی دوایی لیلا العطار بوو.",

      "timeline.y1954.tag": "لەدایکبوونی درێژبوونەوە",
      "timeline.y1954.text":
        "طارق محەمەد عەلی ئەڵمانی لە ساڵی ١٩٥٤ لە ناوچەی مەیدان لەدایک بوو. لە نێوان دوکانەکانی کۆنەکاندا گەورە بوو و لە منداڵییەوە لەگەڵ باوکی کار دەکرد، تا پیشەکە ببێتە بەشێک لە ناسنامەی و ژیانی.",

      "timeline.y1971.tag": "ئاڕەزووی ڕاگەیەنراو",
      "timeline.y1971.text":
        "لە ساڵی ١٩٧١، لە چاوپێکەوتنێک لەگەڵ ڕۆژنامەی التآخی، ئاڕەزووی ناسراوی خۆی دەربڕی: «ئەگەر خاوەنی سامانی گەورە بووم، دارێکی فراوان دروست دەکردم کە هەموو ئەم کۆنەکان تێدا کۆ بکاتەوە»—ئەم بیرۆکەیە دواتر بوو بە بنەمای بیرۆکی بێتێ کۆنەکان.",

      "timeline.y1988.tag": "کۆچکردن",
      "timeline.y1988.text":
        "لە ساڵی ١٩٨٨ کۆچی دوایی کرد. میراثێک لە خۆشەویستی و پارچە دەگمەنەکان جێهێشت، و بیرۆکی ماڵێک کە ئەم مێژووە کۆ دەکاتەوە—هێشتا لەو کاتەدا نەبووەڕۆ.",

      "timeline.y1989.tag": "جێبەجێکردنی خەون",
      "timeline.y1989.text":
        "دوو ساڵ دوای کۆچی باوکی، طارق لە ساڵی ١٩٨٩ بێتێ کۆنەکانی کڕی—ماڵێکی کۆنی بەغدادی کە لە ساڵی ١٩٢٠ دروست کراوە—تا ئاڕەزووی باوکی جێبەجێ بکات و کۆکراوەکەی لە ژێر یەک سەقف کۆ بکاتەوە.",

      "timeline.y1989_2004.tag": "سەردەمی گەشە",
      "timeline.y1989_2004.text":
        "بێتێ کۆنەکان گەیشت بە پێگەی کەلتوورییەکەی و بووە مەقەصەدی گەشتیاران، هونەرمەندان، دیپلۆماتان و دەستە نێودەوڵەتییەکان. ڕۆژنامە و گۆڤار و کتێبەکانیش وەک نیشانەیەکی کەلتووریی بەغدا باسـیان کرد.",

      "timeline.y2004.tag": "داخستن",
      "timeline.y2004.text":
        "لە ساڵی ٢٠٠٤ بەهۆی جەنگ و ناڕەوەیی لە عێراقدا، بێت داخرا و خێزان ناچار بوون وڵات جێبهێڵن—چالاکی وەستا، بەڵام ڕۆحی شوێنەکە نەکوژا.",

      "timeline.y2014.tag": "گواستنەوەی ئەمانەت",
      "timeline.y2014.text":
        "لە ساڵی ٢٠١٤ طارق کۆچی دوایی کرد و بێت وەک ئەمانەتێک بە دەستی نەوەی سێیەم سپارد—بە بارێکی مێژووی خێزانی و میراثێکی گەورەی کەلتووری.",

      "timeline.y2022.tag": "گەڕانەوە و ژیانەوە",
      "timeline.y2022.text":
        "لە ساڵی ٢٠٢٢ ئازاد بە پشتگیری براکان و خوشکان گەڕایەوە بۆ دەستپێکردنی چاککردن و کردنەوەی دووبارەی بێت—ڕۆحی ڕەسەنی پاراست و باوەڕی پێیە میراث نابێت داخراو بێت، دەبێت ژیانەوە بکرێتەوە."
    } // <-- END ckb
  }; // <-- END DICT


  // --- KU alias: treat "ku" as "ckb" everywhere ---
  function normalizeLang(lang) {
    if (!lang) return "ar";
    lang = String(lang).toLowerCase().trim();
    if (lang === "ku") return "ckb";
    return lang;
  }

  function getLang() {
    const saved = normalizeLang(localStorage.getItem(STORAGE_KEY));
    return (saved && DICT[saved]) ? saved : "ar";
  }

  function setRoot(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
  }

  function t(key, lang = getLang()) {
    lang = normalizeLang(lang);
    const pack = DICT[lang] || DICT.ar;
    const val = pack[key];
    if (val != null) return val;

    const fall = DICT.ar[key];
    return (fall != null) ? fall : key;
  }

  function applyToDOM(lang, root = document) {
    lang = normalizeLang(lang);
    if (!DICT[lang]) lang = "ar";
    setRoot(lang);

    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = DICT[lang]?.[key];
      if (val != null) el.textContent = val;
    });

    root.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const val = DICT[lang]?.[key];
      if (val != null) el.innerHTML = val;
    });

    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = DICT[lang]?.[key];
      if (val != null) el.setAttribute("placeholder", val);
    });

    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const val = DICT[lang]?.[key];
      if (val != null) el.setAttribute("title", val);
    });

    root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const val = DICT[lang]?.[key];
      if (val != null) el.setAttribute("aria-label", val);
    });

    root.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      const val = DICT[lang]?.[key];
      if (val != null) el.setAttribute("alt", val);
    });

    root.querySelectorAll("option[data-i18n]").forEach((opt) => {
      const key = opt.getAttribute("data-i18n");
      const val = DICT[lang]?.[key];
      if (val != null) opt.textContent = val;
    });

    const sel = document.getElementById("langSelect");
    if (sel && sel.value !== lang) sel.value = lang;

    const badge = document.getElementById("langBadge");
    if (badge) {
      badge.textContent =
        (lang === "ar") ? (DICT.ar.lang_ar || "AR") :
        (lang === "en") ? (DICT.en.lang_en || "EN") :
        (DICT.ckb.lang_ckb || "کوردی");
    }

    document.querySelectorAll(".lang button[data-lang]").forEach((b) => {
      const bLang = normalizeLang(b.getAttribute("data-lang"));
      b.classList.toggle("active", bLang === lang);
    });
  }

  function setLang(lang) {
    lang = normalizeLang(lang);
    if (!SUPPORTED.includes(lang) && lang !== "ckb") lang = "ar";
    localStorage.setItem(STORAGE_KEY, lang);
    applyToDOM(lang);
    if (typeof window.renderAll === "function") window.renderAll();
  }

  // Observe late-inserted DOM nodes (cards/timeline generated by JS)
  function observeDynamicDOM() {
    const i18nSelector =
      "[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-title],[data-i18n-aria],[data-i18n-alt]";

    const obs = new MutationObserver((mutations) => {
      const lang = getLang();
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;

          const hasI18n =
            (node.matches && node.matches(i18nSelector)) ||
            (node.querySelector && node.querySelector(i18nSelector));

          if (hasI18n) applyToDOM(lang, node);
        });
      }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.I18N = { DICT, t, getLang, setLang, apply: applyToDOM };

  document.addEventListener("DOMContentLoaded", () => {
    observeDynamicDOM();

    const initial = getLang();
    applyToDOM(initial);

    const sel = document.getElementById("langSelect");
    if (sel) {
      sel.value = initial;
      sel.addEventListener("change", (e) => setLang(e.target.value));
    }
  });

})();
