import { CardCompact } from "@/components/card-compact";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact className="w-full max-w-[420px] animate-fade-in-from-top" title="Forgot Password" description="Forgot your password? Enter your email to reset it." content={<ForgotPasswordForm />} />
    </div>
  );
};

export default ForgotPasswordPage;
