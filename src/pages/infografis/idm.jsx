import { idm, skorIDMTahun } from "./data/data";
import InfografisLink from "./link";

import { Card } from "flowbite-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IDM = () => {
  return (
    <>
      <main style={{ marginTop: "84px" }}>
        {/* LINK INFOGRAFIS */}
        <InfografisLink />
        <section className="container p-4 mx-auto mt-10">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <section className="flex justify-center flex-col sm:p-10">
              <h1 className=" text-start font-bold text-4xl">IDM</h1>
              <p className="text-start text-xl font-medium">
                Indeks Desa Membangun (IDM) merupakan indeks komposit yang
                dibentuk dari tiga indeks, yaitu Indeks Ketahanan Sosial, Indeks
                Ketahanan Ekonomi, dan Indeks Ketahanan Ekologi/Lingkungan.
              </p>
            </section>
            <section className="flex flex-col gap-3 sm:p-10">
              {idm.map((item, i) => {
                if (i < 2) {
                  return (
                    <>
                      <Card className="">
                        <h1 className="text-start text-lg font-semibold">
                          {item.judul}
                        </h1>
                        <p className="text-end text-2xl font-bold">
                          {item.jumlah}
                        </p>
                      </Card>
                    </>
                  );
                }
              })}
            </section>
          </section>

          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {idm.map((item, i) => {
              if (i >= 2) {
                return (
                  <Card key={i} className="">
                    <h1 className="text-start text-lg font-semibold">
                      {item.judul}
                    </h1>
                    <p className="text-end text-2xl font-bold">{item.jumlah}</p>
                  </Card>
                );
              }
            })}
          </section>

          <section className="mt-28">
            <h1 className=" text-start font-bold text-4xl">
              Skor IDM tahun ke tahun
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={skorIDMTahun}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="skor"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </section>
        </section>
      </main>
    </>
  );
};

export default IDM;
