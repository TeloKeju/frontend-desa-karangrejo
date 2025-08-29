import { Card, Rating } from "flowbite-react";
import { beli } from "./data/data";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "react-router-dom";
import apiKarangrejo from "../lib/axios";
import { useEffect, useState } from "react";

const Belanja = () => {
  function falseRate(trueRate) {
    return 5 - trueRate;
  }

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

  return (
    <>
      <main className="">
        <section
          className="container mx-auto px-4 py-8"
          style={{ minHeight: "calc(100vh - 84px)" }}
        >
          <section>
            <h1 className=" text-start font-bold text-4xl">Beli Dari Desa</h1>
            <p className="text-start font-semibold text-base mt-3">
              Layanan yang disediakan promosi produk UMKM desa sehingga mampu
              meningkatkan perekonomian masyarakat desa
            </p>
          </section>
          <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            {dataUMKM.map((item) => {
              return (
                <div key={item.id}>
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
                            {Array.from({ length: item.rating }, (_, index) => (
                              <Rating.Star key={index} />
                              // <>p</>
                            ))}

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
                </div>
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Belanja;
