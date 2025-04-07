import { LucideLoader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending && <LucideLoader className="w-4 h-4 animate-spin mr-2" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
