import React, { useMemo, useState } from "react";
import bg from "./assets/bg.jpg";

// ---- One-file React landing page for Azamat ----
// Tech: React + Tailwind (no external deps).
// Digital Oil & Gas / BI Analytics portfolio.

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

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium tracking-wide">
    {children}
  </span>
);

const Card = ({ tag, title, desc, link }: { tag: string; title: string; desc: string; link: string }) => (
  <div className="group rounded-2xl border p-5 transition hover:shadow-lg">
    <div className="mb-2"><Badge>{tag}</Badge></div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm opacity-80">{desc}</p>
    <a href={link} className="mt-4 inline-block text-sm underline">Подробнее →</a>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  const t = useMemo(() => (lang === "RU" ? RU : EN), [lang]);

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="font-semibold">Azamat</span>
            <span className="hidden sm:inline text-sm opacity-70">· Digital Oil & Gas / BI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-70">{t.nav.about}</a>
            <a href="#skills" className="hover:opacity-70">{t.nav.skills}</a>
            <a href="#projects" className="hover:opacity-70">{t.nav.projects}</a>
            <a href="#contact" className="hover:opacity-70">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "RU" ? "EN" : "RU")}
              className="rounded-xl border px-3 py-1 text-xs"
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
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg opacity-90">
              {t.hero.subtitle}
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="rounded-xl border px-4 py-2 text-sm font-medium bg-white/80 hover:bg-white">
                {t.hero.cta1}
              </a>
              <a href="#contact" className="rounded-xl border px-4 py-2 text-sm bg-white/80 hover:bg-white">
                {t.hero.cta2}
              </a>
            </div>
          </div>
          <div className="md:justify-self-end w-full">
            <div className="aspect-[4/3] w_full rounded-2xl border bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
              <div className="h-full w-full rounded-xl border bg-white p-4 text-sm">
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
        <h2 className="text-2xl font-bold">{t.about.title}</h2>
        <p className="mt-4 opacity-90">{t.about.p1}</p>
        <p className="mt-2 opacity-80">{t.about.p2}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">{t.skills.title}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {t.skills.items.map((s: string, i: number) => (
            <li key={i} className="rounded-xl border p-3 text-sm bg-white/80">{s}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold">{t.projects.title}</h2>
          <a href="#contact" className="text-sm underline opacity-90">
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
        <div className="rounded-2xl border p-6 bg-white/85">
          <h2 className="text-2xl font-bold">{t.contact.title}</h2>
          <p className="mt-2 opacity-90">{t.contact.pitch}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="mailto:azamat@example.com" className="rounded-xl border px-4 py-2 bg-white/90">{t.contact.email}</a>
            <a href="https://t.me/your_handle" target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2 bg-white/90">{t.contact.tg}</a>
            <a href="#" className="rounded-xl border px-4 py-2 bg-white/90">{t.contact.cv}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-80">
          {`${(t.footer as string)}${new Date().getFullYear()} Azamat. Made with React.`}
        </div>
      </footer>
    </div>
  );
}
