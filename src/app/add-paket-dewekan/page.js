"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BubbleInput from "@/components/BubbleInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BubbleButton from "@/components/BubbleButton";
import admin from "@/data/admins.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from 'xlsx';

export default function ManageParticipants() {
  let indexParticipant = 0
  const [allLoading, setAllLoading] = useState(true);
  const [participantsData, setParticipantsData] = useState([]);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedDate, setSelectedDate] = useState(null); // State untuk filter tanggal
  const [filteredData, setFilteredData] = useState([]);

  const downloadExcel = () => {
    const headers = [
      "ORDER ID", "PAKET", "NAMA", "EMAIL", "SEKOLAH", 
      "NOMOR TELEPON", "KODE", "IS_USER", "WAKTU DIBELI"
    ];
  
    const rows = filteredData.flatMap((order, index) =>
      order.participants.map((participant) => [
        order.order_id,
        order.package.name,
        participant.name,
        participant.email,
        participant.school,
        participant.phone,
        participant.kode,
        participant.is_user ? "Yes" : "No",
        new Date(order.created_at).toLocaleString(),
      ])
    );
  
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants Data");
  
    // Download the Excel file
    XLSX.writeFile(workbook, "participants_data.xlsx");
  };
  

  const fetchParticipants = async () => {
    try {
      const response = await fetch("/api/participants");
      if (response.ok) {
        const data = await response.json();
        setParticipantsData(data.data || []);
        setFilteredData(data.data || []); // Atur data awal untuk tabel
      } else {
        console.log("Gagal mengambil data peserta");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
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

  const handleFilterByDate = () => {
    if (selectedDate) {
      const filtered = participantsData.filter((order) =>
        new Date(order.created_at).toDateString() ===
        selectedDate.toDateString()
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(participantsData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);
    setError("");
    setSuccess("");

    const { name, email, school, phone } = formData;

    if (!name || !email || !school || !phone) {
      setError("Semua data harus diisi!");
      setIsLoadingSubmit(false);
      return;
    }

    try {
      const response = await fetch("/api/add_participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          school,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Peserta berhasil ditambahkan!");
        setFormData({
          name: "",
          email: "",
          school: "",
          phone: "",
        });
        await fetchParticipants();
      } else {
        setError(data.error || "Gagal menambahkan peserta.");
      }
      setIsLoadingSubmit(false);
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
      setError("Gagal menambahkan peserta.");
      setIsLoadingSubmit(false);
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
            id="participants"
            className="w-full min-h-[75vh] py-32 flex flex-col justify-start items-center relative"
          >
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                      MANAJEMEN
                    </div>
                    <div className="title-stroke text-[#FAFAFA] absolute">
                      MANAJEMEN
                    </div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                      PESERTA
                    </div>
                    <div className="title-stroke text-[#FF9B8B] absolute">
                      PESERTA
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mx-auto max-w-[1100px] gap-6 mt-12">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-xl text-[#92542C] font-bold">
                    Tambah Peserta
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Nama
                      </label>
                      <BubbleInput
                        placeholder={"Nama Peserta"}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Email
                      </label>
                      <BubbleInput
                        placeholder={"Email Peserta"}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Asal Sekolah
                      </label>
                      <BubbleInput
                        placeholder={"Asal Sekolah"}
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs sm:text-base font-semibold text-[#B46632]">
                        Nomor Telepon
                      </label>
                      <BubbleInput
                        placeholder={"Nomor Telepon"}
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 font-semibold text-sm sm:text-base">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-500 font-semibold text-sm sm:text-base">
                    {success}
                  </div>
                )}
                {isLoadingSubmit ? (
                  <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-4 mt-4"
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
                ) : (
                  <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-4 mt-4"
                    onClick={handleSubmit}
                  >
                    TAMBAH PESERTA
                  </BubbleButton>
                )}
              </div>
            </div>
            <div className="px-6 md:px-12 mt-16 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-full p-[4px] sm:p-[5px] mx-auto shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[15px] sm:rounded-[20px] border-[3px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative">
                    <div className="w-full h-full bg-white shadow-[inset_0px_0px_15px_6px_rgba(0,0,0,0.15)] rounded-[10px] sm:rounded-[15px] overflow-hidden flex items-center justify-center">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="yyyy-MM-dd"
                          className="w-full h-full px-3 sm:px-4 py-2 sm:py-4 bg-transparent outline-none border-none text-[10px] sm:text-base text-black"
                          placeholderText="Pilih Tanggal"
                        />
                    </div>
                </div>
                  <BubbleButton
                    onClick={handleFilterByDate}
                    className="px-6 py-2 text-white font-bold rounded-md"
                  >
                    Filter
                  </BubbleButton>
                </div>
                <BubbleButton
                    scale={2}
                    className="text-sm sm:text-lg min-w-full py-4 mt-4"
                    onClick={downloadExcel}
                  >
                    UNDUH DATA
                  </BubbleButton>
              </div>
              <div className="overflow-x-auto mt-8">
                <table className="table w-full max-w-[1200px] mx-auto table-auto border-collapse border-2 border-[#B46632]">
                  <thead>
                    <tr>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        NO
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        ORDER ID
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        PAKET
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        NAMA
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        EMAIL
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        SEKOLAH
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        NOMOR TELEPON
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        KODE
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        IS_USER
                      </th>
                      <th className="border-2 border-[#B46632] text-[#B46632] text-center font-bold">
                        WAKTU DIBELI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((order) =>
                      order.participants.map((participant) => {
                        indexParticipant += 1;
                        return (
                          <tr key={participant.id}>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {indexParticipant}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {order.order_id}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {order.package?.name || "Tidak Ada"}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.name}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.email}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.school}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.phone}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.kode}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.is_user ? "Ya" : "Tidak"}
                            </td>
                            <td className="border-2 border-[#B46632] text-[#B46632] text-center font-medium">
                              {participant.created_at}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    )
  );
}
