const BASE = "https://functions.poehali.dev/1f1f9ef7-4f9d-48be-99a5-b1520f9a3b5d";

async function request(resource: string, method = "GET", body?: object) {
  const res = await fetch(`${BASE}/?resource=${resource}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export const adminApi = {
  getStats: () => request("stats"),
  getTopics: () => request("topics"),
  createTopic: (title: string) => request("topics", "POST", { title }),
  deleteTopic: (id: number) => request(`topics/${id}`, "DELETE"),

  getClients: () => request("clients"),
  inviteClient: (name: string, email: string) => request("clients", "POST", { name, email }),
  deleteClient: (id: number) => request(`clients/${id}`, "DELETE"),

  getRecordings: () => request("recordings"),
  deleteRecording: (id: number) => request(`recordings/${id}`, "DELETE"),

  getCompilations: () => request("compilations"),
  deleteCompilation: (id: number) => request(`compilations/${id}`, "DELETE"),
};
