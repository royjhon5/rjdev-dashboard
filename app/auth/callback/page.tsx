"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import CustomLoading from "@/components/custom_loading";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        router.replace("/login");
        return;
      }
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      });
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <CustomLoading />
    </div>
  );
}
