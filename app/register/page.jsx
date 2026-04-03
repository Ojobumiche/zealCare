import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import AuthForm from "@/components/AuthForm";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join ZealCare to mentor, volunteer, or donate."
      footer={(
        <p>
          Already have an account?
          <Link href="/login" className="font-semibold text-white-700 cursor-pointer hover:text-white-800"> Sign in</Link>
        </p>
      )}
    >
      <SocialAuthButtons />

      <div className="relative flex items-center justify-center gap-3 text-sm text-gray-500">
        <span className="h-px flex-1 bg-gray-200" />
        <span>or continue with email</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <AuthForm isRegister />
    </AuthLayout>
  );
}
