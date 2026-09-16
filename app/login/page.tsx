import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Member Login",
  description: "Sign in to the Sigma Lambda Chapter member portal with a secure email login link.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto w-full max-w-[440px] px-5 sm:px-8">
        <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
          Member portal
        </span>
        <h1 className="text-[32px] leading-[1.12] font-semibold sm:text-[38px]">Sign in to your account.</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-text-ondark/68">
          Enter your email and we&apos;ll send you a secure link to sign in — no password needed.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
