"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import DashboardLayout from "./_components/DashboardLayout";

export default function DashboardRootLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useSupabaseAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show nothing if not authenticated
  if (!user) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}