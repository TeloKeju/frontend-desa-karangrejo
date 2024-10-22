import { Card, Rating } from "flowbite-react";
import { beli } from "./data/data";
import { FormatRupiah } from "@arismun/format-rupiah";

const Belanja = () => {
  function falseRate(trueRate) {
    return 5 - trueRate;
  }

  return (
    <>
      <main className="mt-20">
        <section className="container p-5  mx-auto mt-10">
          <section>
            <h1 className=" text-start font-bold text-4xl">Beli Dari Desa</h1>
            <p className="text-start font-semibold text-base mt-3">
              Layanan yang disediakan promosi produk UMKM desa sehingga mampu
              meningkatkan perekonomian masyarakat desa
            </p>
          </section>
          <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
            {beli.map((item) => {
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
                            {Array.from({ length: item.Rating }, (_, index) => (
                              <Rating.Star key={index} />
                              // <>p</>
                            ))}

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
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Belanja;
