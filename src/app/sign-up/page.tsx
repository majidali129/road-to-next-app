import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

const SignUpPage = () => (
  <div className="flex-1 flex flex-col justify-center items-center">
    <CardCompact
      className="w-full max-w-[420px] flex self-center"
      title="Create an account"
      description="Create an account to get started"
      content={<SignUpForm />}
      footer={
        <p>
          <span>Already have an account? </span>
          <Link className="text-sm text-muted-foreground " href={signInPath()}>
            Sign In now
          </Link>
        </p>
      }
    />
  </div>
);

export default SignUpPage;
