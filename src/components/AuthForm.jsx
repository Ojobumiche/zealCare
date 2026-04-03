"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ isRegister = false }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (isRegister) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        setError("Registration failed");
        setIsSubmitting(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid credentials");
      setIsSubmitting(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full name</label>
            <input
              placeholder="Full name"
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email address"
            required
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
