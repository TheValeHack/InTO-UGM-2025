import BubbleButton from "./BubbleButton";
import cn from "@/utils/cn";
import { formatCurrency } from "@/utils/formatCurrency";
import BubbleInput from "./BubbleInput";
import { useState } from "react";
import axios from "axios";

export default function CheckoutBox({ className, name, desc, price, kode, validateParticipants, participants }) {
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherError, setVoucherError] = useState("");

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
  };

  const handleVoucherSubmit = async (e) => {
    e.preventDefault();
    setVoucherError("");
    setDiscount(0);
  
    if (!voucher.trim()) {
      setVoucherError("Masukkan kode voucher terlebih dahulu.");
      return;
    }
  
    try {
      const response = await fetch("/api/vouchers/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voucher,
          packageName: kode,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setDiscount(data.discount);
      } else if (response.status === 404) {
        setVoucherError(data.error || "Voucher tidak ditemukan atau tidak valid.");
      } else if (response.status === 400) {
        setVoucherError(data.error || "Voucher tidak valid.");
      } else {
        setVoucherError("Terjadi kesalahan pada server.");
      }
    } catch (error) {
      console.error(error);
      setVoucherError("Terjadi kesalahan saat memvalidasi voucher.");
    }
  };
  
  
  

  const handlePayment = async () => {
    setIsProcessing(true);
    setVoucherError("");
  
    const validationError = validateParticipants();
    if (validationError) {
      setIsProcessing(false);
      return;
    }
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageName: kode,
          voucher,
          additionalParticipants: participants,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        window.location.href = data.paymentUrl;
      } else {
        alert(data.error || "Terjadi kesalahan saat memproses pembayaran.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  

  return (
    <div className={cn("relative w-full z-30 mx-auto max-w-[1200px]", className)}>
      <div className="w-full p-3 sm:p-4 pb-[35px] sm:pb-[45px] bg-[#E78B55] flex items-start justify-center rounded-[50px] sm:rounded-[60px] shadow-[0px_5px_0px_#474135,inset_0px_-12px_0px_#B54E27] relative">
        <div className="bg-[#F5DFB9] px-7 sm:px-10 xl:px-7 py-6 sm:py-10 w-full h-full rounded-[38px] sm:rounded-[48px] shadow-[0px_3px_10.3px_#474135,inset_0px_-13px_16.2px_#BC9D7F] relative">
          <div className="mx-auto max-w-[600px] flex flex-col gap-4 sm:gap-5 justify-center items-center">
            <div className="font-extrabold text-[#B46632] text-2xl sm:text-4xl">Total Harga</div>
            <div className="text-[10px] sm:text-base text-[#B6754C] font-medium text-justify">
              <span className="text-[#D33737] font-semibold">Paket {name}</span> berisi : {desc}
            </div>
            <form className="w-full" onSubmit={handleVoucherSubmit}>
              <label className="text-[10px] sm:text-base font-semibold text-[#B46632]">Masukkan Voucher</label>
              <BubbleInput
                type="text"
                value={voucher}
                onChange={handleVoucherChange}
                placeholder="Kode voucher"
              />
              {voucherError && <div className="text-red-500 text-[10px] sm:text-base mt-2">{voucherError}</div>}
            </form>
            <div className="w-full text-[#B46632] text-[10px] sm:text-base">
              <div className="w-full flex justify-between">
                <div className="font-semibold">Paket {name}</div>
                <div className="font-extrabold">Rp{formatCurrency(price)}</div>
              </div>
              <div className="w-full flex justify-between">
                <div className="font-semibold">Potongan Voucher</div>
                <div className="font-extrabold">Rp{formatCurrency(discount)}</div>
              </div>
              <div className="w-full flex justify-between mt-3">
                <div className="font-extrabold">Total Bayar</div>
                <div className="font-extrabold text-[#EF4223]">Rp{formatCurrency(price - discount)}</div>
              </div>
            </div>
            {validateParticipants() && <div className="text-red-500 text-[10px] sm:text-base">{validateParticipants()}</div>}
            <div className="w-full">
              {
                isProcessing ? (
                <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full sm:py-4"
                    onClick={() => {}}
                >
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-slate-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </BubbleButton>
                ) : (
                <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full"
                    onClick={handlePayment}
                >
                    BAYAR SEKARANG
                </BubbleButton>
                )
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
