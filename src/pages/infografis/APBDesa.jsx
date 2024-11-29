import InfografisLink from "./link";

import { belanjaDesa, pembiayaanDesa, pendapatanDesa } from "./data/data";

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
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

const APBDesa = () => {
  const [tahun, setTahun] = useState();

  const [apbDesa, setApbDesa] = useState([]);
  var dataAPBDCurrentYear = apbDesa.filter((item) => item.tahun == tahun)[0];

  const [belanjaDesa2, setBelanjaDesa2] = useState(belanjaDesa);
  const [pendapatanDesa2, setPendapatanDesa2] = useState(pendapatanDesa);
  const [pembiayaanDesa2, setPembiayaanDesa2] = useState(pembiayaanDesa);

  useEffect(() => {
    if (dataAPBDCurrentYear) {
      // Update belanjaDesa2
      const updatedBelanjaDesa = [...belanjaDesa2];
      updatedBelanjaDesa[0].jumlah =
        dataAPBDCurrentYear.penyelenggaraan_pemerintahan_desa;
      updatedBelanjaDesa[1].jumlah =
        dataAPBDCurrentYear.pelaksanaan_pembangunan_desa;
      updatedBelanjaDesa[2].jumlah =
        dataAPBDCurrentYear.pembinaan_kemasyarakatan_desa;
      updatedBelanjaDesa[3].jumlah =
        dataAPBDCurrentYear.pemberdayaan_masyarakat_desa;
      updatedBelanjaDesa[4].jumlah = dataAPBDCurrentYear.penanggulangan_bencana;
      setBelanjaDesa2(updatedBelanjaDesa);

      // Update pendapatanDesa2
      const updatedPendapatanDesa = [...pendapatanDesa2];
      updatedPendapatanDesa[0].jumlah = dataAPBDCurrentYear.hasil_desa;
      updatedPendapatanDesa[1].jumlah = dataAPBDCurrentYear.transfer;
      updatedPendapatanDesa[2].jumlah = dataAPBDCurrentYear.lain;
      setPendapatanDesa2(updatedPendapatanDesa);

      // Update pembiayaanDesa2
      const updatedPembiayaanDesa = [...pembiayaanDesa2];
      updatedPembiayaanDesa[0].jumlah = dataAPBDCurrentYear.penerimaan;
      updatedPembiayaanDesa[1].jumlah = dataAPBDCurrentYear.pengeluaran;
      setPembiayaanDesa2(updatedPembiayaanDesa);
    }
  }, [dataAPBDCurrentYear]);

  async function getDataApbdesa() {
    try {
      // setIsLoading(true);
      const res = await apiKarangrejo.get("/apb");
      setApbDesa(res.data.apb);
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getDataApbdesa();
  }, []);

  let currentYear = new Date().getFullYear();
  useEffect(() => {
    setTahun(currentYear);
  }, [currentYear]);

  return (
    <>
      <main className="mt-20">
        <InfografisLink />
        <section className="container p-5  mx-auto mt-10">
          <section className="grid sm:grid-cols-2 gap-3">
            <section className="flex flex-col justify-center items-center">
              <h1 className=" text-start font-bold text-4xl">
                APB Desa Karangrejo Tahun {tahun}
              </h1>
              <p className="text-start font-semibold text-base">
                Desa Karangrejo, Kecamatan Kandat, Kabupaten Kediri, Provinsi
                Jawa Timur
              </p>
            </section>
            <section className="flex flex-col gap-3">
              <Select
                id="tahun"
                required
                className=""
                onChange={(e) => setTahun(e.target.value)}
              >
                {apbDesa.map((item, i) => (
                  <option
                    key={i}
                    value={item.tahun}
                    selected={item.tahun == "2024"}
                  >
                    {item.tahun}
                  </option>
                ))}
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
              {apbDesa.map((item, i) => {
                // console.log(i);

                if (item.tahun == tahun) {
                  return (
                    <>
                      <section
                        className="grid gap-5 grid-cols-1 sm:grid-cols-2"
                        key={i}
                      >
                        <Card>
                          <section className="flex gap-3 flex-row justify-start">
                            <section className="text-green-500">
                              {i == 0 ? (
                                <IconPointFilled />
                              ) : apbDesa[i - 1].pendapatan <
                                item.pendapatan ? (
                                <IconArrowBadgeUpFilled />
                              ) : (
                                <IconArrowBadgeUpFilled className="text-red-500 transform rotate-180" />
                              )}
                            </section>
                            <section className="text-lg font-semibold">
                              Pendapatan
                            </section>
                          </section>
                          <section>
                            <section
                              className={`text-start text-2xl font-bold ${
                                apbDesa[i - 1]?.pendapatan > item.pendapatan
                                  ? "text-red-500"
                                  : "text-green-500 "
                              } `}
                            >
                              <FormatRupiah value={item.pendapatan} />
                            </section>
                          </section>
                        </Card>
                        <Card>
                          <section className="flex gap-3 flex-row justify-start">
                            <section className="">
                              <IconPointFilled />
                            </section>
                            <section className="text-lg font-semibold">
                              Belanja
                            </section>
                          </section>
                          <section>
                            <section className=" text-start text-2xl font-bold">
                              <FormatRupiah value={item.belanja} />
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
                                <FormatRupiah value={item.penerimaan} />
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
                                <FormatRupiah value={item.pengeluaran} />
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
                            <section
                              className={`font-bold text-2xl ${
                                item?.pendapatan < item?.pengeluaran
                                  ? "text-red-500"
                                  : "text-green-500 "
                              }`}
                            >
                              <FormatRupiah
                                value={
                                  item?.pendapatan - item?.pengeluaran || 0
                                }
                              />
                            </section>
                          </section>
                        </Card>
                      </section>
                    </>
                  );
                }
              })}
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pendapatan dan Belanja Desa dari Tahun ke Tahun
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={apbDesa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pendapatan"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="#84a3d8" />}
                  />
                  <Bar
                    dataKey="belanja"
                    fill="#84a3d8"
                    activeBar={<Rectangle fill="#84a3d8" stroke="#8884d8" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pendapatan Desa {tahun}
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pendapatanDesa2}>
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
              Belanja Desa {tahun}
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={belanjaDesa2}>
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
              Pembiayaan Desa {tahun}
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pembiayaanDesa2}>
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
