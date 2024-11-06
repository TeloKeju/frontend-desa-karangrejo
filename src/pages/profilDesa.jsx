import { List, Card } from "flowbite-react";

const ProfileDesa = () => {
  return (
    <>
      <main className="mt-20">
        <section className="container mx-auto my-10 p-4">
          <section className="grid sm:grid-cols-2 ">
            <section className="my-auto">
              <section className="flex justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Kabupaten_Kediri_%28Seal_of_Kediri_Regency%29.svg"
                  alt="logo kediri"
                  className="w-52"
                />
              </section>

              <h1 className="font-bold text-3xl mt-2">Desa Karangrejo</h1>
              <p className="font-bold text-base mt-1">
                Kecamatan Kandat, Kabupaten Kediri, Provinsi Jawa Timur
              </p>
            </section>
            <section className="mt-4">
              <h1 className="font-bold text-3xl">Visi</h1>
              <p>
                Terwujudnya Desa Karangrejo yang harmonis, maju, berdaya saing,
                agamis, tentram dan sejahtera pada tahun 2027
              </p>
              <h1 className="font-bold text-3xl">Misi</h1>
              <List ordered nested className="text-start">
                <List.Item>
                  Meningkatkan kualitas pelayanan publik dan tata kelola
                  pemerintahan berbasis Good Government.
                </List.Item>
                <List.Item>
                  Meningkatkan Kualitas pembangunan sumber daya manusia
                  seutuhnya melalui optimalisasi gerakan pemberdayaan masyarakat
                  di berbagai bidang secara terpadu.
                </List.Item>
                <List.Item>
                  Meningkatkan pengembangan perekonomian Desa secara
                  berkelanjutan didukung infrastruktur dan kawasan berkualitas
                  berbasis TIK.
                </List.Item>
                <List.Item>
                  Menjaga dan meningkatkan keamanan, ketentraman, ketertiban,
                  dan kerukunan masyarakat untuk pelaksanaan pembangunan
                  didukung dengan pengalaman keagamaan dan nilai - nilai luhur
                  berdaya bangsa.
                </List.Item>
              </List>
            </section>
          </section>
          <section className="mt-10 text-start">
            <section>
              <h1 className="font-bold text-3xl uppercase">Bagan Desa</h1>
              <h2 className="text-xl">Bagan Struktur Desa Karangrejo</h2>
            </section>
            <section className="mt-6">
              <h1 className="font-bold text-2xl uppercase">
                Struktur Organisasi Pemerintahan Desa
              </h1>
              <img
                src="/home/sotk.jpg"
                alt="Struktur Organisasi Pemerintahan Desa"
                className="w-full"
              />
            </section>
            <section className="mt-6">
              <h1 className="font-bold text-2xl uppercase">
                Struktur Organisasi Badan Permusyawaratan Desa
              </h1>
              <img
                src="https://placehold.co/16x9"
                alt="Struktur Organisasi Badan Permusyawaratan Desa"
                className="w-full"
              />
            </section>
          </section>
          <section className="mt-10 text-start">
            <h1 className="font-bold text-2xl">Sejarah Desa Karangrejo</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              placeat, culpa minus repellendus natus reprehenderit corporis! Ex
              deleniti veritatis minus architecto ea similique facere, et
              laboriosam. Quis fugiat illo quidem. Dicta illo non quaerat ipsa
              autem molestias perferendis saepe itaque, excepturi nemo
              reprehenderit iure eligendi similique quos obcaecati possimus
              corporis inventore aperiam, maxime sunt! Distinctio suscipit
              dignissimos velit non provident.
            </p>
          </section>

          <section className="mt-20">
            <section>
              <h1 className="font-bold text-3xl uppercase">Peta Lokasi Desa</h1>
              <h2 className="text-xl">Peta Lokasi Desa Karangrejo</h2>
            </section>
            <section className="grid sm:grid-cols-2 gap-4">
              <Card className="w-full text-start mt-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Desa Karangrejo
                </h1>
                <section className="border-b-2" />
                <p className="font-normal text-xl text-slate-700 dark:text-gray-400">
                  Batas Desa
                </p>
                <section className="grid grid-cols-2 text-lg">
                  <section className="">
                    <p>Utara</p>
                    <p>Desa Kandat dan Desa Selosari</p>
                  </section>
                  <section>
                    <p>Timur</p>
                    <p>Desa Selosari</p>
                  </section>
                  <section>
                    <p>Selatan</p>
                    <p>
                      Desa Purwodadi dan Desa Selodono (Kecamatan Ringinrejo)
                    </p>
                  </section>
                  <section>
                    <p>barat</p>
                    <p>Desa Sumberjo</p>
                  </section>
                </section>
                <section className="border-b-2" />
                <section className="flex justify-between">
                  <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                    Luas Desa
                  </p>
                  <p className="font-semibold text-xl">9.300.000 ㎡</p>
                </section>
                <section className="flex justify-between">
                  <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                    Jumlah Penduduk
                  </p>
                  <p className="font-semibold text-xl">4.444 Jiwa</p>
                </section>
              </Card>
              <section className="shadow-md rounded-md mt-2 sm:mt-6">
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
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default ProfileDesa;
