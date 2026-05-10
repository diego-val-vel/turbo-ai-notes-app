"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  login,
  signUp,
} from "@/features/auth/api";

import { saveSession } from "@/features/auth/session";

type AuthFormProps = {
  type: "login" | "sign-up";
};

export function AuthForm({
  type,
}: AuthFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = type === "login";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = isLogin
        ? await login({
          email,
          password,
        })
        : await signUp({
          email,
          password,
        });

      saveSession(response.tokens);

      router.push("/notes");
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "ApiError"
      ) {
        setErrorMessage(error.message);
        return;
      }

      console.error(error);

      setErrorMessage(
        "Unexpected error. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-700"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-neutral-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 rounded-2xl border border-neutral-200 bg-white px-4 text-sm outline-none transition focus:border-neutral-400"
        />
      </div>

      {errorMessage ? (
        <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 rounded-2xl bg-neutral-900 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Please wait..."
          : isLogin
            ? "Login"
            : "Create account"}
      </button>

      <div className="text-center text-sm text-neutral-500">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-neutral-900"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-neutral-900"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
