import InfografisLink from "./link";

import { Card, Table } from "flowbite-react";

import { jumlahPenduduk, perkawinan, agama, posyanduData } from "./data/data";

// import { Chart as ChartJS } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
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
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

const Penduduk = () => {
  const [pendudukKelompokUmur, setPendudukKelompokUmur] = useState({});
  const [pendudukPendidikan, setPendudukPendidikan] = useState({});
  const [pendudukPekerjaan, setPendudukPekerjaan] = useState([]);

  async function getDataPekerjaanPenduduk() {
    try {
      const res = await apiKarangrejo("/pekerjaan");
      setPendudukPekerjaan(res.data.pekerjaan);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataPerkawinan() {
    try {
      const res = await apiKarangrejo.get("/perkawinan");

      perkawinan[0] = {
        ...perkawinan[0],
        jumlah: res.data.perkawinan?.[0]?.belum_kawin,
        slug: "belum_kawin",
      };
      perkawinan[1] = {
        ...perkawinan[1],
        jumlah: res.data.perkawinan?.[0]?.kawin,
        slug: "kawin",
      };
      perkawinan[2] = {
        ...perkawinan[2],
        jumlah: res.data.perkawinan?.[0]?.cerai_mati,
        slug: "cerai_mati",
      };
      perkawinan[3] = {
        ...perkawinan[3],
        jumlah: res.data.perkawinan?.[0].cerai_hidup,
        slug: "cerai_hidup",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataPenduduk() {
    try {
      const res = await apiKarangrejo.get("/penduduk");
      jumlahPenduduk[0].number = res.data.penduduk.total_penduduk;
      jumlahPenduduk[1].number = res.data.penduduk.kepala_keluarga;
      jumlahPenduduk[2].number = res.data.penduduk.perempuan;
      jumlahPenduduk[3].number = res.data.penduduk.laki_laki;
    } catch (err) {
      console.log(err);
    }
  }

  async function getPendudukKelompokUmur() {
    try {
      const res = await apiKarangrejo.get("/penduduk/umur");
      setPendudukKelompokUmur(res.data.umur);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataPendidikan() {
    try {
      const res = await apiKarangrejo.get("/penduduk/pendidikan");
      setPendudukPendidikan(res.data.pendidikan);
      // console.log(res.data.pendidikan);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataAgama() {
    try {
      const res = await apiKarangrejo.get("/agama");
      res.data.agama.map((item, i) => {
        agama[i].id = item.id;
        agama[i].judul = item.nama_agama;
        agama[i].jumlah = item.jumlah_penganut;
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [wajibPilih, setWajibPilih] = useState([]);
  const dataWajibPilihDitampilkan = 3;

  async function getDataWajibPilih(s) {
    try {
      const res = await apiKarangrejo.get(`/wajibpilih`);
      res.data.wajib_pilih.map((item, i) => {
        if (i >= res.data.wajib_pilih.length - dataWajibPilihDitampilkan) {
          setWajibPilih((prev) => [...prev, item]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataPosyandu() {
    try {
      const res = await apiKarangrejo.get(`/posyandu`);
      posyanduData.forEach((item) => {
        item.jumlah = res.data.data[item.key];
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataPenduduk();
    getPendudukKelompokUmur();
    getDataPekerjaanPenduduk();
    getDataPendidikan();
    getDataAgama();
    getDataPerkawinan();
    getDataWajibPilih();
    getDataPosyandu();
  }, []);

  return (
    <>
      {/* LINK INFOGRAFIS */}
      <main className="mt-20">
        <InfografisLink />
        <section className="container p-5  mx-auto mt-10">
          <section className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            <section className="flex justify-center items-center">
              <section>
                <h1 className="text-start text-3xl lg:text-5xl font-bold uppercase">
                  Demografi <br /> Penduduk
                </h1>
                <p className="text-start text-xl mt-2">
                  Memberikan informasi lengkap mengenai karakteristik demografi
                  penduduk suatu wilayah. Mulai dari jumlah penduduk, usia,
                  jenis kelamin, tingkat pendidikan, pekerjaan, agama, dan aspek
                  penting lainnya yang menggambarkan komposisi populasi secara
                  rinci.
                </p>
              </section>
            </section>
            <section className="flex justify-center sm:justify-end">
              <img
                src="/iconPenduduk/iconPenduduk.png"
                alt=""
                className="w-80"
                loading="lazy"
              />
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Jumlah Penduduk dan Kepala Keluarga
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6">
              {jumlahPenduduk.map((item, i) => (
                <div key={i}>
                  <Card className="h-full">
                    <section className="grid grid-cols-3">
                      <section className="col-span-1">
                        <img
                          src={item.image}
                          alt="Icon Penduduk"
                          loading="lazy"
                          className="w-full"
                        />
                      </section>
                      <section className=" flex flex-col justify-center col-span-2">
                        <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                          {item.title}
                        </h2>
                        <p className="text-start text-xl ms-10">
                          <span className="font-semibold">{item.number}</span>{" "}
                          Jiwa
                        </p>
                      </section>
                    </section>
                  </Card>
                </div>
              ))}
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Kelompok Umur
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pendudukKelompokUmur}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="umur" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="jumlah"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Pendidikan
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={pendudukPendidikan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="judul" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="jumlah"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Pekerjaan
            </h1>
            <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <section className="overflow-x-auto overflow-y-auto sm:col-span-1 shadow-md h-96 lg:h-80">
                <Table className="relative">
                  <Table.Head className="sticky top-0">
                    <Table.HeadCell>Jenis Pekerjaan</Table.HeadCell>
                    <Table.HeadCell>Jumlah</Table.HeadCell>
                  </Table.Head>
                  {pendudukPekerjaan?.map((item, i) => (
                    <div key={i}>
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell>{item?.pekerjaan}</Table.Cell>
                          <Table.Cell>{item?.jumlah}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </div>
                  ))}
                </Table>
              </section>
              <section className="lg:col-span-2 sm:grid hidden sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pendudukPekerjaan.map((item, i) => {
                  if (i < 6) {
                    return (
                      <div key={i}>
                        <Card className="">
                          <h1 className="text-start text-lg font-semibold">
                            {item?.pekerjaan}
                          </h1>
                          <p className="text-end text-2xl font-bold">
                            {item?.jumlah}
                          </p>
                        </Card>
                      </div>
                    );
                  }
                })}
                {/* <Card></Card> */}
              </section>
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Wajib Pilih
            </h1>
            <Card className=" w-full h-96 mt-3">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart width={500} height={300} data={wajibPilih}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="wajib_pilih"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Perkawinan
            </h1>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {perkawinan.map((item) => (
                <>
                  <Card className=" ">
                    <section className="grid grid-cols-3">
                      <section className="col-span-1">
                        <img
                          src={item.image}
                          alt="Icon Perkawinan"
                          loading="lazy"
                          className="w-full"
                        />
                      </section>
                      <section className=" flex flex-col justify-center col-span-2">
                        <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                          {item.judul}
                        </h2>
                        <p className="text-start text-xl ms-10">
                          <span className="font-semibold">
                            {item?.jumlah || 0}
                          </span>{" "}
                          Jiwa
                        </p>
                      </section>
                    </section>
                  </Card>
                </>
              ))}
            </section>
          </section>

          <section className="mt-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Berdasarkan Agama
            </h1>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {agama.map((item, i) => (
                <div key={i}>
                  <Card className=" ">
                    <section className="grid grid-cols-3">
                      <section className="col-span-1">
                        <img
                          src={item.image}
                          alt="Icon Perkawinan"
                          loading="lazy"
                          className="w-full"
                        />
                      </section>
                      <section className=" flex flex-col justify-center col-span-2">
                        <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                          {item.judul}
                        </h2>
                        <p className="text-start text-xl ms-10">
                          <span className="font-semibold">{item.jumlah}</span>{" "}
                          Jiwa
                        </p>
                      </section>
                    </section>
                  </Card>
                </div>
              ))}
            </section>
          </section>

          <section className="my-28">
            <h1 className="font-bold text-3xl lg:text-4xl text-start">
              Pos Pelayanan Terpadu
            </h1>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {posyanduData.map((item, index) => (
                <div key={index}>
                  <Card className=" ">
                    <section className="grid grid-cols-3">
                      <section className="col-span-1">
                        <img
                          src={item.image}
                          alt="Icon Perkawinan"
                          loading="lazy"
                          className="transform scale-150"
                        />
                      </section>
                      <section className=" flex flex-col justify-center col-span-2">
                        <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                          {item.label}
                        </h2>
                        <p className="text-start text-xl ms-10">
                          <span className="font-semibold">
                            {item?.jumlah || 0}
                          </span>{" "}
                          Jiwa
                        </p>
                      </section>
                    </section>
                  </Card>
                </div>
              ))}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Penduduk;
