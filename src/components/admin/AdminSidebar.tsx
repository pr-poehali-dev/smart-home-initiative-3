import Icon from "@/components/ui/icon";
import { Tab } from "./types";

interface AdminSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Обзор", icon: "LayoutDashboard" },
  { id: "topics", label: "Темы", icon: "BookOpen" },
  { id: "clients", label: "Клиенты (СК)", icon: "Users" },
  { id: "recordings", label: "Записи", icon: "Mic" },
  { id: "compilations", label: "Компиляции", icon: "Sparkles" },
];

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
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
  );
};

export default AdminSidebar;
