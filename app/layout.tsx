import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

import RegisterModel from "./components/models/RegisterModel";
import LoginModel from "./components/models/LoginModel";
import RentModel from "./components/models/RentModel";
import SearchModel from "./components/models/SearchModel";

import ToasterProvider from "./providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Clon de Airbnb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let currentUser = null;

  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    // Optionally handle the error, show a message, or fallback
  }

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModel />
        <RentModel />
        <LoginModel />
        <RegisterModel />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}