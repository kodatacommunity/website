import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kodata: — La communauté data de Madagascar",
  description:
    "Kodata: est la communauté où les passionnés de la data se connectent, apprennent et collaborent — à Madagascar et au-delà.",
  icons: {
    icon: "/logo_kodata.png",
    shortcut: "/logo_kodata.png",
    apple: "/logo_kodata.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        {/* Bandes décoratives */}
        <div className="w-full flex flex-col">
          <div className="bg-[#c24b46] w-full h-3" />
          <div className="h-3 w-full bg-[#d67035]" />
          <div className="h-3 w-full bg-[#e8b056]" />
          <div className="bg-[#2d3235] w-full h-3" />
        </div>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
