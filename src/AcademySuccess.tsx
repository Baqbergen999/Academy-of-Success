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

  // Course Definitions (in Russian)
  const courses: CourseItem[] = [
    {
      id: 'english',
      title: 'Английский язык (English Club)',
      subtitle: 'IELTS, Speaking Club, Grammar & Kids',
      description: 'Интерактивная языковая среда, системная подготовка к международному экзамену IELTS и школьной программе. Быстрое преодоление языкового барьера.',
      tag: 'Хит направление',
      priceFrom: 28000,
      features: ['Кембриджская методика', 'Еженедельный Speaking Club', 'Словарный запас и грамматика', 'Преодоление языкового барьера'],
      image: englishImg,
      icon: Languages,
    },
    {
      id: 'kazakh',
      title: 'Казахский язык и Литература',
      subtitle: 'Богатство языка, культура речи, ЕНТ & НИШ',
      description: 'Свободное и грамотное общение на казахском языке, углубленное освоение школьной программы, качественная подготовка к ЕНТ и поступлению в лицеи.',
      tag: 'Высокий спрос',
      priceFrom: 25000,
      features: ['Свободное общение и грамотное письмо', 'Легкое освоение школьной программы', 'Подготовка к ЕНТ и НИШ', 'Обогащение словарного запаса'],
      image: heroImg,
      icon: BookOpen,
    },
    {
      id: 'school_prep',
      title: 'Подготовка к школе & Продленка',
      subtitle: '4–6 лет и 1–4 начальные классы (Помощь с ДЗ)',
      description: 'Азбука, письмо, логика, счет. Качественное выполнение домашнего задания для учеников начальных классов и глубокое понимание всех предметов.',
      tag: 'Выбор родителей',
      priceFrom: 35000,
      features: ['Навыки логики и счета', 'Моторика рук и каллиграфия', '100% выполнение домашних заданий', 'Уверенная психологическая адаптация'],
      image: schoolPrepImg,
      icon: Baby,
    },
    {
      id: 'speech_therapy',
      title: 'Логопед & Развивающий центр',
      subtitle: 'Постановка звуков, ментальная арифметика, внимание',
      description: 'Постановка чистой речи с опытным логопедом-дефектологом, развитие фонематического слуха, внимания, памяти и мелкой моторики ребенка.',
      tag: 'Индивидуальный специалист',
      priceFrom: 30000,
      features: ['Коррекция и постановка звуков', 'Тренировка речевого аппарата', 'Развитие внимания и памяти', 'Артикуляционная гимнастика'],
      image: speechTherapyImg,
      icon: Smile,
    },
  ];

  // Age options (in Russian)
  const ageOptions: { id: AgeCategory; label: string; desc: string }[] = [
    { id: '4-6', label: '4 - 6 лет', desc: 'Подготовка к школе' },
    { id: '7-11', label: '7 - 11 лет', desc: 'Начальные классы / Продленка' },
    { id: '12-17', label: '12 - 17 лет', desc: 'Подростки / Языки' },
    { id: '18+', label: '18+ лет', desc: 'Курсы для взрослых' },
  ];

  // Subscription plans (in Russian)
  const planOptions: { id: PlanType; name: string; count: string; desc: string; priceMultiplier: number }[] = [
    { id: 'standard', name: 'Стандарт', count: '3 раза в неделю / 12 уроков', desc: 'Качественное обучение в малых группах (4–6 учеников)', priceMultiplier: 1 },
    { id: 'intensive', name: 'Интенсив', count: '5 раз в неделю / 20 уроков', desc: 'Ежедневная интенсивная подготовка и быстрый результат', priceMultiplier: 1.55 },
    { id: 'individual', name: 'Индивидуально (1-на-1)', count: 'По персональному графику', desc: '100% внимания преподавателя и адаптированная программа', priceMultiplier: 2.1 },
  ];

  // Days options (in Russian)
  const dayOptions: { id: DayOption; name: string; days: string }[] = [
    { id: 'pair', name: 'Четные дни', days: 'Вторник, Четверг, Суббота' },
    { id: 'odd', name: 'Нечетные дни', days: 'Понедельник, Среда, Пятница' },
    { id: 'weekend', name: 'Выходные дни', days: 'Суббота, Воскресенье' },
  ];

  // Timing options (in Russian)
  const timeOptions: { id: TimeOption; name: string; hours: string; subtext: string }[] = [
    { id: 'morning', name: 'До обеда', hours: '09:00 - 12:00', subtext: '1-я смена (Утреннее время)' },
    { id: 'afternoon', name: 'После обеда', hours: '14:00 - 17:00', subtext: '2-я смена (После школы)' },
    { id: 'evening', name: 'Вечернее время', hours: '17:00 - 20:00', subtext: '3-я смена (Вечерняя группа)' },
  ];

  // FAQs (in Russian)
  const faqs = [
    {
      q: 'Первый пробный урок бесплатный?',
      a: 'Да! По всем направлениям первый ознакомительный урок проводится абсолютно бесплатно для определения исходного уровня знаний ребенка и знакомства с преподавателем.',
    },
    {
      q: 'Сколько детей обучается в одной группе?',
      a: 'Качество обучения — наш ключевой приоритет. Поэтому в каждой группе занимается строго от 4 до 6 детей. Это позволяет преподавателю уделять максимум внимания каждому ученику.',
    },
    {
      q: 'Что происходит с пропущенными уроками по болезни?',
      a: 'При своевременном предупреждении по уважительной причине уроки не сгорают. Ученик разбирает пропущенный материал с преподавателем в выходные дни или на индивидуальной консультации.',
    },
    {
      q: 'В каком районе Алматы находится центр?',
      a: 'Наш центр расположен в центре Алматы, в районе пересечения проспектов Абая и Достык (рядом со станцией метро). Предусмотрена удобная парковка и остановки общественного транспорта.',
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

  // WhatsApp Structured Message (in Russian)
  const generateWhatsAppMessage = () => {
    return (
      `*Новая заявка с сайта «Академия Успеха»!*\n` +
      `👤 *Имя ученика:* ${fullName.trim() || 'Не указано'}\n` +
      `📞 *Контакты:* ${phoneNumber.trim() || 'Не указано'}\n` +
      `👶 *Возрастная категория:* ${getSelectedAgeLabel()}\n` +
      `📚 *Выбранный курс:* ${getSelectedCourseLabel()}\n` +
      `💳 *Абонемент:* ${getSelectedPlanLabel()}\n` +
      `📅 *Удобные дни:* ${getSelectedDaysLabel()}\n` +
      `⏰ *График:* ${getSelectedTimeLabel()}`
    );
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setValidationError('Пожалуйста, введите имя и фамилию ученика');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      setValidationError('Пожалуйста, введите корректный номер телефона');
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
                <span className="hidden sm:inline">Алматы • Образовательный центр</span>
                <span className="sm:hidden">Алматы • Учебный центр</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-900 transition-colors">
              О центре
            </a>
            <a href="#courses" className="hover:text-blue-900 transition-colors">
              Курсы
            </a>
            <a href="#plans" className="hover:text-blue-900 transition-colors">
              Абонементы
            </a>
            <a href="#schedule" className="hover:text-blue-900 transition-colors">
              Расписание
            </a>
            <a href="#faq" className="hover:text-blue-900 transition-colors">
              Вопрос-ответ
            </a>
            <a href="#contact" className="hover:text-blue-900 transition-colors">
              Контакты
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
              <span>Записаться</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg shrink-0"
              aria-label="Открыть меню"
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
                О центре
              </a>
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Курсы
              </a>
              <a
                href="#plans"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Абонементы
              </a>
              <a
                href="#schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Расписание
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Вопрос-ответ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-900 py-1"
              >
                Контакты
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
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs sm:text-sm font-semibold shadow-xs whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700 shrink-0" />
                <span className="hidden sm:inline text-slate-700">Алматы • Современное образовательное пространство</span>
                <span className="hidden sm:inline text-blue-300">|</span>
                <span className="text-blue-700 font-bold">Набор на 2026 год открыт</span>
                <span className="sm:hidden text-blue-300">·</span>
                <span className="sm:hidden text-slate-600 font-medium">г. Алматы</span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15] font-display text-balance">
                  Академия Успеха —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-700">
                    Качественное образование
                  </span>{' '}
                  и яркое будущее вашего ребенка
                </h1>
                <p className="text-sm sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                  Малые группы (4–6 детей), сертифицированные экспертные педагоги, интерактивная методика обучения
                  и индивидуальный подход к способностям каждого ребенка.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => scrollToEnroll()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-blue-900 hover:bg-blue-800 active:scale-[0.98] rounded-xl sm:rounded-2xl shadow-xl shadow-blue-900/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
                  <span>Записаться на курс (WhatsApp)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <a
                  href="#courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl sm:rounded-2xl transition-all shadow-xs whitespace-nowrap"
                >
                  <span>Смотреть курсы</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    4.9 / 5.0
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    400+ довольных учеников и родителей
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Гарантия результата и поддержка
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    15+
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Сертифицированных педагогов-экспертов
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-display tabular-nums">
                    4–6
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">
                    Детей в группе (малые группы)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-blue-950/10 group">
                <img
                  src={heroImg}
                  alt="Современный учебный класс образовательного центра Академия Успеха"
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
                    <div className="text-xs font-bold text-slate-900">Бесплатный пробный урок</div>
                    <div className="text-[11px] text-slate-500">Определение уровня ребенка</div>
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
                        <div className="text-xs font-bold text-slate-900">Айгерим К.</div>
                        <div className="text-[10px] text-slate-500">Мама ученика • г. Алматы</div>
                      </div>
                    </div>
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    «У ребенка появился огромный интерес к учебе. Домашние задания делает самостоятельно,
                    огромное спасибо преподавателям центра!»
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
              Почему мы?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
              4 уверенных шага к успеху вашего ребенка
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Мы не просто проводим занятия, а создаем все условия для всестороннего развития мышления,
              уверенности в себе и лидерских качеств ребенка.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Интерактивное обучение</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Без скучной зубрежки. Увлекательные игры, практические задания и современные интерактивные материалы.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Малые группы (4–6)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Максимум внимания каждому ребенку. Преподаватель вовремя помогает разобрать каждую сложную тему.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Опытные преподаватели</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Педагоги высшей категории с опытом 5+ лет, международными сертификатами IELTS/CELTA и дефектологи.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Удобное расписание</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Утренние, дневные и вечерние группы, идеально адаптированные под 1-ю или 2-ю школьную смену.
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
                Направления и курсы
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                Основные учебные программы центра
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Авторские программы, разработанные с учетом возраста и индивидуальных целей ребенка.
              </p>
            </div>
            <div>
              <button
                onClick={() => scrollToEnroll()}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100/70 rounded-xl transition-all cursor-pointer"
              >
                <span>Перейти к форме записи</span>
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
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">В месяц</span>
                      <span className="text-base font-extrabold text-blue-950 tabular-nums">
                        от {course.priceFrom.toLocaleString('ru-RU')} ₸
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
                        <span>Записаться на этот курс</span>
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

      {/* 5. Subscription Plans (Абонементы) */}
      <section id="plans" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">
              Абонементы
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Выгодные учебные пакеты и стоимость
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Выберите наиболее удобный формат занятий для ваших целей и графика.
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
                      Самый популярный тариф
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-display">{plan.name}</h3>
                      <p className="text-xs text-blue-700 font-bold mt-1">{plan.count}</p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{plan.desc}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 block">Стоимость:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-blue-950 tabular-nums">
                          {planPrice.toLocaleString('ru-RU')} ₸
                        </span>
                        <span className="text-xs text-slate-500">/ в месяц</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Все учебные материалы предоставляются бесплатно</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Ежемесячный отчет успеваемости для родителей</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Прямая связь с преподавателем в WhatsApp</span>
                      </div>
                      {plan.id === 'intensive' && (
                        <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
                          <Sparkle className="w-4 h-4 text-blue-700 shrink-0" />
                          <span>Дополнительное индивидуальное тестирование и контроль</span>
                        </div>
                      )}
                      {plan.id === 'individual' && (
                        <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
                          <Sparkle className="w-4 h-4 text-blue-700 shrink-0" />
                          <span>Возможность гибкого изменения графика</span>
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
                      Выбрать тариф
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
                График и смены
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                На 100% подходит под школьный график ребенка
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                В какую бы смену ни учился ребенок, у нас есть удобные утренние, дневные и вечерние группы.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Четные и нечетные дни</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Вторник–Четверг–Суббота или Понедельник–Среда–Пятница.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">3 удобных смены обучения</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      09:00 - 12:00, 14:00 - 17:00 и 17:00 - 20:00.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-800" />
                  <span>Смены и расписание уроков</span>
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">1-я смена (Утреннее время)</div>
                      <div className="text-xs text-slate-600">Подготовка к школе & Языковые курсы</div>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                      09:00 - 12:00
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">2-я смена (После школы)</div>
                      <div className="text-xs text-slate-600">Продленка, Английский & Казахский язык</div>
                    </div>
                    <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 shrink-0">
                      14:00 - 17:00
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-sm font-bold text-blue-900">3-я смена (Вечерняя группа)</div>
                      <div className="text-xs text-slate-600">IELTS, Подростки & Взрослые</div>
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
                    Выбрать удобное время и записаться &rarr;
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
              Интерактивная онлайн-запись
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
              Выберите курс и отправьте заявку напрямую в WhatsApp
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Выберите параметры ниже. Программа сформирует готовое сообщение и откроет чат
              с номером +7 (705) 265-24-85 в WhatsApp.
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
                    <span>Информация об ученике и контакты</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="user-full-name-light" className="block text-xs font-bold text-slate-700 mb-1">
                        Имя и фамилия ученика *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          id="user-full-name-light"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Например: Айдар Сериков"
                          className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-900 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="user-phone-number-light" className="block text-xs font-bold text-slate-700 mb-1">
                        Контактный телефон (WhatsApp) *
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
                    <span>Возрастная категория ученика</span>
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
                    <span>Выбранный курс</span>
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
                              от {c.priceFrom.toLocaleString('ru-RU')} ₸ в месяц
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
                    <span>Тип абонемента</span>
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
                    <span>Удобные дни занятий</span>
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
                    <span>Удобное время занятий</span>
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
                    <span className="whitespace-nowrap">Отправить заявку (WhatsApp)</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-2.5">
                    Менеджер оперативно свяжется с вами с номера +7 (705) 265-24-85
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
                    <span>Выбранные параметры обучения</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Пробный урок 0 ₸
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
                    <span className="text-slate-500">Возраст:</span>
                    <span className="font-bold text-slate-900">{selectedAge} лет</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">График:</span>
                    <span className="font-bold text-slate-900">{getSelectedTimeLabel()}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-xs text-slate-500 block">Расчетная стоимость:</span>
                    <span className="text-2xl sm:text-3xl font-black text-blue-950 tabular-nums">
                      {calculatedPrice.toLocaleString('ru-RU')} ₸
                    </span>
                    <span className="text-xs text-slate-500 ml-1">/ в месяц</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Малые группы (4–6 детей)
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Message Preview Box */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Образец сообщения WhatsApp</span>
                  </div>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSuccess ? 'Скопировано!' : 'Скопировать'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                  {generateWhatsAppMessage()}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-slate-500">
                  <span>Прямой номер WhatsApp:</span>
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
              Вопрос-ответ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Часто задаваемые вопросы родителей
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
              <h4 className="text-base font-bold text-slate-900">Наш адрес</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                г. Алматы, в районе пересечения пр. Абая и пр. Достык (рядом со станцией метро)
              </p>
              <div className="text-xs text-blue-700 font-bold">Есть удобная парковка</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Контактный телефон</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Телефон & WhatsApp: <br />
                <a
                  href="tel:+77052652485"
                  className="font-bold text-slate-900 hover:text-blue-900 transition-colors"
                >
                  +7 (705) 265-24-85
                </a>
              </p>
              <div className="text-xs text-slate-500">Звонки и сообщения принимаются ежедневно</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">График работы</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Понедельник — Суббота: 09:00 - 20:00 <br />
                Воскресенье: 10:00 - 18:00 (Индивидуальные группы)
              </p>
              <div className="text-xs text-emerald-700 font-bold">Чистые и безопасные кабинеты</div>
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
              <div className="text-[10px] text-slate-500">Образовательный центр в г. Алматы</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-semibold">
            <a href="#about" className="hover:text-blue-900 transition-colors">О центре</a>
            <a href="#courses" className="hover:text-blue-900 transition-colors">Курсы</a>
            <a href="#plans" className="hover:text-blue-900 transition-colors">Абонементы</a>
            <a href="#schedule" className="hover:text-blue-900 transition-colors">Расписание</a>
            <a href="#contact" className="hover:text-blue-900 transition-colors">Контакты</a>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} «Академия Успеха». Все права защищены.
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/77052652485"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-2xl shadow-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline text-xs font-extrabold tracking-wide uppercase">
            Написать в WhatsApp
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
                Ваша заявка успешно сформирована!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Если приложение WhatsApp не открылось автоматически, нажмите кнопку ниже для перехода:
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
                <span>Открыть WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedModal(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
