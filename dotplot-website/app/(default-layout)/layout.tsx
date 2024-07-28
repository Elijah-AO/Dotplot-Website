import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/app/lib/theme-provider";
import { Header } from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "../components/Navbar";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <Analytics />
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className={`flex min-h-screen flex-col ${inter.className}`}>
              <Navbar />
              <div className="flex flex-1 justify-center w-full pt-8">
                <div className="flex w-full h-full justify-center items-center">
                  {children}
                </div>
              </div>
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
