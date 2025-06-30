import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Wallet,
  Shield,
  Zap,
  Globe,
  CreditCard,
  TrendingUp,
  Users,
  Gift,
  Star,
  CheckCircle,
  Sparkles,
  Lock,
  Smartphone,
  Award,
  DollarSign,
  Clock,
  Building2,
  Banknote,
  PiggyBank,
  Coins,
  BarChart3,
  Percent,
  Target,
  Play,
  Download,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  HeadphonesIcon,
  Calendar,
  FileText,
  Layers,
  Infinity,
  Lightbulb,
  Rocket,
  Crown,
  Gem,
  Fingerprint,
  QrCode,
  Wifi,
  Gauge,
  TrendingDown,
  Activity,
  PieChart,
  Calculator,
  RefreshCw,
  Send,
  Receipt,
  Plus,
  Eye,
  EyeOff,
  Bell,
  Settings,
  User,
  UserCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthDialog from "./AuthDialog";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<"login" | "signup">(
    "login",
  );
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    countries: 0,
    satisfaction: 0,
  });
  const [showEmailVerificationLoading, setShowEmailVerificationLoading] =
    useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Debug logging on component mount
  useEffect(() => {
    console.log("🏠 LandingPage mounted");
    console.log("🔍 Current URL:", window.location.href);
    console.log(
      "🔍 Search params:",
      Object.fromEntries(searchParams.entries()),
    );
    console.log("👤 Current user:", user ? "Logged in" : "Not logged in");
  }, []);

  // Check for email verification state and referral code
  useEffect(() => {
    console.log("🔍 فحص معاملات URL:", window.location.search);
    console.log("🔍 searchParams:", Object.fromEntries(searchParams.entries()));
    console.log(
      "👤 Current user status:",
      user ? "Logged in" : "Not logged in",
    );

    // Check if coming from email verification
    if (location.state?.emailVerified) {
      console.log("✅ تم التأكد من البريد الإلكتروني - عرض حالة التحميل");
      setShowEmailVerificationLoading(true);
      setAuthDialogOpen(true);
      setAuthDialogMode("login");
      return; // Exit early to avoid conflicts with referral code logic
    }

    // Check for referral code in URL
    const refCode = searchParams.get("ref") || searchParams.get("referral");
    console.log("🔗 البحث عن كود الإحالة:", refCode);

    if (refCode) {
      console.log("✅ تم العثور على كود الإحالة:", refCode);
      setReferralCode(refCode);

      if (user) {
        console.log("👤 المستخدم مسجل دخول بالفعل - عرض رسالة إعلامية");
        // For logged-in users, we can show a notification that they already have an account
        // but still display the referral info
      } else {
        console.log("🚀 فتح نافذة التسجيل تلقائياً مع كود الإحالة:", refCode);
        setAuthDialogMode("signup");
        // Add a small delay to ensure the component is fully rendered
        setTimeout(() => {
          setAuthDialogOpen(true);
        }, 500);
      }
    } else {
      console.log("❌ لم يتم العثور على كود إحالة في URL");
    }
  }, [location.state, searchParams, user]);

  // Handle logged in users with referral codes
  useEffect(() => {
    if (user) {
      const refCode = searchParams.get("ref") || searchParams.get("referral");
      if (refCode) {
        console.log("👤 المستخدم مسجل دخول ولكن لديه كود إحالة:", refCode);
        // Show a special message for logged-in users with referral codes
        // They can still see the referral info but won't be able to use it
        return;
      }
      console.log("👤 المستخدم مسجل دخول - توجيه للصفحة الرئيسية");
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        navigate("/home", { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, navigate, searchParams]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);

    // Animate stats
    const animateStats = () => {
      const targetStats = {
        users: 50000,
        transactions: 2500000,
        countries: 150,
        satisfaction: 98,
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          users: Math.floor(targetStats.users * progress),
          transactions: Math.floor(targetStats.transactions * progress),
          countries: Math.floor(targetStats.countries * progress),
          satisfaction: Math.floor(targetStats.satisfaction * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "أمان عالي المستوى",
      description: "حماية متقدمة بتقنية التشفير المصرفي والذكاء الاصطناعي",
      highlight: "آمن 100%",
      color: "from-orange-500 to-red-600",
      stats: "تشفير 256-bit",
      badge: "حماية عسكرية",
      details:
        "نستخدم أحدث تقنيات التشفير والحماية المتعددة الطبقات لضمان أمان أموالك",
    },
    {
      icon: CreditCard,
      title: "بطاقة مجانية مدى الحياة",
      description: "احصل على بطاقة ائتمان مجانية مدى الحياة مع مزايا حصرية",
      highlight: "مجاناً",
      color: "from-emerald-500 to-teal-600",
      stats: "0 رسوم",
      badge: "الأكثر شعبية",
      details:
        "بطاقة ائتمان بدون رسوم سنوية أو رسوم خفية، مع مزايا حصرية وخصومات",
    },
    {
      icon: Zap,
      title: "تحويلات فورية",
      description: "حول الأموال في ثوانٍ معدودة بدون رسوم إضافية",
      highlight: "فوري",
      color: "from-yellow-500 to-orange-600",
      stats: "< 30 ثانية",
      badge: "سرعة البرق",
      details: "تحويلات فورية محلية ودولية بأسرع وقت وأفضل الأسعار",
    },
    {
      icon: TrendingUp,
      title: "استثمار ذكي",
      description: "استثمر أموالك بعوائد تصل إلى 15% سنوياً مع ضمان الأمان",
      highlight: "15%",
      color: "from-blue-500 to-indigo-600",
      stats: "عائد سنوي",
      badge: "عائد مضمون",
      details: "خطط استثمارية متنوعة مع عوائد مضمونة وإدارة احترافية",
    },
    {
      icon: Globe,
      title: "خدمة عالمية",
      description: "تحويلات دولية بأفضل الأسعار إلى أكثر من 150 دولة",
      highlight: "عالمي",
      color: "from-cyan-500 to-blue-600",
      stats: "150+ دولة",
      badge: "تغطية شاملة",
      details: "شبكة عالمية واسعة تغطي جميع القارات بأفضل أسعار الصرف",
    },
    {
      icon: Users,
      title: "نظام الإحالة المربح",
      description: "اربح 500 دج لكل صديق تدعوه للتطبيق + مكافآت إضافية",
      highlight: "500 دج",
      color: "from-purple-500 to-pink-600",
      stats: "لكل إحالة",
      badge: "مكافآت فورية",
      details: "برنامج إحالة مربح مع مكافآت فورية ومستمرة لك ولأصدقائك",
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: "مكافأة الترحيب",
      description: "احصل على 1000 دج مجاناً عند التسجيل",
      amount: "1000 دج",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Star,
      title: "خدمة VIP",
      description: "دعم فني متاح 24/7 لجميع العملاء",
      amount: "24/7",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: CheckCircle,
      title: "بدون رسوم خفية",
      description: "شفافية كاملة في جميع المعاملات",
      amount: "0%",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Lock,
      title: "أمان متقدم",
      description: "تشفير عسكري وحماية متعددة الطبقات",
      amount: "256-bit",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Smartphone,
      title: "تطبيق ذكي",
      description: "واجهة سهلة ومميزات متطورة",
      amount: "AI",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Award,
      title: "الأفضل محلياً",
      description: "البنك الرقمي الأول في الجزائر",
      amount: "#1",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const testimonials = [
    {
      name: "أحمد بن علي",
      role: "رجل أعمال",
      content:
        "أفضل تطبيق مصرفي استخدمته على الإطلاق. سهل، آمن، وسريع. أنصح به بشدة!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    },
    {
      name: "فاطمة الزهراء",
      role: "مهندسة",
      content:
        "التحويلات الفورية غيرت حياتي المالية. الآن أستطيع إرسال الأموال في ثوانٍ!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
    },
    {
      name: "محمد الأمين",
      role: "طالب جامعي",
      content:
        "نظام الإحالة رائع! ربحت أكثر من 5000 دج من دعوة أصدقائي للتطبيق - 500 دج لكل إحالة!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
    },
  ];

  const pricingPlans = [
    {
      name: "الأساسي",
      price: "مجاني",
      description: "للاستخدام الشخصي",
      features: [
        "حساب مصرفي مجاني",
        "بطاقة ائتمان مجانية",
        "تحويلات محلية مجانية",
        "دعم فني أساسي",
        "تطبيق الهاتف المحمول",
      ],
      color: "from-gray-500 to-gray-600",
      popular: false,
    },
    {
      name: "المتقدم",
      price: "2,500 دج/شهر",
      description: "للأعمال الصغيرة",
      features: [
        "جميع مميزات الأساسي",
        "تحويلات دولية مخفضة",
        "استثمارات ذكية",
        "تقارير مالية متقدمة",
        "دعم فني أولوية",
        "حدود تحويل أعلى",
      ],
      color: "from-blue-500 to-indigo-600",
      popular: true,
    },
    {
      name: "الاحترافي",
      price: "5,000 دج/شهر",
      description: "للشركات الكبيرة",
      features: [
        "جميع مميزات المتقدم",
        "مدير حساب مخصص",
        "API للتكامل",
        "تقارير مخصصة",
        "دعم فني 24/7",
        "حلول مخصصة",
      ],
      color: "from-purple-500 to-pink-600",
      popular: false,
    },
  ];

  const faqItems = [
    {
      question: "كيف يمكنني فتح حساب؟",
      answer:
        "يمكنك فتح حساب في دقائق معدودة من خلال تطبيق الهاتف المحمول أو الموقع الإلكتروني. ستحتاج فقط إلى بطاقة الهوية ورقم الهاتف.",
    },
    {
      question: "هل التطبيق آمن؟",
      answer:
        "نعم، نستخدم أحدث تقنيات التشفير والحماية المصرفية. جميع البيانات محمية بتشفير 256-bit والمعاملات مؤمنة بالكامل.",
    },
    {
      question: "ما هي رسوم التحويلات؟",
      answer:
        "التحويلات المحلية مجانية تماماً. التحويلات الدولية تبدأ من 1% فقط، وهي من أقل الرسوم في السوق.",
    },
    {
      question: "كم من الوقت تستغرق التحويلات؟",
      answer:
        "التحويلات المحلية فورية (أقل من 30 ثانية). التحويلات الدولية تستغرق من دقائق إلى ساعات حسب الوجهة.",
    },
    {
      question: "هل يمكنني الاستثمار من خلال التطبيق؟",
      answer:
        "نعم، نوفر خطط استثمارية متنوعة بعوائد مضمونة تصل إلى 15% سنوياً مع إدارة احترافية.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-black/5">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      {/* Navigation Header */}
      <nav className="relative z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <img
                src="/logo.png"
                alt="Netlify Logo"
                className="w-8 md:w-10 h-8 md:h-10 object-contain"
              />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Netlify
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a
                href="#features"
                className="text-white hover:text-blue-300 transition-colors"
              >
                المميزات
              </a>
              <a
                href="#pricing"
                className="text-white hover:text-blue-300 transition-colors"
              >
                الأسعار
              </a>
              <a
                href="#testimonials"
                className="text-white hover:text-blue-300 transition-colors"
              >
                آراء العملاء
              </a>
              <a
                href="#contact"
                className="text-white hover:text-blue-300 transition-colors"
              >
                اتصل بنا
              </a>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
              <Button
                onClick={() => {
                  setAuthDialogMode("login");
                  setAuthDialogOpen(true);
                }}
                variant="ghost"
                className="text-white hover:bg-white/10 text-sm md:text-base px-2 md:px-4 transition-all duration-300 hover:scale-105"
              >
                تسجيل الدخول
              </Button>
              <Button
                onClick={() => {
                  setAuthDialogMode("signup");
                  setAuthDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm md:text-base px-3 md:px-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                إنشاء حساب
                <ArrowRight className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight px-4">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  مستقبل البنوك
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  الرقمية في الجزائر
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
                إدارة أموالك بذكاء وأمان مع أول بنك رقمي متكامل في الجزائر.
                تحويلات فورية، استثمار ذكية، وبطاقة مجانية مدى الحياة.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16 px-4">
                <Button
                  onClick={() => {
                    setAuthDialogMode("signup");
                    setAuthDialogOpen(true);
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                </Button>
              </div>
            </div>

            {/* Animated Cards Section */}
            <div
              className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-white/10 p-4 md:p-8 max-w-4xl mx-auto">
                <div className="flex animate-scroll-horizontal">
                  {/* Card 1 - Free Card */}
                  <div className="min-w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse px-4 md:px-8">
                    <div className="flex-1 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        بطاقة مجانية مدى الحياة
                      </h3>
                      <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                        احصل على بطاقة Visa مجانية بدون رسوم سنوية أو رسوم خفية
                      </p>
                      <div className="flex items-center justify-center md:justify-end space-x-4 space-x-reverse">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                          مجاناً 100%
                        </span>
                        <CreditCard className="w-6 md:w-8 h-6 md:h-8 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 order-1 md:order-2">
                      <div className="w-64 md:w-80 h-40 md:h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl transform rotate-1 md:rotate-3 hover:rotate-0 transition-transform duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-white font-bold text-base md:text-lg">
                              netlify
                            </div>
                            <div className="w-10 md:w-12 h-6 md:h-8 bg-white/20 rounded flex items-center justify-center">
                              <Wifi className="w-4 md:w-6 h-4 md:h-6 text-white" />
                            </div>
                          </div>
                          <div className="text-white">
                            <div className="text-xs md:text-sm opacity-80 mb-1">
                              **** **** **** 1234
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-xs opacity-60">
                                  VALID THRU
                                </div>
                                <div className="text-xs md:text-sm">12/28</div>
                              </div>
                              <div className="text-white font-bold text-lg md:text-xl">
                                VISA
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Referral Bonus */}
                  <div className="min-w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse px-4 md:px-8">
                    <div className="flex-1 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        اربح 500 دج لكل دعوة صديق
                      </h3>
                      <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                        ادع أصدقاءك واربح 500 دينار جزائري عن كل صديق ينضم إلى
                        Netlify
                      </p>
                      <div className="flex items-center justify-center md:justify-end space-x-4 space-x-reverse">
                        <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                          مكافأة فورية
                        </span>
                        <Gift className="w-6 md:w-8 h-6 md:h-8 text-emerald-400" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 order-1 md:order-2">
                      <div className="w-64 md:w-80 h-40 md:h-48 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-2xl shadow-2xl transform -rotate-1 md:-rotate-3 hover:rotate-0 transition-transform duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-white font-bold text-base md:text-lg">
                              netlify
                            </div>
                            <div className="bg-white/20 rounded-full p-1.5 md:p-2">
                              <Users className="w-4 md:w-6 h-4 md:h-6 text-white" />
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-white text-2xl md:text-3xl font-bold mb-1">
                              500 دج
                            </div>
                            <div className="text-white/80 text-xs md:text-sm">
                              لكل إحالة ناجحة
                            </div>
                            <Gift className="w-8 md:w-10 h-8 md:h-10 text-white/60 mx-auto mt-2" />
                          </div>
                          <div className="text-white">
                            <div className="flex justify-between items-end">
                              <div className="text-xs opacity-60">INSTANT</div>
                              <div className="text-white font-bold text-sm md:text-base">
                                REWARD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Easy Loans */}
                  <div className="min-w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse px-4 md:px-8">
                    <div className="flex-1 text-center md:text-right order-2 md:order-1">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        قروض بدون شروط تعجيزية
                      </h3>
                      <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                        احصل على قرض فوري بأفضل الشروط وبدون ضمانات معقدة
                      </p>
                      <div className="flex items-center justify-center md:justify-end space-x-4 space-x-reverse">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                          موافقة فورية
                        </span>
                        <Banknote className="w-6 md:w-8 h-6 md:h-8 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 order-1 md:order-2">
                      <div className="w-64 md:w-80 h-40 md:h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-2xl transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-white font-bold text-base md:text-lg">
                              netlify
                            </div>
                            <div className="bg-white/20 rounded-full p-1.5 md:p-2">
                              <DollarSign className="w-4 md:w-6 h-4 md:h-6 text-white" />
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-white text-lg md:text-2xl font-bold mb-1">
                              قرض فوري
                            </div>
                            <div className="text-white/80 text-xs md:text-sm">
                              بدون شروط معقدة
                            </div>
                          </div>
                          <div className="text-white">
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-xs opacity-60">
                                  INSTANT
                                </div>
                                <div className="text-xs md:text-sm font-semibold">
                                  APPROVAL
                                </div>
                              </div>
                              <div className="text-white font-bold text-lg md:text-xl">
                                VISA
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse animation-delay-2000"></div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="text-blue-300 text-sm md:text-lg">
                  عميل راضٍ
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stats.transactions.toLocaleString()}+
                </div>
                <div className="text-purple-300 text-sm md:text-lg">
                  معاملة آمنة
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stats.countries}+
                </div>
                <div className="text-green-300 text-sm md:text-lg">
                  دولة مدعومة
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                  {stats.satisfaction}%
                </div>
                <div className="text-yellow-300 text-sm md:text-lg">
                  رضا العملاء
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              مميزات استثنائية
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              اكتشف مجموعة شاملة من الخدمات المصرفية الرقمية المتطورة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${feature.color}/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${feature.color} text-white text-xs font-bold rounded-full`}
                      >
                        {feature.badge}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {feature.highlight}
                    </div>
                    <div className="text-sm text-gray-400">{feature.stats}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              لماذا تختار Netlify؟
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              مزايا حصرية تجعلنا الخيار الأول للخدمات المصرفية الرقمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${benefit.color}/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="text-3xl font-bold text-white">
                      {benefit.amount}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              آراء عملائنا
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              اكتشف تجارب عملائنا الراضين وقصص نجاحهم معنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full ml-4"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              خطط مرنة لكل احتياجاتك
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              اختر الخطة المناسبة لك واستمتع بأفضل الخدمات المصرفية الرقمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${plan.color}/20 backdrop-blur-md border ${plan.popular ? "border-blue-400/50 ring-2 ring-blue-400/30" : "border-white/20"} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-white mb-2">
                    {plan.price}
                  </div>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 ml-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <Button
                    className={`w-full mt-8 ${plan.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : "bg-white/10 hover:bg-white/20"} text-white transition-all duration-300 hover:scale-105`}
                    onClick={() => {
                      setAuthDialogMode("signup");
                      setAuthDialogOpen(true);
                    }}
                  >
                    {plan.name === "الأساسي" ? "ابدأ مجاناً" : "اختر هذه الخطة"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="relative z-10 py-32 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-300">
              إجابات على أكثر الأسئلة شيوعاً حول خدماتنا
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-xl"
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-blue-400/30 rounded-3xl p-12 shadow-2xl">
            {/* Special message for logged-in users with referral codes */}
            {user && referralCode && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  مرحباً بك مرة أخرى!
                </h3>
                <p className="text-green-300 mb-4">
                  لديك حساب بالفعل، لكن يمكنك مشاركة كود الإحالة هذا مع أصدقائك:
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <span className="text-2xl font-bold text-white">
                    {referralCode}
                  </span>
                </div>
                <p className="text-sm text-green-200">
                  ستحصل على 500 دج عن كل صديق ينضم باستخدام كودك!
                </p>
                <Button
                  onClick={() => navigate("/home")}
                  className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  الذهاب إلى حسابي
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </div>
            )}

            {/* Regular CTA for non-logged-in users or users without referral codes */}
            {(!user || !referralCode) && (
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {referralCode
                    ? "انضم الآن واحصل على مكافأة!"
                    : "ابدأ رحلتك المالية اليوم"}
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  {referralCode
                    ? `تم دعوتك للانضمام إلى Netlify! احصل على 500 دج مكافأة ترحيبية بالإضافة إلى مكافأة الإحالة.`
                    : "انضم إلى آلاف العملاء الراضين واستمتع بأفضل تجربة مصرفية رقمية في الجزائر"}
                </p>
                {referralCode && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
                    <div className="flex items-center justify-center mb-2">
                      <Gift className="w-6 h-6 text-green-400 ml-2" />
                      <span className="text-green-400 font-semibold text-lg">
                        كود الإحالة الخاص بك
                      </span>
                    </div>
                    <div className="text-white text-2xl font-bold mb-2">
                      {referralCode}
                    </div>
                    <div className="text-green-300 text-sm">
                      ستحصل على 500 دج إضافية عند التسجيل!
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button
                    onClick={() => {
                      setAuthDialogMode("signup");
                      setAuthDialogOpen(true);
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    {referralCode
                      ? "انضم الآن واحصل على المكافأة"
                      : "إنشاء حساب مجاني"}
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Button>
                  {!referralCode && (
                    <Button
                      onClick={() => {
                        setAuthDialogMode("login");
                        setAuthDialogOpen(true);
                      }}
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                    >
                      تسجيل الدخول
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        id="contact"
        className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <img
                  src="/logo.png"
                  alt="Netlify Logo"
                  className="w-12 h-12 object-contain"
                />
                <h3 className="text-2xl font-bold text-white">Netlify</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                البنك الرقمي الأول في الجزائر. نقدم خدمات مصرفية متطورة وآمنة
                لجميع احتياجاتك المالية.
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">الخدمات</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    الحسابات المصرفية
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    البطاقات الائتمانية
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    التحويلات
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    الاستثمارات
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    القروض
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 ml-3" />
                  <span>+213 555 123 456</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 ml-3" />
                  <span>info@netlify-dz.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 ml-3" />
                  <span>الجزائر العاصمة، الجزائر</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 ml-3" />
                  <span>24/7 خدمة العملاء</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Netlify. جميع الحقوق محفوظة. | سياسة الخصوصية | شروط
              الاستخدام
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultMode={authDialogMode}
        referralCode={referralCode}
        showEmailVerificationLoading={showEmailVerificationLoading}
        onEmailVerificationLoadingChange={setShowEmailVerificationLoading}
      />
    </div>
  );
}
