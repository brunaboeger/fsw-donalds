import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { CartProvider } from "./[slug]/menu/context/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW Donalds",
  description: "Aplicativo de Restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col antialiased w-[450px] m-auto border`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
