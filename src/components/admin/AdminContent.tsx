import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { adminApi } from "@/api/adminApi";
import { Tab } from "./types";

interface AdminContentProps {
  activeTab: Tab;
  playingId: number | null;
  setPlayingId: (id: number | null) => void;
  onOpenTopicModal: () => void;
  onOpenInviteModal: () => void;
  refreshKey: number;
}

const AdminContent = ({
  activeTab,
  playingId,
  setPlayingId,
  onOpenTopicModal,
  onOpenInviteModal,
  refreshKey,
}: AdminContentProps) => {
  type Row = Record<string, unknown>;
  const [stats, setStats] = useState({ topics: 0, clients: 0, recordings: 0, compilations: 0 });
  const [topics, setTopics] = useState<Row[]>([]);
  const [clients, setClients] = useState<Row[]>([]);
  const [recordings, setRecordings] = useState<Row[]>([]);
  const [compilations, setCompilations] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "dashboard") {
      setLoading(true);
      Promise.all([adminApi.getStats(), adminApi.getRecordings()]).then(([s, r]) => {
        setStats(s);
        setRecordings(r.recordings || []);
        setLoading(false);
      });
    }
    if (activeTab === "topics") {
      setLoading(true);
      adminApi.getTopics().then((d) => { setTopics(d.topics || []); setLoading(false); });
    }
    if (activeTab === "clients") {
      setLoading(true);
      adminApi.getClients().then((d) => { setClients(d.clients || []); setLoading(false); });
    }
    if (activeTab === "recordings") {
      setLoading(true);
      adminApi.getRecordings().then((d) => { setRecordings(d.recordings || []); setLoading(false); });
    }
    if (activeTab === "compilations") {
      setLoading(true);
      adminApi.getCompilations().then((d) => { setCompilations(d.compilations || []); setLoading(false); });
    }
  }, [activeTab, refreshKey]);

  const handleDeleteTopic = async (id: number) => {
    await adminApi.deleteTopic(id);
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDeleteClient = async (id: number) => {
    await adminApi.deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDeleteRecording = async (id: number) => {
    await adminApi.deleteRecording(id);
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteCompilation = async (id: number) => {
    await adminApi.deleteCompilation(id);
    setCompilations((prev) => prev.filter((c) => c.id !== id));
  };

  const fmt = (val: string) => {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString("ru-RU");
  };

  return (
    <main className="ml-64 flex-1 p-8">
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
          <Icon name="Loader" size={16} className="animate-spin" />
          Загрузка...
        </div>
      )}

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-display font-black text-white mb-1">Обзор</h1>
            <p className="text-muted-foreground text-sm">Добро пожаловать в панель управления VoiceAI</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Тем", value: stats.topics, icon: "BookOpen", color: "text-accent" },
              { label: "Своих клиентов", value: stats.clients, icon: "Users", color: "text-blue-400" },
              { label: "Записей", value: stats.recordings, icon: "Mic", color: "text-purple-400" },
              { label: "Компиляций", value: stats.compilations, icon: "Sparkles", color: "text-yellow-400" },
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

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={onOpenTopicModal}
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
              onClick={onOpenInviteModal}
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

          <div className="bg-card/50 border border-accent/10 rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg mb-4">Последние записи</h2>
            {recordings.length === 0 && !loading && (
              <p className="text-muted-foreground text-sm">Записей пока нет</p>
            )}
            <div className="space-y-3">
              {recordings.slice(0, 4).map((rec) => (
                <div key={rec.id} className="flex items-center justify-between py-3 border-b border-accent/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Icon name="Mic" size={14} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{rec.client_name}</div>
                      <div className="text-xs text-muted-foreground">{rec.topic}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-accent font-mono">{rec.duration || "—"}</div>
                    <div className="text-xs text-muted-foreground">{fmt(rec.created_at)}</div>
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
              onClick={onOpenTopicModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              <Icon name="Plus" size={16} />
              Новая тема
            </button>
          </div>

          {topics.length === 0 && !loading && (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="BookOpen" size={40} className="mx-auto mb-4 opacity-30" />
              <p>Тем пока нет. Создайте первую!</p>
            </div>
          )}

          <div className="space-y-3">
            {topics.map((topic) => (
              <div key={topic.id} className="bg-card/50 border border-accent/10 hover:border-accent/30 rounded-2xl p-6 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Icon name="BookOpen" size={18} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{topic.title}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{topic.recordings_count} записей</span>
                        <span>Создана {fmt(topic.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {topic.has_compilation ? (
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
                    <button
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                    >
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
              onClick={onOpenInviteModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              <Icon name="Mail" size={16} />
              Пригласить
            </button>
          </div>

          {clients.length === 0 && !loading ? (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="Users" size={40} className="mx-auto mb-4 opacity-30" />
              <p>Клиентов пока нет. Отправьте первое приглашение!</p>
            </div>
          ) : (
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
                  {clients.map((client, i) => (
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
                      <td className="px-6 py-4 text-sm text-white font-mono">{client.recordings_count}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{fmt(client.invited_at)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-1.5 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors" title="Повторить приглашение">
                            <Icon name="Mail" size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                            title="Удалить"
                          >
                            <Icon name="Trash2" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Recordings */}
      {activeTab === "recordings" && (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-display font-black text-white mb-1">Записи клиентов</h1>
            <p className="text-muted-foreground text-sm">Все голосовые записи от своих клиентов</p>
          </div>

          {recordings.length === 0 && !loading && (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="Mic" size={40} className="mx-auto mb-4 opacity-30" />
              <p>Записей пока нет</p>
            </div>
          )}

          <div className="space-y-3">
            {recordings.map((rec) => (
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
                      <div className="font-medium text-white text-sm mb-1">{rec.client_name}</div>
                      <div className="text-xs text-muted-foreground">{rec.topic}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-end gap-0.5 h-8">
                      {[3, 6, 10, 7, 12, 9, 14, 11, 8, 13, 10, 7, 11, 8, 5].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-colors ${playingId === rec.id ? "bg-accent" : "bg-accent/30"}`}
                          style={{ height: `${h * 2}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-accent font-mono text-sm font-medium">{rec.duration || "—"}</span>
                    <span className="text-muted-foreground text-xs hidden md:block">{fmt(rec.created_at)}</span>
                    <button
                      onClick={() => handleDeleteRecording(rec.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                    >
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
            {compilations.map((comp) => (
              <div key={comp.id} className="bg-card/50 border border-accent/20 rounded-2xl p-6 transition-all hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 flex items-center justify-center">
                      <Icon name="Sparkles" size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{comp.topic}</div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Создана {fmt(comp.created_at)}</span>
                        <span>•</span>
                        <span>{comp.sources_count} исходных записей</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-end gap-0.5 h-8">
                      {[5, 9, 14, 11, 16, 13, 18, 15, 12, 17, 14, 10, 15, 11, 7].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-gradient-to-t from-accent/40 to-accent"
                          style={{ height: `${h * 2}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-accent font-mono font-medium">{comp.duration || "—"}</span>
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
                    <button
                      onClick={() => handleDeleteCompilation(comp.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-colors"
                    >
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {compilations.length === 0 && !loading && (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="Sparkles" size={40} className="mx-auto mb-4 opacity-30" />
                <p>Компиляций пока нет. Добавьте больше записей по теме.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminContent;