import "bootstrap/dist/css/bootstrap.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/header";
import { jwtDecode } from "jwt-decode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface TokenAndRole {
  accessToken: string;
  role: string;
}

export function GetTokens(): TokenAndRole {
  let accessToken = "";
  let role = "";

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      accessToken = token;
      const decoded: DecodedAccessToken = jwtDecode(accessToken);
      role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }
  return { accessToken, role };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pro = GetTokens();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header accessToken={pro.accessToken} role={pro.role}></Header>
        {children}
      </body>
    </html>
  );
}
