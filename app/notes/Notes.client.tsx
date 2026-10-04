"use client";

import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox, { SearchBoxRef } from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./Notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchRef = useRef<SearchBoxRef>(null);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    placeholderData: (prev) => prev,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.actions}>
          <SearchBox ref={searchRef} onChange={handleSearchChange} />

          <Pagination
            page={page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />

          <button
            className={css.createButton}
            onClick={() => setIsModalOpen(true)}
          >
            Create note +
          </button>
        </div>

        <NoteList notes={data?.notes ?? []} searchRef={searchRef} />

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onSuccess={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </main>
  );
}
