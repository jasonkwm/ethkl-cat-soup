import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3AuthProvider } from "@/context/Web3AuthProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
            rel="stylesheet"
          ></link>
        </head>
        <Web3AuthProvider>
          <UserProvider>
            <body
              className={`antialiased bg-gradient-custom flex flex-col w-full`}
              style={{ fontFamily: "lora-400" }}
            >
              {children}
            </body>
          </UserProvider>
        </Web3AuthProvider>
      </GlobalProvider>
    </html>
  );
}
