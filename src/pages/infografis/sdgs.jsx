import { IconSearch } from "@tabler/icons-react";
import { bansos, sdgs } from "./data/data";
import InfografisLink from "./link";

import { Card, TextInput, Label } from "flowbite-react";
import apiKarangrejo from "../../lib/axios";
import { useEffect, useState } from "react";

const SDGs = () => {

  const [dataSDGs ,setDataSDGs] = useState([])

  async function getDataSDGs() {
    try {
      const response = await apiKarangrejo.get("/sdgs");

      sdgs[0].nilai = response.data.SDGs[0].skorSDGsDesa;
      sdgs[0].slug = "skorSDGsDesa";
      sdgs[1].nilai = response.data.SDGs[0].desaTanpaKemiskinan;
      sdgs[1].slug = "desaTanpaKemiskinan";
      sdgs[2].nilai = response.data.SDGs[0].desaTanpaKelaparan;
      sdgs[2].slug = "desaTanpaKelaparan";
      sdgs[3].nilai = response.data.SDGs[0].desaSehatDanSejahtera;
      sdgs[3].slug = "desaSehatDanSejahtera";
      sdgs[4].nilai = response.data.SDGs[0].pendidikanDesaBerkualitas;
      sdgs[4].slug = "pendidikanDesaBerkualitas";
      sdgs[5].nilai = response.data.SDGs[0].keterlibatanPerempuanDesa;
      sdgs[5].slug = "keterlibatanPerempuanDesa";
      sdgs[6].nilai = response.data.SDGs[0].desaLayakAirBersihDanSanitasi;
      sdgs[6].slug = "desaLayakAirBersihDanSanitasi";
      sdgs[7].nilai = response.data.SDGs[0].desaBerenergiBersihDanTerbarukan;
      sdgs[7].slug = "desaBerenergiBersihDanTerbarukan";
      sdgs[8].nilai = response.data.SDGs[0].pertumbuhanEkonomiDesaMerata;
      sdgs[8].slug = "pertumbuhanEkonomiDesaMerata";
      sdgs[9].nilai =
        response.data.SDGs[0].infrastrukturDanInovasiDesaSesuaiKebutuhan;
      sdgs[9].slug = "infrastrukturDanInovasiDesaSesuaiKebutuhan";
      sdgs[10].nilai = response.data.SDGs[0].desaTanpaKesenjangan;
      sdgs[10].slug = "desaTanpaKesenjangan";
      sdgs[11].nilai = response.data.SDGs[0].kawasanPemukimanDesaAmanDanNyaman;
      sdgs[11].slug = "kawasanPemukimanDesaAmanDanNyaman";
      sdgs[12].nilai =
        response.data.SDGs[0].konsumsiDanProduksiDesaSadarLingkungan;
      sdgs[12].slug = "konsumsiDanProduksiDesaSadarLingkungan";
      sdgs[13].nilai = response.data.SDGs[0].desaTanggapPerubahanIklim;
      sdgs[13].slug = "desaTanggapPerubahanIklim";
      sdgs[14].nilai = response.data.SDGs[0].desaPeduliLingkunganLaut;
      sdgs[14].slug = "desaPeduliLingkunganLaut";
      sdgs[15].nilai = response.data.SDGs[0].desaPeduliLingkunganDarat;
      sdgs[15].slug = "desaPeduliLingkunganDarat";
      sdgs[16].nilai = response.data.SDGs[0].desaDamaiBerkeadilan;
      sdgs[16].slug = "desaDamaiBerkeadilan";
      sdgs[17].nilai = response.data.SDGs[0].kemitraanUntukPembangunanDesa;
      sdgs[17].slug = "kemitraanUntukPembangunanDesa";
      sdgs[18].nilai =
        response.data.SDGs[0].kelembagaanDesaDinamisDanBudayaDesaAdaptif;
      sdgs[18].slug = "kelembagaanDesaDinamisDanBudayaDesaAdaptif";

      setDataSDGs(sdgs)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataSDGs();
  }, []);

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
