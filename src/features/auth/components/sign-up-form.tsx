"use client";

import { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "../actions/sign-up";

export const SignUpForm = () => {
  const [actionState, signUp] = useActionState(signUpUser, Empty_Action_State);
  return (
    <Form action={signUp} actionState={actionState} onSuccess={() => console.log("User signed up successfully")}>
      <Label htmlFor="userName">Username</Label>
      <Input type="text" name="userName" id="userName" placeholder="majidali129" defaultValue={actionState.payload?.get("userName") as string} />
      <FieldError actionState={actionState} name="userName" />
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" id="email" placeholder="majidali129@gmail.com" defaultValue={actionState.payload?.get("email") as string} />
      <FieldError actionState={actionState} name="email" />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="******" defaultValue={actionState.payload?.get("password") as string} />
      <FieldError actionState={actionState} name="password" />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="******" defaultValue={actionState.payload?.get("confirmPassword") as string} />
      <FieldError actionState={actionState} name="confirmPassword" />
      <div className="flex md:justify-end">
        <SubmitButton label="Sign Up" />
      </div>
    </Form>
  );
};
