import { useState } from "react";
import { Tab } from "@/components/admin/types";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminContent from "@/components/admin/AdminContent";
import AdminModals from "@/components/admin/AdminModals";
import { adminApi } from "@/api/adminApi";

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
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSendInvite = async () => {
    if (!inviteEmail || !inviteName) return;
    await adminApi.inviteClient(inviteName, inviteEmail);
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowInviteModal(false);
      setInviteEmail("");
      setInviteName("");
      setRefreshKey((k) => k + 1);
    }, 2000);
  };

  const handleCreateTopic = async () => {
    if (!newTopicTitle) return;
    await adminApi.createTopic(newTopicTitle);
    setTopicCreated(true);
    setTimeout(() => {
      setTopicCreated(false);
      setShowTopicModal(false);
      setNewTopicTitle("");
      setRefreshKey((k) => k + 1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <AdminContent
        activeTab={activeTab}
        playingId={playingId}
        setPlayingId={setPlayingId}
        onOpenTopicModal={() => setShowTopicModal(true)}
        onOpenInviteModal={() => setShowInviteModal(true)}
        refreshKey={refreshKey}
      />

      <AdminModals
        showInviteModal={showInviteModal}
        setShowInviteModal={setShowInviteModal}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        inviteName={inviteName}
        setInviteName={setInviteName}
        inviteSent={inviteSent}
        handleSendInvite={handleSendInvite}
        showTopicModal={showTopicModal}
        setShowTopicModal={setShowTopicModal}
        newTopicTitle={newTopicTitle}
        setNewTopicTitle={setNewTopicTitle}
        topicCreated={topicCreated}
        handleCreateTopic={handleCreateTopic}
      />
    </div>
  );
};

export default Admin;
