import Admin from "./adminLayout";
import { Card, Modal, TextInput } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

import { sdgs } from "../infografis/data/data";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";
import { toast } from "react-toastify";

const SDGsAdmin = () => {
  const [dataSDGs, setDataSDGs] = useState({});
  const [displaySDGs , setDisplaySDGs] = useState([]);

  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [slug, setSlug] = useState("");

  async function getDataSDGs() {
    try {
      const response = await apiKarangrejo.get("/sdgs");
      setDataSDGs(response.data.SDGs[0]);

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

      setDisplaySDGs(sdgs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataSDGs();
  }, []);

  return (
    <Admin>
      <section className="p-5">
        {displaySDGs?.map((item, i) => {
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
                      <IconEdit
                        className="w-6 h-6 text-reg-300"
                        onClick={() => {
                          setOpenModal(true);
                          setEditTittle(item.judul);
                          setSlug(item.slug);
                        }}
                      />
                    </button>
                  </div>
                </Card>
              </>
            );
          }
        })}

        <section className="mt-10 grid grid-cols-1 gap-3  md:grid-cols-2 xl:grid-cols-3">
          {displaySDGs?.map((item, i) => {
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
                        <IconEdit
                          className="w-6 h-6 text-reg-300"
                          onClick={() => {
                            setOpenModal(true);
                            setEditTittle(item.judul);
                            setSlug(item.slug);
                          }}
                        />
                      </button>
                    </section>
                  </section>
                </Card>
              );
            }
          })}
        </section>
      </section>
      <ModalSDGs
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        dataSDGs={dataSDGs}
        slug={slug || ""}
        onAction={getDataSDGs}
      />
    </Admin>
  );
};

export default SDGsAdmin;

const ModalSDGs = ({
  isOpen,
  setOpenModal,
  tittle,
  dataSDGs,
  slug,
  onAction,
}) => {
  const [dataSDGsEdit, setDataSDGsEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateSDGs() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/sdgs/update/${dataSDGsEdit.id}`,
        dataSDGsEdit
      );
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Edit Nilai SGDs Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit Nilai SGDs Gagal !!");
      onAction();
    }
  }

  useEffect(() => {
    setDataSDGsEdit(dataSDGs);
  }, [isOpen]);
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""}</Modal.Header>
      <Modal.Body>
        <div>
          <TextInput
            label="Jumlah Penduduk"
            placeholder={`Masukkan Jumlah ${tittle}`}
            type="number"
            size={"xl"}
            onChange={(e) =>
              setDataSDGsEdit({
                ...dataSDGsEdit,
                [slug]: e.target.value,
              })
            }
            value={slug == "" ? "" : dataSDGsEdit[slug]}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleUpdateSDGs()}
          className={`w-full rounded-md flex justify-center bg-blue-500 px-4 py-5 text-white text-lg ${
            isLoading || dataSDGsEdit[slug] == "" ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={isLoading || dataSDGsEdit[slug] == ""}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
