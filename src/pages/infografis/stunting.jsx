import InfografisLink from "./link";

import { Card } from "flowbite-react";
import { IconCircleX } from "@tabler/icons-react";

const Stunting = () => {
  return (
    <main className="mt-20">
      <InfografisLink />
      <section className="container p-5  mx-auto mt-10">
        <section>
          <h1 className="font-bold text-2xl lg:text-3xl text-start">
            Data Stunting
          </h1>
          <Card className="mt-3">
            <section className="flex flex-row justify-center items-center gap-2 h-80 ">
              <section className="text-inherit">
                <IconCircleX />
              </section>
              <section className="text-">Belum Ada Data</section>
            </section>
          </Card>
        </section>
      </section>
    </main>
    // <section style={{ marginTop: "84px" }}>
    //     <InfografisLink/>
    //     <div>
    //         Stunting
    //     </div>
    // </section>
  );
};

export default Stunting;
