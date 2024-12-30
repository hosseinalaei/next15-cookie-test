import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/react-query-provider";
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
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranSans.variable}`}>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
