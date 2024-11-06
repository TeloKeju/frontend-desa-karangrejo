import { Card } from "flowbite-react";

import { IconUser, IconEye } from "@tabler/icons-react";
import apiKarangrejo from "../lib/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Berita = () => {
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
  }, []);
  return (
    <>
      <main className="">
        <section
          className="container mx-auto px-4 py-8"
          style={{ minHeight: "calc(100vh - 84px)" }}
        >
          <section>
            <h1 className=" text-start font-bold text-4xl">Berita Desa</h1>
            <p className="text-start font-semibold text-base mt-3">
              Menyajikan informasi terbaru tentang peristiwa, berita terkini,
              dan artikel-artikel jurnalistik dari Desa Karangrejo
            </p>
          </section>
          {isLoading ? (
            <section
              className="pt-5 flex justify-center items-center"
              style={{ minHeight: "calc(100vh - 160px)" }}
            >
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden"></span>
              </div>
            </section>
          ) : dataBerita.length === 0 ? (
            <section className="pt-5" style={{ minHeight: "85vh" }}>
              <Card className="object-contain" imgAlt="Image Berita" imgSrc="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Belum ada berita
                </h5>
              </Card>
            </section>
          ) : (
            <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
              {dataBerita.map((item) => {
                return (
                  <>
                    <Link key={item.id} to={`./${item.id}`} className="">
                      <Card
                        className="p-0 h-full"
                        renderImage={() => (
                          <div className="w-full flex justify-center">
                            <img
                              src={
                                import.meta.env.VITE_IMAGE_BASE +
                                "/" +
                                item?.image
                              }
                              alt="Image Berita"
                              className="w-full rounded-t-md h-[210px] object-cover object-top"
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

                        <section className="flex justify-between">
                          <section>
                            <p className="flex flex-row">
                              <span>
                                <IconUser></IconUser>
                              </span>
                              &nbsp;{item?.writer || "admin"}
                            </p>
                            <p className="flex flex-row">
                              <IconEye></IconEye>
                              &nbsp;{item.views}
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
              })}
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default Berita;
