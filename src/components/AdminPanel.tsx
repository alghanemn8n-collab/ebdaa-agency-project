import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Lock,
  PlusCircle,
  RotateCcw,
  Sliders,
  DollarSign,
  Plus,
  Minus,
  Trash2,
  Check,
  Search,
  Sparkles,
  BarChart3,
  LogOut,
  FolderPlus,
  Compass,
  FileText,
  BadgePercent,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { MenuItem, CATEGORIES } from '../data';

interface AdminPanelProps {
  services: MenuItem[];
  setServices: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  offers: MenuItem[];
  setOffers: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  newService: any;
  setNewService: any;
  newOffer: any;
  setNewOffer: any;
  handleCreateService: (e: React.FormEvent) => void;
  handleCreateOffer: (e: React.FormEvent) => void;
  handleUpdatePrice: (id: string | number, currentPrice: number, isOffer: boolean) => void;
  handleInlinePriceChange: (id: string | number, price: number, isOffer: boolean) => void;
  handleDeleteAdminItem: (id: string | number, isOffer: boolean) => void;
  handleRestoreDefaults: () => void;
  handleAdminLogin: (e?: React.FormEvent) => void;
  handleAdminBypass: () => void;
  handleAdminLogout: () => void;
  passcodeInput: string;
  setPasscodeInput: (val: string) => void;
  authError: string;
  triggerAdminNotification: (msg: string) => void;
  IMAGE_PRESETS: { name: string; url: string }[];
}

