import cn from "@/utils/cn";

export default function Panel({className, children, type = 1}){
    return (
        <div className={cn(
                "bg-no-repeat bg-center bg-[length:100%_100%] px-8 md:px-20 py-16 md:py-32 relative text-justify drop-shadow-2xl",
                className,
                type == 3 ? "bg-[url('/images/panel_smaller.png')]" : "bg-[url('/images/panel_large.png')]",
                type == 1 ? "sm:bg-[url('/images/panel_smallest.png')]":"sm:bg-[url('/images/panel_smaller.png')]"
                )}>
            {children}
        </div>
    )
}