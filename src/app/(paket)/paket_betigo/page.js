"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutBox from "@/components/CheckoutBox";
import paketData from "@/data/paket.json";
import BubbleInput from "@/components/BubbleInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaketBetigo() {
  const paket = paketData.find((item) => item.id.toLowerCase() === "betigo");
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const [participants, setParticipants] = useState([
    { name: "", school: "", email: "", phone: "" },
    { name: "", school: "", email: "", phone: "" },
  ]);

  const handleParticipantChange = (index, field, value) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const validateParticipants = () => {
    for (let i = 0; i < participants.length; i++) {
      const { name, school, email, phone } = participants[i];
      if (!name || !school || !email || !phone) {
        return `Data peserta ${i + 2} belum lengkap. Semua data harus diisi.`;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return `Email peserta ${i + 2} tidak valid.`;
      }
      if (!/^\+?[0-9]{9,15}$/.test(phone.replace(/\s/g, ""))) {
        return `Nomor WhatsApp peserta ${i + 2} tidak valid.`;
      }
    }
    return null;
  };

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/");
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <></>;
  }

  return (
    session && (
      <div className="w-full overflow-hidden">
        <Navbar className={"navbar"} session={session} />
        <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
          <section id="paket" className="w-full min-h-[75vh] py-32 flex flex-col justify-start items-center relative">
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">PAKET</div>
                    <div className="title-stroke text-[#FAFAFA] absolute">PAKET</div>
                  </div>
                  <div className="w-fit text-center font-superbubble flex items-center justify-center text-3xl sm:text-4xl md:text-5xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">BETIGO</div>
                    <div className="title-stroke text-[#FF9B8B] absolute">BETIGO</div>
                  </div>
                </div>
                <div className="w-full max-w-[800px] text-sm sm:text-base md:text-xl text-center font-semibold text-[#B46632]">
                  Paket Betigo adalah paket untuk 3 peserta. Harap lengkapi data untuk peserta 2 dan 3 (data selain peserta
                  yang memiliki akun)
                </div>
              </div>
              <div className="flex flex-col mx-auto max-w-[1100px] gap-12 mt-12">
                {participants.map((participant, index) => (
                  <div className="flex flex-col items-start gap-3" key={index}>
                    <div className="text-xl text-[#92542C] font-bold">Data Peserta {index + 2}</div>
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                      <div className="flex-1">
                        <label className="text-xs sm:text-base font-semibold text-[#B46632]">Nama</label>
                        <BubbleInput
                          type="text"
                          value={participant.name}
                          onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs sm:text-base font-semibold text-[#B46632]">Asal Sekolah</label>
                        <BubbleInput
                          type="text"
                          value={participant.school}
                          onChange={(e) => handleParticipantChange(index, "school", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-8 w-full">
                      <div className="flex-1">
                        <label className="text-xs sm:text-base font-semibold text-[#B46632]">E-Mail</label>
                        <BubbleInput
                          type="text"
                          value={participant.email}
                          onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs sm:text-base font-semibold text-[#B46632]">Nomor Whatsapp</label>
                        <BubbleInput
                          type="text"
                          value={participant.phone}
                          onChange={(e) => handleParticipantChange(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <CheckoutBox
                kode="Betigo"
                className={"mt-16"}
                name={paket.name}
                desc={paket.desc}
                price={paket.price}
                participants={participants}
                validateParticipants={validateParticipants}
              />
            </div>
          </section>
          <Footer />
        </div>
      </div>
    )
  );
}
