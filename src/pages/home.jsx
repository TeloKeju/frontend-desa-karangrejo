"use client";

import { Carousel, Card, Rating } from "flowbite-react";
import { Link } from "react-router-dom";
import { IconNotes, IconUser, IconEye, IconCircleX } from "@tabler/icons-react";
import { FormatRupiah } from "@arismun/format-rupiah";

import { administrasi, beli } from "./data/data";
import apiKarangrejo from "../lib/axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [apbDesa, setApbDesa] = useState([]);
  const currentYear = new Date().getFullYear();

  async function getDataApbdesa() {
    try {
      const res = await apiKarangrejo.get("/apb");
      setApbDesa(res.data.apb.filter((item) => item.tahun == currentYear)[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataPenduduk() {
    try {
      const res = await apiKarangrejo.get("/penduduk");
      administrasi[0].number = res.data.penduduk.total_penduduk;
      administrasi[1].number = res.data.penduduk.laki_laki;
      administrasi[2].number = res.data.penduduk.kepala_keluarga;
      administrasi[3].number = res.data.penduduk.perempuan;
    } catch (err) {
      console.log(err);
    }
  }

  const [galeri, setGaleri] = useState([]);
  async function getDataGalery() {
    try {
      const res = await apiKarangrejo.get("/galery");
      setGaleri(res.data.galery);
    } catch (error) {
      console.log(error);
    }
  }

  const [sotk, setSotk] = useState([]);

  async function getDataSOTK() {
    try {
      const res = await apiKarangrejo.get("/sotk");
      setSotk(res.data.sotk);
    } catch (error) {
      console.log(error);
    }
  }

  const [dataBerita, setDataBerita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDataBerita() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/news");
      setDataBerita(res.data.news);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataBerita();
    getDataGalery();
    getDataSOTK();
    getDataApbdesa();
    getDataPenduduk();
  }, []);

  const [dataUMKM, setDataUMKM] = useState([]);

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      setDataUMKM(res.data.umkm);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUMKM();
  }, []);

  function falseRate(trueRate) {
    return 5 - trueRate;
  }

  return (
    <>
      <main className="">
        <section className="h-56 sm:h-64 xl:h-[750px] 2xl:h-full">
          <Carousel indicators="false">
            <div className="relative flex justify-center items-center">
              <h1 className="flex flex-col gap-3 items-center justify-center bg-opacity-50 bg-slate-900 w-full h-56 sm:h-64 xl:h-[750px] 2xl:h-full absolute text-white z-10">
                <span className="text-2xl md:text-4xl xl:text-7xl font-extrabold">
                  Selamat Datang
                </span>
                <span className="text-2xl md:text-4xl xl:text-7xl font-semibold">
                  Website Resmi Desa Karangrejo
                </span>
              </h1>
              <img src="/carousel/1.jpg" alt="hehe" />
            </div>
            <div className="relative flex justify-center items-center">
              <h1 className="flex flex-col gap-3 items-center justify-center bg-opacity-50 bg-slate-900 w-full h-56 sm:h-64 xl:h-[750px] 2xl:h-full absolute text-white z-10">
                <span className="text-2xl md:text-4xl xl:text-7xl font-extrabold">
                  Selamat Datang
                </span>
                <span className="text-2xl md:text-4xl xl:text-7xl font-semibold">
                  Website Resmi Desa Karangrejo
                </span>
              </h1>
              <img src="/carousel/2.jpg" alt="hehe" />
            </div>
            {/* <img src="/carousel/2.jpg" alt="..." /> */}
            {/* <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            /> */}
          </Carousel>
        </section>
        <section className="container mx-auto mt-10">
          <section className="grid gap-5 grid-cols-1 md:grid-cols-2">
            <section className="flex flex-col justify-center p-5 md:p-4">
              <h1 className="text-4xl font-bold uppercase">Jelajahi Desa</h1>
              <p className="text-xl text-start">
                Melalui website ini Anda dapat menjelajahi segala hal yang
                terkait dengan Desa. Aspek pemerintahan, penduduk, demografi,
                potensi Desa, dan juga berita tentang Desa.
              </p>
            </section>
            <section className="p-4">
              <section className="flex flex-row gap-5 justify-start">
                <Link to={"/belanja"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img src="/home/iconPasarDesa.png" alt="" />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Pasar Desa
                    </h1>
                  </Card>
                </Link>
                <Link to={"https://cekdptonline.kpu.go.id/"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60 ">
                    <img src="/home/iconCekDPT.png" alt="" />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Cek DPT Online
                    </h1>
                  </Card>
                </Link>
              </section>
              <section className="flex flex-row gap-5 justify-end mt-5">
                <Link to={"/berita"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img src="/home/iconBeritaDesa.png" alt="" />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Berita Desa
                    </h1>
                  </Card>
                </Link>
                <Link to={"#"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img src="/home/iconInformasiDesa.png" alt="" />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Informasi Desa
                    </h1>
                  </Card>
                </Link>
              </section>
            </section>
          </section>
          <section className="grid md:grid-cols-3 grid-cols-1 my-10 mt-24">
            <div className="w-full flex justify-center items-center md:col-span-1">
              <div className="w-52">
                <img
                  src="/home/kepaladesa.jpg"
                  alt=""
                  className="object-cover h-52 w-full object-top rounded-full shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center md:items-start items-center p-2 md:col-span-2">
              <div>
                <h1 className="font-semibold text-lg md:text-start">
                  Sambutan Kepala Desa
                </h1>
                <p className="font-semibold text-xl md:text-start">
                  HERI SUJOKO, S.Pd.
                </p>
                <p className="font-light text-lg md:text-start">
                  Kepala Desa Karangrejo
                </p>
              </div>
              <div>
                <div className="overflow-auto h-44 text-justify">
                  <p>
                    Assalamu'alaikum Warahmatullahi Wabarakatuh, <br />
                    Salam sejahtera <br />
                    Rahayu <br /> <br />
                    Puji syukur kita panjatkan ke hadirat Allah SWT, atas
                    limpahan rahmat dan hidayah-Nya sehingga kita dapat
                    bersama-sama melaksanakan tugas dan tanggung jawab dalam
                    membangun Desa Karangrejo yang lebih baik. Sebagai Kepala
                    Desa Karangrejo, Kecamatan Kandat, Kabupaten Kediri, saya
                    menyambut dengan hangat kehadiran Bapak/Ibu dan seluruh
                    masyarakat di website resmi Desa Karangrejo ini. Website ini
                    kami hadirkan sebagai sarana informasi yang lebih dekat dan
                    mudah diakses oleh seluruh warga dan siapa pun yang ingin
                    mengetahui perkembangan serta kegiatan di desa kami. Melalui
                    platform ini, kami ingin mewujudkan transparansi
                    pemerintahan desa serta meningkatkan pelayanan publik dalam
                    berbagai aspek pembangunan. Di era digital ini, kebutuhan
                    akan informasi yang cepat dan tepat sangatlah penting. Maka
                    dari itu, kami akan terus berupaya menyediakan informasi
                    yang akurat dan terkini, mulai dari kegiatan pemerintahan,
                    pembangunan, pemberdayaan masyarakat, hingga informasi
                    kebudayaan dan potensi ekonomi di Desa Karangrejo. Akhir
                    kata, besar harapan kami agar website ini dapat memberi
                    manfaat bagi kita semua. Semoga upaya kita dalam membangun
                    Desa Karangrejo dapat memberikan hasil yang optimal, demi
                    kemajuan dan kesejahteraan masyarakat yang kita cintai.{" "}
                    <br /> <br />
                    Wassalamu'alaikum Warahmatullahi Wabarakatuh. <br />
                    Salam sejahtera <br />
                    Rahayu <br /> <br />
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="p-4 mt-24">
            <div className="mb-6">
              <h1 className="uppercase font-bold text-xl text-start">
                Peta Desa
              </h1>
              <p className="font-semibold text-start">
                Menampilkan Peta Desa Dengan <i>Interest Point</i> Desa
                Karangrejo
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15806.063585592974!2d112.0432787447341!3d-7.945518621430898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f7572ab20f71%3A0x1380449abe9d426f!2sKarangrejo%2C%20Kec.%20Kandat%2C%20Kabupaten%20Kediri%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1728295722179!5m2!1sid!2sid"
              width={"100%"}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section className="p-4">
            <h1 className="text-start text-4xl font-bold mb-4">SOTK</h1>
            {sotk.length == 0 ? (
              <Card className="mt-3">
                <section className="flex flex-row justify-center items-center gap-2 h-80 ">
                  <section className="text-inherit">
                    <IconCircleX />
                  </section>
                  <section className="text-">Belum Ada Data</section>
                </section>
              </Card>
            ) : (
              <section className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {sotk.map((item, i) => {
                  if (i < 4) {
                    return (
                      <>
                        <section className="flex justify-center" key={i}>
                          <Card
                            className="max-w-sm"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            renderImage={() => {
                              return (
                                <div className="flex justify-center items-center relative w-full">
                                  <img
                                    className="h-[300px] w-[400px] object-cover"
                                    src={
                                      import.meta.env.VITE_IMAGE_BASE +
                                      "/" +
                                      item.image
                                    }
                                    alt=""
                                  />
                                </div>
                              );
                            }}
                          >
                            <h5 className="text-base md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {item.nama}
                            </h5>
                            <p className="text-sm md:text-base font-normal text-gray-700 dark:text-gray-400">
                              {item.jabatan}
                            </p>
                          </Card>
                        </section>
                      </>
                    );
                  }
                })}
              </section>
            )}
            <section className="flex justify-end my-4">
              <Link to={"/pemerintah"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat struktur lebih lengkap
                </span>
              </Link>
            </section>
          </section>
          <section className="my-4 p-4">
            <h1 className="text-start text-4xl font-bold">
              Administrasi Penduduk
            </h1>
            <h2 className="text-start text-xl my-3">
              Sistem digital yang berfungsi mempermudah pengelolaan data dan
              informasi terkait dengan kependudukan dan pendayagunaannya untuk
              pelayanan publik yang efektif dan efisien
            </h2>
            <section className="p-2 grid grid-cols-2 gap-2">
              {administrasi.map((item) => (
                <>
                  {/* <section className="p-3 grid grid-cols-2"> */}
                  <Card className="rounded-none w-full">
                    <section className="grid grid-cols-2 content-end gap-2 ">
                      <p className="font-bold text-lg sm:text-3xl md:text-4xl">
                        {item.number}
                      </p>
                      <p className="font-bold text-base sm:text-lg md:text-xl">
                        {item.title}
                      </p>
                    </section>
                  </Card>
                  {/* </section> */}
                </>
              ))}
            </section>
          </section>
          <section className="my-4 p-4">
            <section className="grid md:grid-cols-2">
              <section className="flex justify-center">
                <img
                  src="/home/iconAPBD.png"
                  alt=""
                  className="w-72 sm:w-full"
                  loading="lazy"
                />
              </section>

              <section>
                <h1 className="text-4xl font-bold">APB Desa 2024</h1>
                <h3 className="text-md font-semibold">
                  Akses cepat dan transparan terhadap APB Desa serta proyek
                  pembangunan
                </h3>
                <section className="flex gap-3 flex-col p-3">
                  <Card className="rounded-none w-full">
                    <section>
                      <p className="text-start font-medium">Pendapatan Desa</p>
                      <p className="text-end text-xl font-bold sm:text-2xl md:text-3xl">
                        <FormatRupiah value={apbDesa?.pendapatan || 0} />
                      </p>
                    </section>
                  </Card>
                  <Card className="rounded-none w-full">
                    <section>
                      <p className="text-start font-medium">Belanja Desa</p>
                      <p className="text-end text-xl font-bold sm:text-2xl md:text-3xl">
                        <FormatRupiah value={apbDesa?.belanja || 0} />
                      </p>
                    </section>
                  </Card>
                  <Card className="rounded-none w-full">
                    <section>
                      <p className="text-start font-medium">
                        Sisa Lebih Pembiayaan Anggaran (SiLPA)
                      </p>
                      <p className="text-end text-xl font-bold sm:text-2xl md:text-3xl">
                        <FormatRupiah value={0} />
                      </p>
                    </section>
                  </Card>
                </section>
              </section>
            </section>
            <section className="flex justify-end my-4">
              <Link to={"/infografis/apb-desa"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat data lebih lengkap
                </span>
              </Link>
            </section>
          </section>
          <section className="p-4">
            <section>
              <h1 className="text-start text-4xl font-bold">Berita Desa</h1>
              <p className="text-start text-xl my-3">
                Menyajikan informasi terbaru tentang peristiwa, berita terkini,
                dan artikel-artikel jurnalistik dari Desa Karangrejo
              </p>
            </section>
            {dataBerita == "" ? (
              <Card className="mt-3">
                <section className="flex flex-row justify-center items-center gap-2 h-80 ">
                  <section className="text-inherit">
                    <IconCircleX />
                  </section>
                  <section className="text-">Belum Ada Data</section>
                </section>
              </Card>
            ) : (
              <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                {dataBerita.map((item, i) => {
                  if (i < 6) {
                    return (
                      <>
                        <Link to={"/berita/" + item.id}>
                          <Card
                            className="min-h-full"
                            imgAlt="Image Berita"
                            renderImage={() => (
                              <div className="w-full flex justify-center">
                                <img
                                  src={
                                    import.meta.env.VITE_IMAGE_BASE +
                                    "/" +
                                    item?.image
                                  }
                                  alt="Image Berita"
                                  className="w-full rounded-t-md h-[300px] object-cover object-top"
                                />
                              </div>
                            )}
                          >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {item.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                              {item.content}
                            </p>

                            <section className=" hidden sm:flex sm:justify-between">
                              <section>
                                <p className="flex flex-row">
                                  <span>
                                    <IconUser></IconUser>
                                  </span>
                                  &nbsp;{item.writer}
                                </p>
                                <p className="flex flex-row">
                                  <IconEye></IconEye>
                                  &nbsp;{item.seen}
                                </p>
                              </section>
                              <section>
                                <p>{item.publisDate}</p>
                              </section>
                            </section>
                          </Card>
                        </Link>
                      </>
                    );
                  }
                })}
              </section>
            )}
            <section className="flex justify-end my-4">
              <Link to={"/berita"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat berita lebih lengkap
                </span>
              </Link>
            </section>
          </section>
          {/* <section className="p-4">
            <section
              className=""
              // style={{
              //   backgroundImage:
              //     "https://cdn.digitaldesa.com/statics/profil-v2/assets/background_wisata-DbjOCYPf.png",
              // }}
            >
              <section>
                <h1 className="uppercase text-start">Wisata Desa</h1>
                <p className="text-start">
                  Layanan yang mempermudah promosi wisata desa sehingga dapat
                  menarik pengunjung desa
                </p>
              </section>
              <section>
                <Carousel indicators="false">
                  <img src="https://placehold.co/100x100" alt="..." />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                    alt="..."
                  />
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                    alt="..."
                  />
                </Carousel>
              </section>
            </section>
          </section> */}
          <section className="p-4">
            <section>
              <h1 className="text-start text-4xl font-bold uppercase">
                Beli dari Desa
              </h1>
              <p className="text-start text-xl my-3">
              Layanan yang disediakan promosi produk UMKM Desa sehingga mampu meningkatkan perekonomian masyarakat Desa Karangrejo, Kandat
              </p>
            </section>
            <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {dataUMKM.map((item, i) => {
                if (i < 6) {
                  return (
                    <>
                      <Link to={`/belanja/${item.id}`}>
                        <Card
                          className=""
                          imgAlt="Image Berita"
                          renderImage={() => (
                            <div className="w-full flex justify-center">
                              <img
                                src={
                                  import.meta.env.VITE_IMAGE_BASE +
                                  "/" +
                                  item?.image
                                }
                                alt="Image Berita"
                                className="w-full rounded-t-md h-[300px] object-cover"
                              />
                            </div>
                          )}
                        >
                          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.name}
                          </h5>

                          <section className="flex flex-col sm:flex-row justify-between">
                            <section>
                              <Rating>
                                {/* {let falseRate = 5 - item.Rating} */}
                                {Array.from(
                                  { length: item.rating },
                                  (_, index) => (
                                    <Rating.Star key={index} />
                                    // <>p</>
                                  )
                                )}

                                {Array.from(
                                  { length: falseRate(item.rating) },
                                  (_, index) => (
                                    <Rating.Star key={index} filled={false} />
                                    // <>p</>
                                  )
                                )}
                              </Rating>
                            </section>
                            <section className="text-start sm:text-center">
                              <FormatRupiah value={item.price} />
                            </section>
                          </section>
                        </Card>
                      </Link>
                    </>
                  );
                }
              })}
            </section>
            <section className="flex justify-end my-4">
              <Link to={"/belanja"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat Produk lebih lengkap
                </span>
              </Link>
            </section>
          </section>
          <section className="p-4">
            <section>
              <h1 className="text-start text-4xl font-bold uppercase">
                Galeri desa
              </h1>
              <p className="text-start text-xl my-3">
                Menampilkan kegiatan-kegiatan yang berlangsung di Desa Karangrejo, Kandat
              </p>
            </section>

            {galeri == "" ? (
              <Card className="mt-3">
                <section className="flex flex-row justify-center items-center gap-2 h-80 ">
                  <section className="text-inherit">
                    <IconCircleX />
                  </section>
                  <section className="text-">Belum Ada Data</section>
                </section>
              </Card>
            ) : (
              <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                {galeri.map((item, i) => {
                  if (i < 6) {
                    return (
                      <>
                        <section>
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_BASE + "/" + item.image
                            }
                            alt="Galeri"
                            className="w-full h-52 sm:h-72  md:h-96 object-cover object-top"
                            loading="lazy"
                          />
                        </section>
                      </>
                    );
                  }
                })}
              </section>
            )}
            <section className="flex justify-end my-4">
              <Link to={"/galeri"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat foto lebih banyak
                </span>
              </Link>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
