import { ReactNode } from "react";
import { Separator } from "./ui/separator";

interface HeadingProps {
  title: string;
  description?: string;
  tabs?: ReactNode;
}

const Heading = ({ tabs, title, description }: HeadingProps) => {
  return (
    <>
      {tabs}
      <div className="px-8 space-y-0.5">
        <h2 className="font-bold text-3xl  tracking-tight">{title}</h2>
        {description && <p className="text-sm dark:text-zinc-300 text-zinc-600">{description}</p>}
      </div>
      <Separator />
    </>
  );
};
export default Heading;
