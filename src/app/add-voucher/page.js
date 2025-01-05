"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BubbleInput from "@/components/BubbleInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BubbleButton from "@/components/BubbleButton";
import admin from "@/data/admins.json";

export default function AddVoucher() {
  const [allLoading, setAllLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const [formData, setFormData] = useState({
    code: "",
    type: "nominal",
    value: "",
    validUntil: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchVouchers = async () => {
    try {
      const response = await fetch("/api/vouchers");
      if (response.ok) {
        const data = await response.json();
        setVouchers(data.vouchers || []);
      } else {
        console.log("Gagal mengambil data voucher");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    const validateUser = async () => {
      if (!isLoading) {
        if (!session || !admin.includes(session?.user?.email)) {
          router.push("/");
        }
        setAllLoading(false);
      }
    };

    validateUser();
  }, [isLoading, session, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const { code, type, value, validUntil } = formData;

    if (!code || !type || !value || !validUntil) {
      setError("Semua data harus diisi!");
      return;
    }

    try {
      const response = await fetch("/api/add_voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Voucher berhasil ditambahkan!");
        setFormData({
          code: "",
          type: "nominal",
          value: "",
          validUntil: "",
        });
        await fetchVouchers()
      } else {
        setError(data.error || "Gagal menambahkan voucher.");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
      setError("Gagal menambahkan voucher.");
    }
  };

  if (allLoading) {
    return <></>;
  }

  return (
    session &&
    admin.includes(session?.user?.email) && (
      <div className="w-full overflow-hidden">
        <Navbar className={"navbar"} session={session} />
        <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
          <section
            id="paket"
            className="w-full min-h-[75vh] py-32 flex flex-col justify-start items-center relative"
          >
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                      TAMBAH
                    </div>
                    <div className="title-stroke text-[#FAFAFA] absolute">
                      TAMBAH
                    </div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                      VOUCHER
                    </div>
                    <div className="title-stroke text-[#FF9B8B] absolute">
                      VOUCHER
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mx-auto max-w-[1100px] gap-6 mt-12">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-xl text-[#92542C] font-bold">
                    Data Voucher
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Kode Voucher
                      </label>
                      <BubbleInput
                        placeholder={"CONTOH99"}
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Tipe
                      </label>
                      <div className="w-full p-[4px] sm:p-[5px] mx-auto shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[15px] sm:rounded-[20px] border-[3px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative">
                        <div className="w-full h-full bg-white shadow-[inset_0px_0px_15px_6px_rgba(0,0,0,0.15)] rounded-[10px] sm:rounded-[15px] overflow-hidden flex items-center justify-center">
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full h-full cursor-pointer px-3 sm:px-4 py-2 sm:py-4 bg-transparent outline-none border-none text-[10px] sm:text-base text-black"
                          >
                            <option value={"nominal"}>Nominal</option>
                            <option value={"percentage"}>Persentase</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Nilai Diskon (Dalam nominal/persentase)
                      </label>
                      <BubbleInput
                        placeholder={"25000/15"}
                        type="number"
                        name="value"
                        max={formData.type == "percentage" ? 100 : 1000000}
                        value={formData.value}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Valid Until
                      </label>
                      <BubbleInput
                        type="date"
                        name="validUntil"
                        value={formData.validUntil}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 font-semibold text-sm sm:text-base">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 font-semibold text-sm sm:text-base">{success}</div>
                )}
                <BubbleButton
                  scale={2}
                  className="text-sm sm:text-lg min-w-full py-4 mt-4"
                  onClick={handleSubmit}
                >
                  TAMBAH VOUCHER
                </BubbleButton>
              </div>
              <table className="table w-full max-w-[1200px] mx-auto table-auto border-collapse border-2 border-[#B46632] mt-8">
                <thead>
                  <tr>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">KODE</th>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">TIPE</th>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">NILAI DISKON</th>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">VALID SAMPAI</th>
                  </tr>
                </thead>
                <tbody>
                {vouchers.map((voucher) => (
                    <tr key={voucher._id}>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">{voucher.code}</td>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">{voucher.type}</td>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">{voucher.discount}</td>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">{voucher.valid_until}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </section>
          <Footer />
        </div>
      </div>
    )
  );
}
