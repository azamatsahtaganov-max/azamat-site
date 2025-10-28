import React, { useEffect, useMemo, useState } from "react";
import bg from "./assets/bg.jpg";

/* ====== Локальные текстовые ресурсы ====== */
const RU = {
  nav: { about: "Обо мне", skills: "Навыки", projects: "Проекты", contact: "Контакты" },
  hero: {
    title: "Азамат — Digital Oil & Gas · BI-аналитика",
    subtitle:
      "Делаю данные из скважин полезными: SCADA/Historian → SQL/Python → Power BI. Строю понятные дашборды и процессы принятия решений.",
    cta1: "Посмотреть проекты",
    cta2: "Связаться",
  },
  about: {
    title: "Обо мне",
    p1:
      "Начальник отряда ГТИ с 16+ лет опыта. Делаю переход в цифровую нефтянку: BI-аналитика, Python/pandas, SQL, Power BI, визуализация производственных данных.",
    p2:
      "Ищу задачи: фонд скважин, оперативные экраны, обнаружение аномалий, отчётность. Интересно: интеграция с SCADA/Historian, стандартизация метрик, CI/CD отчётности.",
  },
  skills: {
    title: "Навыки",
    items: [
      "Power BI (DAX, Power Query, дизайн и печать отчётов)",
      "SQL (моделирование, агрегации, оконные функции)",
      "Python/pandas (ETL, очистка данных, парсинг)",
      "SCADA/Historian (потоки, единицы измерения, качество данных)",
      "Нефтегаз: добыча, ГТИ, PI/обводнённость, давл./депрессия",
      "Коммуникация: брифы, критерии готовности, приёмка",
    ],
  },
  projects: {
    title: "Проекты (подборка)",
    cards: [
      {
        tag: "Power BI",
        title: "Оперативный экран фонда скважин",
        desc:
          "KPI, тренды, Top-5, последняя дата, экспорт в PDF. Источник: CSV/SCADA. Aномалии: нули, давление, low drawdown.",
        link: "#",
      },
      {
        tag: "Python/SQL",
        title: "ETL конвейер: Historian → модель отчётности",
        desc:
          "Скрипты pandas + SQL для очистки, единиц, дедупликации, ранжирования. Автотесты на граничные случаи.",
        link: "#",
      },
      {
        tag: "Design/UX",
        title: "Гайд по визуализации производственных метрик",
        desc:
          "Единый стиль графиков, цвета, подписи, пометки последней даты, печать в PDF без сюрпризов.",
        link: "#",
      },
    ],
  },
  contact: {
    title: "Контакты",
    pitch:
      "Открыт к предложениям и проектам. Предпочитаю короткий созвон с чётким брифом и критериями успеха.",
    email: "Написать на email",
    tg: "Telegram",
    cv: "Скачать CV (PDF)",
  },
  footer: "© ",
};

const EN = {
  nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
  hero: {
    title: "Azamat — Digital Oil & Gas · BI Analytics",
    subtitle:
      "Turning well data into decisions: SCADA/Historian → SQL/Python → Power BI. Clear dashboards that drive action.",
    cta1: "View Projects",
    cta2: "Contact",
  },
  about: {
    title: "About",
    p1:
      "Head of GTI squad with 16+ years in drilling & production. Transitioning to digital oilfield: BI analytics, Python/pandas, SQL, Power BI.",
    p2:
      "I tackle: well stock dashboards, anomalies, reporting. Interested in SCADA/Historian integration, metric standards, and BI CI/CD.",
  },
  skills: {
    title: "Skills",
    items: [
      "Power BI (DAX, Power Query, report design/print)",
      "SQL (modeling, aggregations, window functions)",
      "Python/pandas (ETL, cleansing, parsing)",
      "SCADA/Historian (streams, units, data quality)",
      "Oil & Gas: production, GTI, PI/watercut, pressure/drawdown",
      "Communication: briefs, acceptance criteria",
    ],
  },
  projects: {
    title: "Projects (selected)",
    cards: [
      {
        tag: "Power BI",
        title: "Operational Well Stock Dashboard",
        desc:
          "KPI, trends, Top-5, last-date marker, PDF export. Source: CSV/SCADA. Anomalies: zeros, pressure, low drawdown.",
        link: "#",
      },
      {
        tag: "Python/SQL",
        title: "ETL Pipeline: Historian → Reporting Model",
        desc:
          "pandas + SQL for units, cleansing, dedup, ranking. Edge-case autotests.",
        link: "#",
      },
      {
        tag: "Design/UX",
        title: "Production Metrics Viz Guide",
        desc:
          "Unified chart style, color, labels, last-date badge, hassle-free PDF printing.",
        link: "#",
      },
    ],
  },
  contact: {
    title: "Contact",
    pitch:
      "Open to roles and projects. Prefer a short call with a clear brief and success criteria.",
    email: "Email me",
    tg: "Telegram",
    cv: "Download CV (PDF)",
  },
  footer: "© ",
};

/* ====== Маленькие компоненты ====== */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-50/40 px-2 py-1 text-xs font-medium tracking-wide text-emerald-900">
    {children}
  </span>
);

