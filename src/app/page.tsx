import Heading from "@/components/heading";
import { ticketsPath } from "@/paths";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-9">
      <Heading title="Home Page" description="Your home place to start" />

      <div className="flex-1 flex items-center flex-col">
        <Link href={ticketsPath()} className="underline">
          Go to tickets
        </Link>
      </div>
    </div>
  );
};
export default HomePage;
