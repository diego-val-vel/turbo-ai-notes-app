"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/features/auth/auth-form";
import { isAuthenticated } from "@/features/auth/session";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/notes");
    }
  }, [router]);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue using Turbo Notes."
    >
      <AuthForm type="login" />
    </AuthLayout>
  );
}
