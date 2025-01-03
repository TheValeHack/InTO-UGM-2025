import BubbleButton from "@/components/BubbleButton";
import { useEffect, useState } from "react";

export default function PaymentPending({ token, packageId, orderId }) {
  const [packageName, setPackageName] = useState("");

  useEffect(() => {
    const fetchPackageName = async () => {
      try {
        const response = await fetch(`/api/packages/${packageId}`);
        if (response.ok) {
          const data = await response.json();
          setPackageName(data.name);
        } else {
          console.error("Gagal mengambil nama paket");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    if (packageId) {
      fetchPackageName();
    }
  }, [packageId]);

  const handleCancelTransaction = async () => {
    try {
      const response = await fetch("/api/transactionsCancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        window.location.reload();
      } else {
        alert(data.error || "Gagal membatalkan transaksi.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal membatalkan transaksi.");
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 w-full relative">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
            <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
              PEMBAYARAN
            </div>
            <div className="title-stroke text-[#FAFAFA] absolute">
              PEMBAYARAN
            </div>
          </div>
          <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
            <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
              BELUM SELESAI
            </div>
            <div className="title-stroke text-[#FF9B8B] absolute">
              BELUM SELESAI
            </div>
          </div>
        </div>
        <div className="w-full max-w-[800px] text-sm sm:text-base md:text-xl text-center font-semibold text-[#B46632]">
          Pembayaran anda untuk pembelian paket {packageName || "Loading..."} belum selesai,
          silahkan lanjutkan pembayaran anda atau batalkan transaksi.
          <div className="flex flex-col mt-5 gap-3">
            <BubbleButton
              scale={2}
              className="text-sm sm:text-lg min-w-full py-4"
              onClick={() => {
                window.snap.pay(token);
              }}
            >
              LANJUTKAN PEMBAYARAN
            </BubbleButton>
            <BubbleButton
              scale={2}
              color="red"
              className="text-sm sm:text-lg min-w-full py-4"
              onClick={handleCancelTransaction}
            >
              BATALKAN TRANSAKSI
            </BubbleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
