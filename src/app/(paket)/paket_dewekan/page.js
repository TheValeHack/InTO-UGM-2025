"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTransaction } from "@/contexts/TransactionContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutBox from "@/components/CheckoutBox";
import paketData from "@/data/paket.json";
import PaymentPending from "@/components/PaymentPending";

export default function PaketDewekan() {
  const paket = paketData.find((item) => item.id.toLowerCase() === "dewekan");
  const { data: session, status } = useSession();
  const { lastOrder, isLoadingPaymentStatus, fetchTransactionDetails, isProcessing } =
    useTransaction();
  const isLoading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && session && !isProcessing) {
      fetchTransactionDetails();
    } else if (!isLoading && !session) {
      router.push("/");
    }
  }, [isLoading, session, router, fetchTransactionDetails, isProcessing]);

  useEffect(() => {
    if (lastOrder?.payment_status === "paid") {
      router.push("/thanks");
    }
  }, [lastOrder]);

  useEffect(() => {
    const snapScript = "https://app.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading || isLoadingPaymentStatus) {
    return <></>;
  }

  return (
    <div className="w-full overflow-hidden">
      <Navbar className={"navbar"} session={session} />
      <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
        <section
          id="paket"
          className="w-full min-h-[75vh] py-32 flex flex-col justify-start items-center relative"
        >
          {lastOrder?.payment_status === "pending" ? (
            <PaymentPending
              packageId={lastOrder?.package_id}
              token={lastOrder?.payment_token}
              orderId={lastOrder?._id}
            />
          ) : (
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                      PAKET
                    </div>
                    <div className="title-stroke text-[#FAFAFA] absolute">
                      PAKET
                    </div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                      DEWEKAN
                    </div>
                    <div className="title-stroke text-[#FF9B8B] absolute">
                      DEWEKAN
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[800px] text-sm sm:text-base md:text-xl text-center font-semibold text-[#B46632]">
                  Paket Dewekan adalah paket untuk 1 peserta, yang
                  diperuntukkan bagi peserta yang sudah memiliki akun. Data
                  akun Anda akan digunakan untuk mendaftar sebagai peserta
                </div>
              </div>
              <CheckoutBox
                kode="Dewekan"
                className={"mt-12"}
                name={paket.name}
                desc={paket.desc}
                price={paket.price}
                validateParticipants={() => ""}
              />
            </div>
          )}
        </section>
        <Footer />
      </div>
    </div>
  );
}
