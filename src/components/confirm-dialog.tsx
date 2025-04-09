"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cloneElement, isValidElement, ReactElement, useActionState, useState } from "react";
import Form from "./form/form";
import SubmitButton from "./form/submit-button";
import { ActionState, Empty_Action_State } from "./form/utils/to-action-state";

type UseConfirmDialogProps = {
  action: () => Promise<ActionState>;
  trigger: ReactElement<{ onClick: () => void }>;
  title?: string;
  description?: string;
};

const useConfirmDialog = ({ action, trigger, title = "Are you absolutely sure?", description = "This action cannot be undone. Make sure you understand the consequences." }: UseConfirmDialogProps) => {
  const [actionState, formAction] = useActionState(action, Empty_Action_State);
  const [open, setOpen] = useState(false);

  const dialogTrigger =
    isValidElement(trigger) &&
    cloneElement(trigger, {
      onClick: () => setOpen((prev) => !prev),
    });

  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} onSuccess={() => setOpen(false)} actionState={actionState}>
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
