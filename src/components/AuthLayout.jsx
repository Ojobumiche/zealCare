"use client";
import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ size = "md", showTagline = false }) {
  const dimensions = size === "lg" ? 72 : size === "sm" ? 36 : 52;
  return (
    <div className="flex items-center gap-3">
      <div className="relative" style={{ width: dimensions, height: dimensions }}>
        <Image
          src="/logo.png"
          alt="ZealCare logo"
          fill
          className="object-contain"
          sizes={`${dimensions}px`}
          priority
        />
      </div>
      <div className="leading-tight">
        <p className="text-xl font-bold text-blue-700">ZealCare</p>
        {showTagline && (
          <p className="text-sm text-gray-600">Healing hearts. Transforming futures.</p>
        )}
      </div>
    </div>
  );
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="hidden rounded-3xl bg-white/80 p-12 shadow-xl backdrop-blur lg:block min-h-96">
          <div className="space-y-8">
            <BrandLogo size="lg" showTagline />
            <h2 className="text-3xl font-semibold text-gray-900">Every login fuels real-world impact.</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              ZealCare connects donors, volunteers, and communities through programs in education,
              leadership, and digital transformation. Sign in or create your account to keep the
              momentum going.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="rounded-2xl bg-blue-50 px-4 py-3 shadow-sm">
                <p className="font-semibold text-blue-700">2k+ learners</p>
                <p className="text-gray-600">supported through scholarships</p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-4 py-3 shadow-sm">
                <p className="font-semibold text-amber-700">350 mentors</p>
                <p className="text-gray-600">guiding career journeys</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-blue-100/60 ring-1 ring-black/5 sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-3">
            <BrandLogo size="sm" />
            <Link href="/" className="text-sm font-medium text-blue-700 hover:text-blue-800">
              Back to home
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          <div className="mt-8 space-y-6">
            {children}
          </div>

          {footer && <div className="mt-8 text-sm text-gray-700">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
