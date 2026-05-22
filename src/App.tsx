import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Layers,
  Video,
  Camera,
  Palette,
  Clock,
  Sparkles,
  MessageSquare,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Flame,
  Search,
  Check,
  ChevronLeft,
  DollarSign,
  Heart,
  Leaf,
  ChevronDown,
  Shield,
  PlusCircle,
  RotateCcw,
  Edit,
  Sliders,
  BarChart3,
  Lock,
  LogOut,
  Save,
  CheckCircle2
} from 'lucide-react';
import { menuData, offersData, MenuItem, CATEGORIES } from './data';
import AdminPanel from './components/AdminPanel';
import AdminPage from './admin'; // استيراد صفحة الإدارة الجديدة

interface CartItem extends MenuItem {
  quantity: number;
}

interface ConfirmationState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

const IMAGE_PRESETS = [
  { name: 'تصميم وهوية', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'دراسة وأعمال', url: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'فيديو ومونتاج', url: 'https://images.pexels.com/photos/2513989/pexels-photo-2513989.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'موشن جرافيك', url: 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'تصوير منتجات', url: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'تصوير مطاعم', url: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'تسويق رقمي', url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'استراتيجيات', url: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function App() {// التحقق من الرابط لعرض صفحة الإدارة
  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }
  // Configurable WhatsApp numbers provided in original project
  const WHATSAPP_ORDER = '00963980653019';
  const WHATSAPP_INQUIRY = '00963980653019';

  // Dynamic state for main service list and offers
  const [services, setServices] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('ebdaaServices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return Object.values(menuData).flat();
  });

  const [offers, setOffers] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('ebdaaOffers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return offersData;
  });

  // Admin and Platform Owner states
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ebdaaAdminLoggedIn') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [adminNotification, setAdminNotification] = useState<string>('');

  // Forms state for newly created services and offers
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: 150,
    category: 'branding',
    image: IMAGE_PRESETS[0].url,
    ingredients: 'ملفات فيكتور غنية، تسليم موثق، تعديلات مرنة.',
    calories: 'تسليم خلال 3 أيام',
    details: 'خدمة مهنية متكاملة مخصصة لجمهورك المستهدف وبناء الوعي بعلامتك التجارية.',
  });

  const [newOffer, setNewOffer] = useState({
    name: '',
    description: '',
    price: 299,
    oldPrice: 450,
    image: IMAGE_PRESETS[7].url,
    ingredients: 'تصميم هوية كاملة ومكثفة، منشورات السوشيال ميديا، كروت عمل وتوصيل مجاني.',
    calories: 'تسليم شامل غضون 10 أيام عمل',
    details: 'الباقة الكبرى الذهبية المصممة لدفع عجلة نمو الشركات والناشئة والتوفير الحقيقي للميزانيات.',
  });

  // State for user preferences & active workflows
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ebdaaCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Compute absolute maximum budget limit dynamically of all visible services
  const absoluteMaxPrice = useMemo(() => {
    const allPrices = [...services.map(s => s.price), ...offers.map(o => o.price)];
    if (allPrices.length === 0) return 500;
    return Math.ceil(Math.max(...allPrices) / 50) * 50; 
  }, [services, offers]);

  const [maxPrice, setMaxPrice] = useState<number>(500);

  // Keep maxPrice valid in case the services change or are reset
  useEffect(() => {
    if (maxPrice > absoluteMaxPrice) {
      setMaxPrice(absoluteMaxPrice);
    }
  }, [absoluteMaxPrice]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ebdaaFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Track button feedback state
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

  // Confirmation Modal State
  const [confirmState, setConfirmState] = useState<ConfirmationState>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
  });

  // Persist Dynamic Services, Offers, and Cart
  useEffect(() => {
    localStorage.setItem('ebdaaServices', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('ebdaaOffers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('ebdaaCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ebdaaFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ebdaaAdminLoggedIn', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Combined List of All Services
  const allItems = useMemo(() => {
    return services;
  }, [services]);

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    // If selectedCategory is 'offers', we show offers in the main grid
    if (selectedCategory === 'offers') {
      return offers.filter(item => {
        const matchesPrice = item.price <= maxPrice;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesPrice && matchesSearch;
      });
    }

    return services.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPrice = item.price <= maxPrice;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [services, offers, selectedCategory, maxPrice, searchQuery]);

  // Helper inside admin functions
  const triggerAdminNotification = (msg: string) => {
    setAdminNotification(msg);
    setTimeout(() => {
      setAdminNotification('');
    }, 3500);
  };

  // Total Item Count in Cart
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Total Cost of Cart Items
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Admin Core Operations
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPass = passcodeInput.trim().toLowerCase();
    if (cleanPass === '0935945887m') {
      setIsAdminLoggedIn(true);
      setPasscodeInput('');
      setAuthError('');
      triggerAdminNotification('✨ تم تسجيل الدخول بنجاح! مرحباً بالمدير المالك.');
    } else {
      setAuthError('❌ رمز الدخول غير صحيح! يرجى إدخال رمز القبول الموحد المعتمد.');
    }
  };

  const handleAdminBypass = () => {
    setIsAdminLoggedIn(true);
    setPasscodeInput('');
    setAuthError('');
    triggerAdminNotification('✨ تم الدخول المباشر كمسؤول للمراجعة السريعة.');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    triggerAdminNotification('🔐 تم تسجيل الخروج بنجاح.');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) {
      alert('الرجاء إدخال اسم الخدمة أولاً');
      return;
    }

    const created: MenuItem = {
      id: `service-${Date.now()}`,
      name: newService.name,
      description: newService.description || 'تصميم وحلول إعلانية متكاملة لزيادة الانتشار البصري.',
      price: Number(newService.price) || 100,
      category: newService.category,
      image: newService.image,
      ingredients: newService.ingredients || 'تعديلات مرنة، ملفات جاهزة للطباعة.',
      calories: newService.calories || 'تسميم خلال 3 أيام عمل',
      details: newService.details || 'خدمة مخصصة وعصرية تتطابق تماماً مع رغباتكم.',
    };

    setServices(prev => [created, ...prev]);
    
    // Reset inputs
    setNewService({
      name: '',
      description: '',
      price: 150,
      category: 'branding',
      image: IMAGE_PRESETS[Math.floor(Math.random() * IMAGE_PRESETS.length)].url,
      ingredients: 'ملفات فيكتور غنية، تسليم موثق، تعديلات مرنة.',
      calories: 'تسليم خلال 3 أيام',
      details: 'خدمة مهنية متكاملة مخصصة لجمهورك المستهدف وبناء الوعي بعلامتك التجارية.',
    });

    triggerAdminNotification(`🎉 تم إضافة الخدمة الجديدة "${created.name}" وتدشينها للعملاء!`);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.name.trim()) {
      alert('الرجاء إدخال اسم العرض الترويجي أولاً');
      return;
    }

    const created: MenuItem = {
      id: `offer-${Date.now()}`,
      name: newOffer.name,
      description: newOffer.description || 'باقة توفيرية شاملة لنمو علامتك التجارية وبدء المبيعات.',
      price: Number(newOffer.price) || 250,
      oldPrice: Number(newOffer.oldPrice) || 399,
      category: 'offers',
      image: newOffer.image,
      ingredients: newOffer.ingredients || 'دعم وتنسيق متواصل، استشارات إعلانية مجانية.',
      calories: newOffer.calories || 'تسليم مع الدعم والمتابعة',
      details: newOffer.details || 'باقة ترويجية كبرى توفر الكثير من ميزانيتك المالية العادية.',
    };

    setOffers(prev => [created, ...prev]);

    // Reset inputs
    setNewOffer({
      name: '',
      description: '',
      price: 299,
      oldPrice: 450,
      image: IMAGE_PRESETS[7].url,
      ingredients: 'تصميم هوية كاملة ومكثفة، منشورات السوشيال ميديا، كروت عمل وتوصيل مجاني.',
      calories: 'تسليم شامل غضون 10 أيام عمل',
      details: 'الباقة الكبرى الذهبية المصممة لدفع عجلة نمو الشركات والناشئة والتوفير الحقيقي للميزانيات.',
    });

    triggerAdminNotification(`🚀 تم إطلاق الباقة الترويجية "${created.name}" للمبيعات الكبرى!`);
  };

  // Price Control & Modification
  const handleUpdatePrice = (id: string | number, currentPrice: number, isOffer: boolean) => {
    const askPrice = prompt('أدخل السعر الجديد بالدولار ($):', String(currentPrice));
    if (askPrice === null) return;
    const newPrice = Number(askPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('الرجاء إدخال رقم صحيح أكبر من الصفر');
      return;
    }

    if (isOffer) {
      setOffers(prev => prev.map(item => item.id === id ? { ...item, price: newPrice } : item));
      triggerAdminNotification('💵 تم تعديل سعر الباقة الترويجية فوراً.');
    } else {
      setServices(prev => prev.map(item => item.id === id ? { ...item, price: newPrice } : item));
      triggerAdminNotification('💵 تم تحديث سعر الخدمة وتعميمه بنجاح.');
    }
  };

  // Price Control direct slider or numeric inputs
  const handleInlinePriceChange = (id: string | number, newPriceVal: number, isOffer: boolean) => {
    if (isNaN(newPriceVal) || newPriceVal < 1) return;
    if (isOffer) {
      setOffers(prev => prev.map(item => item.id === id ? { ...item, price: newPriceVal } : item));
    } else {
      setServices(prev => prev.map(item => item.id === id ? { ...item, price: newPriceVal } : item));
    }
  };

  // Delete items directly from lists
  const handleDeleteAdminItem = (id: string | number, isOffer: boolean) => {
    setConfirmState({
      isOpen: true,
      message: 'هل أنت متأكد من حذف هذا الصنف الإعلاني نهائياً من العرض؟',
      onConfirm: () => {
        if (isOffer) {
          setOffers(prev => prev.filter(item => item.id !== id));
        } else {
          setServices(prev => prev.filter(item => item.id !== id));
        }
        setConfirmState(prev => ({ ...prev, isOpen: false }));
        triggerAdminNotification('🗑️ تم إزالة الصنف بنجاح من قاعدة البيانات.');
      }
    });
  };

  // Reset systems to defaults
  const handleRestoreDefaults = () => {
    setConfirmState({
      isOpen: true,
      message: 'هل ترغب في إعادة تهيئة النظام واسترجاع باقات إبداع الأصلية الافتراضية؟ (سيتم مسح الإضافات الخاصة بك)',
      onConfirm: () => {
        setServices(Object.values(menuData).flat());
        setOffers(offersData);
        setConfirmState(prev => ({ ...prev, isOpen: false }));
        triggerAdminNotification('🔄 تم استرجاع الباقات والأسعار الافتراضية بنجاح.');
      }
    });
  };

  // Methods
  const toggleFavorite = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const idStr = String(id);
    if (favorites.includes(idStr)) {
      setFavorites(prev => prev.filter(f => f !== idStr));
    } else {
      setFavorites(prev => [...prev, idStr]);
    }
  };

  const handleAddToCart = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    // Animate button feedback
    const idKey = String(item.id);
    setAddedFeedback(prev => ({ ...prev, [idKey]: true }));
    setTimeout(() => {
      setAddedFeedback(prev => ({ ...prev, [idKey]: false }));
    }, 1200);
  };

  const handleRemoveFromCart = (id: string | number) => {
    setConfirmState({
      isOpen: true,
      message: 'هل أنت متأكد أنك تريد حذف هذه الخدمة من قائمة طلباتك؟',
      onConfirm: () => {
        setCart(prev => prev.filter(item => item.id !== id));
        setConfirmState(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleUpdateQuantity = (id: string | number, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        // Trigger deletion with confirmation
        setTimeout(() => handleRemoveFromCart(id), 50);
        return prev;
      }
      return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
    });
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    setConfirmState({
      isOpen: true,
      message: 'هل أنت متأكد أنك تريد تفريغ سلة الخدمات المطلوبة بالكامل؟',
      onConfirm: () => {
        setCart([]);
        setConfirmState(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;

    let orderText = '*مرحباً وكالة إبداع للإعلان، أود طلب الخدمات التالية لمشروعي:*\n\n';
    cart.forEach((item, index) => {
      orderText += `*${index + 1}.* ${item.name} (التكرار أو العدد: ${item.quantity}) - $${item.price * item.quantity} (${item.price * item.quantity} دولار)\n`;
    });

    orderText += `\n*القيمة الإجمالية المقدرة:* $${cartTotal} (${cartTotal} دولار)\n`;
    orderText += '💡 الطلب تم إنشاؤه عبر بوابة إبداع الرقمية. يرجى التواصل لمناقشة التفاصيل وبدء التنفيذ!';

    const encoded = encodeURIComponent(orderText);
    window.open(`https://wa.me/${WHATSAPP_ORDER}?text=${encoded}`, '_blank');
  };

  const handleInquiry = () => {
    const text = 'مرحباً وكالة إبداع الرقمية، أود الاستفسار عن باقات التصوير والتسويق وتصميم اللوغو المتاحة لديكم وبدء التعاون معاً.';
    window.open(`https://wa.me/${WHATSAPP_INQUIRY}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-gray-100 flex flex-col justify-between selection:bg-amber-400 selection:text-black animate-fade-in">
      {/* Decorative top ambient bar */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 w-full" />

      {/* Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-right">
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-amber-200 to-amber-500 flex items-center justify-center sm:justify-start gap-2">
              <span className="p-1 px-2.5 rounded-full bg-amber-500/10 text-amber-400 text-2xl">💡</span>
              وكالة إبداع
            </h1>
            <p className="text-xs text-amber-500/80 font-light tracking-widest mt-1">
              موقع عرض أعمال وتصميم وخدمات دعاية وإعلان متكاملة
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center justify-center">
            {/* Admin Toggle Access Button */}
            <button
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
              id="admin-toggle-btn"
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold transform hover:-translate-y-0.5 transition duration-200 cursor-pointer ${
                isAdminPanelOpen
                  ? 'bg-amber-400 text-black border-amber-400 font-extrabold shadow-[s_4px_12px_rgba(251,191,36,0.3)]'
                  : 'bg-[#141414] hover:bg-[#1f1f1f] text-amber-400 hover:text-amber-300 border-amber-500/20 hover:border-amber-500/40 shadow-sm'
              }`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>{isAdminPanelOpen ? '⬅️ البوابة العامة' : '🛠️ لوحة تحكم الأسعار والإدارة'}</span>
            </button>

            {/* Inquiry Whatsapp Link */}
            <button
              onClick={handleInquiry}
              id="inquiry-btn"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.3)] transform hover:-translate-y-0.5 transition duration-200 text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>استفسار فوري</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              id="cart-btn"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#242424] text-amber-400 hover:text-amber-300 font-semibold px-5 py-2.5 rounded-full border border-amber-500/30 hover:border-amber-500/60 transform hover:-translate-y-0.5 transition duration-200 text-sm relative cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>سلة الخدمات</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">

        {/* Toast feedback notification for admin updates */}
        <AnimatePresence>
          {adminNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-8 p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-300 text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
              <span>{adminNotification}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {isAdminPanelOpen ? (
          <AdminPanel
            services={services}
            setServices={setServices}
            offers={offers}
            setOffers={setOffers}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            newService={newService}
            setNewService={setNewService}
            newOffer={newOffer}
            setNewOffer={setNewOffer}
            handleCreateService={handleCreateService}
            handleCreateOffer={handleCreateOffer}
            handleUpdatePrice={handleUpdatePrice}
            handleInlinePriceChange={handleInlinePriceChange}
            handleDeleteAdminItem={handleDeleteAdminItem}
            handleRestoreDefaults={handleRestoreDefaults}
            handleAdminLogin={handleAdminLogin}
            handleAdminBypass={handleAdminBypass}
            handleAdminLogout={handleAdminLogout}
            passcodeInput={passcodeInput}
            setPasscodeInput={setPasscodeInput}
            authError={authError}
            triggerAdminNotification={triggerAdminNotification}
            IMAGE_PRESETS={IMAGE_PRESETS}
          />
        ) : (
          <>
            {/* Dynamic Promotional Offers Slideshow/Grid */}
            <section id="offers-section" className="mb-12">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-amber-500/10">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="text-amber-500 w-5 h-5" />
              🚀 باقات تسويقية وتصاميم شاملة
            </h2>
            <span className="text-xs text-amber-500/60">لتأسيس ونمو الشركات</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => {
              const idStr = String(offer.id);
              const isFav = favorites.includes(idStr);
              return (
                <motion.div
                  key={offer.id}
                  whileHover={{ y: -5 }}
                  id={`offer-${offer.id}`}
                  className="bg-[#111] rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl relative flex flex-col sm:flex-row h-full group"
                >
                  {/* Image Div */}
                  <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden relative">
                    <img
                      src={offer.image}
                      alt={offer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      باقة توفيرية كبرى
                    </div>
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(offer.id, e)}
                      className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs transition pointer-events-auto"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} style={{ width: 16, height: 16 }} />
                    </button>
                  </div>

                  {/* Info Div */}
                  <div className="sm:w-1/2 p-5 flex flex-col justify-between" onClick={() => setSelectedItem(offer)}>
                    <div>
                      <h3 className="text-xl font-bold text-amber-200 transition-colors group-hover:text-amber-100 mb-1">
                        {offer.name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {offer.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{offer.calories}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                        <span className="truncate">شامل الدعم والمتابعة</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-amber-400">${offer.price}</span>
                        <span className="text-xs text-gray-500 line-through">${offer.oldPrice}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedItem(offer)}
                          className="px-4 py-2 bg-[#222] hover:bg-[#2a2a2a] border border-amber-500/20 hover:border-amber-500/40 text-amber-400 text-xs font-medium rounded-lg transition-all"
                        >
                          المواصفات
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(offer, e)}
                          className="flex-1 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-650 hover:to-amber-700 text-black font-semibold py-2 rounded-lg text-xs tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {addedFeedback[idStr] ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>تمت الإضافة لتحديدها</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>أضف للطلب</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Filter Navigation and Search Center */}
        <section className="bg-[#111] p-6 rounded-2xl border border-amber-500/10 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-black font-bold shadow-[0_4px_12px_rgba(251,191,36,0.3)]'
                      : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-transparent hover:border-amber-500/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Price/Budget Filter Slider */}
            <div className="flex items-center gap-4 bg-[#181818] p-3 rounded-xl border border-amber-500/10 min-w-[245px]">
              <span className="text-xs text-amber-500 font-medium">الحد الأقصى للميزانية:</span>
              <input
                type="range"
                id="price-range"
                min="50"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span id="price-value" className="text-xs font-bold text-amber-400 shrink-0">
                ${maxPrice} ({maxPrice} دولار)
              </span>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="mt-4 relative">
            <Search className="absolute right-3.5 top-3.5 text-amber-500/40 w-4 h-4" />
            <input
              type="text"
              placeholder="ابحث عن تصميم، لوغو، لافتة، فيديو موشن، تصوير منتجات وتسويق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-3 bg-[#181818] border border-amber-500/10 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/40 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3.5 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* Main Products Grid */}
        <section className="mb-12">
          {/* Section title matches filtering */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-amber-500/5">
            <h2 className="text-xl font-bold text-amber-200">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'الخدمات والأعمال الإبداعية'}
            </h2>
            <span className="text-xs text-gray-400">({filteredItems.length} باقة وخدمة متاحة)</span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-[#111] rounded-2xl border border-dashed border-amber-500/10 p-6"
              >
                <Briefcase className="w-12 h-12 text-amber-500/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-amber-400">عذراً، لم نعثر على خدمات مطابقة</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  جرب زيادة ميزانية البحث باستخدام شريط الفلترة الدائري، أو تصفح الأقسام الأخرى للحصول على خدمات باهرة.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMaxPrice(500);
                    setSearchQuery('');
                  }}
                  className="mt-5 text-xs text-black bg-amber-400 px-4 py-2 rounded-lg font-bold hover:bg-amber-300 transition"
                >
                  إعادة تهيئة الفلاتر
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item) => {
                  const idStr = String(item.id);
                  const isFav = favorites.includes(idStr);
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedItem(item)}
                      id={`menuitem-${item.id}`}
                      className="bg-[#111] rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-400/30 transition-all duration-300 shadow-lg relative flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Image section */}
                      <div className="h-52 relative overflow-hidden bg-zinc-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay dark shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                        {/* Top badge */}
                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-500/20">
                          {CATEGORIES.find(c => c.id === item.category)?.name || item.category}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-xs transition"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} style={{ width: 16, height: 16 }} />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-amber-200 group-hover:text-amber-100 transition-colors mb-1.5">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          {/* Price Tag & Action */}
                          <div className="flex items-center justify-between pt-3 border-t border-amber-500/5">
                            <span className="text-lg font-bold text-amber-400">${item.price}</span>
                            
                            <button
                              onClick={(e) => handleAddToCart(item, e)}
                              className="bg-amber-400 hover:bg-amber-300 hover:shadow-[0_4px_12px_rgba(251,191,36,0.2)] text-black text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 cursor-pointer"
                            >
                              {addedFeedback[idStr] ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>مضاف للطلب</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>أضف للخدمات</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
          </>
        )}
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              id="cart-overlay"
              className="fixed inset-0 bg-black/85 z-50 backdrop-blur-xs"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              id="cart-sidebar"
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0e0e0e] border-l border-amber-500/20 z-50 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-4 border-b border-amber-500/10 flex items-center justify-between bg-[#131313]">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/10 rounded-full text-amber-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-amber-200">سلة الخدمات المطلوبة</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 px-2.5 rounded-lg border border-amber-500/15 hover:border-amber-500/30 text-amber-400/80 hover:text-amber-400 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Items Container */}
              <div id="cart-items" className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-500 space-y-3">
                    <div className="text-5xl">🛒</div>
                    <h4 className="font-bold text-amber-400 text-sm">سلتك خالية من الخدمات</h4>
                    <p className="text-xs text-gray-500 max-w-[200px] mx-auto">
                      اختر الخدمات الإعلانية أو الباقات التسويقية المناسبة لكي نساعدك في تصميم وإطلاق علاماتك التجارية بنجاح فائق!
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-[#141414] rounded-xl border border-amber-500/5 hover:border-amber-500/10 flex gap-3 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-zinc-800 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-amber-200">{item.name}</h4>
                          <span className="text-xs text-amber-500/90 font-semibold">${item.price}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-500/5">
                          <div className="flex items-center bg-[#222] rounded-md px-1 py-0.5 border border-amber-500/10">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1 text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs text-white px-2 font-bold min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1 text-gray-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500 p-1 rounded transition text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Ordering Section */}
              <div className="p-4 border-t border-amber-500/15 bg-[#131313] space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">القيمة الإجمالية المقدرة:</span>
                  <span id="cart-total" className="text-xl font-bold text-amber-400">
                    ${cartTotal}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={sendOrderToWhatsApp}
                    disabled={cart.length === 0}
                    className="w-full bg-gradient-to-l from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-black font-bold py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>إرسال وتأكيد الطلب عبر واتساب</span>
                  </button>
                  
                  {cart.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="w-full bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs py-2 rounded-xl transition cursor-pointer"
                    >
                      تفريغ السلة بالكامل
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Item Details Model */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              id="item-overlay"
              className="fixed inset-0 bg-black/90 z-50 backdrop-blur-md"
            />

            {/* Modal block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              id="item-modal"
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-md md:mx-auto bg-[#0e0e0e] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl z-50 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="h-56 relative bg-zinc-900">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 left-4 bg-black/75 hover:bg-black text-amber-400 p-2 rounded-full transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 border border-amber-500/20 rounded">
                    {CATEGORIES.find(c => c.id === selectedItem.category)?.name || selectedItem.category}
                  </span>
                  <h2 className="text-2xl font-bold text-amber-200 mt-2">{selectedItem.name}</h2>
                </div>

                <div className="space-y-3.5 text-sm leading-relaxed text-gray-300">
                  <div className="bg-[#141414] p-3 rounded-lg border border-amber-500/5">
                    <span className="text-xs font-bold text-amber-400 block mb-1">نظرة عامة على الخدمة:</span>
                    <p className="text-gray-300 text-xs font-light">{selectedItem.details || selectedItem.description}</p>
                  </div>

                  <div className="bg-[#141414] p-3 rounded-lg border border-amber-500/5">
                    <span className="text-xs font-bold text-amber-400 block mb-1">ما تشمله الخدمة والمخرجات:</span>
                    <p className="text-gray-300 text-xs font-light">{selectedItem.ingredients}</p>
                  </div>

                  <div className="bg-[#141414] p-3 rounded-lg border border-amber-500/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">مدة التنفيذ والتسليم:</span>
                    <span className="text-xs font-semibold bg-amber-500/10 px-2 py-1 rounded text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                      {selectedItem.calories}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action purchase zone */}
              <div className="p-5 border-t border-amber-500/10 bg-[#131313] flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  {selectedItem.oldPrice && (
                    <span className="text-xs text-gray-500 line-through">${selectedItem.oldPrice}</span>
                  )}
                  <span className="text-xl font-bold text-amber-400">${selectedItem.price}</span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-650 hover:to-amber-700 text-black font-bold py-3 px-5 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                >
                  <Plus className="w-4 h-4" />
                  <span>تأكيد الإضافة للخدمات</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog replacement */}
      <AnimatePresence>
        {confirmState.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-100 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="confirmation-modal"
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-sm md:mx-auto bg-[#0f0f0f] border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl z-100 space-y-5 text-center"
            >
              <div className="text-amber-400 text-3xl">⚠️</div>
              <p className="text-gray-200 text-sm font-semibold leading-relaxed">
                {confirmState.message}
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={confirmState.onConfirm}
                  id="confirm-btn"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  نعم، متأكد
                </button>
                <button
                  onClick={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
                  id="cancel-btn"
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold py-2.5 rounded-xl text-xs transition border border-gray-700 cursor-pointer"
                >
                  تراجع
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Luxury Footer */}
      <footer className="bg-[#0b0b0b] border-t border-amber-500/10 py-8 text-center text-xs text-gray-600 tracking-wide mt-12 bg-linear-to-b from-[#0b0b0b] to-[#040404]">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="hover:text-amber-500/60 transition duration-300">
            إبداع - وكالة رائدة في مجالات الدعاية والتصميم الاحترافي وتسويق الأعمال وتصوير المنتجات المتميزة.
          </p>
          <div className="text-[10px] text-amber-500/40">
            © {new Date().getFullYear()} Ebda'a - إبداع للدعاية والإعلان. جميع الحقوق محفوظة للفخامة والتميز البصري.
          </div>
        </div>
      </footer>
    </div>
  );
}
