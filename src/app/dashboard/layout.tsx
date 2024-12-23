"use client";
import Header from "@/app/_component/Layout/Header";
import SideBar from "@/app/_component/Layout/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex  ">
        <SideBar />
        <div className="w-full p-8 bg-slate-50 min-h-[calc(100vh-5rem)]">
          <main className="container">{children}</main>
        </div>
      </div>
    </>
  );
}
