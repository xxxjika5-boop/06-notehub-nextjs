import type { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";
import type { SearchBoxRef } from "@/components/SearchBox/SearchBox";

interface NoteListProps {
  notes: Note[];
  searchRef: React.RefObject<SearchBoxRef | null>;
}

export default function NoteList({ notes, searchRef }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} searchRef={searchRef} />
      ))}
    </ul>
  );
}
