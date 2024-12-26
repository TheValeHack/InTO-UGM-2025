import cn from "@/utils/cn";
import BubbleButton from "./BubbleButton";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Paket({className, name, price, desc, onClick}){
    return (
        <div className={cn("w-full bg-[#FDF3E0] shadow-md rounded-3xl p-4 md:p-7 flex flex-col md:flex-row justify-between gap-5 md:gap-8 cursor-pointer transition-all duration-400 hover:scale-[1.02]", className)}>
            <div className="flex flex-col">
                <div className="bg-[#B6754C] text-transparent text-2xl md:text-3xl font-extrabold paket-title">
                    {name}
                </div>
                <div className="bg-[#703F1E] block md:hidden text-transparent text-2xl md:text-3xl font-extrabold paket-title">
                Rp{formatCurrency(price)}
                </div>
                <div className="text-xs md:text-sm mt-3 bg-[#B6754C] text-transparent paket-title">
                {desc}
                </div>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-end justify-center ">
            <div className="bg-[#703F1E] hidden md:block text-transparent text-3xl font-extrabold paket-title">
                Rp{formatCurrency(price)}
            </div>
            <BubbleButton onClick={onClick} scale={1} color="default" className={'text-lg mt-3 hidden md:flex'}>BELI</BubbleButton>
            <BubbleButton onClick={onClick} scale={2} color="default" className={'text-lg min-w-full flex md:hidden'}>BELI</BubbleButton>
            </div>
        </div>
    )
}