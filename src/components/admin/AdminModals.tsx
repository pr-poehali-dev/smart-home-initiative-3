import Icon from "@/components/ui/icon";

interface AdminModalsProps {
  showInviteModal: boolean;
  setShowInviteModal: (v: boolean) => void;
  inviteEmail: string;
  setInviteEmail: (v: string) => void;
  inviteName: string;
  setInviteName: (v: string) => void;
  inviteSent: boolean;
  handleSendInvite: () => void;

  showTopicModal: boolean;
  setShowTopicModal: (v: boolean) => void;
  newTopicTitle: string;
  setNewTopicTitle: (v: string) => void;
  topicCreated: boolean;
  handleCreateTopic: () => void;
}

const AdminModals = ({
  showInviteModal,
  setShowInviteModal,
  inviteEmail,
  setInviteEmail,
  inviteName,
  setInviteName,
  inviteSent,
  handleSendInvite,
  showTopicModal,
  setShowTopicModal,
  newTopicTitle,
  setNewTopicTitle,
  topicCreated,
  handleCreateTopic,
}: AdminModalsProps) => {
  return (
    <>
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
    </>
  );
};

export default AdminModals;
