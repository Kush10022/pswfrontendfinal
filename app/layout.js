import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from "next/font/google";
import './globals.css'
import Navigation from './lib/Navigation';
const inter = Inter({ subsets: ["latin"] });
import "./global.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          <Navigation />
          {children}
        </body>
      </html>
  );
}
