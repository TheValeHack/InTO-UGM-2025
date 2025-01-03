"use client"

import { useState, useEffect } from "react";
import cn from "@/utils/cn";
import BannerTitle from "./BannerTitle";
import Panel from "./Panel";
import Image from "next/image";

export default function Modal({ className, children, title, state, setState, showScrollbar = false, customClose, noMinHeight }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (state) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [state]);

  return (
    isVisible && (
      <div
        className={cn(
          "w-screen h-screen fixed px-6 md:px-12 lg:px-16 bg-[rgba(0,0,0,0.5)] z-[999999] flex items-center justify-center transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0",
          className
        )}
      >
        <div
          className={cn(
            "w-full max-w-[500px] h-fit relative transform transition-transform duration-300",
            isAnimating ? "scale-100" : "scale-90"
          )}
        >
          <Image
            src={"/images/btn_close.png"}
            alt="modal close button"
            width={100}
            height={100}
            unoptimized
            onClick={customClose ? customClose : () => setState(false)}
            className="w-10 absolute z-30 right-0 top-0 cursor-pointer drop-shadow-[0px_5px_8px_rgba(0,0,0,0.52)] transition-all hover:translate-y-[2px]"
          />
          <BannerTitle
            text={title}
            className={
              "absolute translate-x-[5%] translate-y-[-35%] w-fit sm:w-[320px] text-2xl sm:text-3xl rotate-[-3deg] skew-x-3 drop-shadow-2xl z-20 px-7 md:px-8 py-5 md:py-7"
            }
            strokeClassName={"px-7 md:px-8 py-5 md:py-7"}
          />
          <Panel
            className={cn("w-full px-8 sm:px-11 md:px-11 py-16 sm:py-[72px] md:py-[72px] pb-12 sm:pb-14 md:pb-14 [text-shadow:none]", noMinHeight ? "min-h-min" : "min-h-[350px] sm:min-h-[450px]")}
            type={3}
          >
            <div className={cn("flex flex-col items-center justify-center w-full h-full max-h-[380px] sm:max-h-[480px] overflow-y-auto", showScrollbar ? "" : "no-scrollbar")}>
              <div className="min-h-full w-full">{children}</div>
            </div>
          </Panel>
        </div>
      </div>
    )
  );
}
