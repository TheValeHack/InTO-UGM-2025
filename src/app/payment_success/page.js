"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BubbleButton from "@/components/BubbleButton";
import paketData from "@/data/paket.json";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const order_id = urlParams.get("order_id");
  const transaction_status = urlParams.get("transaction_status");
  const [isLoadingPaymentStatus, setIsLoadingPaymentStatus] = useState(true)
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();
  const fetchPaymentStatus = async () => {
    if(transaction_status == "pending"){
      router.back()
    } else {
      const response = await fetch("/api/transactionsDetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id
          }),
        });
      const data = await response.json()
      console.log(response)
      console.log(data)
      if(response.ok){
        if(data.transactions?.payment_status == "paid"){
          //
        } else {
          router.back()
        }
      } else {
        console.log(response)
      }
      setIsLoadingPaymentStatus(false)
    }
  }

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/");
    }
    fetchPaymentStatus()
  }, [isLoading, session, router]);

  if (isLoading) {
    return (
      <></>
    );
  }

  if (isLoadingPaymentStatus) {
    return (
      <></>
    );
  }

  return (
    session && (
      <div className="w-full overflow-hidden">
        <Navbar className={"navbar"} session={session} />
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
                    Terima kasih atas antusiasmenya dalam menyelesaikan pembayaran ini. Sampai jumpa di main event InTO UGM 2025!
                    <br/><br/>
                    Pastikan Sobat InTO telah menerima email tiket dalam 1x24 jam. Jika belum, mohon segera menghubungi contact person di bawah ini.
                    <br/><br/>
                    📞 Hazel (<span className="cursor-pointer hover:text-[#874e28]" onClick={() => window.open("https://wa.me/6289684345697", "_blank")}>+6289684345697</span>)
                    <br/>
                    📞 Jelsya (<span className="cursor-pointer hover:text-[#874e28]" onClick={() => window.open("https://wa.me/6285788644309", "_blank")}>+6285788644309</span>)
                    <br/><br/>
                    <BubbleButton
                        scale={2}
                        className="text-sm sm:text-lg min-w-full py-4"
                        onClick={() => {
                          router.push("/")
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
  );
}
