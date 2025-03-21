"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session error:", error);
        router.replace("/login");
        return;
      }
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          console.log("Session stored:", session);
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      });
    };

    handleAuth();
  }, [router]);

  return <p>Authenticating...</p>;
}
