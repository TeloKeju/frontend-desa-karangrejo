import { Card } from "flowbite-react";
import { sotk } from "./data/data";

const Pemerintah = () => {
  return (
    <>
      <main className="">
        <section className="container mx-auto px-4 py-8" style={{minHeight:"calc(100vh - 84px)"}}>
          <section className="">
            <h1 className="text-start text-4xl font-bold uppercase">
              Daftar Anggota Pemerintahan Desa
            </h1>
          </section>
          <section className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4 mt-8">
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
        </section>
      </main>
    </>
  );
};

export default Pemerintah;
