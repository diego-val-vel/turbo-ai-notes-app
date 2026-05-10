type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF7F1] px-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">
            {title}
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
}
