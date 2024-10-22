import { IconSearch } from "@tabler/icons-react";
import { bansos, sdgs } from "./data/data";
import InfografisLink from "./link";

import { Card, TextInput, Label } from "flowbite-react";

// export InfografisLink

const SDGs = () => {
  return (
    <main className="mt-20">
      <InfografisLink />
      <section className="container p-5  mx-auto mt-10">
        <section className=" grid grid-cols-1 sm:grid-cols-2">
          <section className="flex justify-center flex-col gap-3">
            <h1 className=" text-start font-bold text-4xl">SDGs Desa</h1>
            <p className="text-start text-xl mt-2">
              SDGs Desa mengacu pada upaya yang dilakukan di tingkat desa untuk
              mencapai Tujuan Pembangunan Berkelanjutan (Sustainable Development
              Goals/SDGs). SDGs merupakan agenda global yang ditetapkan oleh
              Perserikatan Bangsa-Bangsa (PBB) untuk mengatasi berbagai
              tantangan sosial, ekonomi, dan lingkungan di seluruh dunia
            </p>

            {sdgs.map((item, i) => {
              if (i < 1) {
                return (
                  <>
                    <Card className="">
                      <section className="grid grid-cols-2">
                        <h1 className="text-start text-lg font-bold">
                          {item.judul}
                        </h1>
                        <p className="text-start text-4xl font-bold">
                          {item.nilai}
                        </p>
                      </section>
                    </Card>
                  </>
                );
              }
            })}
          </section>
          <section className="flex justify-end">
            <img src="/iconSDGs/head.png" alt="" />
          </section>
        </section>

        <section className="mt-28 grid grid-cols-1 gap-3  md:grid-cols-2 xl:grid-cols-4">
          {sdgs.map((item, i) => {
            if (i >= 1) {
              return (
                <Card key={i} className="">
                  <h1 className="text-start text-xl font-bold">{item.judul}</h1>
                  <section className="flex flex-row justify-between">
                    <img src={item.image} alt="" className="w-20" />
                    <section>
                      <p className="text-end">Nilai</p>
                      <p className=" text-5xl font-bold">{item.nilai}</p>
                    </section>
                  </section>
                </Card>
              );
            }
          })}
        </section>
      </section>
    </main>
  );
};

export default SDGs;
