import { Card, Modal, TextInput } from "flowbite-react";
import { AccordionItem } from "./penduduk";
import { posyanduData } from "../../infografis/data/data";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";

const DataPosyandu = () => {
  // posyandu data state
  const [originalPosyanduData, setOriginalPosyanduData] = useState();
  // posyandu data state
  //   console.log(originalPosyanduData);

  const [isLoading, setIsLoading] = useState(false);
  //   modal state
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [slug, setSlug] = useState("");
  //   modal state

  //   handle get data posyandu
  async function getDataPosyandu() {
    try {
      const res = await apiKarangrejo.get(`/posyandu`);

      setOriginalPosyanduData(res.data.data);

      posyanduData.forEach((item) => {
        item.jumlah = res?.data?.data?.[item.key];
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataPosyandu();
  }, []);
  //   handle get data posyandu

  return (
    <AccordionItem title="Data Posyandu">
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6">
          {posyanduData.map((item, i) => (
            <>
              <Card className="" key={i}>
                <section className="flex gap-2 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <section className="">
                      <img
                        src={item.image}
                        alt="Icon Penduduk"
                        loading="lazy"
                        className="w-20 transform scale-150"
                      />
                    </section>
                    <section className="flex flex-col justify-center">
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
                  </div>
                  <button
                    className="text-end"
                    onClick={() => {
                      setOpenModal(true);
                      setEditTittle(item.label);
                      setSlug(item.key);
                    }}
                  >
                    <IconEdit className="w-6 h-6 text-reg-300" />
                  </button>
                </section>
              </Card>
            </>
          ))}
        </section>
      )}
      <ModalPosyandu
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        dataPosyandu={originalPosyanduData || {}}
        slug={slug}
        onAction={getDataPosyandu}
      />
    </AccordionItem>
  );
};

export default DataPosyandu;

const ModalPosyandu = ({
  isOpen,
  setOpenModal,
  tittle,
  dataPosyandu,
  slug,
  onAction,
}) => {
  const [dataPosyanduUpdate, setDataPosyanduUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdatePosyanduData() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/posyandu/update/${dataPosyandu?.id}`,
        dataPosyanduUpdate
      );
      if (res.data.data) {
        setOpenModal(false);
        onAction();
        alert("berhasil mengupdate data posyadu");
      }
    } catch (error) {
      alert("Gagal mengupdate data posyadu");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setDataPosyanduUpdate(dataPosyandu);
  }, [isOpen]);
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""}</Modal.Header>
      <Modal.Body>
        <div className="flex gap-2 items-center">
          <TextInput
            label="Jumlah Penduduk"
            placeholder={`Masukkan Jumlah ${tittle}`}
            type="number"
            size={"xl"}
            onChange={(e) => {
              setDataPosyanduUpdate({
                ...dataPosyanduUpdate,
                [slug]: e.target.value,
              });
            }}
            value={dataPosyanduUpdate?.[slug]}
            className="w-4/5"
          />
          <label htmlFor="" className="text-xl text-center w-1/5">
            Jiwa
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleUpdatePosyanduData()}
          className={`w-full rounded-md flex justify-center  px-4 py-5 text-white text-lg ${
            isLoading ||
            (dataPosyanduUpdate?.[slug] == ""
              ? "bg-blue-100 cursor-not-allowed"
              : "bg-blue-600")
          }`}
          disabled={isLoading || dataPosyanduUpdate?.[slug] == ""}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
