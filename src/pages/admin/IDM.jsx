import Admin from "./adminLayout";
import { idm } from "../infografis/data/data";
import { Accordion, Card } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

const IDMAdmin = () => {
  return (
    <>
      <Admin>
        <section className="flex flex-col gap-3 sm:p-10">
          {idm.map((item) => {
            return (
              <>
                <Card className="">
                  <div className="flex justify-between items-center justify-center">
                    <div>
                      <h1 className="text-start text-lg font-semibold">
                        {item.judul}
                      </h1>
                      <p className="text-end text-2xl font-bold">
                        {item.jumlah}
                      </p>
                    </div>
                    <button className="text-end">
                      <IconEdit className="w-6 h-6 text-reg-300" />
                    </button>
                  </div>
                </Card>
              </>
            );
          })}
        </section>
      </Admin>
    </>
  );
};

export default IDMAdmin;
