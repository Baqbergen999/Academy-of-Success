import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
  ChevronDown,
  Check,
  MapPin,
  ShieldCheck,
  Copy,
  ExternalLink,
  Star,
  Menu,
  X,
  Languages,
  Baby,
  Smile,
  Sparkle,
  CheckCircle
} from 'lucide-react';

// High-fidelity image assets
import heroImg from './assets/images/hero_education_academy_1790688672992.jpg';
import englishImg from './assets/images/course_english_club_1790688692504.jpg';
import schoolPrepImg from './assets/images/course_school_prep_1790688708111.jpg';
import speechTherapyImg from './assets/images/course_speech_therapy_1790688722057.jpg';

// Types
export type AgeCategory = '4-6' | '7-11' | '12-17' | '18+';
export type CourseType = 'english' | 'kazakh' | 'school_prep' | 'speech_therapy';
export type PlanType = 'standard' | 'intensive' | 'individual';
export type DayOption = 'pair' | 'odd' | 'weekend';
export type TimeOption = 'morning' | 'afternoon' | 'evening';

export interface CourseItem {
  id: CourseType;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  priceFrom: number;
  features: string[];
  image: string;
  icon: React.ElementType;
}

export default function AcademySuccess() {
  // Navigation & Modal state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submittedModal, setSubmittedModal] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAge, setSelectedAge] = useState<AgeCategory>('7-11');
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('english');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');
  const [selectedDays, setSelectedDays] = useState<DayOption[]>(['odd']);
  const [selectedTime, setSelectedTime] = useState<TimeOption>('afternoon');
  const [validationError, setValidationError] = useState('');

  // Course Definitions
  const courses: CourseItem[] = [
    {
      id: 'english',
      title: 'Ағылшын тілі (English Club)',
      subtitle: 'IELTS, Speaking Club, Grammar & Kids',
      description: 'Интерактивті сөйлесу ортасы, халықаралық IELTS және мектеп бағдарламасына жүйелі дайындық. Тілдік кедергіні оңай жою.',
      tag: 'Хит бағыт',
      priceFrom: 28000,
      features: ['Cambridge әдістемесі', 'Апталық Speaking Club', 'Сөздік қор мен грамматика', 'Тілдік кедергіні жою'],
      image: englishImg,
      icon: Languages,
    },
    {
      id: 'kazakh',
      title: 'Қазақ тілі мен Әдебиеті',
      subtitle: 'Тіл байлығы, Сөйлеу мәдениеті, ҰБТ & НЗМ',
      description: 'Ана тілінде еркін әрі сауатты сөйлеу, мектеп бағдарламасын тереңдетіп меңгеру, ҰБТ және лицей емтихандарына сапалы дайындық.',
      tag: 'Сұраныста',
      priceFrom: 25000,
      features: ['Еркін тілдесу мен сауатты жазу', 'Мектеп бағдарламасын жеңіл меңгеру', 'ҰБТ & НЗМ дайындық', 'Сөздік қорды байыту'],
      image: heroImg,
      icon: BookOpen,
    },
    {
      id: 'school_prep',
      title: 'Мектепке дайындық & Продленка',
      subtitle: '4–6 жас және 1–4 бастауыш сыныптар (Үй тапсырмасы)',
      description: 'Әліппе, жазу, логика, санау. Бастауыш сынып оқушыларына үй тапсырмасын сапалы орындау және барлық пәндерді тиянақты меңгеру.',
      tag: 'Ата-аналар таңдауы',
      priceFrom: 35000,
      features: ['Логика және санау дағдылары', 'Қол моторикасы мен көркем жазу', 'Үй тапсырмасын 100% орындау', 'Сенімді психологиялық бейімделу'],
      image: schoolPrepImg,
      icon: Baby,
    },
    {
      id: 'speech_therapy',
      title: 'Логопед & Балаларға арналған дамыту',
      subtitle: 'Дыбыс қою, Менталды арифметика, Зейін',
      description: 'Тәжірибелі логопед-дефектолог көмегімен дыбыстарды дұрыс қою, фонематикалық есту, зейін мен ұсақ моториканы кешенді дамыту.',
      tag: 'Жеке маман',
      priceFrom: 30000,
      features: ['Дыбыстарды түзету және қою', 'Сөйлеу аппаратын жаттықтыру', 'Зейін мен есте сақтауды арттыру', 'Артикуляциялық гимнастика'],
      image: speechTherapyImg,
      icon: Smile,
    },
  ];

  // Age options
  const ageOptions: { id: AgeCategory; label: string; desc: string }[] = [
    { id: '4-6', label: '4 - 6 жас', desc: 'Мектепке дайындық' },
    { id: '7-11', label: '7 - 11 жас', desc: 'Бастауыш сынып / Продленка' },
    { id: '12-17', label: '12 - 17 жас', desc: 'Жасөспірімдер / Тілдер' },
    { id: '18+', label: '18+ жас', desc: 'Ересектерге арналған курс' },
  ];

  // Subscription plans
  const planOptions: { id: PlanType; name: string; count: string; desc: string; priceMultiplier: number }[] = [
    { id: 'standard', name: 'Стандарт', count: 'Аптасына 3 рет / 12 сабақ', desc: 'Шағын топта (4–6 оқушы) сапалы білім алу', priceMultiplier: 1 },
    { id: 'intensive', name: 'Интенсив', count: 'Аптасына 5 рет / 20 сабақ', desc: 'Күнделікті қарқынды дайындық пен жылдам нәтиже', priceMultiplier: 1.55 },
    { id: 'individual', name: 'Жеке (1-он-1)', count: 'Жеке кесте бойынша', desc: '100% ұстаздың назары және жеке бейімделген бағдарлама', priceMultiplier: 2.1 },
  ];

  // Days options
  const dayOptions: { id: DayOption; name: string; days: string }[] = [
    { id: 'pair', name: 'Жұп күндер', days: 'Сейсенбі, Бейсенбі, Сенбі' },
    { id: 'odd', name: 'Тақ күндер', days: 'Дүйсенбі, Сәрсенбі, Жұма' },
    { id: 'weekend', name: 'Демалыс күндері', days: 'Сенбі, Жексенбі' },
  ];

  // Timing options
  const timeOptions: { id: TimeOption; name: string; hours: string; subtext: string }[] = [
    { id: 'morning', name: 'Түске дейін', hours: '09:00 - 12:00', subtext: '1-ауысым (Таңғы уақыт)' },
    { id: 'afternoon', name: 'Түстен кейін', hours: '14:00 - 17:00', subtext: '2-ауысым (Мектептен кейін)' },
    { id: 'evening', name: 'Кешкі уақыт', hours: '17:00 - 20:00', subtext: '3-ауысым (Кешкі топ)' },
  ];

  // FAQs
  const faqs = [
    {
      q: 'Алғашқы байқау сабағы (пробный урок) тегін бе?',
      a: 'Иә! Барлық курстар бойынша баланың бастапқы білім деңгейін анықтау және ұстазбен танысу мақсатында алғашқы сынақ сабағы толықтай тегін өткізіледі.',
    },
    {
      q: 'Топта неше оқушы білім алады?',
      a: 'Оқу сапасы біздің басты құндылығымыз. Сондықтан әрбір топта небәрі 4–6 баладан аспайды. Бұл ұстаздың әр оқушыға жеке назар бөлуіне толық мүмкіндік береді.',
    },
    {
      q: 'Егер оқушы ауырып қалса, өткізіп алған сабақтар қалай болады?',
      a: 'Дәлелді себеппен алдын ала ескертілген жағдайда сабақтар күймейді. Оқушы өткізіп алған тақырыптарды демалыс күндері немесе қосымша жеке уақытта ұстазбен қайталайды.',
    },
    {
      q: 'Орталық Алматы қаласының қай ауданында орналасқан?',
      a: 'Орталығымыз Алматы қаласының орталығында, Абай және Достық даңғылдары қиылысына жақын орналасқан. Метро мен аялдамалар қасында, ыңғайлы автотұрақ бар.',
    },
  ];

  // Calculate live estimate
  const currentCourse = courses.find((c) => c.id === selectedCourse) || courses[0];
  const currentPlan = planOptions.find((p) => p.id === selectedPlan) || planOptions[0];
  const calculatedPrice = Math.round(currentCourse.priceFrom * currentPlan.priceMultiplier);

  // Day toggle
  const toggleDay = (dayId: DayOption) => {
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== dayId));
      }
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  // Helper labels
  const getSelectedAgeLabel = () => {
    const item = ageOptions.find((a) => a.id === selectedAge);
    return item ? `${item.label} (${item.desc})` : selectedAge;
  };

  const getSelectedCourseLabel = () => currentCourse.title;
  const getSelectedPlanLabel = () => `${currentPlan.name} (${currentPlan.count})`;
  const getSelectedDaysLabel = () =>
    selectedDays
      .map((d) => {
        const item = dayOptions.find((o) => o.id === d);
        return item ? `${item.name} (${item.days})` : d;
      })
      .join(', ');

  const getSelectedTimeLabel = () => {
    const item = timeOptions.find((t) => t.id === selectedTime);
    return item ? `${item.name} (${item.hours})` : selectedTime;
  };

  // WhatsApp Structured Message
  const generateWhatsAppMessage = () => {
    return (
      `*«Академия Успеха» сайтынан жаңа өтінім!*\n` +
      `👤 *Оқушы аты:* ${fullName.trim() || 'Көрсетілмеген'}\n` +
      `📞 *Байланыс:* ${phoneNumber.trim() || 'Көрсетілмеген'}\n` +
      `👶 *Жас санаты:* ${getSelectedAgeLabel()}\n` +
      `📚 *Тандалған курс:* ${getSelectedCourseLabel()}\n` +
      `💳 *Абонемент:* ${getSelectedPlanLabel()}\n` +
      `📅 *Қолайлы күндер:* ${getSelectedDaysLabel()}\n` +
      `⏰ *График:* ${getSelectedTimeLabel()}`
    );
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setValidationError('Өтініш, аты-жөніңізді енгізіңіз');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      setValidationError('Өтініш, байланыс телефоныңызды толық енгізіңіз');
      return;
    }

    setValidationError('');
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/77052652485?text=${encoded}`;

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = waUrl;
    }

    setSubmittedModal(true);
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const scrollToEnroll = (courseId?: CourseType) => {
    if (courseId) {
      setSelectedCourse(courseId);
    }
    const target = document.getElementById('enroll-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600/10 selection:text-blue-900">
      {/* 1. Header / Navigation (Clean Light Corporate Top Bar) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Zone 1: Single text element wordmark with smart responsive layout */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg py-1 min-w-0"
          >
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-2xl font-extrabold tracking-tight text-blue-950 font-display leading-tight truncate">
                Академия Успеха
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 tracking-normal sm:tracking-wider sm:uppercase leading-none mt-0.5 truncate">
                <span className="hidden sm:inline">Алматы • Білім беру орталығы</span>
                <span className="sm:hidden">Алматы • Білім орталығы</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-900 transition-colors">
              Орталық жайлы
            </a>
            <a href="#courses" className="hover:text-blue-900 transition-colors">
              Курстар
            </a>
            <a href="#plans" className="hover:text-blue-900 transition-colors">
              Абонементтер
            </a>
            <a href="#schedule" className="hover:text-blue-900 transition-colors">
              График
            </a>
            <a href="#faq" className="hover:text-blue-900 transition-colors">
              Сұрақ-жауап
            </a>
            <a href="#contact" className="hover:text-blue-900 transition-colors">
              Байланыс
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Mobile optimized) */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <a
              href="tel:+77052652485"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>+7 (705) 265-24-85</span>
            </a>
            <button
              onClick={() => scrollToEnroll()}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 active:scale-95 rounded-lg sm:rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
              <span>Жазылу</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg shrink-0"
              aria-label="Мәзірді ашу"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-2.5 text-sm sm:text-base font-semibold text-slate-700">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Орталық жайлы
              </a>
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Курстар
              </a>
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Абонементтер
              </a>
              <a
                href="#schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                График
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Сұрақ-жауап
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Байланыс
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:+77052652485"
                className="flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold text-blue-900 bg-blue-50 border border-blue-100 rounded-xl"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                +7 (705) 265-24-85
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (Modern Light Luxury Hero) */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white">
        {/* Soft background ambient shapes */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs sm:text-sm font-semibold shadow-xs flex-wrap sm:flex-nowrap">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700 shrink-0" />
                <span>Алматы • Заманауи білім кеңістігі</span>
                <span className="hidden sm:inline text-blue-300">|</span>
                <span className="text-blue-700 font-bold">2026 жаңа маусым</span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] font-display text-balance">
                  Академия Успеха —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-700">
                    Балаңыздың сапалы білімі
                  </span>{' '}
                  мен жарқын болашағы
                </h1>
                <p className="text-sm sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                  Шағын топтар (4–6 бала), білікті сарапшы ұстаздар, интерактивті оқыту әдістемесі
                  және әр баланың қабілетін ашатын жеке көзқарас.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => scrollToEnroll()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-blue-900 hover:bg-blue-800 active:scale-[0.98] rounded-xl sm:rounded-2xl shadow-xl shadow-blue-900/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
                  <span>Курсқа жазылу (WhatsApp)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl sm:rounded-2xl transition-all shadow-xs whitespace-nowrap"
                >
                  <span>Курстарды көру</span>
                </a>
              </div>

              {/* Trust Indicators (Quiet unboxed typography with clear metrics) */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    4.9 / 5.0
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    400+ оқушы мен ата-ана ризашылығы
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Нәтижеге кепілдік және қолдау
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    15+
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Сертификатталған сарапшы ұстаз
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    4–6
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Шағын топтағы бала саны
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-blue-950/10 group">
                <img
                  src={heroImg}
                  alt="Академия Успеха білім беру орталығының заманауи сыныбы"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Floating Top Pill */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Сынақ сабағы тегін</div>
                    <div className="text-[11px] text-slate-500">Баланың деңгейін анықтау</div>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-extrabold flex items-center justify-center text-xs">
                        АУ
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Айгүл Серікқызы</div>
                        <div className="text-[10px] text-slate-500">Оқушының анасы • Алматы қ.</div>
                      </div>
                    </div>
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    «Баламның сабаққа деген қызығушылығы оянды. Үй жұмысын өз бетімен орындайтын болды,
                    ұстаздардың еңбегі орасан!»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Advantages & Value Proposition */}
      <section id="about" className="py-18 bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              Неліктен біз?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Балаңыздың жетістігіне 4 сенімді баспалдақ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Біз жай ғана сабақ өткізбейміз, баланың ой-өрісін дамытып, жеке тұлға ретінде
              өсуіне жан-жақты жағдай жасаймыз.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Интерактивті оқыту</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Құрғақ жаттау емес, қызықты ойындар, практикалық тапсырмалар мен заманауи құралдар арқылы оқу.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Шағын топтар (4–6)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Әрбір балаға максималды назар. Ұстаз оқушының түсінбеген сұрағына бірден көмектеседі.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Тәжірибелі ұстаздар</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Жоғары санатты педагогтер, IELTS/CELTA халықаралық сертификаты бар оқытушылар.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ыңғайлы график</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Мектептің 1-ші немесе 2-ші ауысымына бейімделген таңғы, түскі және кешкі топтар.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Courses and Directions (Interactive Grid Cards) */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
                Бағыттар мен курстар
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                Орталықтың негізгі оқу бағдарламалары
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Баланың жасына және мақсатына сай арнайы әзірленген авторлық бағдарламалар.
              </p>
            </div>
            <div>
              <button
                onClick={() => scrollToEnroll()}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100/70 rounded-xl transition-all cursor-pointer"
              >
                <span>Өтінім формасына өту</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col group shadow-lg hover:shadow-xl"
                >
                  {/* Course Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
                    <div className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {course.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 px-3.5 py-1.5 rounded-xl text-right shadow-sm">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Айына</span>
                      <span className="text-base font-extrabold text-blue-950 tabular-nums">
                        {course.priceFrom.toLocaleString('kk-KZ')} ₸-ден
                      </span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                            {course.title}
                          </h3>
                          <div className="text-xs text-blue-700 font-semibold">
                            {course.subtitle}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <button
                        onClick={() => scrollToEnroll(course.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-950/10 transition-all cursor-pointer"
                      >
                        <span>Осы курсқа жазылу</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Subscription Plans (Абонемент түрлері) */}
      <section id="plans" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              Абонементтер
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Қолайлы оқу пакеттері мен бағалары
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Оқу мақсатыңыз бен уақытыңызға ең қолайлы форматты таңдаңыз.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {planOptions.map((plan) => {
              const isPopular = plan.id === 'standard';
              const planPrice = Math.round(28000 * plan.priceMultiplier);

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'bg-white border-2 border-blue-900 shadow-2xl shadow-blue-900/10 -translate-y-2'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-900 text-white font-bold text-xs uppercase px-4 py-1 rounded-full shadow-md">
                      Ең көп таңдалатын тариф
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-display">{plan.name}</h3>
                      <p className="text-xs text-blue-700 font-bold mt-1">{plan.count}</p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 block">Құны:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-blue-950 tabular-nums">
                          {planPrice.toLocaleString('kk-KZ')} ₸
                        </span>
                        <span className="text-xs text-slate-500">/ айына</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Барлық оқу материалдары беріледі</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Ай сайынғы үлгерім бақылауы</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>WhatsApp арқылы ұстазбен тікелей байланыс</span>
                      </div>
                      {plan.id === 'intensive' && (
                        <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
                          <Sparkle className="w-4 h-4 text-blue-700 shrink-0" />
                          <span>Қосымша жеке тестілеу & қадағалау</span>
                        </div>
                      )}
                      {plan.id === 'individual' && (
                        <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
                          <Sparkle className="w-4 h-4 text-blue-700 shrink-0" />
                          <span>Графикті еркін өзгерту мүмкіндігі</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        scrollToEnroll();
                      }}
                      className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        isPopular
                          ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-lg shadow-blue-950/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      Тарифті таңдау
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Schedule & Timing Section */}
      <section id="schedule" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
                График пен ауысымдар
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                Балаңыздың мектеп кестесіне 100% сай келеді
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Мектепте қай ауысымда оқысаңыз да, бізде таңғы, түскі немесе кешкі уақыттағы
                қолайлы топтар бар.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Жұп және Тақ күндер</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Сейсенбі–Бейсенбі–Сенбі немесе Дүйсенбі–Сәрсенбі–Жұма жүйесі.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">3 түрлі уақыт ауысымы</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      09:00 - 12:00, 14:00 - 17:00 және 17:00 - 20:00 аралығы.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-800" />
                  <span>Сабақ кестесінің ауысымдары</span>
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">1-ауысым (Таңғы уақыт)</div>
                      <div className="text-xs text-slate-600">Мектепке дайындық & Тіл курстары</div>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                      09:00 - 12:00
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">2-ауысым (Түстен кейін)</div>
                      <div className="text-xs text-slate-600">Продленка, Ағылшын & Қазақ тілі</div>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                      14:00 - 17:00
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">3-ауысым (Кешкі топ)</div>
                      <div className="text-xs text-slate-600">IELTS, Жасөспірімдер & Ересектер</div>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                      17:00 - 20:00
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                  <button
                    onClick={() => scrollToEnroll()}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 underline cursor-pointer"
                  >
                    Өзіңізге ыңғайлы уақытты таңдап жазылу &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Enrollment & Selector Form (WhatsApp Integration) */}
      <section
        id="enroll-section"
        className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              Интерактивті онлайн жазылу
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Курсты таңдап, WhatsApp арқылы тікелей жіберіңіз
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Төмендегі барлық параметрлерді таңдаңыз. Бағдарлама мәліметтерден дайын өтінім
              құрастырып, +7 (705) 265-24-85 нөміріне WhatsApp арқылы ашады.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs Area */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xl space-y-6 sm:space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Step 1: Personal Info */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>Оқушы мен байланыс ақпараты</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="user-full-name-light" className="block text-xs font-bold text-slate-700 mb-1">
                        Оқушының аты-жөні *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          id="user-full-name-light"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Мысалы: Айдар Серікұлы"
                          className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-900 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="user-phone-number-light" className="block text-xs font-bold text-slate-700 mb-1">
                        Байланыс телефоны (WhatsApp) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          id="user-phone-number-light"
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+7 (705) 000-00-00"
                          className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-900 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Student Age */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>Оқушының жас санаты</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {ageOptions.map((age) => {
                      const isSelected = selectedAge === age.id;
                      return (
                        <button
                          type="button"
                          key={age.id}
                          onClick={() => setSelectedAge(age.id)}
                          className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-900 text-blue-950 shadow-sm ring-1 ring-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-bold truncate">{age.label}</div>
                          <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                            {age.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Course Selection */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>Таңдалған курс</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {courses.map((c) => {
                      const isSelected = selectedCourse === c.id;
                      const CourseIcon = c.icon;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setSelectedCourse(c.id)}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/70 border-blue-900 text-blue-950 shadow-sm ring-1 ring-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <CourseIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{c.title}</div>
                            <div className="text-[11px] sm:text-xs text-blue-800 font-semibold mt-0.5">
                              {c.priceFrom.toLocaleString('kk-KZ')} ₸-ден бастап
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Plan Selection */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      4
                    </span>
                    <span>Абонемент түрі</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {planOptions.map((p) => {
                      const isSelected = selectedPlan === p.id;
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setSelectedPlan(p.id)}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-900 text-blue-950 shadow-sm ring-1 ring-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-bold text-slate-900">{p.name}</div>
                          <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{p.count}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 5: Convenient Days */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      5
                    </span>
                    <span>Ыңғайлы сабақ күндері</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {dayOptions.map((d) => {
                      const isChecked = selectedDays.includes(d.id);
                      return (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => toggleDay(d.id)}
                          className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left flex items-start gap-2.5 sm:gap-3 transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-blue-50 border-blue-900 text-blue-950 ring-1 ring-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 ${
                              isChecked
                                ? 'bg-blue-900 border-blue-900 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900">{d.name}</div>
                            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{d.days}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 6: Timing Preference */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-900 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0">
                      6
                    </span>
                    <span>Ыңғайлы уақыт графигі</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {timeOptions.map((t) => {
                      const isSelected = selectedTime === t.id;
                      return (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setSelectedTime(t.id)}
                          className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-900 text-blue-950 shadow-sm ring-1 ring-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-bold text-slate-900">{t.name}</div>
                          <div className="text-xs text-blue-900 font-bold mt-0.5">{t.hours}</div>
                          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{t.subtext}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    ⚠️ {validationError}
                  </div>
                )}

                {/* Form Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base text-white bg-blue-900 hover:bg-blue-800 shadow-xl shadow-blue-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
                    <span className="whitespace-nowrap">Өтінімді жіберу (WhatsApp)</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-2.5">
                    Менеджер +7 (705) 265-24-85 нөмірінен жедел байланысқа шығады
                  </p>
                </div>
              </form>
            </div>

            {/* Live Real-time Summary Card */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* Cost Preview */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>Таңдалған оқу параметрлері</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Сынақ сабағы 0 ₸
                  </span>
                </div>

                <div className="space-y-3 pb-5 border-b border-slate-100 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Курс:</span>
                    <span className="font-bold text-slate-900">{currentCourse.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Абонемент:</span>
                    <span className="font-bold text-slate-900">{currentPlan.name} ({currentPlan.count})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Жас санаты:</span>
                    <span className="font-bold text-slate-900">{selectedAge} жас</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">График:</span>
                    <span className="font-bold text-slate-900">{getSelectedTimeLabel()}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Болжамды бағасы:</span>
                    <span className="text-2xl sm:text-3xl font-black text-blue-950 tabular-nums">
                      {calculatedPrice.toLocaleString('kk-KZ')} ₸
                    </span>
                    <span className="text-xs text-slate-500 ml-1">/ айына</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Шағын топ (4–6 бала)
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Message Preview Box */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WhatsApp хабарлама үлгісі</span>
                  </div>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSuccess ? 'Көшірілді!' : 'Көшіріп алу'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {generateWhatsAppMessage()}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-slate-500">
                  <span>Тікелей WhatsApp нөмірі:</span>
                  <a
                    href="https://wa.me/77052652485"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <span>+7 (705) 265-24-85</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (FAQ) */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              Сұрақ-жауап
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Ата-аналар жиі қоятын сұрақтар
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <span className="text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Contact & Location Information */}
      <section id="contact" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Мекенжайымыз</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Алматы қаласы, Абай даңғылы мен Достық даңғылы қиылысы маңы (Метро жанында)
              </p>
              <div className="text-xs text-blue-700 font-bold">Ыңғайлы автотұрақ бар</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Байланыс телефоны</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Телефон & WhatsApp: <br />
                <a
                  href="tel:+77052652485"
                  className="font-bold text-slate-900 hover:text-blue-900 transition-colors"
                >
                  +7 (705) 265-24-85
                </a>
              </p>
              <div className="text-xs text-slate-500">Қоңыраулар мен хабарламалар күнделікті қабылданады</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Жұмыс уақыты</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Дүйсенбі — Сенбі: 09:00 - 20:00 <br />
                Жексенбі: 10:00 - 18:00 (Жеке топтар)
              </p>
              <div className="text-xs text-emerald-700 font-bold">Таза әрі қауіпсіз кеңістік</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm font-display">Академия Успеха</div>
              <div className="text-[10px] text-slate-500">Алматы қаласының білім беру орталығы</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-semibold">
            <a href="#about" className="hover:text-blue-900 transition-colors">Орталық жайлы</a>
            <a href="#courses" className="hover:text-blue-900 transition-colors">Курстар</a>
            <a href="#plans" className="hover:text-blue-900 transition-colors">Абонементтер</a>
            <a href="#schedule" className="hover:text-blue-900 transition-colors">График</a>
            <a href="#contact" className="hover:text-blue-900 transition-colors">Байланыс</a>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} «Академия Успеха». Барлық құқықтар қорғалған.
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/77052652485"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp арқылы жазу"
          className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-2xl shadow-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline text-xs font-extrabold tracking-wide uppercase">
            WhatsApp-та жазу
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping absolute -top-0.5 -right-0.5" />
        </a>
      </div>

      {/* Submission Success Modal */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Өтініміңіз сәтті дайындалды!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Егер WhatsApp терезесі автоматты түрде ашылмаса, төмендегі батырманы басып өтіңіз:
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/77052652485?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSubmittedModal(false)}
                className="py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp-ты ашу</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
