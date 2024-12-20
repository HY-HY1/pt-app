// RootLayout.tsx

import type { Metadata } from "next";
import "@/style/globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link to Google Fonts for Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
