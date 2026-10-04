"use client";

import Link from "next/link";
import css from "./NoteItem.module.css";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <li className={css.listItem}>
      <h3 className={css.title}>{note.title}</h3>

      <p className={css.content}>{note.content}</p>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>

        <div className={css.buttons}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            View details
          </Link>

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
