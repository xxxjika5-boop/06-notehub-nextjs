"use client";

import css from "./NoteList.module.css";
import NoteItem from "../NoteItem/NoteItem";
import type { Note } from "@/types/note";
import type { RefObject } from "react";
import type { SearchBoxRef } from "@/components/SearchBox/SearchBox";

export interface NoteListProps {
  notes: Note[];
  searchRef?: RefObject<SearchBoxRef | null>; 
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
