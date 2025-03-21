"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.replace("/dashboard"); // 🔄 Redirect if already logged in
      } else {
        setLoading(false); // ✅ Allow login UI to load
      }
    };

    checkUserSession();
  }, [router]);

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      console.error("GitHub Login Error:", error.message);
    } else {
      console.log("Redirecting to GitHub...");
    }
  };

  if (loading) return null; 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={signInWithGitHub}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
