import Modal from "./Modal"
import BubbleButton from "./BubbleButton"

export default function ModalEvent({state, setState, children}){
    return (
        <Modal state={state} setState={setState} title={'MAIN EVENT'}>
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-fit text-center font-superbubble flex items-center justify-center text-sm min-[380px]:text-xl md:text-3xl relative tracking-tighter">
                <div className="button-text-shadow bg-[#FAFAFA] text-transparent z-50 relative">
                    ADA APA DI
                </div>
                <div className="title-stroke-sm text-[#FAFAFA] absolute">
                    ADA APA DI
                </div>
            </div>
            <div className="w-fit text-center font-superbubble flex items-center justify-center text-sm min-[380px]:text-xl md:text-3xl relative tracking-tighter mt-[-8px]">
                <div className="button-text-shadow bg-[#FF9B8B] text-transparent z-50 relative">
                    INTO UGM 2025
                </div>
                <div className="title-stroke-sm text-[#FF9B8B] absolute">
                    INTO UGM 2025
                </div>
            </div>
        </div>
        <div className="text-center text-xs sm:text-sm mt-3 sm:mt-2 text-[#B46632] font-semibold">
        Siap jadi bagian dari Universitas Gadjah Mada? Into UGM 2025 hadir dengan rangkaian kegiatan lengkap untuk membantu Sobat InTO mewujudkan mimpi masuk kampus impian!
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 w-full mt-4 sm:mt-3">
            {children}
        </div>
    </Modal>
    )
}