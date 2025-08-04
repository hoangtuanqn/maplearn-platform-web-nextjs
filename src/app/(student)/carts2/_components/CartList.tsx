"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  CreditCard, 
  CheckCircle,
  User,
  Clock,
  BookOpen,
  Share2,
  Tag,
  Truck,
  Shield,
  ArrowRight,
  Percent,
  Users,
  Play,
  Download,
  Bookmark,
  AlertCircle,
  X,
  Zap,
  TrendingUp,
  Award,
  Timer,
  Globe
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { formatter } from "~/libs/format";

// Mock data cho giỏ hàng với nhiều tính năng
const mockCartItems = [
  {
    id: 1,
    thumbnail: "https://mapstudy.sgp1.digitaloceanspaces.com/course/3sddw0g008b0/2k9-xuat-phat-som-mon-tieng-anh---lop-11-1751535827405.png",
    title: "Xuất phát sớm môn Tiếng Anh - Lớp 11",
    teacher: "Cô Nguyễn Thị Mai",
    rating: 4.8,
    totalReviews: 1250,
    originalPrice: 800000,
    salePrice: 600000,
    discount: 25,
    quantity: 1,
    slug: "xuat-phat-som-mon-tieng-anh-lop-11",
    duration: "40 giờ",
    lessons: 85,
    level: "Trung cấp",
    isNew: false,
    isBestseller: true,
    isHot: false,
    tags: ["Tiếng Anh", "THPT", "Ôn thi"],
    lastUpdated: "2024-01-15",
    category: "Ngôn ngữ",
    certificate: true,
    lifetime: true,
    downloadable: true,
    mobile: true
  },
  {
    id: 2,
    thumbnail: "https://mapstudy.sgp1.digitaloceanspaces.com/course/5g5keb800q23/tong-on-toan-dien-360-do-mon-toan---lop-12-1746425848436.png",
    title: "Tổng ôn toàn diện 360 độ môn Toán - Lớp 12",
    teacher: "Thầy Pham Văn An",
    rating: 4.9,
    totalReviews: 2100,
    originalPrice: 1200000,
    salePrice: 900000,
    discount: 25,
    quantity: 2,
    slug: "tong-on-toan-dien-360-do-mon-toan-lop-12",
    duration: "60 giờ",
    lessons: 120,
    level: "Nâng cao",
    isNew: false,
    isBestseller: false,
    isHot: true,
    tags: ["Toán học", "THPT", "Luyện thi"],
    lastUpdated: "2024-02-10",
    category: "Toán học",
    certificate: true,
    lifetime: true,
    downloadable: false,
    mobile: true
  },
  {
    id: 3,
    thumbnail: "https://mapstudy.sgp1.digitaloceanspaces.com/course/7h9keb800q45/ly-thuyet-va-bai-tap-vat-ly-lop-10-1746425848999.png",
    title: "Lý thuyết và bài tập Vật lý - Lớp 10",
    teacher: "Thầy Lê Minh Tuấn",
    rating: 4.7,
    totalReviews: 890,
    originalPrice: 700000,
    salePrice: 525000,
    discount: 25,
    quantity: 1,
    slug: "ly-thuyet-va-bai-tap-vat-ly-lop-10",
    duration: "35 giờ",
    lessons: 70,
    level: "Cơ bản",
    isNew: true,
    isBestseller: false,
    isHot: false,
    tags: ["Vật lý", "THPT", "Cơ bản"],
    lastUpdated: "2024-03-01",
    category: "Khoa học",
    certificate: true,
    lifetime: false,
    downloadable: true,
    mobile: true
  }
];

// Mock coupons
const availableCoupons = [
  { code: "MAPLEARN10", discount: 10, minAmount: 0, description: "Giảm 10% cho tất cả khóa học" },
  { code: "STUDENT25", discount: 25, minAmount: 1000000, description: "Giảm 25% cho đơn hàng từ 1.000.000đ" },
  { code: "NEWBIE50", discount: 50, minAmount: 500000, description: "Giảm 50% cho học viên mới" }
];

