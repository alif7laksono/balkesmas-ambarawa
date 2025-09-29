import type { Metadata } from "next";
import "./globals.css";
import { raleway } from "@/app/utils/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Baslkesmas Ambarawa - Balai Kesehatan Masyarakat Wilayah Ambarawa",
  description:
    "Menjadi Institusi Penggerak Kemandirian Masyarakat dalam Mewujudkan Kesehatan Paripurna di Wilayah Kerja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${raleway.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