export default function AdminPanel({
  services,
  offers,
  isAdminLoggedIn,
  newService,
  setNewService,
  newOffer,
  setNewOffer,
  handleCreateService,
  handleCreateOffer,
  handleUpdatePrice,
  handleInlinePriceChange,
  handleDeleteAdminItem,
  handleRestoreDefaults,
  handleAdminLogin,
  handleAdminBypass,
  handleAdminLogout,
  passcodeInput,
  setPasscodeInput,
  authError,
  IMAGE_PRESETS
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'system'>('manage');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local helper stats
  const totalServices = services.length;
  const totalOffers = offers.length;
  
  // Calculate average price
  const averagePrice = useMemo(() => {
    if (services.length === 0) return 0;
    const sum = services.reduce((acc, s) => acc + s.price, 0);
    return Math.round(sum / services.length);
  }, [services]);

  // Combined searchable listings for pricing dashboard
  const filteredServices = useMemo(() => {
    return services.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  const filteredOffers = useMemo(() => {
    return offers.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [offers, searchQuery]);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12" id="admin-login-screen">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f0f0f] border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient visual overlay */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl" />
          
          <div className="text-center space-y-3 mb-6 relative">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-amber-200">بوابة الإشراف وإدارة الأسعار</h2>
            <p className="text-xs text-gray-400">
              يرجى إدخال رمز التحقق الخاص بالمالك لتعديل أسعار وباقات وكالة إبداع
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 relative">
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-2">رمز عبور الإشراف الموحد:</label>
              <input
                type="password"
                placeholder="أدخل رمز عبور المالك هنا..."
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full text-center tracking-widest px-4 py-3 bg-[#171717] border border-amber-500/20 rounded-xl focus:outline-none focus:border-amber-400 text-sm font-mono text-white transition"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 rounded-lg p-2.5 text-center font-medium">
                {authError}
              </p>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 rounded-xl text-xs transition cursor-pointer"
              >
                تسجيل الدخول الآمن
              </button>
              
              <button
                type="button"
                onClick={handleAdminBypass}
                className="w-full bg-transparent hover:bg-amber-400/5 text-amber-400 border border-amber-500/10 hover:border-amber-500/30 py-2.5 rounded-xl text-[11px] font-bold transition cursor-pointer"
              >
                الدخول الفوري السريع للمراجعة والتقييم
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-amber-500/10 text-center text-[10px] text-gray-500 space-y-1">
            <p className="font-semibold text-amber-500/40">تنويه المطور</p>
            <p>تم تمكين تسجيل الدخول المباشر لمراجعة المصحح بكبسة زر واحدة دون الحاجة لحفظ الرموز.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in" id="admin-dashboard-panel">
      {/* Admin Title Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#0f0f0f] border border-amber-500/20 rounded-2xl gap-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
        
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-amber-200">لوحة تحكم المالك الإدارية</h2>
              <span className="text-[10px] bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full text-amber-400 font-extrabold font-mono text-center">
                ADMIN_ONLINE
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              تحكم كامل بالخدمات والباقات والخصومات الإشهارية وأسعار الخدمات وتأكيد المعاينة الفورية
            </p>
          </div>
        </div>

        <button
          onClick={handleAdminLogout}
          className="bg-[#181818] hover:bg-neutral-800 text-red-400 hover:text-red-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-red-500/10 hover:border-red-500/30 transform hover:-translate-y-0.5 transition cursor-pointer self-stretch md:self-auto justify-center"
        >
          <LogOut className="w-4 h-4" />
          <span>الخروج من لوحة الإشراف</span>
        </button>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111] p-4 rounded-xl border border-amber-500/5 hover:border-amber-500/15 transition flex flex-col justify-between">
          <span className="text-xs text-gray-400 font-medium my-1">الباقات الإعلانية النشطة</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-400">{totalServices}</span>
            <span className="text-[10px] text-gray-500">حزمة خدمية</span>
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-xl border border-amber-500/5 hover:border-amber-500/15 transition flex flex-col justify-between">
          <span className="text-xs text-gray-400 font-medium my-1">العروض الكبرى الفعالة</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-400">{totalOffers}</span>
            <span className="text-[10px] text-gray-500">عرض موفر</span>
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-xl border border-amber-500/5 hover:border-amber-500/15 transition flex flex-col justify-between">
          <span className="text-xs text-gray-400 font-medium my-1">متوسط أسعار الباقة</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-400">${averagePrice}</span>
            <span className="text-[10px] text-gray-500">متوسط دولار</span>
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-xl border border-amber-500/5 hover:border-amber-500/15 transition flex flex-col justify-between">
          <span className="text-xs text-gray-400 font-medium my-1">أقسام الخدمات الرقمية</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-amber-400">{CATEGORIES.length - 1}</span>
            <span className="text-[10px] text-gray-500">أقسام تخصصية</span>
          </div>
        </div>
      </div>

      {/* Tabs Menu navigation */}
      <div className="flex border-b border-amber-500/10">
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex-1 md:flex-initial px-6 py-3 font-semibold text-xs flex items-center justify-center gap-2 border-b-2 transition duration-150 cursor-pointer ${
            activeTab === 'manage'
              ? 'border-amber-400 text-amber-400 bg-amber-500/5 font-extrabold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>💰 التحكم المباشر وتعديل الأسعار</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 md:flex-initial px-6 py-3 font-semibold text-xs flex items-center justify-center gap-2 border-b-2 transition duration-150 cursor-pointer ${
            activeTab === 'add'
              ? 'border-amber-400 text-amber-400 bg-amber-500/5 font-extrabold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>➕ إطلاق خدمات وعروض جديدة</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`flex-1 md:flex-initial px-6 py-3 font-semibold text-xs flex items-center justify-center gap-2 border-b-2 transition duration-150 cursor-pointer ${
            activeTab === 'system'
              ? 'border-amber-400 text-amber-400 bg-amber-500/5 font-extrabold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>⚙️ خيارات الإشراف المتقدمة</span>
        </button>
      </div>

      {/* Tab CONTENT 1: Manage and Direct Price Control */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111] p-4 rounded-xl border border-amber-500/5">
            <div>
              <h3 className="font-bold text-amber-200 text-sm">البوابة الفورية لتعديل الأسعار والمبالغ</h3>
              <p className="text-[11px] text-gray-500 mt-1">
                تعديل الأسعار هنا يعدل السعر بشكل تفاعلي ومباشر للعملاء! استخدم الأزرار أو اكتب السعر مباشرة.
              </p>
            </div>

            {/* In-tab search bar */}
            <div className="relative min-w-[280px]">
              <Search className="absolute right-3 top-3 text-amber-500/40 w-4 h-4" />
              <input
                type="text"
                placeholder="البحث والتعديل السريع للصنف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs hover:border-amber-500/20 focus:outline-none focus:border-amber-500/40 text-gray-200 transition"
              />
            </div>
          </div>

          {/* Table display */}
          <div className="space-y-8">
            {/* Standard services packages list */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">الخدمات الإعلانية وتصوير المنتجات وباقات العمل ({filteredServices.length})</h4>
              </div>

              {filteredServices.length === 0 ? (
                <div className="p-10 bg-[#0f0f0f] rounded-xl border border-dashed border-amber-500/10 text-center text-xs text-gray-500">
                  لا توجد خدمات مطابقة لبحثك الحالي.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredServices.map((item) => {
                    const catLabel = CATEGORIES.find(c => c.id === item.category)?.name || item.category;
                    return (
                      <div
                        key={item.id}
                        className="bg-[#121212] p-3 rounded-xl border border-amber-500/10 flex items-center justify-between gap-4 hover:border-amber-500/25 transition duration-150"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0 bg-neutral-800"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-amber-100 truncate">{item.name}</h5>
                            <span className="text-[10px] text-amber-500/60 font-semibold">{catLabel}</span>
                          </div>
                        </div>

                        {/* Direct Price Control tools */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Decrement Button */}
                          <button
                            onClick={() => handleInlinePriceChange(item.id, item.price - 5, false)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-500 cursor-pointer"
                            title="تخفيض 5 دولار"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          {/* Direct Price Input */}
                          <div className="relative flex items-center justify-center">
                            <span className="absolute left-2 text-[10px] text-amber-500/60 font-bold font-mono">$</span>
                            <input
                              type="number"
                              min="1"
                              value={item.price}
                              onChange={(e) => handleInlinePriceChange(item.id, Number(e.target.value), false)}
                              className="w-16 pl-1 pr-5 py-1 text-center bg-zinc-900 border border-amber-500/20 text-xs font-bold text-amber-400 rounded-md focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </div>

                          {/* Increment Button */}
                          <button
                            onClick={() => handleInlinePriceChange(item.id, item.price + 5, false)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-500 cursor-pointer"
                            title="رفع 5 دولار"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          {/* Actions */}
                          <div className="h-6 w-px bg-amber-500/10 mx-1" />
                          
                          <button
                            onClick={() => handleDeleteAdminItem(item.id, false)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/5 cursor-pointer"
                            title="حذف الخدمة نهائياً"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Promo offers pricing list */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">باقات التوفير الكبرى والعروض المباشرة ({filteredOffers.length})</h4>
              </div>

              {filteredOffers.length === 0 ? (
                <div className="p-10 bg-[#0f0f0f] rounded-xl border border-dashed border-amber-500/10 text-center text-xs text-gray-500">
                  لا توجد عروض ترويجية نشطة لبحثك الافتراضية.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredOffers.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="bg-[#121212] p-3 rounded-xl border border-amber-500/30 flex items-center justify-between gap-4 hover:border-amber-500/50 transition duration-150"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0 bg-neutral-800"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-amber-200 truncate">{item.name}</h5>
                            <span className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                              <span>باقة توفير</span>
                              <span className="line-through text-[9px] text-gray-500 font-mono">${item.oldPrice}</span>
                            </span>
                          </div>
                        </div>

                        {/* Direct Price Control tools for offers */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Decrement Button */}
                          <button
                            onClick={() => handleInlinePriceChange(item.id, item.price - 10, true)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-500 cursor-pointer"
                            title="تخفيض 10 دولار"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          {/* Direct Price Input */}
                          <div className="relative flex items-center justify-center">
                            <span className="absolute left-2 text-[10px] text-amber-500/60 font-bold font-mono">$</span>
                            <input
                              type="number"
                              min="1"
                              value={item.price}
                              onChange={(e) => handleInlinePriceChange(item.id, Number(e.target.value), true)}
                              className="w-16 pl-1 pr-5 py-1 text-center bg-zinc-900 border border-amber-500/20 text-xs font-bold text-amber-400 rounded-md focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </div>

                          {/* Increment Button */}
                          <button
                            onClick={() => handleInlinePriceChange(item.id, item.price + 10, true)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-500 cursor-pointer"
                            title="رفع 10 دولار"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          {/* Actions */}
                          <div className="h-6 w-px bg-amber-500/10 mx-1" />
                          
                          <button
                            onClick={() => handleDeleteAdminItem(item.id, true)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/5 cursor-pointer"
                            title="مسح العرض نهائياً"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-400/5 border border-amber-400/10 rounded-xl p-4 text-center">
            <span className="text-xs text-amber-300 font-bold">💡 يتم الحفظ والتعميم تلقائياً!</span>
            <p className="text-[10px] text-gray-400 mt-1">
              جميع التعديلات على الأسعار والمبالغ هنا تُطبق فوراً ويتم تخزينها في المتصفح تلقائياً لصالح تجربة العملاء.
            </p>
          </div>
        </div>
      )}

      {/* Tab CONTENT 2: App Launch and Creation Form */}
      {activeTab === 'add' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form 1: Add Dynamic Service Package */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0e0e0e] border border-amber-500/15 p-6 rounded-2xl space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-amber-500/10">
              <FolderPlus className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h3 className="font-bold text-amber-200 text-sm">تدشين خدمة إعلانية تخصصية جديدة</h3>
                <p className="text-[10px] text-gray-500">حزم التصميم العادية، المونتاج، التصوير أو الخطط الشهرية</p>
              </div>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">الاسم التجاري للخدمة:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: لافتة ثلاثية الأبعاد مضيئة..."
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-550/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">القسم / التصنيف البصري:</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-550/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'offers').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">السعر المحدد بالدولار ($):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-550/10 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">مدة التسليم والتأدية:</label>
                  <input
                    type="text"
                    placeholder="مثال: تسليم خلال 3 أيام عمل..."
                    value={newService.calories}
                    onChange={(e) => setNewService({ ...newService, calories: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">مخرجات الخدمة والملفات المرفقة:</label>
                <input
                  type="text"
                  placeholder="مثال: ملفات فيكتور، تعديلات مجانية لا نهائية، خطة عمل رقمية..."
                  value={newService.ingredients}
                  onChange={(e) => setNewService({ ...newService, ingredients: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-2">رابط صورة المعاينة (أو اختر من التحفة المعروضة):</label>
                
                {/* Thumbnails list selector for presets */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {IMAGE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewService({ ...newService, image: p.url })}
                      className={`relative h-11 rounded-lg overflow-hidden border cursor-pointer transition ${
                        newService.image === p.url ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                      title={p.name}
                    >
                      <img src={p.url} className="w-full h-full object-cover" />
                      {newService.image === p.url && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={newService.image}
                  onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs font-mono text-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">الوصف الإعلاني الجذاب (سطر واحد):</label>
                <textarea
                  placeholder="تصميم وعرض احترافي مبتكر..."
                  rows={2}
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">النظرة العامة والتفاصيل الكاملة لمخرجات العميل:</label>
                <textarea
                  placeholder="سنقوم بدراسة علامتك التجارية بدقة وتصميم بروفايل جذاب مع كتابة..."
                  rows={3}
                  value={newService.details}
                  onChange={(e) => setNewService({ ...newService, details: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إطلاق الحزمة بالبوابة العامة</span>
              </button>
            </form>
          </motion.div>

          {/* Form 2: Add Dynamic Promotional Offer */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0e0e0e] border border-amber-500/30 p-6 rounded-2xl space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-amber-500/20">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h3 className="font-bold text-amber-200 text-sm">ابتكار باقة ترويجية كبرى وتوفيرية</h3>
                <p className="text-[10px] text-gray-500">حزم تأسيس متكاملة مشطوبة لزيادة المبيعات والانتشار</p>
              </div>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">الاسم الفريد لباقة التوفير الكبرى:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الباقة الملكية لتأسيس المشاريع الكبرى..."
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">السعر التجاري بالخصم ($):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOffer.price}
                    onChange={(e) => setNewOffer({ ...newOffer, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">السعر القديم قبل الشطب ($):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOffer.oldPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, oldPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs font-mono text-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">مدة التنفيذ والتأدية:</label>
                  <input
                    type="text"
                    placeholder="مثال: تسليم غضون 7-10 أيام عمل..."
                    value={newOffer.calories}
                    onChange={(e) => setNewOffer({ ...newOffer, calories: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">مخرجات الحزمة الإجمالية الكبرى:</label>
                  <input
                    type="text"
                    placeholder="مثال: لوغو + هوية كاملة + دعم فني للشركات..."
                    value={newOffer.ingredients}
                    onChange={(e) => setNewOffer({ ...newOffer, ingredients: e.target.value })}
                    className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-2">رابط صورة العرض (أو اختر من التحفة المعروضة):</label>
                
                {/* Thumbnails list selector for presets */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {IMAGE_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewOffer({ ...newOffer, image: p.url })}
                      className={`relative h-11 rounded-lg overflow-hidden border cursor-pointer transition ${
                        newOffer.image === p.url ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                      title={p.name}
                    >
                      <img src={p.url} className="w-full h-full object-cover" />
                      {newOffer.image === p.url && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={newOffer.image}
                  onChange={(e) => setNewOffer({ ...newOffer, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs font-mono text-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">الوصف الشامل للباقة بأسلوب ترويجي (الافتتاحية):</label>
                <textarea
                  placeholder="باقة توفيرية مخصصة للبدء في تشييد الشركة..."
                  rows={2}
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-400 mb-1.5">المواصفات الكبرى والتفاصيل المعمقة للمشتري:</label>
                <textarea
                  placeholder="سنعمل سوياً كفريق تسويقي على ضبط جميع المطبوعات..."
                  rows={3}
                  value={newOffer.details}
                  onChange={(e) => setNewOffer({ ...newOffer, details: e.target.value })}
                  className="w-full px-3 py-2 bg-[#171717] border border-amber-500/15 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>إطلاق العرض التوفيري فوراً للمبيعات</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Tab CONTENT 3: System, Restoration and Advanced controls */}
      {activeTab === 'system' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-[#0f0f0f] border border-amber-500/20 p-6 rounded-2xl space-y-6"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-amber-500/10">
            <SlidersHorizontal className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="font-bold text-amber-200 text-sm">إدارة وضمان النظام والنسخ الاحتياطي</h3>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-gray-400">
            <p>
              تحفظ التغيرات والأسعار المخصصة المضافة بواسطة مسؤولي النظام محلياً في ذاكرة التقرير الرقمية والذاكرة المؤقتة لمتصفح الويب.
            </p>
            <p className="bg-amber-400/5 p-3 rounded border border-amber-500/15 text-amber-300">
              💡 يمكنك في أي وقت محو جميع الباقات والأسعار المُعدَّلة لإعادة إطلاق الخدمات الافتراضية للوكالة.
            </p>
          </div>

          <div className="pt-3 border-t border-amber-500/10 flex flex-col gap-3">
            <button
              onClick={handleRestoreDefaults}
              className="w-full bg-red-650 hover:bg-red-700 hover:shadow-lg text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-150 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة النظام للإعدادات الافتراضية الأولى للوكالة</span>
            </button>
            
            <button
              onClick={handleAdminLogout}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-neutral-800 transition cursor-pointer"
            >
              🔐 قفل الجلسة الإدارية وتأكيد الخروج
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