const Card = ({
  tag,
  title,
  desc,
  link,
}: {
  tag: string;
  title: string;
  desc: string;
  link: string;
}) => (
  <div className="group rounded-2xl border border-white/20 bg-white/85 backdrop-blur p-5 transition hover:shadow-xl hover:shadow-emerald-500/10">
    <div className="mb-2">
      <Badge>{tag}</Badge>
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm opacity-80">{desc}</p>
    <a
      href={link}
      className="mt-4 inline-block text-sm text-emerald-700 hover:underline"
    >
      Подробнее →
    </a>
  </div>
);

/* ====== Главный компонент ====== */
export default function App() {
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  const t = useMemo(() => (lang === "RU" ? RU : EN), [lang]);

  /* ==== Мягкое движение фона (параллакс + «дыхание») ==== */
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 }); // проценты
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const targetX = 50 + ((e.clientX - w / 2) / w) * 6; // ±6%
      const targetY = 50 + ((e.clientY - h / 2) / h) * 6;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setBgPos((p) => ({
          x: p.x + (targetX - p.x) * 0.08,
          y: p.y + (targetY - p.y) * 0.08,
        })),
      );
    };
    const onScroll = () => {
      const scroll = window.scrollY;
      // лёгкий вертикальный дрейф от прокрутки
      setBgPos((p) => ({ x: p.x, y: 50 + Math.min(8, scroll / 200) }));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen text-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* ДЫМ/ГРАДИЕНТ поверх фона (повышает читабельность) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          // два радиальных «клуба» дыма + мягкий вертикальный градиент
          backgroundImage:
            "radial-gradient(60rem 30rem at 10% 10%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(50rem 25rem at 90% 20%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.18))",
          mixBlendMode: "screen",
        }}
      />

      {/* Плавающее «дыхание» всей сцены (еле заметно) */}
      <style>{`
        @keyframes subtleFloat { 
          0% { transform: scale(1) }
          50% { transform: scale(1.01) }
          100% { transform: scale(1) }
        }
      `}</style>
      <div className="animate-[subtleFloat_12s_ease-in-out_infinite]">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/20">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500 shadow shadow-emerald-500/50" />
              <span className="font-semibold text-white">Azamat</span>
              <span className="hidden sm:inline text-sm text-white/80">
                · Digital Oil & Gas / BI
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="text-white/90 hover:text-white">
                {t.nav.about}
              </a>
              <a href="#skills" className="text-white/90 hover:text-white">
                {t.nav.skills}
              </a>
              <a href="#projects" className="text-white/90 hover:text-white">
                {t.nav.projects}
              </a>
              <a href="#contact" className="text-white/90 hover:text-white">
                {t.nav.contact}
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "RU" ? "EN" : "RU")}
                className="rounded-xl border border-white/30 bg-white/20 px-3 py-1 text-xs text-white hover:bg-white/30"
                aria-label="Switch language"
              >
                {lang === "RU" ? "EN" : "RU"}
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-black/20 p-6 backdrop-blur">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90">
                {t.hero.subtitle}
              </p>
              <div className="mt-6 flex gap-3">
                {/* Перекрашенные кнопки */}
                <a
                  href="#projects"
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {t.hero.cta1}
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-emerald-400/70 bg-white/10 px-5 py-2 text-sm text-emerald-100 hover:bg-white/20"
                >
                  {t.hero.cta2}
                </a>
              </div>
            </div>

            <div className="md:justify-self-end w-full">
              <div className="aspect-[4/3] w-full rounded-2xl border border-white/25 bg-gradient-to-br from-emerald-50/40 to-emerald-100/40 p-4 backdrop-blur">
                <div className="h-full w-full rounded-xl border border-white/40 bg-white/85 p-4 text-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge>SCADA</Badge>
                    <Badge>SQL</Badge>
                    <Badge>Power BI</Badge>
                  </div>
                  <p className="opacity-80">
                    Demo-макет: конвейер Historian → модель → дашборд. Плейсхолдер визуализации для портфолио.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold"> {t.about.title} </h2>
            <p className="mt-4 opacity-90">{t.about.p1}</p>
            <p className="mt-2 opacity-80">{t.about.p2}</p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-white"> {t.skills.title} </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.skills.items.map((s: string, i: number) => (
              <li
                key={i}
                className="rounded-xl border border-white/20 bg-white/85 p-3 text-sm backdrop-blur"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-white">
              {t.projects.title}
            </h2>
            <a href="#contact" className="text-sm text-emerald-200 hover:underline">
              → {lang === "RU" ? "Заказать демо" : "Request demo"}
            </a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.projects.cards.map((c: any, i: number) => (
              <Card key={i} {...c} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-2xl border border-white/20 bg-white/85 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">{t.contact.title}</h2>
            <p className="mt-2 opacity-90">{t.contact.pitch}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href="mailto:azamat@example.com"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
              >
                {t.contact.email}
              </a>
              <a
                href="https://t.me/your_handle"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-emerald-500 px-4 py-2 text-emerald-700 bg-white hover:bg-emerald-50"
              >
                {t.contact.tg}
              </a>
              <a
                href="#"
                className="rounded-xl border border-emerald-400 px-4 py-2 text-emerald-800 bg-white hover:bg-emerald-50"
              >
                {t.contact.cv}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 bg-black/20 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/80">
            {`${(t.footer as string)}${new Date().getFullYear()} Azamat. Made with React.`}
          </div>
        </footer>
      </div>
    </div>
  );
}
