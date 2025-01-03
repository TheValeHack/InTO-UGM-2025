
import Modal from "./Modal"

export default function ModalEventDetail({className, title1, title2, content, state, setState, customTitle, customClose, noMinHeight}){
    return (
        <Modal customClose={customClose} state={state} setState={setState} className={className} title={customTitle ? customTitle : 'MAIN EVENT'} noMinHeight={noMinHeight} >
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-fit text-center font-superbubble flex items-center justify-center text-sm min-[380px]:text-basesm:text-xl md:text-xl relative">
                    <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                        {title1}
                    </div>
                    <div className="title-stroke-sm text-[#FAFAFA] absolute">
                        {title1}
                    </div>
                </div>
                <div className="w-fit text-center font-superbubble flex items-center justify-center text-sm min-[380px]:text-base sm:text-xl md:text-xl relative">
                    <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                        {title2}
                    </div>
                    <div className="title-stroke-sm text-[#FF9B8B] absolute">
                        {title2}
                    </div>
                </div>
            </div>
            <div className="text-justify text-xs sm:text-sm mt-3 sm:mt-2 text-[#B46632] font-semibold">
                {(typeof content === "string") ? content : <ul className="list-disc">{content.map((c,i) => <li key={i}>{c}</li>)}</ul>}
            </div>
        </Modal>
    )
}