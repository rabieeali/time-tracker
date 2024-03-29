import type { Metadata } from "next";
import "./globals.css";
import './IRANSans/Iransansx.css'
import SessionProvider from './components/SessionProvider'

export const metadata: Metadata = {
  title: "Mosbat Sabz - Time Tracker",
  description: "Done By MosbatSabz Ali Rabiee (Frontend Dev) For Co-Workers, enjoy!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
