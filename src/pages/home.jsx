"use client";

import { Carousel, Card, Rating } from "flowbite-react";
import { Link } from "react-router-dom";
import { IconNotes, IconUser, IconEye } from "@tabler/icons-react";
import { FormatRupiah } from "@arismun/format-rupiah";

import { sotk, administrasi, berita, beli, galeri } from "./data/data";

const Home = () => {
  function falseRate(trueRate) {
    return 5 - trueRate;
  }

  return (
    <>
      <main className="mt-20">
        <section className="h-56 sm:h-64 xl:h-96 2xl:h-full rounded-none">
          <Carousel indicators="false">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
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
                <Link to={"#"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-3-DFdUkXec.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Pasar Desa
                    </h1>
                  </Card>
                </Link>
                <Link to={"https://cekdptonline.kpu.go.id/"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60 ">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-2-SbK3LIat.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Cek DPT Online
                    </h1>
                  </Card>
                </Link>
              </section>
              <section className="flex flex-row gap-5 justify-end mt-5">
                <Link to={"#"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-1-Dm8QiT59.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Berita Desa
                    </h1>
                  </Card>
                </Link>
                <Link to={"#"}>
                  <Card className="w-40 sm:w-52 md:w-36 lg:w-48 xl:w-60">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-4-DRJ4tzz0.png"
                      alt=""
                    />
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
                  src="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S-500x500.jpg"
                  alt=""
                  className="object-cover rounded-full shadow-md"
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
                  Dani Ardiansyach SD SMP SMK
                </p>
                <p className="font-light text-lg md:text-start">
                  Kepala Desa Karangrejo
                </p>
              </div>
              <div>
                <div className="overflow-auto h-32 text-justify">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Magnam deleniti inventore dicta officia accusantium, et
                  repellat quos assumenda. Veniam explicabo cupiditate molestias
                  optio atque nulla odit iste! Maiores sunt dolore hic assumenda
                  aperiam distinctio facilis! Laudantium nam accusamus omnis,
                  sed voluptas dolorum id magnam modi corporis veniam!
                  Consequuntur quis possimus vitae quod atque ullam beatae
                  distinctio officiis laboriosam officia cum pariatur voluptas,
                  eius fugit! Cupiditate est autem aut sapiente quia unde sequi
                  minima impedit eos. Ea dignissimos quibusdam suscipit rerum
                  quis velit reiciendis nisi voluptatem illo repellat qui
                  reprehenderit ex vitae, doloremque accusantium pariatur
                  aliquam fugit neque quo, magni, quos laboriosam quidem.
                  Doloribus veniam at hic debitis inventore nostrum, rerum
                  soluta quibusdam beatae incidunt similique laboriosam error
                  impedit, excepturi sit officiis sint ipsum sapiente atque,
                  cupiditate corporis. Neque dolor voluptates alias,
                  reprehenderit modi, ducimus est voluptatibus laboriosam
                  consequatur, suscipit numquam perferendis esse sequi. Beatae,
                  necessitatibus adipisci. Impedit aut repellendus officiis ut
                  maiores inventore magni, nemo dicta deserunt, natus
                  consequatur laboriosam, at minima. Laborum possimus quaerat
                  dolore quis dolores sed ducimus non sapiente consequatur animi
                  exercitationem, veritatis ipsam autem sequi officiis
                  voluptates quisquam ipsum, rerum inventore nesciunt quo.
                  Aspernatur saepe asperiores architecto beatae molestiae
                  laboriosam odit sapiente ad cumque. Ratione, esse.
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
            <h1 className="font-bold text-lg my-6">SOTK</h1>
            <section className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {sotk.map((item, i) => {
                if (i < 4) {
                  return (
                    <>
                      <section className="flex justify-center" key={i}>
                        <Card
                          className="max-w-sm"
                          imgAlt="Meaningful alt text for an image that is not purely decorative"
                          imgSrc={item.foto}
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
            <section className="flex justify-end my-4">
              <Link to={"#"} className="flex">
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
                  src="https://cdn.digitaldesa.com/statics/profil-v2/assets/other-D5R53cMR.png"
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
                        Rp2.368.008.897,00
                      </p>
                    </section>
                  </Card>
                  <Card className="rounded-none w-full">
                    <section>
                      <p className="text-start font-medium">Belanja Desa</p>
                      <p className="text-end text-xl font-bold sm:text-2xl md:text-3xl">
                        Rp0,00
                      </p>
                    </section>
                  </Card>
                </section>
              </section>
            </section>
            <section className="flex justify-end my-4">
              <Link to={"#"} className="flex">
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
                dan artikel-artikel jurnalistik dari Desa Karang Rejo
              </p>
            </section>
            <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {berita.map((item, i) => {
                if (i < 6) {
                  return (
                    <>
                      <section>
                        <Card
                          className=""
                          imgAlt="Image Berita"
                          imgSrc={item.image}
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
                      </section>
                    </>
                  );
                }
              })}
            </section>
            <section className="flex justify-end my-4">
              <Link to={"#"} className="flex">
                <IconNotes></IconNotes>
                <span className="uppercase font-bold">
                  Lihat struktur lebih lengkap
                </span>
              </Link>
            </section>
          </section>
          <section className="p-4">
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
                {/* <Carousel indicators="false">
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
                </Carousel> */}
              </section>
            </section>
          </section>
          <section className="p-4">
            <section>
              <h1 className="text-start text-4xl font-bold uppercase">
                Beli dari desa
              </h1>
              <p className="text-start text-xl my-3">
                Menyajikan informasi terbaru tentang peristiwa, berita terkini,
                dan artikel-artikel jurnalistik dari Desa Karang Rejo
              </p>
            </section>
            <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {beli.map((item, i) => {
                if (i < 6) {
                  return (
                    <>
                      <section>
                        <Card
                          className=""
                          imgAlt="Image Berita"
                          imgSrc={item.image}
                        >
                          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.title}
                          </h5>

                          <section className="flex flex-col sm:flex-row justify-between">
                            <section>
                              <Rating>
                                {/* {let falseRate = 5 - item.Rating} */}
                                {Array.from(
                                  { length: item.Rating },
                                  (_, index) => (
                                    <Rating.Star key={index} />
                                    // <>p</>
                                  )
                                )}

                                {Array.from(
                                  { length: falseRate(item.Rating) },
                                  (_, index) => (
                                    <Rating.Star key={index} filled={false} />
                                    // <>p</>
                                  )
                                )}
                              </Rating>
                            </section>
                            <section className="text-start sm:text-center">
                              <FormatRupiah value={item.Harga} />
                            </section>
                          </section>
                        </Card>
                      </section>
                    </>
                  );
                }
              })}
            </section>
            <section className="flex justify-end my-4">
              <Link to={"#"} className="flex">
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
                Menampilkan kegiatan-kegiatan yang berlangsung di Desa
              </p>
            </section>
            <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {galeri.map((item, i) => {
                if (i < 6) {
                  return (
                    <>
                      <section>
                        <img
                          src={item.image}
                          alt="Galeri"
                          className="w-full"
                          loading="lazy"
                        />
                      </section>
                    </>
                  );
                }
              })}
            </section>
            <section className="flex justify-end my-4">
              <Link to={"#"} className="flex">
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
