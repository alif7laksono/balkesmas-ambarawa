import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
