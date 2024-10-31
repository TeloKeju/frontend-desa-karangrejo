import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { agama, jumlahPenduduk, perkawinan } from "../../infografis/data/data";
import { AccordionItem } from "./penduduk";
import { Card, Modal, TextInput } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

const DataAgama = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [idEdit, setIdEdit] = useState(0);
  const [currentValues, setCurrentValues] = useState({});

  async function getDataAgama() {
    setIsLoading(true);
    try {
      const res = await apiKarangrejo.get("/agama");
      
      res.data.agama.map((item, i) => {
        agama[i].id = item.id;
        agama[i].judul = item.nama_agama;
        agama[i].jumlah = item.jumlah_penganut;
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getDataAgama();
  }, []);
  return (
    <AccordionItem title={"Berdasarkan Agama"}>
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6">
          {agama.map((item, i) => (
            <Card className="" key={i}>
              <section className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <section className="">
                    <img
                      src={item.image}
                      alt="Icon Penduduk"
                      loading="lazy"
                      className="w-20"
                    />
                  </section>
                  <section className="flex flex-col justify-center">
                    <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                      {item.judul}
                    </h2>
                    <p className="text-start text-xl ms-10">
                      <span className="font-semibold">{item.jumlah}</span> Jiwa
                    </p>
                  </section>
                </div>
                <button
                  className="text-end"
                  onClick={() => {
                    setOpenModal(true);
                    setEditTittle(item.judul);
                    setIdEdit(item.id);
                    setCurrentValues(item.jumlah);
                  }}
                >
                  <IconEdit className="w-6 h-6 text-reg-300" />
                </button>
              </section>
            </Card>
          ))}
        </section>
      )}
      <ModalAgama
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        currentValus={currentValues}
        idEdit={idEdit}
      />
    </AccordionItem>
  );
};

export default DataAgama;

const ModalAgama = ({ isOpen, setOpenModal, tittle, idEdit, currentValus }) => {
  const [editValus, setEditValus] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function updateDataAgama() {
    setIsLoading(true)
    try {
      const res = await apiKarangrejo.post(`agama/update/${idEdit}`,{
        nama_agama : tittle,
        jumlah : editValus
      })

      setIsLoading(false)
      setOpenModal(false)
      alert("update data agama")

    } catch (error) {
      setIsLoading(false)
      setOpenModal(false)
      console.log(error);
      
    }
  }

  useEffect(() => {
    setEditValus(currentValus)
  },[currentValus])

  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""}</Modal.Header>
      <Modal.Body>
        <div>
          <TextInput
            label="Jumlah Penduduk"
            placeholder={`Masukkan jumlah penganut ${tittle.toLowerCase()}`}
            type="number"
            size={"xl"}
            value={editValus}
            onChange={(e) => setEditValus(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => updateDataAgama()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
