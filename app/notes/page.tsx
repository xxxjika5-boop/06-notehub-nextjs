import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch данных на сервере
  await queryClient.prefetchQuery({
    queryKey: ["notes", ""], // пустой search при загрузке страницы
    queryFn: () => fetchNotes({ search: "" }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
}
