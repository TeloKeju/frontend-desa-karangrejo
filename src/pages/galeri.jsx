import { useState } from "react";
import apiKarangrejo from "../lib/axios";
// import { galeri } from "./data/data";
import { useEffect } from "react";
import { Card } from "flowbite-react";

const Galeri = () => {
  const [galeri, setGaleri] = useState([]);
  async function getDataGalery() {
    try {
      const res = await apiKarangrejo.get("/galery");
      setGaleri(res.data.galery);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataGalery();
  }, []);
  return (
    <>
      <main className="">
        <section
          className="container mx-auto px-4 py-8"
          style={{ minHeight: "calc(100vh - 84px)" }}
        >
          <section className="">
            <h1 className="text-start text-4xl font-bold uppercase">
              Galeri desa
            </h1>
            <p className="text-start text-xl my-3">
              Menampilkan kegiatan-kegiatan yang berlangsung di Desa
            </p>
          </section>
          {galeri.length === 0 ? (
            <section className="pt-5" style={{ minHeight: "85vh" }}>
              <Card className="object-contain" imgAlt="Image Berita" imgSrc="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Belum ada Gambar
                </h5>
              </Card>
            </section>
          ) : (
            <section className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {galeri.map((item, i) => {
                return (
                  <>
                    <section key={i}>
                      <img
                        src={import.meta.env.VITE_IMAGE_BASE + "/" + item.image}
                        alt="Galeri"
                        className="w-full"
                        loading="lazy"
                      />
                    </section>
                  </>
                );
              })}
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default Galeri;
