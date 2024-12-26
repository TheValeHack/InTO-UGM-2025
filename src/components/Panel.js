import cn from "@/utils/cn";

export default function Panel({className, children, type = 1}){
    return (
        <div className={cn(
                "bg-[url('/images/panel_large.png')] bg-no-repeat bg-center bg-[length:100%_100%] px-8 md:px-20 py-16 md:py-32 text-base font-semibold text-[#5B3414] [text-shadow:0px_3px_2px_rgba(0,0,0,0.2)] text-justify drop-shadow-2xl",
                className,
                type == 1 ? "sm:bg-[url('/images/panel_smallest.png')]": "sm:bg-[url('/images/panel_standard.png')]"
                )}>
            {children}
        </div>
    )
}