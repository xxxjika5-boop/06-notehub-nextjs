
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string; 
  createdAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}
