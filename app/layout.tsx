import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Pasar Rakyat 2025",
  description: "#Borong dagangan kantek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <main className="min-h-screen bg-orange-50">
          <header className="sticky top-0 z-10 bg-gradient-to-r from-orange-600 to-orange-500 shadow-md backdrop-blur-sm">
            <div className="px-4 py-3 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold text-white tracking-tight">Pasar Rakyat</h1>
                <div className="flex items-center mt-0.5">
                  <span className="text-orange-100 text-xs font-medium bg-orange-700/30 px-2 py-0.5 rounded-full flex items-center">
                    #BorongDaganganKantek
                  </span>
                </div>
              </div>
            </div>


          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
