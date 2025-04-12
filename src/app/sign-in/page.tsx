import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";

const SignInPage = () => (
  <div className="flex-1 flex flex-col justify-center items-center">
    <CardCompact
      className="w-full max-w-[420px] animate-fade-in-from-top"
      title="Sign In"
      description="Sign in to your account"
      content={<SignInForm />}
      footer={
        <>
          <p>
            <span>Haven&apos;t an account? </span>
            <Link className="text-sm text-muted-foreground " href={signUpPath()}>
              Sign Up now
            </Link>
          </p>
          <Link className="text-sm text-muted-foreground " href={passwordForgotPath()}>
            Forgot Password?
          </Link>
        </>
      }
    />
  </div>
);

export default SignInPage;
