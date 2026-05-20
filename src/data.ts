export interface MenuItem {
  id: number | string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  ingredients: string;
  calories: string;
  details: string;
}

export interface Category {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل' },
  { id: 'branding', name: 'تصميم لوغو وهويات' },
  { id: 'video', name: 'إنتاج وفيديوهات' },
  { id: 'printing', name: 'خدمات طباعة ولافتات' },
  { id: 'photography', name: 'تصوير المنتجات' },
  { id: 'marketing', name: 'تخطيط وتسويق' },
];

export const menuData: Record<string, MenuItem[]> = {
  branding: [
    {
      id: 1,
      name: "تصميم لوغو احترافي",
      description: "تصميم شعار فريد يعبر عن روح مشروعك بدقة وإبداع مع 3 نماذج أولية للتعديل.",
      price: 150,
      category: "branding",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "تجهيز الشعار بصيغ فيكتور عالية الدقة SVG, PNG, PDF قابلة للتكبير اللانهائي.",
      calories: "تسليم خلال 3 أيام عمل",
      details: "نقوم بدراسة فكرة مشروعك والجمهور المستهدف وتصميم لوغو مبتكر يعكس الهوية البصرية للعلامة التجارية لترك انطباع دائم وفوري."
    },
    {
      id: 2,
      name: "هوية بصرية كاملة للشركات",
      description: "بناء الهوية المتكاملة للعلامات التجارية تشمل الألوان والخطوط والأوراق الرسمية.",
      price: 350,
      category: "branding",
      image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "اللوغو الرئيسي، بطاقة العمل، ورق المراسلات الرسمي، ظروف الخطابات الكبيرة والصغيرة، دليل الهوية (Brandbook).",
      calories: "تسليم خلال 7 أيام عمل",
      details: "دليل بصرية موحد يتيح لشركتك الحفاظ على مظهر متسق وعصري عبر كافة منصاتها المطبوعة والرقمية."
    },
    {
      id: 3,
      name: "تصميم ملف الشركة البروفايل",
      description: "تصميم بروفايل الشركة التعريفي الجذاب (Company Profile) لعرض رؤيتكم وأعمالكم.",
      price: 120,
      category: "branding",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "كتيب بروفايل جاهز للطباعة وللنشر الإلكتروني التفاعلي بحدود 12 صفحة عصرية.",
      calories: "تسليم خلال 4 أيام عمل",
      details: "كتابة وتنسيق محتوى بروفايل الشركة بأسلوب تسويقي فاخر يليق باجتماعاتكم الرسمية مع كبار العملاء."
    }
  ],
  video: [
    {
      id: 4,
      name: "فيديو موشن جرافيك ترويجي",
      description: "تصميم فيديو موشن ترويجي مع تعليق صوتي احترافي يجذب عملاءك بشكل فعال.",
      price: 250,
      category: "video",
      image: "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "كتابة السيناريو، رسم العناصر الخاصة، تحريك الرسوم، الهندسة الصوتية والتعليق الاحترافي.",
      calories: "تسليم مدته 60 ثانية",
      details: "نحول خدماتك المعقدة إلى قصة مرئية شيقة وبسيطة تزيد من مبيعاتك وتزيد من وعي الجمهور بعلامتك التجارية."
    },
    {
      id: 5,
      name: "مونتاج وتحرير الفيديو (Reels/TikTok)",
      description: "صناعة وتعديل فيديوهات قصيرة جذابة لمنصات التواصل الاجتماعي لزيادة التفاعل.",
      price: 80,
      category: "video",
      image: "https://images.pexels.com/photos/2513989/pexels-photo-2513989.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "مؤثرات بصرية وصوتية، نصوص متحركة سريعة الانتقال، اختيار إيقاع الموسيقى المناسب والمطابق لتريند اليوم.",
      calories: "تسليم خلال 24 ساعة",
      details: "مظهر مذهل لفيديوهاتك برتم سريع يجذب المشاهد منذ أول 3 ثوانٍ ويضمن بقائه متابعاً للنهاية."
    }
  ],
  printing: [
    {
      id: 6,
      name: "تصميم وتركيب لافتات إعلانية",
      description: "تصميم لافتتك الخارجية للمحل أو الشركة بأحدث التقنيات البارزة والمضيئة.",
      price: 400,
      category: "printing",
      image: "https://images.pexels.com/photos/4126157/pexels-photo-4126157.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "لافتات حروف بارزة مضيئة ليد، فليكس، أو أكليريك خارجي مقاوم لظروف الطقس وصعب الخدش.",
      calories: "تشمل التصميم والمصنعية",
      details: "إبراز مدخل متجرك أو شركتك بأسلوب جذاب للأنظار يجذب المارة والزبائن على مدار اليوم."
    },
    {
      id: 7,
      name: "طباعة رول اب وبنرات كبرى",
      description: "طباعة لافتات الرول آب المتحركة وبنرات المعارض بدقة عالية وخامات ممتازة تسمح بالنقل.",
      price: 90,
      category: "printing",
      image: "https://images.pexels.com/photos/3801456/pexels-photo-3801456.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "حامل رول آب ألومنيوم قوي، طباعة مقاومة للماء والترسب الشمسي بدقة لا تقل عن 1440 DPI.",
      calories: "تسليم فوري خلال يومين",
      details: "مثالية للمؤتمرات والمعارض الحية والفعاليات التسويقية لإظهار منتجاتك بوضوح مميز."
    }
  ],
  photography: [
    {
      id: 8,
      name: "تصوير منتجات سينمائي / احترافي",
      description: "جلسة تصوير احترافية لمنتجاتك بأحدث كاميرات الاستوديو والإضاءة المخصصة للبيع والدعاية والمتاجر.",
      price: 180,
      category: "photography",
      image: "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "كاميرات بدقة 4K وعدسات ماكرو متخصصة، خلفيات تبرز ألوان المنتجات، وتعديل الألوان والعيوب.",
      calories: "جلسة تشمل 15 صورة معدلة",
      details: "إبراز أدق الملامح والجودة لمنتجك بما يزرع الثقة لدى المتسوق ويسرع قراره في الشراء عبر موقعك أو المتجر الإلكتروني."
    },
    {
      id: 9,
      name: "تصوير الأطعمة للمطاعم والمنيو",
      description: "إبراز الوجبات وسحر الأطباق بأسلوب شهي يثير حواس الزبائن ويحقق مبيعات خيالية.",
      price: 220,
      category: "photography",
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "إكسسوارات المائدة، إضاءة غنية، وتصوير مباشر في مطبخكم لعرض نضارة المكونات.",
      calories: "جلسة تصوير للمنيو كامل",
      details: "صور مخصصة للمطاعم لجذب طلبات التوصيل أو تزيين المنيو المطبوع والإلكتروني بصور حقيقية بنسبة 100%."
    }
  ],
  marketing: [
    {
      id: 10,
      name: "إدارة وتصميم السوشيال ميديا الشهري",
      description: "باقة كاملة لتخطيط ورسم ونشر منشورات حساباتك التفاعلية وزيادة الأرقام.",
      price: 300,
      category: "marketing",
      image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "كتابة خطة شهرية، تصاميم سوشيال ميديا (12 منشور)، كتابة المحتوى الإعلاني الابتكاري التفاعلي.",
      calories: "خدمة شهرية مستمرة",
      details: "نحن ندير تفاعلك لنضمن ترشيح خوارزميات إنستغرام وتيك توك لحساباتك إلى جمهورك المهمت بخدماتك الحقيقية."
    },
    {
      id: 15,
      name: "إطلاق حملة إعلانية ممولة",
      description: "إعداد وإطلاق حملة إعلانية مستهدفة على غوغل، إنستغرام أو فيسبوك للوصول لمبيعات فورية.",
      price: 150,
      category: "marketing",
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600",
      ingredients: "تحديد الفئات بدقة، صياغة الإعلانات الجذابة، وإقرار ميزانية مثالية تحقق أعلى عائد مالي ROI.",
      calories: "تشمل الإعداد الأولي والمتابعة",
      details: "الوصول بالخدمة أو السلعة للجمهور المترقب للشراء فعلياً، مع تقديم تقارير تفصيلية أسبوعية عن النتائج والمبيعات الفورية."
    }
  ]
};

