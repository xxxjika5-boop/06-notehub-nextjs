import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";


interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
