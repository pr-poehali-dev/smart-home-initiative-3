import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "dashboard" | "topics" | "clients" | "recordings" | "compilations";

interface Topic {
  id: number;
  title: string;
  recordingsCount: number;
  hasCompilation: boolean;
  createdAt: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  status: "active" | "pending";
  recordingsCount: number;
  invitedAt: string;
}

interface Recording {
  id: number;
  clientName: string;
  topic: string;
  duration: string;
  createdAt: string;
}

interface Compilation {
  id: number;
  topic: string;
  duration: string;
  sourcesCount: number;
  createdAt: string;
}

const mockTopics: Topic[] = [
  { id: 1, title: "Преимущества нашего продукта", recordingsCount: 7, hasCompilation: true, createdAt: "05.05.2026" },
  { id: 2, title: "Почему клиенты выбирают нас", recordingsCount: 4, hasCompilation: true, createdAt: "03.05.2026" },
  { id: 3, title: "Опыт использования сервиса", recordingsCount: 2, hasCompilation: false, createdAt: "06.05.2026" },
];

const mockClients: Client[] = [
  { id: 1, name: "Анна Петрова", email: "anna@mail.ru", status: "active", recordingsCount: 5, invitedAt: "01.05.2026" },
  { id: 2, name: "Игорь Смирнов", email: "igor@mail.ru", status: "active", recordingsCount: 3, invitedAt: "02.05.2026" },
  { id: 3, name: "Мария Козлова", email: "maria@mail.ru", status: "pending", recordingsCount: 0, invitedAt: "06.05.2026" },
  { id: 4, name: "Дмитрий Волков", email: "dmitry@mail.ru", status: "active", recordingsCount: 5, invitedAt: "28.04.2026" },
];

const mockRecordings: Recording[] = [
  { id: 1, clientName: "Анна Петрова", topic: "Преимущества нашего продукта", duration: "0:52", createdAt: "05.05.2026" },
  { id: 2, clientName: "Игорь Смирнов", topic: "Преимущества нашего продукта", duration: "0:48", createdAt: "05.05.2026" },
  { id: 3, clientName: "Дмитрий Волков", topic: "Почему клиенты выбирают нас", duration: "0:59", createdAt: "03.05.2026" },
  { id: 4, clientName: "Анна Петрова", topic: "Почему клиенты выбирают нас", duration: "0:44", createdAt: "04.05.2026" },
  { id: 5, clientName: "Игорь Смирнов", topic: "Опыт использования сервиса", duration: "0:37", createdAt: "06.05.2026" },
];

