import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement, ComponentPropsWithoutRef, ReactElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: ReactElement<ComponentPropsWithoutRef<"svg">>;
  button?: ReactElement<ComponentPropsWithoutRef<"button">>;
};

const Placeholder = ({ label, button = <div />, icon = <LucideMessageSquareWarning /> }: PlaceholderProps) => {
  return (
    <div className="flex-1 flex items-center justify-center self-center flex-col gap-y-2">
      {cloneElement(icon, {
        className: "h-14 w-14",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10 ",
      })}
    </div>
  );
};
export default Placeholder;
