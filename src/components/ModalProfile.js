import { useEffect, useState } from "react";
import Modal from "./Modal";
import BubbleButton from "./BubbleButton";
import { signOut } from "next-auth/react";
import ModalDetailPaket from "./ModalDetailPaket";

export default function ModalProfile({ className, state, setState, session }) {
  const [activePackage, setActivePackage] = useState(null);
  const [modalDetail, setModalDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state) {
      fetchActivePackage();
    }
  }, [state]);

  const fetchActivePackage = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("/api/user/active-package", {
        headers: {
          "user-id": session.user.id,
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          setActivePackage(null);
          return;
        }
        throw new Error(await response.text());
      }
  
      const data = await response.json();
      setActivePackage(data);
    } catch (err) {
      setError("Failed to fetch active package.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
    <Modal title={"PROFILE"} state={state} setState={setState} className={className}>
      <div className="flex flex-col gap-2 sm:gap-3 w-full justify-center">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Nama</div>
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">{session.user.name}</div>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Asal Sekolah</div>
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">{session.user.school}</div>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Email</div>
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">{session.user.email}</div>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Nomor Whatsapp</div>
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">{session.user.phone}</div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#B46632]"></div>
        <div className="w-full flex justify-between">
        <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Paket Aktif</div>
        {loading ? (
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">Loading...</div>
        ) : error ? (
            <div className="text-[10px] sm:text-sm font-medium text-red-500">{error}</div>
        ) : activePackage ? (
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">
            Paket {activePackage.package.name}
            </div>
        ) : (
            <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">Tidak Ada</div>
        )}
        </div>

        <div className="w-full flex flex-col justify-center gap-1 sm:gap-4 mt-1 sm:mt-2">
          {
            activePackage ? (
                <BubbleButton scale={2} color="default" className={"text-lg sm:text-xl sm:py-6 min-w-full"} onClick={() => {
                    setModalDetail(!modalDetail)
                }}>
                    DETAIL PAKET
                </BubbleButton>
            ) : (
                <BubbleButton scale={2} color="default" className={"text-lg sm:text-xl sm:py-6 min-w-full"} onClick={() => {
                    const section = document.getElementById("paket");
                    const sectionPosition = section.offsetTop;
                    window.scrollTo({
                        top: sectionPosition,
                        behavior: "smooth",
                    });
                    setState(false)
                }}>
                    BELI PAKET SEKARANG
                </BubbleButton>
            )
          }
          <BubbleButton
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
            scale={2}
            color="red"
            className={"text-lg sm:text-xl sm:py-6 min-w-full"}
          >
            LOG OUT
          </BubbleButton>
        </div>
      </div>
    </Modal>
    <ModalDetailPaket state={modalDetail} setState={setModalDetail} packageName={activePackage?.package?.name} participants={activePackage?.participants} />
    </>
  );
}
