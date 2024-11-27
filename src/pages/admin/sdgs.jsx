import Admin from "./adminLayout";
import { Card } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

import { sdgs } from "../infografis/data/data";

const SDGsAdmin = () => {
  return (
    <Admin>
      <section className="p-5">
        {sdgs.map((item, i) => {
          if (i < 1) {
            return (
              <>
                <Card className="">
                  <div className="flex justify-between">
                    <section className="grid grid-cols-2">
                      <h1 className="text-start text-lg font-bold">
                        {item.judul}
                      </h1>
                      <p className="text-center text-4xl font-bold">
                        {item.nilai}
                      </p>
                    </section>
                    <button className="text-end">
                      <IconEdit className="w-6 h-6 text-reg-300" />
                    </button>
                  </div>
                </Card>
              </>
            );
          }
        })}

        <section className="mt-10 grid grid-cols-1 gap-3  md:grid-cols-2 xl:grid-cols-3">
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
                      <button className="text-end">
                        <IconEdit className="w-6 h-6 text-reg-300" />
                      </button>
                    </section>
                  </section>
                </Card>
              );
            }
          })}
        </section>
      </section>
    </Admin>
  );
};

export default SDGsAdmin;
