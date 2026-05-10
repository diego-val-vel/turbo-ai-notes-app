import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/features/auth/auth-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your notes beautifully."
    >
      <AuthForm type="sign-up" />
    </AuthLayout>
  );
}
