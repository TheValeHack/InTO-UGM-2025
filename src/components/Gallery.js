import cn from "@/utils/cn";
import Image from "next/image";

export default function Gallery({className, images = []}){
    return (
        <div className={cn("w-full md:w-[70%] max-w-[800px] h-[400px] flex justify-center items-stretch gap-2 md:gap-5 transition-all duration-400 box-border", className)}>
            {
                images.map((img, i) => (
                    <div key={i} className="flex flex-1 h-full transition-all duration-400 cursor-pointer box-border hover:flex-[3] grayscale hover:grayscale-0 odd:translate-y-[-20px] even:translate-y-[20px]">
                        <Image 
                            src={img}
                            width={1000}
                            height={1000}
                            alt="card"
                            className="block w-full h-full object-cover drop-shadow-xl"
                        />
                    </div>
                ))
            }
        </div>
    )
}