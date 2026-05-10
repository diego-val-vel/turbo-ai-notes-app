import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/features/auth/auth-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue using Turbo Notes."
    >
      <AuthForm type="login" />
    </AuthLayout>
  );
}
