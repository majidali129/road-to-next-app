"use client";

import { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUser } from "../actions/sign-in";

export const SignInForm = () => {
  const [actionState, signUp] = useActionState(signInUser, Empty_Action_State);
  return (
    <Form action={signUp} actionState={actionState} onSuccess={() => console.log("User signed up successfully")}>
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" id="email" placeholder="majidali129@gmail.com" defaultValue={actionState.payload?.get("email") as string} />
      <FieldError actionState={actionState} name="email" />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="******" defaultValue={actionState.payload?.get("password") as string} />
      <FieldError actionState={actionState} name="password" />
      <div className="flex md:justify-end">
        <SubmitButton label="Sign In" />
      </div>
    </Form>
  );
};