export const offersData: MenuItem[] = [
  {
    id: 'offer1',
    name: "باقة رائد الأعمال المتكاملة للشروع بالعمل",
    description: "تصميم لوغو احترافي + هوية بصرية أساسية + تصميم 5 منشورات إفتتاحية + طباعة 500 كرت شخصي فاخر.",
    price: 380,
    oldPrice: 520,
    category: "offers",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600",
    ingredients: "تصميم شعار، أوراق مراسلات، بصمة للمنشورات، طباعة كروت شخصية وتوصيلها لمقر عملك مجاناً.",
    calories: "تسليم الباقة بالكامل خلال 10 أيام",
    details: "باقة رائعة تنهي مشكلة تشتت المظهر البصري لشركاتك الناشئة وتوفر مظهرًا موحدًا يثير اهتمام وثقة المستثمرين والزبائن الحقيقيين."
  },
  {
    id: 'offer2',
    name: "باقة الفيديو للمتاجر الإلكترونية",
    description: "جلسة تصوير لـ 5 منتجات متميزة + مونتاج فيديو إعلاني مدته 30 ثانية + تجهيز نص مخصص للحملة الممولة.",
    price: 260,
    oldPrice: 340,
    category: "offers",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
    ingredients: "إنتاج وبث، كتابة سيناريو مشوق، إضاءة احترافية، ومونتاج سينمائي يناسب سناب شات وإنستغرام.",
    calories: "تسليم سريع غضون 5 أيام",
    details: "حل فائق الفعّالية يسوق خدماتك ويوضح قيمتها في فيديو جذاب يزيد معدل التحويل (CTR) بمتجرك بأكثر من 40%."
  }
];
