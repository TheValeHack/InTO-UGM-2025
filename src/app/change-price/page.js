"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BubbleInput from "@/components/BubbleInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BubbleButton from "@/components/BubbleButton";
import admin from "@/data/admins.json";
import { formatCurrency } from "@/utils/formatCurrency";

export default function ChangePrice() {
  const [allLoading, setAllLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    price: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/all_packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
      } else {
        console.log("Gagal mengambil data paket");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
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
    setIsLoadingSubmit(true)
    setError("");
    setSuccess("");

    const { id, price } = formData;

    if (!id || !price) {
      setError("Semua data harus diisi!");
      setIsLoadingSubmit(false)
      return;
    }

    try {
      const response = await fetch("/api/change_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Harga paket berhasil diubah!");
        setFormData({
          id: "",
          price: ""
        });
        await fetchPackages()
      } else {
        setError(data.error || "Gagal mengganti harga paket.");
      }
      setIsLoadingSubmit(false)
    } catch (error) {
      setIsLoadingSubmit(false)
      console.log("Terjadi kesalahan:", error);
      setError("Gagal mengubah harga paket.");
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
                      GANTI
                    </div>
                    <div className="title-stroke text-[#FAFAFA] absolute">
                      GANTI
                    </div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                      HARGA
                    </div>
                    <div className="title-stroke text-[#FF9B8B] absolute">
                      HARGA
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mx-auto max-w-[1100px] gap-6 mt-12">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-xl text-[#92542C] font-bold">
                    Data Paket
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Paket
                      </label>
                      <div className="w-full p-[4px] sm:p-[5px] mx-auto shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[15px] sm:rounded-[20px] border-[3px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative">
                        <div className="w-full h-full bg-white shadow-[inset_0px_0px_15px_6px_rgba(0,0,0,0.15)] rounded-[10px] sm:rounded-[15px] overflow-hidden flex items-center justify-center">
                        <select
                          name="id"
                          value={formData.id}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedPackage = packages.find((paket) => paket._id === selectedId);
                            setFormData((prev) => ({
                              ...prev,
                              id: selectedId,
                              price: selectedPackage ? selectedPackage.price : "",
                            }));
                          }}
                          className="w-full h-full cursor-pointer px-3 sm:px-4 py-2 sm:py-4 bg-transparent outline-none border-none text-[10px] sm:text-base text-black"
                        >
                          <option disabled value="">
                            Pilih paket
                          </option>
                          {packages.map((paket) => (
                            <option key={paket._id} value={paket._id}>
                              {paket.name}
                            </option>
                          ))}
                        </select>

                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Harga
                      </label>
                      <BubbleInput
                        placeholder={"0"}
                        type="number"
                        name="price"
                        value={formData.price}
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
                {
                  isLoadingSubmit ? 
                  (
                <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-5 mt-4"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin fill-slate-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </BubbleButton>
                  ) : 
                  (<BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-4 mt-4"
                    onClick={handleSubmit}
                  >
                    GANTI HARGA
                  </BubbleButton>)
                }
                
              </div>
              <table className="table w-full max-w-[1200px] mx-auto table-auto border-collapse border-2 border-[#B46632] mt-8">
                <thead>
                  <tr>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">NAMA</th>
                    <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">HARGA</th>
                  </tr>
                </thead>
                <tbody>
                {packages.map((paket) => (
                    <tr key={paket._id}>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">{paket.name}</td>
                      <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">Rp {formatCurrency(paket.price)}</td>
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
