import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Icon name="Mic" size={16} className="text-black" />
            </div>
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              VoiceAI
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Возможности
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Слушать темы
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Background animation" className="w-auto h-3/4 object-contain" />
        </div>
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  Умная платформа голосового контента
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Голос. Идеи.
                </span>
                <br />
                <span className="text-accent">Лучшее.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Клиенты наговаривают тексты на заданную тему, а ИИ отбирает лучшие мысли и создаёт идеальную одноминутную запись.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Слушать компиляции
                  <Icon name="Play" size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Записать текст
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">до 1 мин</div>
                  <p className="text-sm text-white/60">Запись каждого клиента</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">ИИ</div>
                  <p className="text-sm text-white/60">Выбирает лучшие идеи</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">1 текст</div>
                  <p className="text-sm text-white/60">Идеальная компиляция</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              {/* Audio waveform visual */}
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="w-40 h-40 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-28 h-28 rounded-full bg-accent/30 border border-accent/60 flex items-center justify-center">
                    <Icon name="Mic" size={52} className="text-accent" />
                  </div>
                </div>
                {/* Waveform bars */}
                <div className="flex items-end gap-1.5 h-20">
                  {[4, 8, 14, 10, 20, 16, 24, 18, 28, 22, 32, 26, 28, 20, 24, 16, 20, 12, 16, 8, 12, 6, 10, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-full bg-gradient-to-t from-accent/40 to-accent"
                      style={{
                        height: `${h * 2.5}px`,
                        animation: `pulse ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate`,
                        opacity: 0.6 + (i % 3) * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="text-accent/80 text-sm font-medium tracking-wider">ИИ-анализ в процессе...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Возможности</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Всё под контролем
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Mic",
                title: "Запись голоса",
                desc: "Свои клиенты (СК) наговаривают тексты прямо в браузере без лишних приложений — до одной минуты на каждую тему.",
              },
              {
                icon: "Sparkles",
                title: "ИИ-компиляция",
                desc: "Искусственный интеллект анализирует все записи по теме, отбирает лучшие мысли и собирает идеальный одноминутный текст.",
              },
              {
                icon: "Headphones",
                title: "Прослушивание",
                desc: "Свои клиенты слушают свои записи и готовые компиляции. Чужие клиенты (ЧК) слушают только компиляции — по выбранной теме.",
              },
              {
                icon: "ShieldCheck",
                title: "Управление доступом",
                desc: "Три роли: Администратор, Свои клиенты и Чужие клиенты. Каждый видит только то, что ему разрешено.",
              },
              {
                icon: "Mail",
                title: "Приглашение по ссылке",
                desc: "Администратор отправляет ссылку на почту. Клиент переходит, задаёт пароль — и сразу получает доступ как Свой клиент.",
              },
              {
                icon: "LayoutDashboard",
                title: "Панель администратора",
                desc: "Полный контроль: темы, клиенты, записи, компиляции. Удаляйте неудачные записи, управляйте правами доступа.",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" fallback="Zap" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Как это работает
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Тема задана", desc: "Администратор создаёт тему и рассылает приглашения своим клиентам" },
              { num: "02", title: "Клиенты говорят", desc: "Каждый Свой клиент записывает свой текст — до одной минуты, своими словами" },
              { num: "03", title: "ИИ анализирует", desc: "Система сравнивает все записи по теме и выбирает лучшие идеи и формулировки" },
              { num: "04", title: "Готова компиляция", desc: "Итоговый текст до 1 минуты доступен для прослушивания всем — СК и ЧК" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Роли и доступ</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Кто что может
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Свой клиент (СК)",
                price: "По приглашению",
                features: [
                  "Запись голосового текста по теме",
                  "Прослушивание своих записей",
                  "Удаление своих записей",
                  "Прослушивание компиляций",
                  "Доступ через email-ссылку + пароль",
                ],
                highlight: false,
              },
              {
                name: "Чужой клиент (ЧК)",
                price: "Открытый доступ",
                features: [
                  "Заход на сайт без регистрации",
                  "Выбор темы для прослушивания",
                  "Прослушивание компиляций",
                  "Нет доступа к чужим записям",
                  "Нет возможности записывать",
                ],
                highlight: true,
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                      <p className="text-2xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <Icon name="ArrowRight" size={16} className="text-accent flex-shrink-0 mt-1" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.highlight ? "Слушать темы" : "Получить приглашение"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы слушать лучшее?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Выберите тему — и послушайте, что ИИ собрал из голосов ваших клиентов.
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto">
            Выбрать тему
            <Icon name="Play" size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2025 VoiceAI — Платформа голосового контента с ИИ</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Условия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
