import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import ReactQueryProvider from "@/components/react-query-provider";

export const metadata: Metadata = {
  title: "Zeztra",
  description: "Import files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col antialiased">
          <ReactQueryProvider>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-8 pl-32 pr-32 pt-6">
              {children}
            </div>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
