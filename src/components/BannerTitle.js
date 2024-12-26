import cn from "@/utils/cn";

export default function BannerTitle({text, className, strokeClassName, shadowClassName}){
    return (
        <div className={cn("bg-[url('/images/title.png')] bg-center bg-[length:100%_100%] px-16 py-8 text-center font-superbubble flex items-center justify-center relative w-fit", className)}>
            <div className={cn("button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative", shadowClassName)}>
                {text}
            </div>
            <div className={cn("title-stroke text-[#FAFAFA] absolute", strokeClassName)}>
                {text}
            </div>
        </div>
    )
}