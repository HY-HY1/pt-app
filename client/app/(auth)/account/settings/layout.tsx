"use client"
import { AppSidebar } from "./_components/app-sidebar";
import { useAuth } from "@/hooks/auth/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AuthProvider } from "@/context/auth/accountContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticate, authenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const auth = await authenticate();
      if(!auth.authenticated) {
        router.push('/account?login=true')        
      }
    };
    authenticateUser();
  }, []);

  return (
    <AuthProvider>
      <SidebarProvider>
      <AppSidebar user={user} authenticated={authenticated} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </AuthProvider>
  );
}
