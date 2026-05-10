"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/features/auth/auth-form";
import { isAuthenticated } from "@/features/auth/session";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/notes");
    }
  }, [router]);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your notes beautifully."
    >
      <AuthForm type="sign-up" />
    </AuthLayout>
  );
}
