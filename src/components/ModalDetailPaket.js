import Modal from "./Modal"

export default function ModalDetailPaket({className, state, setState, packageName, participants}){
    return (
        <Modal title={'DETAIL PAKET'} className={className} state={state} setState={setState}>
                <div className="flex flex-col sm:gap-3 w-full justify-center">
                    <div className="w-full flex justify-between">
                        <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Paket Aktif</div>
                        <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">Paket {packageName}</div>
                    </div>
                    <div className="text-[10px] sm:text-sm font-medium text-[#B46632] text-center">
                    <span className="font-bold">Harap diperhatikan</span>, jika ada kesalahan dalam penulisan E-Mail dapat menghubungi Contact Person : 
                        Jelsya (<span className="font-bold cursor-pointer hover:text-[#874e28]" onClick={() => window.open("https://wa.me/6285788644309", "_blank")}>+6285788644309</span>) / Hazel (<span className="font-bold cursor-pointer hover:text-[#874e28]" onClick={() => window.open("https://wa.me/6289684345697", "_blank")}>+6289684345697</span>)
                    </div>
                    <div className="w-full h-[1px] bg-[#B46632]"></div>
                    {
                        participants?.map((item, i) => {
                            return (
                                <div key={i} className="w-full flex justify-between items-start">
                                    <div className="text-[10px] sm:text-sm font-bold text-[#B46632]">Peserta {i+1}</div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-[10px] sm:text-sm font-medium text-[#B46632]">{item?.name}</div>
                                        <div className="text-[10px] sm:text-sm font-semibold text-[#B46632]">{item?.email}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div> 
            </Modal>
    )
}