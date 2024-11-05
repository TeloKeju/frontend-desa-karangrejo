import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../lib/axios";

const Pemerintah = () => {
  const [sotk, setSotk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDataSOTK() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/sotk");
      setSotk(res.data.sotk);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataSOTK();
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
              Daftar Anggota Pemerintahan Desa
            </h1>
          </section>
          {isLoading ? (
            <div className="min-h-[80vh] flex items-center justify-center">
              Loading....
            </div>
          ) : (
            <section className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4 mt-8">
              {sotk.map((item, i) => {
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
              })}
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default Pemerintah;
