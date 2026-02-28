export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4" suppressHydrationWarning>
      <div className="w-full max-w-md" suppressHydrationWarning>{children}</div>
    </div>
  );
}
