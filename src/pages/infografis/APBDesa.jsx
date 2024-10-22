import InfografisLink from "./link";

import {
  apbDesa,
  belanjaDesa,
  pembiayaanDesa,
  pendapatanBelanja,
  pendapatanDesa,
} from "./data/data";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Select } from "flowbite-react";
import { IconArrowBadgeUpFilled, IconPointFilled } from "@tabler/icons-react";

import { FormatRupiah } from "@arismun/format-rupiah";

const APBDesa = () => {
  return (
    <>
      <main className="mt-20">
        <InfografisLink />
        <section className="container p-5  mx-auto mt-10">
          <section className="grid sm:grid-cols-2 gap-3">
            <section className="flex flex-col justify-center items-center">
              <h1 className=" text-start font-bold text-4xl">
                APB Desa Karangrejo Tahun 2024
              </h1>
              <p className="text-start font-semibold text-base">
                Desa Karangrejo, Kecamatan Kandat, Kabupaten Kediri, Provinsi
                Jawa Timur
              </p>
            </section>
            <section className="flex flex-col gap-3">
              <Select id="tahun" required className="">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </Select>
              {/* {apbDesa.map((item) => (
                <>
                  <Card>
                    <section className="flex gap-3 flex-row justify-start">
                      <section className="text-green-500">{item.icon1}</section>
                      <section>{item.title}</section>
                    </section>

                    <section className="text-green-500">
                      <FormatRupiah value={item.jumlah} />
                    </section>
                  </Card>
                </>
              ))} */}
              <section className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <section className="flex gap-3 flex-row justify-start">
                    <section className="text-green-500">
                      <IconArrowBadgeUpFilled />
                    </section>
                    <section className="text-lg font-semibold">
                      Pendapatan
                    </section>
                  </section>
                  <section>
                    <section className="text-green-500 text-start text-2xl font-bold">
                      <FormatRupiah value={2409228574} />
                    </section>
                  </section>
                </Card>
                <Card>
                  <section className="flex gap-3 flex-row justify-start">
                    <section className="">
                      <IconPointFilled />
                    </section>
                    <section className="text-lg font-semibold">Belanja</section>
                  </section>
                  <section>
                    <section className=" text-start text-2xl font-bold">
                      <FormatRupiah value={0} />
                    </section>
                  </section>
                </Card>
              </section>
              <section>
                <Card className="rounded-bl-none rounded-br-none">
                  <section className="font-semibold text-start text-base">
                    Pembiayaan
                  </section>
                </Card>
                <section className="grid grid-cols-2">
                  <Card className="rounded-t-none rounded-br-none">
                    <section className="flex gap-3 flex-row justify-start">
                      <section className="">
                        <IconPointFilled />
                      </section>
                      <section className="text-lg font-semibold">
                        Penerimaan
                      </section>
                    </section>
                    <section>
                      <section className=" text-start text-2xl font-bold">
                        <FormatRupiah value={0} />
                      </section>
                    </section>
                  </Card>
                  <Card className="rounded-tl-none rounded-tr-none rounded-bl-none">
                    <section className="flex gap-3 flex-row justify-start">
                      <section className="">
                        <IconPointFilled />
                      </section>
                      <section className="text-lg font-semibold">
                        Pengeluaran
                      </section>
                    </section>
                    <section>
                      <section className=" text-start text-2xl font-bold">
                        <FormatRupiah value={0} />
                      </section>
                    </section>
                  </Card>
                </section>
              </section>
              <section>
                <Card>
                  <section className="flex flex-row justify-center items-center">
                    <p className="me-3 text-lg font-semibold">
                      Surplus/Defisit
                    </p>
                    <section className="text-green-500 font-bold text-2xl">
                      <FormatRupiah value={2409228574} />
                    </section>
                  </section>
                </Card>
              </section>
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pendapatan dan Belanja Desa dari Tahun ke Tahun
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pendapatanBelanja}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Pendapatan"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="#84a3d8" />}
                  />
                  <Bar
                    dataKey="Belanja"
                    fill="#84a3d8"
                    activeBar={<Rectangle fill="#84a3d8" stroke="#8884d8" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pendapatan Desa 2024
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pendapatanDesa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="judul" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="jumlah"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="#84a3d8" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Belanja Desa 2024
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={belanjaDesa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="judul" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="jumlah"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="#84a3d8" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pembiayaan Desa 2024
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pembiayaanDesa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="judul" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="jumlah"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="#84a3d8" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>
        </section>
      </main>
    </>
  );
};

export default APBDesa;
