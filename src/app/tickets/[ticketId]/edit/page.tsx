import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { getTicket } from "@/features/queries/get-ticket";
import { TicektUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

type TicketEditFormProps = {
  params: Promise<{ ticketId: string }>;
};
const TicketUpdatePage = async ({ params }: TicketEditFormProps) => {
  const id = (await params)?.ticketId;
  const ticket = await getTicket(id);
  if (!ticket) notFound();
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact className="w-full max-w-[420px]" title="Edit ticket" description="Edit an existing ticket" content={<TicektUpsertForm ticket={ticket} />} />
    </div>
  );
};
export default TicketUpdatePage;