const mockCompilations: Compilation[] = [
  { id: 1, topic: "Преимущества нашего продукта", duration: "0:58", sourcesCount: 7, createdAt: "05.05.2026" },
  { id: 2, topic: "Почему клиенты выбирают нас", duration: "0:55", sourcesCount: 4, createdAt: "04.05.2026" },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [inviteSent, setInviteSent] = useState(false);
  const [topicCreated, setTopicCreated] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Обзор", icon: "LayoutDashboard" },
    { id: "topics", label: "Темы", icon: "BookOpen" },
    { id: "clients", label: "Клиенты (СК)", icon: "Users" },
    { id: "recordings", label: "Записи", icon: "Mic" },
    { id: "compilations", label: "Компиляции", icon: "Sparkles" },
  ];

  const handleSendInvite = () => {
    if (!inviteEmail || !inviteName) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowInviteModal(false);
      setInviteEmail("");
      setInviteName("");
    }, 2000);
  };

  const handleCreateTopic = () => {
    if (!newTopicTitle) return;
    setTopicCreated(true);
    setTimeout(() => {
      setTopicCreated(false);
      setShowTopicModal(false);
      setNewTopicTitle("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-accent/10 bg-card/30 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-accent/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Icon name="Mic" size={16} className="text-black" />
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-white to-accent/80 bg-clip-text text-transparent">
              VoiceAI
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Панель администратора</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={tab.icon} size={18} fallback="Circle" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-accent/10">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon name="Globe" size={18} />
            На сайт
          </a>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-all">
            <Icon name="LogOut" size={18} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-display font-black text-white mb-1">Обзор</h1>
              <p className="text-muted-foreground text-sm">Добро пожаловать в панель управления VoiceAI</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Тем", value: "3", icon: "BookOpen", color: "text-accent" },
                { label: "Своих клиентов", value: "4", icon: "Users", color: "text-blue-400" },
                { label: "Записей", value: "13", icon: "Mic", color: "text-purple-400" },
                { label: "Компиляций", value: "2", icon: "Sparkles", color: "text-yellow-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-card/50 border border-accent/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground text-sm">{stat.label}</span>
                    <Icon name={stat.icon} size={18} className={stat.color} fallback="Circle" />
                  </div>
                  <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setShowTopicModal(true)}
                className="group flex items-center gap-4 p-6 bg-accent/10 border border-accent/20 hover:border-accent/50 rounded-2xl transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors flex-shrink-0">
                  <Icon name="Plus" size={22} className="text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Создать тему</div>
                  <div className="text-muted-foreground text-sm">Добавьте новую тему для записи</div>
                </div>
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="group flex items-center gap-4 p-6 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 rounded-2xl transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                  <Icon name="Mail" size={22} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Пригласить клиента (СК)</div>
                  <div className="text-muted-foreground text-sm">Отправить ссылку на email</div>
                </div>
              </button>
            </div>

            {/* Recent activity */}
            <div className="bg-card/50 border border-accent/10 rounded-2xl p-6">
              <h2 className="font-display font-bold text-lg mb-4">Последние записи</h2>
              <div className="space-y-3">
                {mockRecordings.slice(0, 4).map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between py-3 border-b border-accent/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Icon name="Mic" size={14} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{rec.clientName}</div>
                        <div className="text-xs text-muted-foreground">{rec.topic}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-accent font-mono">{rec.duration}</div>
                      <div className="text-xs text-muted-foreground">{rec.createdAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Topics */}
        {activeTab === "topics" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-black text-white mb-1">Темы</h1>
                <p className="text-muted-foreground text-sm">Управление темами для записи</p>
              </div>
              <button
                onClick={() => setShowTopicModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
              >
                <Icon name="Plus" size={16} />
                Новая тема
              </button>
            </div>

            <div className="space-y-3">
              {mockTopics.map((topic) => (
                <div key={topic.id} className="bg-card/50 border border-accent/10 hover:border-accent/30 rounded-2xl p-6 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Icon name="BookOpen" size={18} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{topic.title}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{topic.recordingsCount} записей</span>
                          <span>Создана {topic.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {topic.hasCompilation ? (
                        <span className="flex items-center gap-1.5 text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full font-medium">
                          <Icon name="Sparkles" size={12} />
                          Есть компиляция
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                          <Icon name="Clock" size={12} />
                          Нет компиляции
                        </span>
                      )}
                      <button className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients */}
        {activeTab === "clients" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-black text-white mb-1">Свои клиенты (СК)</h1>
                <p className="text-muted-foreground text-sm">Управление приглашёнными клиентами</p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
              >
                <Icon name="Mail" size={16} />
                Пригласить
              </button>
            </div>

            <div className="bg-card/50 border border-accent/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/10">
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-4">Клиент</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-4">Email</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-4">Статус</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-4">Записей</th>
                    <th className="text-left text-xs text-muted-foreground font-medium px-6 py-4">Приглашён</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockClients.map((client, i) => (
                    <tr
                      key={client.id}
                      className={`border-b border-accent/5 last:border-0 hover:bg-white/2 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                            {client.name.charAt(0)}
                          </div>
                          <span className="font-medium text-white text-sm">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{client.email}</td>
                      <td className="px-6 py-4">
                        {client.status === "active" ? (
                          <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                            Активен
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                            Ожидает
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-mono">{client.recordingsCount}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{client.invitedAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-1.5 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors" title="Повторить приглашение">
                            <Icon name="Mail" size={15} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors" title="Удалить">
                            <Icon name="Trash2" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recordings */}
        {activeTab === "recordings" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-display font-black text-white mb-1">Записи клиентов</h1>
              <p className="text-muted-foreground text-sm">Все голосовые записи от своих клиентов</p>
            </div>

            <div className="space-y-3">
              {mockRecordings.map((rec) => (
                <div key={rec.id} className="bg-card/50 border border-accent/10 hover:border-accent/30 rounded-2xl p-5 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPlayingId(playingId === rec.id ? null : rec.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          playingId === rec.id
                            ? "bg-accent text-black"
                            : "bg-accent/20 text-accent hover:bg-accent/30"
                        }`}
                      >
                        <Icon name={playingId === rec.id ? "Pause" : "Play"} size={16} />
                      </button>
                      <div>
                        <div className="font-medium text-white text-sm mb-1">{rec.clientName}</div>
                        <div className="text-xs text-muted-foreground">{rec.topic}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Waveform placeholder */}
                      <div className="hidden sm:flex items-end gap-0.5 h-8">
                        {[3, 6, 10, 7, 12, 9, 14, 11, 8, 13, 10, 7, 11, 8, 5].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-colors ${playingId === rec.id ? "bg-accent" : "bg-accent/30"}`}
                            style={{ height: `${h * 2}px` }}
                          />
                        ))}
                      </div>

                      <span className="text-accent font-mono text-sm font-medium">{rec.duration}</span>
                      <span className="text-muted-foreground text-xs hidden md:block">{rec.createdAt}</span>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors">
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compilations */}
        {activeTab === "compilations" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-display font-black text-white mb-1">Компиляции</h1>
              <p className="text-muted-foreground text-sm">Итоговые тексты, собранные ИИ из лучших записей</p>
            </div>

            <div className="space-y-4">
              {mockCompilations.map((comp) => (
                <div key={comp.id} className="bg-card/50 border border-accent/20 rounded-2xl p-6 transition-all hover:border-accent/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center">
                        <Icon name="Sparkles" size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{comp.topic}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Создана {comp.createdAt}</span>
                          <span>•</span>
                          <span>{comp.sourcesCount} исходных записей</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Waveform */}
                      <div className="hidden sm:flex items-end gap-0.5 h-8">
                        {[5, 9, 14, 11, 16, 13, 18, 15, 12, 17, 14, 10, 15, 11, 7].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full bg-gradient-to-t from-accent/40 to-accent"
                            style={{ height: `${h * 2}px` }}
                          />
                        ))}
                      </div>

                      <span className="text-accent font-mono font-medium">{comp.duration}</span>

                      <button
                        onClick={() => setPlayingId(playingId === comp.id + 100 ? null : comp.id + 100)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          playingId === comp.id + 100
                            ? "bg-accent text-black"
                            : "bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30"
                        }`}
                      >
                        <Icon name={playingId === comp.id + 100 ? "Pause" : "Play"} size={14} />
                        {playingId === comp.id + 100 ? "Пауза" : "Слушать"}
                      </button>

                      <button className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors">
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {mockCompilations.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="Sparkles" size={40} className="mx-auto mb-4 opacity-30" />
                  <p>Компиляций пока нет. Добавьте больше записей по теме.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-accent/20 rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl">Пригласить клиента (СК)</h2>
              <button onClick={() => setShowInviteModal(false)} className="text-muted-foreground hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Клиент получит письмо со ссылкой. При переходе он задаст пароль из 8 символов и станет Своим клиентом.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Имя клиента</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Анна Петрова"
                  className="w-full bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSendInvite}
              disabled={inviteSent}
              className="w-full py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-60"
            >
              {inviteSent ? "✓ Приглашение отправлено!" : "Отправить приглашение"}
            </button>
          </div>
        </div>
      )}

      {/* Topic Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-accent/20 rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl">Создать тему</h2>
              <button onClick={() => setShowTopicModal(false)} className="text-muted-foreground hover:text-white transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Тема появится у всех Своих клиентов — они смогут записать свой текст на неё.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">Название темы</label>
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder="Например: Почему клиенты выбирают нас"
                className="w-full bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-foreground outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleCreateTopic}
              disabled={topicCreated}
              className="w-full py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-60"
            >
              {topicCreated ? "✓ Тема создана!" : "Создать тему"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
