import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { jumlahPenduduk } from "../../infografis/data/data";
import { AccordionItem } from "./penduduk";
import { Button, Card, Modal, TextInput } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

const JumlahPenduduk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");

  const [dataPeduduk , setDataPenduduk] = useState({});
  
  async function getData() {
    setIsLoading(true);
    try {
      const res = await apiKarangrejo.get("/penduduk");

      setDataPenduduk(res.data.penduduk);

      jumlahPenduduk[0].number = res.data.penduduk.total_penduduk;
      jumlahPenduduk[1].number = res.data.penduduk.kepala_keluarga;
      jumlahPenduduk[2].number = res.data.penduduk.perempuan;
      jumlahPenduduk[3].number = res.data.penduduk.laki_laki;

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
  return (
    <AccordionItem title="Jumlah Penduduk">
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6">
          {jumlahPenduduk.map((item, i) => (
            <>
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
                        {item.title}
                      </h2>
                      <p className="text-start text-xl ms-10">
                        <span className="font-semibold">{item.number}</span>{" "}
                        Jiwa
                      </p>
                    </section>
                  </div>
                  <button
                    className="text-end"
                    onClick={() => {
                        setOpenModal(true)
                        setEditTittle(item.title)
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
      <ModalPenduduk isOpen={isOpen} setOpenModal={setOpenModal} tittle={editTittle}/>
    </AccordionItem>
  );
};

export default JumlahPenduduk;

const ModalPenduduk = ({ isOpen, setOpenModal, tittle , dataPeduduk }) => {
  const [dataPedudukEdit, setDataPendudukEdit] = useState({});

  useEffect(()=>{
    setDataPendudukEdit(dataPeduduk)
  },[dataPeduduk])
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""}</Modal.Header>
      <Modal.Body>
        <div>
            <TextInput label="Jumlah Penduduk" placeholder={`Masukkan Jumlah ${tittle}`} type="number" size={"xl"}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setOpenModal(false)} className="w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg">Update</button>
      </Modal.Footer>
    </Modal>
  );
};
