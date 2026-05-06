export type Tab = "dashboard" | "topics" | "clients" | "recordings" | "compilations";

export interface Topic {
  id: number;
  title: string;
  recordingsCount: number;
  hasCompilation: boolean;
  createdAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  status: "active" | "pending";
  recordingsCount: number;
  invitedAt: string;
}

export interface Recording {
  id: number;
  clientName: string;
  topic: string;
  duration: string;
  createdAt: string;
}

export interface Compilation {
  id: number;
  topic: string;
  duration: string;
  sourcesCount: number;
  createdAt: string;
}

export const mockTopics: Topic[] = [
  { id: 1, title: "Преимущества нашего продукта", recordingsCount: 7, hasCompilation: true, createdAt: "05.05.2026" },
  { id: 2, title: "Почему клиенты выбирают нас", recordingsCount: 4, hasCompilation: true, createdAt: "03.05.2026" },
  { id: 3, title: "Опыт использования сервиса", recordingsCount: 2, hasCompilation: false, createdAt: "06.05.2026" },
];

export const mockClients: Client[] = [
  { id: 1, name: "Анна Петрова", email: "anna@mail.ru", status: "active", recordingsCount: 5, invitedAt: "01.05.2026" },
  { id: 2, name: "Игорь Смирнов", email: "igor@mail.ru", status: "active", recordingsCount: 3, invitedAt: "02.05.2026" },
  { id: 3, name: "Мария Козлова", email: "maria@mail.ru", status: "pending", recordingsCount: 0, invitedAt: "06.05.2026" },
  { id: 4, name: "Дмитрий Волков", email: "dmitry@mail.ru", status: "active", recordingsCount: 5, invitedAt: "28.04.2026" },
];

export const mockRecordings: Recording[] = [
  { id: 1, clientName: "Анна Петрова", topic: "Преимущества нашего продукта", duration: "0:52", createdAt: "05.05.2026" },
  { id: 2, clientName: "Игорь Смирнов", topic: "Преимущества нашего продукта", duration: "0:48", createdAt: "05.05.2026" },
  { id: 3, clientName: "Дмитрий Волков", topic: "Почему клиенты выбирают нас", duration: "0:59", createdAt: "03.05.2026" },
  { id: 4, clientName: "Анна Петрова", topic: "Почему клиенты выбирают нас", duration: "0:44", createdAt: "04.05.2026" },
  { id: 5, clientName: "Игорь Смирнов", topic: "Опыт использования сервиса", duration: "0:37", createdAt: "06.05.2026" },
];

export const mockCompilations: Compilation[] = [
  { id: 1, topic: "Преимущества нашего продукта", duration: "0:58", sourcesCount: 7, createdAt: "05.05.2026" },
  { id: 2, topic: "Почему клиенты выбирают нас", duration: "0:55", sourcesCount: 4, createdAt: "04.05.2026" },
];
