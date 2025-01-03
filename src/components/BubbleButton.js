import cn from "@/utils/cn";

export default function BubbleButton({children, className, onClick, scale  = 1, color = 'default' }){
    return <div 
                onClick={onClick}
                className={cn(
                    "w-min text-center font-superbubble py-3 bg-center bg-no-repeat bg-contain button-stroke flex items-center justify-center drop-shadow-[0_4px_5px_rgba(0,0,0,0.25)] cursor-pointer transition-all hover:translate-y-1",
                    scale == 1 ? "min-w-24" : "min-w-52",
                    scale == 1 ? (
                        color == "red" ? "bg-[url('/images/btn_small_red.png')]" : (color == "blue" ? "bg-[url('/images/btn_small_blue.png')]" : "bg-[url('/images/btn_small_default.png')]")
                    ) : (color == "red" ? "bg-[url('/images/btn_large_red.png')]" : "bg-[url('/images/btn_large_default.png')]"),
                    className)}
            >
                <div className="button-stroke button-text-shadow bg-[#FAFAFA] text-transparent z-10">
                {children}
                </div>
                <div className="button-stroke text-[#FAFAFA] absolute">
                {children}
                </div>
            </div>
}