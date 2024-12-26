"use client"

import BannerTitle from "@/components/BannerTitle";
import BubbleButton from "@/components/BubbleButton";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react";
import Gallery from "@/components/Gallery";
import Panel from "@/components/Panel";
import Paket from "@/components/Paket";
import paketData from '@/data/paket.json';
import testiData from '@/data/testimoni.json';
import Testimoni from "@/components/Testimoni";

export default function Home() {
  useEffect(() => {
    AOS.init({})
  }, [])
  return (
    <div className="w-full overflow-hidden">
      <Navbar className={'navbar'}/>
      <Image
        src={'/images/bg-hero.png'}
        width={1000}
        height={1000}
        alt="bg hero"
        className="absolute w-full h-full lg:h-auto object-cover z-[-1] md:translate-y-[-8%]"
      />
      <div className="max-w-[1950px] mx-auto flex flex-col w-screen relative">
          <section id="hero" className="px-6 md:px-12 lg:px-16 w-full min-h-screen flex flex-col-reverse md:flex-row justify-center md:justify-between items-center relative">
              <div className="w-full md:w-[60%] lg:w-[50%] z-20 translate-y-[-50px] md:translate-y-0">
                  <BannerTitle text={'INTO UGM 2025'} className={'text-xl min-[380px]:text-2xl md:text-4xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-8 py-4 md:px-16 md:py-8'} strokeClassName={'px-8 py-4 md:px-16 md:py-8'}/>
                  <p className="text-xs md:text-base mt-6 font-semibold text-[#5B3414] [text-shadow:0px_3px_2px_rgba(0,0,0,0.2)] text-justify">
                  Pijakan awal menjelajahi berbagai ilmu pengetahuan, peluang dan aspirasi luas dengan semangat Mahapatih Gadjah Mada dalam mengarungi tantangan dan asa untuk mencapai impianmu menjadi calon Gadjah Mada Muda!
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <BubbleButton scale={2} color="default" className={'text-xl md:text-base min-w-full md:min-w-64 py-6 md:py-3'}>JELAJAHI INTO</BubbleButton>
                    <BubbleButton scale={2} color="default" className={'text-xl md:text-base min-w-full md:min-w-64 py-6 md:py-3'}>LOGIN/MASUK</BubbleButton>
                  </div>
              </div>
              <div className="w-full max-h-[300px] md:max-h-max md:w-[40%] flex justify-end items-end z-10 translate-x-[25%] md:translate-x-0">
                <Image
                  src={'/images/kapal.png'}
                  width={1000}
                  height={1000}
                  alt="kapal"
                  className="w-full md:w-[70%] cursor-pointer ship max-w-[350px] md:max-w-max"
                />
              </div>
          </section>
          <div className="translate-y-[-75px] z-40">
              <Image
                  src={'/images/arrow_bottom.png'}
                  width={1000}
                  height={1000}
                  className="w-8 md:w-10 mx-auto animate-bounce cursor-pointer z-30"
                  alt="arrow bottom"
                  onClick={() => {
                    const section = document.getElementById("about");
                      const sectionPosition = section.offsetTop; 
                      window.scrollTo({
                        top: sectionPosition,
                        behavior: "smooth",
                      });
                  }}
                />
          </div>
          <section id="about" className="w-full min-h-screen flex justify-center items-center relative">
              <Image
                  src={'/images/awan1.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute top-0 left-0 z-40 w-[520px] translate-x-[-30vw] awan1"
              />
              <Image
                  src={'/images/flower1.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute top-32 right-0 w-24 md:w-32"
              />
              <div className="px-6 md:px-12 lg:px-16 w-full">
                <div data-aos="fade-up" data-aos-duration="1000" className="relative w-full md:w-[75%] lg:min-w-[650px] lg:w-[50%] max-w-[750px] z-30 mx-auto">
                  <BannerTitle text={'INTO UGM?'} className={'translate-y-[75%] mx-auto md:mx-0 md:translate-x-[15%] text-xl min-[380px]:text-2xl w-[90%] md:w-fit md:text-4xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-6 py-4 md:px-12 md:py-8 z-20'} strokeClassName={'px-6 py-4 md:px-12 md:py-8'}/>
                  <Panel>
                    Berangkat dari semangat Tridharma Perguruan Tinggi Ikatan Keluarga Gadjah Mada Sumatera Selatan (IKAGAMASS UGM) yang ingin mengobarkan semangat talenta muda agar memperjuangkan impian menempuh pendidikan di tanah Bulaksumur. InTO UGM hadir sejak 2017 dan selalu memberikan informasi mengenai Perguruan Tinggi Negeri khususnya Universitas Gadjah Mada bagi Generasi Muda Sriwijaya. Bekal dan strategi mendalam mengenai proses dinamika seleksi masuk perguruan tinggi yang dikemas secara khusus untuk siswa-siswi SMA/SMK Sederajat di seluruh penjuru Sumatera bagian Selatan.
                  </Panel>
                </div>
              </div>
              <Image
                  src={'/images/awan2.png'}
                  width={1000}
                  height={1000}
                  alt="awan2"
                  className="absolute bottom-0 right-0 z-40 w-[520px] translate-x-[30vw] awan2"
              />
              <Image
                  src={'/images/flower2.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute bottom-0 translate-y-[25%] left-0 w-24 md:w-32"
              />
          </section>
          <section id="gallery" className="w-full min-h-screen md:min-h-[75vh] flex justify-center items-center relative">
              <Image
                  src={'/images/flower3.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute top-32 right-0 w-20 md:w-28"
              />
              <div className="px-6 md:px-12 lg:px-16 w-full z-30">
                <Gallery className={'mx-auto'} images={['/images/1.jpg','/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg']} />
              </div>
              <Image
                  src={'/images/flower4.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute bottom-0 translate-y-[35%] left-0 w-48 md:w-64 translate-x-[-35%] md:translate-x-0"
              />
          </section>
          <section id="event" className="w-full min-h-screen flex flex-col justify-start items-center relative">
              <div className="flex justify-center gap-10 relative w-full">
                  <div className="flex flex-col items-center justify-end z-20 mb-8 translate-x-[-5%]">
                    <BannerTitle text={'RANGKAIAN KEGIATAN'} className={'text-xl min-[380px]:text-2xl md:text-5xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-8 py-6 md:px-16 md:py-8'} strokeClassName={'px-8 py-4 md:px-16 md:py-8'}/>
                    <div className="translate-y-[-55%]">
                      <BubbleButton scale={2} color="default" className={'rotate-[-3deg] skew-x-3 text-xs md:text-sm min-w-56 md:min-w-64 py-6 md:py-6'}>ADA APA DI MAIN EVENT?</BubbleButton>
                    </div>
                  </div>
                  <Image
                    src={'/images/kapal.png'}
                    width={1000}
                    height={1000}
                    alt="kapal"
                    className="w-[80%] md:w-full cursor-pointer ship md:max-w-max absolute md:relative top-0 right-0 translate-x-[50%] translate-y-[-10%] md:translate-x-0 md:translate-y-0"
                  />
              </div>
              <Image
                  src={'/images/events-desktop.png'}
                  width={1000}
                  height={1000}
                  alt="kapal"
                  className="hidden md:flex w-full cursor-pointer"
                />
                <Image
                  src={'/images/events-mobile.png'}
                  width={1000}
                  height={1000}
                  alt="kapal"
                  className="flex md:hidden w-full cursor-pointer translate-y-[-15%]"
                />
          </section>
          <section id="paket" className="w-full min-h-[75vh] md:py-20 flex flex-col justify-start items-center relative">
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
                  <Image
                      src={'/images/flower5.png'}
                      width={1000}
                      height={1000}
                      alt="awan1"
                      className="absolute w-52 md:w-72 translate-y-[-17%] md:translate-y-0 left-[64%]"
                  />
                <div className="relative w-full md:w-[75%] lg:min-w-[650px] lg:w-[50%] max-w-[750px] z-30 mx-auto">
                  <BannerTitle text={'PAKET TO'} className={'translate-y-[50%] mx-auto text-xl min-[380px]:text-2xl w-[90%] md:w-[80%] md:text-5xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-6 py-6 md:px-12 md:py-10 z-20'} strokeClassName={'px-6 py-4 md:px-12 md:py-8'}/>
                  <Panel type={2} className={'px-6 md:px-14 md:pb-16 md:pt-24 flex flex-col gap-4'}>
                    {
                      paketData.map((paket, i) => (
                        <Paket key={i} name={paket.name} desc={paket.desc} price={paket.price} />
                      ))
                    }
                  </Panel>
                </div>
            </div>
            <Image
                  src={'/images/awan1.png'}
                  width={1000}
                  height={1000}
                  alt="awan1"
                  className="absolute bottom-0 left-0 z-40 w-[480px] translate-x-[-30vw] awan1"
              />
          </section>
          <section id="testi" className="w-full min-h-[75vh] md:py-20 flex flex-col justify-start items-center relative">
            <Image
                  src={'/images/awan2.png'}
                  width={1000}
                  height={1000}
                  alt="awan2"
                  className="absolute top-0 right-0 z-40 w-[480px] translate-x-[30vw] awan2"
              />
            <div className="px-6 md:px-12 lg:px-16 py-24 w-full relative">
              <BannerTitle text={'APA KATA MEREKA?'} className={'mx-auto text-xl min-[380px]:text-2xl w-full sm:w-[75%] md:w-fit md:text-5xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-6 py-6 md:px-14 md:py-10 z-20'} strokeClassName={'px-6 py-4 md:px-12 md:py-8'}/>
              <div className="mt-12 flex flex-col lg:flex-row justify-center items-center gap-4">
                {
                  testiData.map((testi, i) => (
                    <Testimoni 
                      key={i} 
                      photo={testi.photo} 
                      name={testi.name} 
                      testi={testi.testi} 
                      major={testi.major} 
                      title={testi.title}
                      className={i === 1 ? 'order-first lg:order-none' : ''} />
                  ))
                }
              </div>
            </div>
          </section>
          <section id="map" className="w-full min-h-[75vh] py-20 flex flex-col justify-start items-center relative">
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
                <div className="relative w-full md:w-[80%] lg:min-w-[650px] max-w-[950px] z-30 mx-auto">
                  <BannerTitle text={'LOKASI TRY OUT'} className={'translate-y-[50%] mx-auto text-xl min-[380px]:text-2xl w-[90%] md:w-fit md:text-4xl lg:text-5xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-6 py-6 md:px-16 md:py-10 z-20'} strokeClassName={'px-6 py-4 md:px-12 md:py-8'}/>
                  <Panel type={1} className={'px-6 md:px-14 md:pb-[80px] md:pt-24 flex flex-col items-center'}>
                    <div className="w-full lg:w-[80%] h-[380px] border-[7px] border-[#9F5A2C] rounded-[50px]">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1353.2200865230166!2d104.70065202059821!3d-2.910598241607079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b7379d29fcf0d%3A0x34a4ec61a554526f!2sJl.%20Adi%20Sucipto%2C%20Kec.%20Sukarami%2C%20Kota%20Palembang%2C%20Sumatera%20Selatan%2030961!5e0!3m2!1sen!2sid!4v1735202862653!5m2!1sen!2sid" className="w-full h-full border-none rounded-[60px]" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="font-semibold text-base text-black [text-shadow:none] mt-4">Bima Sakti Convention Center</div>
                    <div className="font-medium text-black [text-shadow:none] mt-2">Jl. Adi Sucipto KM.11, Kebun Bunga, Kec. Sukarami, Kota Palembang, Sumatera Selatan 30961</div>
                    <BubbleButton scale={2} color="default" className={'text-xl md:text-base min-w-full md:min-w-64 py-6 md:py-3 mt-5'}>GOOGLE MAPS</BubbleButton>
                  </Panel>
                </div>
            </div>
          </section>
          <section id="map" className="w-full min-h-[75vh] py-20 flex flex-col justify-start items-center relative">
            <div className="px-6 md:px-12 lg:px-16 w-full relative">
                <div className="relative w-full md:w-[80%] lg:min-w-[650px] max-w-[750px] z-30 mx-auto">
                  <BannerTitle text={'IN PARTNERSHIP WITH'} className={'translate-y-[55%] mr-auto ml-auto sm:mr-0 text-xl min-[380px]:text-2xl w-fit md:text-3xl rotate-[-3deg] skew-x-3 drop-shadow-2xl px-6 py-6 md:px-16 md:py-8 z-20'} strokeClassName={'px-6 py-4 md:px-12 md:py-8'}/>
                  <div className="w-full p-3 pb-[45px] bg-[#E78B55] flex items-start justify-center rounded-[60px] shadow-[0px_5px_0px_#474135,inset_0px_-12px_0px_#B54E27] relative">
                    <div className="bg-[#F5DFB9] px-12 sm:px-4 xl:px-7 py-10 w-full h-full rounded-[48px] shadow-[0px_3px_10.3px_#474135,inset_0px_-13px_16.2px_#BC9D7F] relative">
                      
                        <div className="mx-auto max-w-[300px] sm:max-w-max flex flex-col sm:flex-row gap-4 items-center ">
                        <div className="w-full sm:w-[30%] p-4 xl:p-4 aspect-square mx-auto shadow-[inset_0px_0px_23.5px_6px_rgba(255,255,255,0.25)] rounded-[48px] border-[5px] border-solid border-[#B77749] bg-[linear-gradient(180deg,#fbbb03_0%,#fb7f08_100%)] relative">
                              <div className="w-full h-full bg-[#EFD2A6] shadow-[inset_0px_0px_22.1px_6px_rgba(58,66,70,0.25)] rounded-[32px] overflow-hidden flex items-center justify-center">
                                  <Image
                                      src="/images/ruangguru.png"
                                      width={1000}
                                      height={1000}
                                      alt="gambar logo"
                                      className="w-[70%] md:w-[90%]"
                                  />
                              </div>
                          </div>
                          <div className="flex-1 font-medium text-sm lg:text-base text-justify">
                          Ruangguru sebagai layanan bimbingan belajar nomor 1 di Indonesia penyedia akses pembelajaran berbasis teknologi, termasuk kelas virtual, platform ujian online, video belajar pembelajaran, marketplace les private, dan lainnya. Sejak 2014 kualitas soal yang telah dipercaya oleh 22.000.000 pengguna tentu dapat mendukung Sobat InTO dalam memperjuangkan PTN impian!
                          </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </section>
          <section id="map" className="w-full min-h-[75vh] py-20 flex justify-center items-center relative">
            <div className="px-6 md:px-12 lg:px-16 w-full relative flex justify-center items-center h-full">
                <div className="w-fit text-center font-tropicaltides flex items-center justify-center text-3xl sm:text-5xl md:text-6xl  relative">
                    <div className="button-text-shadow bg-[#FBCC55] text-transparent z-40 relative">
                    Kelana Bahtera Arunika
                    </div>
                    <div className="title-stroke text-[#FBCC55] absolute">
                    Kelana Bahtera Arunika
                    </div>
                </div>
            </div>
          </section>
          <section id="footer" className="w-full min-h-[650px] flex justify-center items-center relative bg-[url('/images/bg-footer.png')] bg-[top_center] bg-cover">
              <div className="px-6 md:px-12 lg:px-16 w-full relative flex flex-col gap-4 justify-center items-center h-full translate-y-[12%]">
                  <Image
                      src="/images/logo-footer.png"
                      width={1000}
                      height={1000}
                      className="w-48"
                      alt="logo footer"
                  />
                  <div className="flex justify-center items-center">
                      <Image
                        src="/images/instagram.png"
                        width={1000}
                        height={1000}
                        alt="sosmed"
                        className="w-9 cursor-pointer transition-all duration-400 hover:scale-[1.05]"
                      />
                      <div className="mx-5 text-white">
                        |
                      </div>
                      <Image
                        src="/images/tiktok.png"
                        width={1000}
                        height={1000}
                        alt="sosmed"
                        className="w-9 cursor-pointer transition-all duration-400 hover:scale-[1.05]"
                      />
                      <div className="mx-5 text-white">
                        |
                      </div>
                      <Image
                        src="/images/x.png"
                        width={1000}
                        height={1000}
                        alt="sosmed"
                        className="w-9 cursor-pointer transition-all duration-400 hover:scale-[1.05]"
                      />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                      <div className="font-bold text-white text-base">intougm2025@gmail.com</div>
                      <div className="font-bold text-white text-base">Kamu punya pertanyaan? Hubungi :</div>
                      <div className="text-white text-base">Jelsya (+6285788644309)</div>
                      <div className="text-white text-base">Hazel (+6289684345697)</div>
                  </div>
                  <div className="font-bold text-white text-base">Copyright @InTO UGM 2025</div>
              </div>
          </section>
      </div>
    </div>
  );
}
