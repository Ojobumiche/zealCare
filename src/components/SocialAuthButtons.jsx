"use client";
import { signIn } from "next-auth/react";

export default function SocialAuthButtons() {
  return (
    <div className="space-y-3">
      <button
        onClick={() => signIn("google")}
        className="auth-btn"
      >
        Continue with Google
      </button>

      <button
        onClick={() => signIn("facebook")}
        className="auth-btn"
      >
        Continue with Facebook
      </button>

      <button
        onClick={() => signIn("twitter")}
        className="auth-btn"
      >
        Continue with Twitter
      </button>
    </div>
  );
}
