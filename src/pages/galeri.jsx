import { Card } from "flowbite-react";
import { galeri } from "./data/data";

const Galeri = () => {
  return (
    <>
      <main className="mt-20 my-24">
        <section className="container mx-auto p-4 mt-10">
          <section className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {galeri.map((item, i) => {
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
              </>;
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Galeri;