const CartList = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [_savedItems, setSavedItems] = useState<number[]>([]);
  const [_showCouponSuggestions, setShowCouponSuggestions] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map(item => item.id));
  const [isProcessing, setIsProcessing] = useState(false);
  const [_showShareModal, _setShowShareModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Tính toán tổng tiền cho các item được chọn
  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
  const totalDiscount = selectedCartItems.reduce((sum, item) => sum + ((item.originalPrice - item.salePrice) * item.quantity), 0);
  const couponDiscount = appliedCoupon ? Math.min(subtotal * (appliedCoupon.discount / 100), 500000) : 0;
  const finalTotal = subtotal - couponDiscount;

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle item selection
  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Select all items
  const selectAllItems = () => {
    setSelectedItems(cartItems.map(item => item.id));
  };

  // Deselect all items
  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  // Save item for later
  const saveForLater = (id: number) => {
    setSavedItems(prev => [...prev, id]);
    removeItem(id);
    showNotification("Đã lưu khóa học để xem sau", "success");
  };

  // Share cart
  const shareCart = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Đã sao chép link giỏ hàng", "success");
  };

  // Xử lý thay đổi số lượng
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Áp dụng coupon
  const applyCoupon = () => {
    const foundCoupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase() && subtotal >= c.minAmount
    );
    
    if (foundCoupon) {
      setAppliedCoupon({ code: foundCoupon.code, discount: foundCoupon.discount });
      setCouponCode("");
      showNotification(`Áp dụng mã giảm giá thành công! Giảm ${foundCoupon.discount}%`, "success");
    } else {
      showNotification("Mã giảm giá không hợp lệ hoặc không đủ điều kiện", "error");
    }
  };

  // Auto-suggest best coupon
  const suggestBestCoupon = () => {
    const validCoupons = availableCoupons.filter(c => subtotal >= c.minAmount);
    if (validCoupons.length > 0) {
      const bestCoupon = validCoupons.reduce((best, current) => 
        current.discount > best.discount ? current : best
      );
      setCouponCode(bestCoupon.code);
      setShowCouponSuggestions(true);
      showNotification(`Gợi ý mã tốt nhất: ${bestCoupon.code} - Giảm ${bestCoupon.discount}%`, "info");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
            {notification.type === 'error' && <X className="h-5 w-5" />}
            {notification.type === 'info' && <AlertCircle className="h-5 w-5" />}
            {notification.message}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="t1-flex-center h-16 w-16 rounded-2xl bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {cartItems.length}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary sm:text-4xl mb-2">
                  Giỏ hàng của bạn
                </h1>
                <div className="flex items-center gap-4 text-sm text-secondary-typo">
                  <span>{cartItems.length} khóa học</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">
                    Tiết kiệm {formatter.number(totalDiscount)}đ
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={shareCart}
                className="gap-2 hover:bg-primary hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Chia sẻ
              </Button>
              <Button 
                variant="outline"
                onClick={suggestBestCoupon}
                className="gap-2 hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Zap className="h-4 w-4" />
                Tìm ưu đãi
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Tổng bài học</div>
                  <div className="font-bold text-primary">
                    {cartItems.reduce((sum, item) => sum + item.lessons, 0)} bài
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Thời lượng</div>
                  <div className="font-bold text-primary">
                    {cartItems.reduce((sum, item) => sum + parseInt(item.duration), 0)} giờ
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Chứng chỉ</div>
                  <div className="font-bold text-primary">
                    {cartItems.filter(item => item.certificate).length} khóa học
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Đánh giá TB</div>
                  <div className="font-bold text-primary">
                    {(cartItems.reduce((sum, item) => sum + item.rating, 0) / cartItems.length).toFixed(1)}/5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk actions */}
          {cartItems.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length}
                      onChange={() => 
                        selectedItems.length === cartItems.length 
                          ? deselectAllItems() 
                          : selectAllItems()
                      }
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium">
                      Chọn tất cả ({selectedItems.length}/{cartItems.length})
                    </span>
                  </label>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Đã chọn: </span>
                  <span className="font-bold text-primary">
                    {formatter.number(selectedCartItems.reduce((sum, item) => sum + item.salePrice * item.quantity, 0))}đ
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          // Enhanced empty cart state
          <div className="t1-flex-center min-h-[500px] flex-col rounded-2xl bg-white p-16 shadow-lg border border-slate-100">
            <div className="relative mb-8">
              <div className="t1-flex-center h-32 w-32 rounded-full bg-gradient-to-r from-slate-100 to-blue-100">
                <ShoppingCart className="h-16 w-16 text-slate-400" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-4 w-4 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-3">Giỏ hàng trống</h2>
            <p className="text-slate-500 text-center mb-8 max-w-md leading-relaxed">
              Hãy khám phá hàng nghìn khóa học chất lượng cao với giảng viên kinh nghiệm và phương pháp học hiện đại
            </p>
            <div className="flex gap-4">
              <Link href="/courses">
                <Button size="lg" className="bg-primary hover:bg-primary-light gap-2 px-8">
                  <BookOpen className="h-5 w-5" />
                  Khám phá khóa học
                </Button>
              </Link>
              <Link href="/teachers">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <Users className="h-5 w-5" />
                  Tìm giảng viên
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Enhanced Cart Items */}
            <div className="flex-1">
              <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-5 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                      <ShoppingCart className="h-6 w-6" />
                      Danh sách khóa học ({cartItems.length})
                    </h2>
                    <div className="text-sm text-slate-600">
                      Tổng giá trị: <span className="font-bold text-primary">{formatter.number(subtotal)}đ</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 transition-all duration-300 group">
                      <div className="flex gap-5">
                        {/* Enhanced Course thumbnail */}
                        <div className="relative shrink-0">
                          {/* Selection checkbox */}
                          <div className="absolute -top-2 -left-2 z-10">
                            <input 
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                              className="w-5 h-5 text-primary bg-white border-2 border-gray-300 rounded focus:ring-primary shadow-lg"
                            />
                          </div>

                          <Link href={`/courses/${item.slug}`} className="block relative">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              width={140}
                              height={140}
                              className="aspect-square rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                            />
                            
                            {/* Play overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center">
                              <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </Link>

                          {/* Badges */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1">
                            {item.discount > 0 && (
                              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                -{item.discount}%
                              </div>
                            )}
                            {item.isNew && (
                              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                Mới
                              </div>
                            )}
                            {item.isBestseller && (
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                Bán chạy
                              </div>
                            )}
                            {item.isHot && (
                              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                🔥 Hot
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Course info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                              <Link 
                                href={`/courses/${item.slug}`}
                                className="text-primary hover:text-primary-light transition-colors"
                              >
                                <h3 className="font-bold text-lg line-clamp-2 mb-3 group-hover:text-primary-light transition-colors">
                                  {item.title}
                                </h3>
                              </Link>
                              
                              <div className="flex items-center gap-3 text-sm text-secondary-typo mb-3">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span className="font-medium">{item.teacher}</span>
                                </div>
                                <span className="text-slate-300">•</span>
                                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                                  {item.category}
                                </span>
                              </div>

                              {/* Enhanced features row */}
                              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  <span>{item.lessons} bài học</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.level === 'Cơ bản' ? 'bg-green-100 text-green-700' :
                                  item.level === 'Trung cấp' ? 'bg-blue-100 text-blue-700' :
                                  'bg-purple-100 text-purple-700'
                                }`}>
                                  {item.level}
                                </span>
                                {item.lifetime && (
                                  <div className="flex items-center gap-1 text-emerald-600">
                                    <Globe className="h-3 w-3" />
                                    <span>Truy cập trọn đời</span>
                                  </div>
                                )}
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.slice(0, 3).map((tag, index) => (
                                  <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {/* Rating and features */}
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <Rating style={{ maxWidth: 85 }} value={item.rating} readOnly />
                                  <span className="text-sm font-bold text-[#FFB23F]">{item.rating}</span>
                                  <span className="text-sm text-slate-500">({formatter.number(item.totalReviews)})</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-xs">
                                  {item.certificate && (
                                    <div className="flex items-center gap-1 text-purple-600">
                                      <Award className="h-3 w-3" />
                                      <span>Chứng chỉ</span>
                                    </div>
                                  )}
                                  {item.downloadable && (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <Download className="h-3 w-3" />
                                      <span>Tải về</span>
                                    </div>
                                  )}
                                  {item.mobile && (
                                    <div className="flex items-center gap-1 text-blue-600">
                                      <Globe className="h-3 w-3" />
                                      <span>Mobile</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Enhanced Action buttons */}
                            <div className="flex flex-col gap-2 ml-4">
                              <button
                                onClick={() => saveForLater(item.id)}
                                className="text-slate-400 hover:text-blue-500 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="Lưu để xem sau"
                              >
                                <Bookmark className="h-5 w-5" />
                              </button>
                              <button
                                onClick={shareCart}
                                className="text-slate-400 hover:text-green-500 p-2 hover:bg-green-50 rounded-lg transition-all duration-200"
                                title="Chia sẻ"
                              >
                                <Share2 className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
                                title="Xóa khỏi giỏ hàng"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>

                          {/* Enhanced Price and quantity */}
                          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border-2 border-slate-200 rounded-lg bg-white">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-slate-100 transition-colors rounded-l-lg"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 min-w-[3rem] text-center font-bold bg-slate-50">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-slate-100 transition-colors rounded-r-lg"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              {item.quantity > 1 && (
                                <div className="text-sm text-slate-600">
                                  Mỗi khóa: <span className="font-medium">{formatter.number(item.salePrice)}đ</span>
                                </div>
                              )}
                            </div>

                            <div className="text-right">
                              {item.originalPrice > item.salePrice && (
                                <div className="text-sm text-slate-500 line-through mb-1">
                                  {formatter.number(item.originalPrice * item.quantity)}đ
                                </div>
                              )}
                              <div className="text-xl font-bold text-primary">
                                {formatter.number(item.salePrice * item.quantity)}đ
                              </div>
                              {item.originalPrice > item.salePrice && (
                                <div className="text-sm text-green-600 font-medium">
                                  Tiết kiệm {formatter.number((item.originalPrice - item.salePrice) * item.quantity)}đ
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Continue shopping */}
              <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-primary text-lg">Khám phá thêm</h3>
                    <Link href="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Xem tất cả <ArrowRight className="h-3 w-3 inline ml-1" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/courses" className="group">
                      <Button variant="outline" className="w-full h-auto p-4 hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-center space-y-2">
                          <BookOpen className="h-6 w-6 mx-auto text-blue-600 group-hover:text-blue-700" />
                          <div className="text-sm font-medium">Tất cả khóa học</div>
                          <div className="text-xs text-slate-500">1000+ khóa học</div>
                        </div>
                      </Button>
                    </Link>
                    <Link href="/teachers" className="group">
                      <Button variant="outline" className="w-full h-auto p-4 hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-center space-y-2">
                          <Users className="h-6 w-6 mx-auto text-green-600 group-hover:text-green-700" />
                          <div className="text-sm font-medium">Giảng viên</div>
                          <div className="text-xs text-slate-500">Chuyên gia hàng đầu</div>
                        </div>
                      </Button>
                    </Link>
                    <Link href="/subjects" className="group">
                      <Button variant="outline" className="w-full h-auto p-4 hover:bg-white hover:shadow-md transition-all duration-200">
                        <div className="text-center space-y-2">
                          <Tag className="h-6 w-6 mx-auto text-purple-600 group-hover:text-purple-700" />
                          <div className="text-sm font-medium">Theo môn học</div>
                          <div className="text-xs text-slate-500">15+ chuyên ngành</div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="lg:w-96">
              <div className="sticky top-24 space-y-6">
                {/* Quick coupon suggestions */}
                <div className="rounded-xl bg-gradient-to-r from-orange-50 to-red-50 p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-orange-800">Ưu đãi đặc biệt</h3>
                  </div>
                  <div className="space-y-2">
                    {availableCoupons.slice(0, 2).map((coupon, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-orange-700">{coupon.code}</div>
                            <div className="text-xs text-slate-600">{coupon.description}</div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setCouponCode(coupon.code);
                              applyCoupon();
                            }}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            Áp dụng
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Coupon */}
                <div className="rounded-xl bg-white p-6 shadow-lg border border-slate-100">
                  <h3 className="flex items-center gap-2 font-bold text-primary mb-4">
                    <Gift className="h-6 w-6" />
                    Mã giảm giá
                  </h3>
                  
                  {appliedCoupon ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <div>
                            <div className="font-bold text-green-700">{appliedCoupon.code}</div>
                            <div className="text-sm text-green-600">Giảm {appliedCoupon.discount}%</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setAppliedCoupon(null)}
                          className="text-green-600 hover:text-green-700 p-2 hover:bg-green-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Nhập mã giảm giá"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                        <Button 
                          onClick={applyCoupon} 
                          className="px-6 bg-primary hover:bg-primary-light"
                          disabled={!couponCode}
                        >
                          Áp dụng
                        </Button>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-sm text-blue-800">
                          <div className="font-medium mb-1">💡 Gợi ý mã giảm giá:</div>
                          <div className="space-y-1">
                            <div>• <span className="font-semibold">MAPLEARN10</span> - Giảm 10%</div>
                            <div>• <span className="font-semibold">STUDENT25</span> - Giảm 25% (đơn từ 1M)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Order summary */}
                <div className="rounded-xl bg-white p-6 shadow-lg border border-slate-100">
                  <h3 className="font-bold text-primary mb-6 text-lg">Tóm tắt đơn hàng</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Tạm tính ({selectedItems.length} khóa học)</span>
                      <span className="font-semibold">{formatter.number(subtotal)}đ</span>
                    </div>
                    
                    {totalDiscount > 0 && (
                      <div className="flex justify-between py-2 text-green-600">
                        <span className="flex items-center gap-1">
                          <Percent className="h-4 w-4" />
                          Giảm giá khóa học
                        </span>
                        <span className="font-semibold">-{formatter.number(totalDiscount)}đ</span>
                      </div>
                    )}
                    
                    {couponDiscount > 0 && (
                      <div className="flex justify-between py-2 text-green-600">
                        <span className="flex items-center gap-1">
                          <Gift className="h-4 w-4" />
                          Mã giảm giá ({appliedCoupon?.code})
                        </span>
                        <span className="font-semibold">-{formatter.number(couponDiscount)}đ</span>
                      </div>
                    )}
                    
                    <div className="h-px bg-slate-200 my-4"></div>
                    
                    <div className="flex justify-between text-xl font-bold text-primary py-2">
                      <span>Tổng cộng</span>
                      <span>{formatter.number(finalTotal)}đ</span>
                    </div>
                    
                    {totalDiscount + couponDiscount > 0 && (
                      <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="text-green-700 font-bold text-sm">
                          🎉 Bạn đã tiết kiệm {formatter.number(totalDiscount + couponDiscount)}đ!
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          So với giá gốc: {formatter.number(((totalDiscount + couponDiscount) / (subtotal + totalDiscount) * 100))}% 
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-700 gap-2 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={selectedItems.length === 0 || isProcessing}
                    onClick={() => {
                      setIsProcessing(true);
                      // Simulate payment processing
                      setTimeout(() => {
                        setIsProcessing(false);
                        showNotification("Đang chuyển hướng đến trang thanh toán...", "info");
                      }, 1000);
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <Timer className="h-5 w-5 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Thanh toán ngay ({selectedItems.length} khóa học)
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-center text-xs text-slate-500 space-y-1">
                    <p>Bằng việc thanh toán, bạn đồng ý với</p>
                    <div className="flex justify-center gap-4">
                      <Link href="/terms" className="text-primary hover:underline">
                        Điều khoản
                      </Link>
                      <span>•</span>
                      <Link href="/privacy" className="text-primary hover:underline">
                        Bảo mật
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Enhanced Security badges */}
                <div className="rounded-xl bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 p-6 border border-green-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-bold text-green-800">Thanh toán an toàn 100%</div>
                        <div className="text-sm text-green-600">
                          Mã hóa SSL 256-bit & Bảo mật đa lớp
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Truck className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-bold text-blue-800">Truy cập ngay lập tức</div>
                        <div className="text-sm text-blue-600">
                          Học ngay sau khi thanh toán thành công
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-bold text-purple-800">Cam kết chất lượng</div>
                        <div className="text-sm text-purple-600">
                          Hoàn tiền 100% nếu không hài lòng
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-700 mb-3 text-center">Thống kê giỏ hàng</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary text-lg">
                        {cartItems.reduce((sum, item) => sum + item.lessons, 0)}
                      </div>
                      <div className="text-slate-600">Bài học</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary text-lg">
                        {Math.round(cartItems.reduce((sum, item) => sum + item.rating, 0) / cartItems.length * 10) / 10}⭐
                      </div>
                      <div className="text-slate-600">Đánh giá TB</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary text-lg">
                        {cartItems.reduce((sum, item) => sum + parseInt(item.duration), 0)}h
                      </div>
                      <div className="text-slate-600">Thời lượng</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary text-lg">
                        {cartItems.filter(item => item.certificate).length}
                      </div>
                      <div className="text-slate-600">Chứng chỉ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
