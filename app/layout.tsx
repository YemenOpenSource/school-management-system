import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | sMs",
    default: 'sMs'
  },
  description: "your next step for managing your employees",
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={inter.className + "min-h-screen mx-auto"}>
        {/* <Nav isDashboard={false} /> */}
        <ToastContainer 
        
        />
        {children}
      </body>
    </html>
  );
}
