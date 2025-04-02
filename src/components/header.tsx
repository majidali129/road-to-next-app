import { homePath, ticketsPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <nav className="flex justify-between py-2.5 px-5 border-b  fixed left-0 ring-0 top-0 z-20 w-full bg-background/60 backdrop-blur-md">
      <div>
        <Link className={buttonVariants({ variant: "ghost" })} href={homePath()}>
          <LucideKanban className=" scale-110" />
          <h1 className=" ml-2 text-lg font-semibold">Ticketbounty</h1>
        </Link>
      </div>
      <div>
        <Link href={ticketsPath()} className={buttonVariants({ variant: "default" })}>
          Tickets
        </Link>
      </div>
    </nav>
  );
};
export default Header;
