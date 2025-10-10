"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if the session status is 'authenticated' (not just loading)
    if (status === 'authenticated') {
      // 💡 Redirect to dashboard upon successful login
      router.replace('/dashboard'); 
    }
  }, [status, router]);

  // Optionally show a loading state while NextAuth initializes
  if (status === 'loading') {
    return <div>Loading authentication...</div>;
  }

  return (
    <div>
      <HeroSection/>
    </div>
  );
}
