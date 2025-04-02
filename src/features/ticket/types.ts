export type TicketStatus = "DONE" | "OPEN" | "IN_PROGRESS";

export type Ticket = {
  id: number;
  title: string;
  content: string;
  status: TicketStatus;
};
