"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { contactSchema, type ContactInput } from "@/schemas/contact";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const field: Record<string, string> = {};
      parsed.error.flatten().fieldErrors &&
        Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
          field[k] = (v as string[])?.[0] ?? "";
        });
      setErrors(field as Partial<Record<keyof ContactInput, string>>);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Failed to send");
      router.push(ROUTES.HOME + "?contact=success");
    } catch {
      setErrors({ message: "Failed to send. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Get in touch for quotes and projects.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.name && "border-destructive"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.email && "border-destructive"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject (optional)
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={cn(
              "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm",
              errors.message && "border-destructive"
            )}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
