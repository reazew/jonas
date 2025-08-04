import type { Metadata } from "next";
import localFont from "next/font/local";
import { Indie_Flower } from "next/font/google";
import "./globals.css";
import { config } from "@/utils/config";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'Jonas Messias Full Stack Developer',
  description: config.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} ${indieFlower.className} antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
