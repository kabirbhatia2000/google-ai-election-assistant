import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Fetch common weights
});

export const metadata: Metadata = {
  title: "Election Assistant",
  description: "Your personalized first-time voter guide and assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased selection:bg-indigo-100 selection:text-indigo-900`}
    >
      <body className="font-sans text-slate-800 min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  );
}
