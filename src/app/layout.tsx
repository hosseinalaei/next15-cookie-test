import QueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
// import { auth } from "@/lib/auth/auth";
// import { SessionProvider } from "next-auth/react";
import { SessionProvider } from "@/lib/auth/SessionProvider";
import { getSession } from "@/lib/auth/getSession";

const iranSans = localFont({
  src: "./fonts/IRANSans.ttf",
  variable: "--font-iranSans",
  // weight: "100 900",
});

export const metadata: Metadata = {
  title: "شاهد",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  console.log("layout session", session);

  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranSans.variable}`}>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        <ToastContainer rtl={true} theme="colored" position="top-left" />
      </body>
    </html>
  );
}
