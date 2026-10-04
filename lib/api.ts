import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Получить список заметок
export async function fetchNotes({ search = "", page = 1 }) {
  const response = await api.get("/notes", {
    params: { search, page },
  });
  return response.data;
}

// Получить одну заметку
export async function fetchNoteById(id: string) {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}


// Создать заметку
export async function createNote(noteData: { title: string; content: string; tag: string }) {
  const response = await api.post("/notes", noteData);
  return response.data;
}

// Удалить заметку
export async function deleteNote(id: string) {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}