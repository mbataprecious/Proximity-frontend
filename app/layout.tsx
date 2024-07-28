import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";
import ProgressBarProvider from "@/components/ProgressBarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proximity",
  description: "Proximity- attendance at your finger tips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
