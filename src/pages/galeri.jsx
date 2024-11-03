import { Card } from "flowbite-react";
import { galeri } from "./data/data";

const Galeri = () => {
  return (
    <>
      <main className="">
        <section className="container mx-auto px-4 py-8" style={{ minHeight: "calc(100vh - 84px)" }}>
          <section className="">
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
        </section>
      </main>
    </>
  );
};

export default Galeri;
