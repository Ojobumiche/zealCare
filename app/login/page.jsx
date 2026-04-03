import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import AuthForm from "@/components/AuthForm";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue supporting ZealCare programs."
      footer={(
        <p>
          Don’t have an account?
          <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800"> Sign up</Link>
        </p>
      )}
    >
      <SocialAuthButtons />

      <div className="relative flex items-center justify-center gap-3 text-sm text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <AuthForm />
    </AuthLayout>
  );
}
