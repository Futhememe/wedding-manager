import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { css } from "@/styled-system/css";

const inter = Inter({ subsets: ["latin"] });

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
    <html
      lang="en"
      className={css({
        display: "flex",
        flex: 1,
        minH: "100vh",
        minW: "100vw",
        w: "100vw",
        justifyContent: "center",
      })}
    >
      <body className={css({ display: "flex", flex: 1, maxW: "1136px" })}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
