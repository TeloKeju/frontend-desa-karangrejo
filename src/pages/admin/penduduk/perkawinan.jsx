import { Card, Modal, TextInput } from "flowbite-react";
import { perkawinan } from "../../infografis/data/data";
import { AccordionItem } from "./penduduk";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { toast } from "react-toastify";

const DataPerkawinan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [slug, setSlug] = useState("");

  const [dataPerkawinan, setDataPerkawinan] = useState({});

  async function getData() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/perkawinan");

      setDataPerkawinan(res.data.perkawinan[0]);

      perkawinan[0] = {
        ...perkawinan[0],
        jumlah: res.data.perkawinan[0].belum_kawin,
        slug: "belum_kawin",
      };
      perkawinan[1] = {
        ...perkawinan[1],
        jumlah: res.data.perkawinan[0].kawin,
        slug: "kawin",
      };
      perkawinan[2] = {
        ...perkawinan[2],
        jumlah: res.data.perkawinan[0].cerai_mati,
        slug: "cerai_mati",
      };
      perkawinan[3] = {
        ...perkawinan[3],
        jumlah: res.data.perkawinan[0].cerai_hidup,
        slug: "cerai_hidup",
      };

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <AccordionItem title={"Data Perkawinan"}>
      {isLoading ? (
        <section className="flex items-center justify-center min-h-[30vh]">
          <p>Loading</p>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 mt-3">
          {perkawinan.map((item) => (
            <>
              <Card>
                <div className="flex gap-2 items-center justify-between">
                  <section className="grid grid-cols-3">
                    <section className="col-span-1">
                      <img
                        src={item.image}
                        alt="Icon Perkawinan"
                        loading="lazy"
                        className="w-20 h-20"
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
                  <section>
                    <IconEdit
                      onClick={() => {
                        setEditTittle(item.judul);
                        setSlug(item.slug);
                        setOpenModal(true);
                      }}
                    />
                  </section>
                </div>
              </Card>
            </>
          ))}
        </section>
      )}
      <ModalPerkawinan
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        dataPerkawinan={dataPerkawinan}
        slug={slug}
        onAction={getData}
      />
    </AccordionItem>
  );
};

export default DataPerkawinan;

const ModalPerkawinan = ({
  isOpen,
  setOpenModal,
  tittle,
  dataPerkawinan,
  slug,
  onAction,
}) => {
  const [dataPerkawinanEdit, setDataPerkawinanEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate() {
    try {
      setIsLoading(true);
      //   console.log(dataPerkawinanEdit)
      const res = await apiKarangrejo.post(
        `/perkawinan/update/${dataPerkawinanEdit.id}`,
        dataPerkawinanEdit
      );
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Edit Jumlah Perkawinan Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit Jumlah Perkawinan Gagal !!");
      onAction();
    }
  }

  useEffect(() => {
    setDataPerkawinanEdit(dataPerkawinan);
  }, [isOpen]);
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""}</Modal.Header>
      <Modal.Body>
        <div>
          <TextInput
            label="Jumlah Perkawinan"
            placeholder={`Masukkan Jumlah ${tittle}`}
            type="number"
            size={"xl"}
            onChange={(e) =>
              setDataPerkawinanEdit({
                ...dataPerkawinanEdit,
                [slug]: e.target.value,
              })
            }
            value={dataPerkawinanEdit[slug]}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleUpdate()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ||
            !dataPerkawinanEdit.belum_kawin ||
            !dataPerkawinanEdit.kawin ||
            !dataPerkawinanEdit.cerai_hidup ||
            !dataPerkawinanEdit.cerai_mati
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          disabled={
            isLoading ||
            !dataPerkawinanEdit.belum_kawin ||
            !dataPerkawinanEdit.kawin ||
            !dataPerkawinanEdit.cerai_hidup ||
            !dataPerkawinanEdit.cerai_mati
          }
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
