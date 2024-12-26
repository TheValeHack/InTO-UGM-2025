"use client"

import Image from "next/image"
import BubbleButton from "./BubbleButton"
import { useRouter } from "next/navigation"
import cn from "@/utils/cn"

export default function Navbar({className}){
    const router = useRouter()

    return (
        <div className={cn("w-screen fixed flex justify-between top-0 bg-red z-[999]", className)}>    
            <div>
                <div className="bg-[#FBECCB] h-16 md:h-20 z-20 flex items-center rounded-br-[40px] border-[5px] border-l-0 border-[color:#6F3E1D]">
                    <div className="w-full h-full  bg-[#FBECCB] z-40 rounded-br-[35px] px-4 justify-center md:px-6 flex items-center">
                        <Image
                            src={'/images/logo.png'}
                            width={1000}
                            height={1000}
                            alt="logo"
                            className="w-12 md:w-20 z-40 cursor-pointer translate-x-[-8px] md:translate-x-0"
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center z-10 w-screen absolute border-t-[5px] border-b-[5px] border-[color:#6F3E1D] bg-[#FBECCB] py-0 md:py-2">
                <div className="opacity-0 lg:opacity-100 flex gap-2">
                <BubbleButton scale={1} color="default" className={'text-xs'}>ACARA</BubbleButton>
                <BubbleButton scale={1} color="red" className={'text-xs'}>PAKET TO</BubbleButton>
                <BubbleButton scale={1} color="blue" className={'text-xs'}>DAFTAR</BubbleButton>
                </div>
            </div>
            <div>
                <div className="bg-[#FBECCB] h-16 md:h-20 z-20 flex items-center rounded-bl-[40px] border-[5px] border-r-0 border-[color:#6F3E1D]">
                    <div className="w-full h-full bg-[#FBECCB] z-40 rounded-bl-[35px] px-4 flex items-center">
                        <BubbleButton scale={2} color="default" className={'text-xs min-w-36 md:min-w-52 translate-x-2 md:translate-x-0'}>LOGIN/MASUK</BubbleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}