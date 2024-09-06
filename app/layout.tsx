import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./Store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Music",
  description: "My Music app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
        </body>
    </html>
  );
}
