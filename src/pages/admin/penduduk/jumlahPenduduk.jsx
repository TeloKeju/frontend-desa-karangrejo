/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { jumlahPenduduk } from "../../infografis/data/data";
import { AccordionItem } from "./penduduk";
import { Card, Modal, TextInput } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";
import { toast } from "react-toastify";

const JumlahPenduduk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [slug, setSlug] = useState("");

  const [dataPeduduk, setDataPenduduk] = useState({});

  async function getData() {
    setIsLoading(true);
    try {
      const res = await apiKarangrejo.get("/penduduk");

      setDataPenduduk(res.data.penduduk);

      jumlahPenduduk[0] = {
        ...jumlahPenduduk[0],
        number: res.data.penduduk.total_penduduk,
        slug: "total_penduduk",
      };

      jumlahPenduduk[1] = {
        ...jumlahPenduduk[1],
        number: res.data.penduduk.kepala_keluarga,
        slug: "kepala_keluarga",
      };

      jumlahPenduduk[2] = {
        ...jumlahPenduduk[2],
        number: res.data.penduduk.perempuan,
        slug: "perempuan",
      };

      jumlahPenduduk[3] = {
        ...jumlahPenduduk[3],
        number: res.data.penduduk.laki_laki,
        slug: "laki_laki",
      };

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
    <AccordionItem title="Data Jumlah Penduduk">
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
                      setOpenModal(true);
                      setEditTittle(item.title);
                      setSlug(item.slug);
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
      <ModalPenduduk
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        dataPeduduk={dataPeduduk}
        slug={slug}
        onAction={getData}
      />
    </AccordionItem>
  );
};

export default JumlahPenduduk;

const ModalPenduduk = ({
  isOpen,
  setOpenModal,
  tittle,
  dataPeduduk,
  slug,
  onAction,
}) => {
  const [dataPedudukEdit, setDataPendudukEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/penduduk/update/${dataPedudukEdit.id}`,
        dataPedudukEdit
      );
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Edit Jumlah Penduduk Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit Jumlah Penduduk Gagal !!");
      onAction();
    }
  }

  useEffect(() => {
    setDataPendudukEdit(dataPeduduk);
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
              setDataPendudukEdit({
                ...dataPedudukEdit,
                [slug]: e.target.value,
              })
            }
            value={dataPedudukEdit[slug]}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleUpdate()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ||
            !dataPedudukEdit.total_penduduk ||
            !dataPedudukEdit.kepala_keluarga ||
            !dataPedudukEdit.perempuan ||
            !dataPedudukEdit.laki_laki
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          disabled={
            isLoading ||
            !dataPedudukEdit.total_penduduk ||
            !dataPedudukEdit.kepala_keluarga ||
            !dataPedudukEdit.perempuan ||
            !dataPedudukEdit.laki_laki
          }
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
