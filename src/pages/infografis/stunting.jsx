import InfografisLink from "./link";

import { Card, Tooltip } from "flowbite-react";
import { IconCircleX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Stunting = () => {
  const [dataStuting, setDataStunting] = useState([]);

  async function getDataStunting() {
    try {
      const res = await apiKarangrejo.get("/stunting");
      setDataStunting(res.data.stunting);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(dataStuting);

  useEffect(() => {
    getDataStunting();
  }, []);
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
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart width={500} height={300} data={dataStuting}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="jumlah"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>
          </Card>
        </section>
      </section>
    </main>
  );
};

export default Stunting;

{
  /* <section className="text-inherit">
                <IconCircleX />
              </section>
              <section className="text-">Belum Ada Data</section> */
}
