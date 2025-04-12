import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type CardCompactProps = {
  title: string;
  description: string;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
};
const CardCompact = ({ title, description, content, footer, className }: CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter className="justify-between">{footer}</CardFooter>}
    </Card>
  );
};
export { CardCompact };
