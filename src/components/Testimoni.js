import cn from "@/utils/cn"
import Image from "next/image"

export default function Testimoni({className, photo, name, testi, major, title}){
    return (
        <div className={cn("w-full h-full p-3 pb-[32px] sm:pb-[45px] bg-[#E78B55] flex items-start justify-center rounded-[60px] sm:rounded-[80px] shadow-[0px_5px_0px_#474135,inset_0px_-12px_0px_#B54E27] relative", className)}>
            <div className="bg-[#F5DFB9] px-6 sm:px-8 pt-3 pb-9 lg:pb-20 w-full h-full rounded-[48px] sm:rounded-[68px] shadow-[0px_3px_10.3px_#474135,inset_0px_-13px_16.2px_#BC9D7F] relative">
                <div className="w-full aspect-1">
                <div className="w-full h-full p-4 sm:p-6 shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[40px] sm:rounded-[60px] border-[5px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative">
                    <div className="w-full h-full bg-[#EFD2A6] shadow-[inset_0px_0px_22.1px_6px_rgba(58,66,70,0.25)] rounded-[24px] sm:rounded-[44px] overflow-hidden">
                        <Image
                            src={photo}
                            width={1000}
                            height={1000}
                            alt="gambar peserta"
                            className="w-full object-contain"
                        />
                    </div>
                    <div className="w-[80%] translate-y-[-45%] rotate-[-6deg] text-center font-superbubble flex items-center justify-center mx-auto text-2xl sm:text-4xl lg:text-3xl xl:text-4xl absolute">
                        <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                            {name}
                        </div>
                        <div className="title-stroke text-[#FAFAFA] absolute">
                            {name}
                        </div>
                    </div>
                </div>
                </div>
                <div className="w-fit text-center translate-y-[-35%] left-2 font-superbubble flex items-center justify-center mx-auto text-3xl sm:text-5xl lg:text-4xl xl:text-5xl absolute rotate-[160deg]">
                        <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                            "
                        </div>
                        <div className="title-stroke text-[#FAFAFA] absolute">
                            "
                        </div>
                </div>
                <div className="text-[10px] sm:text-sm font-medium mt-7 sm:mt-9 text-justify text-black">
                {testi}
                </div>
                <div className="mt-3 sm:mt-6">
                    <div className="flex justify-center">
                        <div className="w-fit text-center font-superbubble flex items-center justify-center text-xs sm:text-base md:text-lg lg:text-sm xl:text-xl relative">
                            <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                                {major}&nbsp;
                            </div>
                            <div className="title-stroke-sm sm:title-stroke text-[#FAFAFA] absolute">
                            {major}&nbsp;
                            </div>
                        </div>
                        <div className="w-fit text-center font-superbubble flex items-center justify-center text-xs sm:text-base md:text-lg lg:text-sm xl:text-xl relative">
                            <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                                UGM 2024
                            </div>
                            <div className="title-stroke-sm sm:title-stroke text-[#FF9B8B] absolute">
                                UGM 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-fit text-center font-superbubble flex items-center justify-center text-xs sm:text-base md:text-lg lg:text-sm xl:text-xl relative">
                            <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                                PESERTA&nbsp;
                            </div>
                            <div className="title-stroke-sm sm:title-stroke text-[#FAFAFA] absolute">
                                PESERTA&nbsp;
                            </div>
                        </div>
                        <div className="w-fit text-center font-superbubble flex items-center justify-center text-xs sm:text-base md:text-lg lg:text-sm xl:text-xl relative">
                            <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                                INTO UGM 2024
                            </div>
                            <div className="title-stroke-sm sm:title-stroke text-[#FF9B8B] absolute">
                                INTO UGM 2024
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] mx-auto text-center font-superbubble flex items-center justify-center text-[8px] sm:text-xs relative mt-1">
                        <div className="button-text-shadow bg-[#FBCC55] text-transparent z-50 relative">
                            {title}
                        </div>
                        <div className="title-stroke-sm text-[#FBCC55] absolute">
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}