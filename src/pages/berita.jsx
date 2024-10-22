import { Card } from "flowbite-react";

import { berita } from "./data/data";

import { IconUser, IconEye } from "@tabler/icons-react";

const Berita = () => {
  return (
    <>
      <main className="mt-20">
        <section className="container p-5  mx-auto mt-10">
          <section>
            <h1 className=" text-start font-bold text-4xl">Berita Desa</h1>
            <p className="text-start font-semibold text-base mt-3">
              Menyajikan informasi terbaru tentang peristiwa, berita terkini,
              dan artikel-artikel jurnalistik dari Desa Karangrejo
            </p>
          </section>
          <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            {berita.map((item) => {
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

                      <section className="flex justify-between">
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
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Berita;
