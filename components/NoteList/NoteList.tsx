"use client";

import css from "./NoteList.module.css";
import NoteItem from "../NoteItem/NoteItem";
import { Note } from "@/types/note";
import { SearchBoxRef } from "@/components/SearchBox/SearchBox";

export interface NoteListProps {
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
