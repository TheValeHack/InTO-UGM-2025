import cn from "@/utils/cn"

export default function BubbleInput({className, type, inputClassName, name, value, onChange}){
    return (
        <div className={cn("w-full p-[4px] sm:p-[5px] mx-auto shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[15px] sm:rounded-[20px] border-[3px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative", className)}>
            <div className="w-full h-full bg-white shadow-[inset_0px_0px_15px_6px_rgba(0,0,0,0.15)] rounded-[10px] sm:rounded-[15px] overflow-hidden flex items-center justify-center">
                <input type={type} name={name} value={value} onChange={onChange} className={cn("w-full h-full px-3 sm:px-4 py-2 sm:py-4 bg-transparent outline-none border-none text-[10px] sm:text-base", inputClassName)} />
            </div>
        </div>
    )
}