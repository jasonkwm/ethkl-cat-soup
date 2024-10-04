import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Web3AuthProvider } from "@/context/Web3AuthProvider";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import RPC from "./web3RPC"; // for using web3.js

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
			<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"/>
		</head>
      <Web3AuthProvider>
			<UserProvider>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-custom flex w-full`}>
          {children}
        </body>
			</UserProvider>
			</Web3AuthProvider>
      </GlobalProvider>
    </html>
  );
}


