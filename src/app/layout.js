import { Montserrat } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import AOSProvider from "@/components/AOSProvider";
import CustomSessionProvider from "@/components/CustomSessionProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
})
const superbubble = localFont({
  src: '../../public/fonts/super_bubble/Super-Bubble.ttf',
  variable: '--font-superbubble',
})
const tropicaltides = localFont({
  src: '../../public/fonts/tropical_tides/Tropical-Tides.otf',
  variable: '--font-tropicaltides',
})

export const metadata = {
  title: "InTO UGM 2025",
  description: "InTO UGM 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${superbubble.variable} ${tropicaltides.variable} font-montserrat antialiased bg-[#E5FCFF]`}
      >
        <CustomSessionProvider>
          <AOSProvider>
            {children}
          </AOSProvider>
        </CustomSessionProvider>
        
      </body>
    </html>
  );
}
