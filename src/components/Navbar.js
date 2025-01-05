"use client";

import Image from "next/image";
import BubbleButton from "./BubbleButton";
import { useRouter, usePathname } from "next/navigation";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import ModalProfile from "./ModalProfile";

export default function Navbar({ className, session, modalLogin, setModalLogin }) {
  const [modalRegister, setModalRegister] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const path = usePathname()
  
  return (
    <div className={cn("w-screen fixed flex justify-between top-0 bg-red z-[999]", className)}>
      <ModalLogin state={modalLogin} setState={setModalLogin} setRegisterState={setModalRegister} />
      <ModalRegister state={modalRegister} setState={setModalRegister} setLoginState={setModalLogin} />
      {session?.user && (<ModalProfile session={session} state={modalProfile} setState={setModalProfile}/>)}

      <div>
        <div className="bg-[#FBECCB] h-16 md:h-20 z-20 flex items-center rounded-br-[40px] border-[5px] border-l-0 border-[color:#6F3E1D]">
          <div className="w-full h-full bg-[#FBECCB] z-40 rounded-br-[35px] px-4 justify-center md:px-6 flex items-center">
            <Image
              src={"/images/logo-footer.png"}
              width={1000}
              height={1000}
              alt="logo"
              unoptimized
              className="w-12 md:w-20 z-40 cursor-pointer translate-x-[-8px] md:translate-x-0"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center z-10 w-screen absolute border-t-[5px] border-b-[5px] border-[color:#6F3E1D] bg-[#FBECCB] py-0 md:py-2">
        <div className="w-[0px] opacity-0 overflow-hidden lg:w-auto lg:opacity-100 flex gap-2">
          <BubbleButton
            scale={1}
            color="default"
            className={"text-xs"}
            onClick={() => {
              router.push("/#event");
            }}
          >
            ACARA
          </BubbleButton>
          <BubbleButton
            scale={1}
            color="red"
            className={"text-xs"}
            onClick={() => {
              router.push("/#paket");
            }}
          >
            PAKET TO
          </BubbleButton>
          { session?.user ? (
            <BubbleButton
            scale={1}
            color="blue"
            className={"text-xs"}
            onClick={() => {
              setModalProfile(!modalProfile)
            }}
          >
            PROFILE
          </BubbleButton>
          ) : (
            <BubbleButton
            scale={1}
            color="blue"
            className={"text-xs"}
            onClick={() => {
              setModalRegister(!modalRegister);
            }}
          >
            DAFTAR
          </BubbleButton>
          ) }
        </div>
      </div>

      <div>
        <div className="bg-[#FBECCB] h-16 md:h-20 z-20 flex items-center rounded-bl-[40px] border-[5px] border-r-0 border-[color:#6F3E1D]">
          <div className="w-full h-full bg-[#FBECCB] z-40 rounded-bl-[35px] px-4 flex items-center relative">
            {session?.user ? (
              <div>
                <BubbleButton
                scale={2}
                color="default"
                className={"text-xs min-w-36 md:min-w-52 translate-x-2 md:translate-x-0"}
                onClick={() => setDropdown(!dropdown)}
              >
                {session.user.name.length > 12
              ? `${session.user.name.slice(0, 12)}...`
              : session.user.name}
              </BubbleButton>
              <div style={{
                display: dropdown ? "flex" : "none"
              }} className="absolute lg:h-[0px] lg:overflow-hidden lg:w-[0px] bg-[#E78B55] p-1 pb-2 lg:p-0 rounded-2xl shadow-[0px_2px_0px_#474135,inset_0px_-5px_0px_#B54E27]">
                <div className="bg-[#F5DFB9] flex flex-col gap-1 px-6 py-3 rounded-xl shadow-[0px_2px_5px_#474135,inset_0px_-7px_15px_#BC9D7F]">
                  <BubbleButton
                    scale={1}
                    color="default"
                    className={"text-xs"}
                    onClick={() => {
                      router.push("/#event");
                    }}
                  >
                    ACARA
                  </BubbleButton>
                  <BubbleButton
                    scale={1}
                    color="red"
                    className={"text-xs"}
                    onClick={() => {
                      router.push("/#paket");
                    }}
                  >
                    PAKET TO
                  </BubbleButton>
                  { session?.user ? (
                    <BubbleButton
                    scale={1}
                    color="blue"
                    className={"text-xs"}
                    onClick={() => {
                      setModalProfile(!modalProfile)
                    }}
                  >
                    PROFILE
                  </BubbleButton>
                  ) : (
                    <BubbleButton
                    scale={1}
                    color="blue"
                    className={"text-xs"}
                    onClick={() => {
                      setModalRegister(!modalRegister);
                    }}
                  >
                    DAFTAR
                  </BubbleButton>
                  ) }
                </div>
              </div>
              </div>
            ) : (
              <BubbleButton
                scale={2}
                color="default"
                className={"text-xs min-w-36 md:min-w-52 translate-x-2 md:translate-x-0"}
                onClick={() => setModalLogin(!modalLogin)}
              >
                LOGIN/MASUK
              </BubbleButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
