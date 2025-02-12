"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BubbleButton from "@/components/BubbleButton";

export default function Thanks() {
  const router = useRouter();

  return (

      <div className="w-full overflow-hidden">
        <Navbar className={"navbar"}/>
        <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
          <section
            id="payment"
            className="w-full min-h-[75vh] py-32 flex flex-col justify-start items-center relative"
          >
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                      TERIMA
                    </div>
                    <div className="title-stroke text-[#FAFAFA] absolute">
                      TERIMA
                    </div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                      KASIH
                    </div>
                    <div className="title-stroke text-[#FF9B8B] absolute">
                      KASIH
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[800px] text-sm sm:text-base md:text-xl text-center font-semibold text-[#B46632] shadow-none drop-shadow-none [text-shadow:none]">
                  Terima kasih telah berpartisipasi dalam InTO UGM 2025, sampai jumpa di InTO UGM 2026!!!
                  <br />
                  <br />
                  <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-4"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    KEMBALI KE MENU UTAMA
                  </BubbleButton>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    )
}
