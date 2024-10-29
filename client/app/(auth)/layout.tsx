"use client"
import type { Metadata } from "next";
import "@/style/globals.css";
import { AuthProvider } from "@/context/auth/accountContext";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
     <AuthProvider>
    <html lang="en">
      <head>
        {/* Link to Google Fonts for Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
   </AuthProvider>
   </>
  );
}
