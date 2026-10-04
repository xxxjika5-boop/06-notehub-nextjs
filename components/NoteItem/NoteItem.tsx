"use client";

import Link from "next/link";
import css from "./NoteItem.module.css";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import type { RefObject } from "react";
import type { SearchBoxRef } from "@/components/SearchBox/SearchBox";

type FocusableElement = HTMLInputElement | HTMLTextAreaElement | SearchBoxRef;

interface NoteItemProps {
  note: Note;
  searchRef?: RefObject<FocusableElement | null>;
}

export default function NoteItem({ note, searchRef }: NoteItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <li
      className={css.listItem}
      onClick={() => searchRef?.current?.focus()}
    >
      <h3 className={css.title}>{note.title}</h3>

      <p className={css.content}>{note.content}</p>

      <div className={css.footer}>
        <div className={css.buttons}>
          <span className={css.tag}>{note.tag}</span>

          {}
          <Link href={`/notes/${note.id}`} className={css.link}>
            View details
          </Link>

          {}
          <button
            className={css.button}
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
