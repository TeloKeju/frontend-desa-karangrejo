import { Card, Modal, TextInput } from "flowbite-react";
import { bansos } from "../infografis/data/data";
import Admin from "./adminLayout";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";
import { toast } from "react-toastify";

const BansosAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [slug, setSlug] = useState("");

  const [dataBansos, setDataBansos] = useState([]);
  const [displayBansos, setDisplayBansos] = useState([]);

  async function getDataBansos() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get(`/bansos`);
      setDataBansos(res.data.Bansos[0]);

      bansos[0].jumlah = res.data.Bansos[0].vaksin1;
      bansos[0].slug = "vaksin1";
      bansos[1].jumlah = res.data.Bansos[0].vaksin2;
      bansos[1].slug = "vaksin2";
      bansos[2].jumlah = res.data.Bansos[0].bnpt;
      bansos[2].slug = "bnpt";
      bansos[3].jumlah = res.data.Bansos[0].blt;
      bansos[3].slug = "blt";
      bansos[4].jumlah = res.data.Bansos[0].pkh;
      bansos[4].slug = "pkh";
      bansos[5].jumlah = res.data.Bansos[0].bst;
      bansos[5].slug = "bst";
      bansos[6].jumlah = res.data.Bansos[0].bantuanCaleg;
      bansos[6].slug = "bantuanCaleg";
      bansos[7].jumlah = res.data.Bansos[0].baznas;
      bansos[7].slug = "baznas";
      setDisplayBansos(bansos);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getDataBansos();
  }, []);

  return (
    <Admin>
      {isLoading ? (
        <section className="w-full h-[80vh] flex justify-center items-center">
          <section>
            <div
              className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </section>
        </section>
      ) : (
        <>
          <section className="grid sm:grid-cols-2 gap-3 m-3 ">
            {displayBansos.map((item) => (
              <>
                <Card className=" ">
                  <section className="grid grid-cols-5">
                    <section className="col-span-1">
                      <section>
                        <p className="text-4xl font-bold">{item.jumlah}</p>
                        <p className="text-xl font-semibold">{item.penduduk}</p>
                      </section>
                    </section>
                    <section className=" flex flex-col justify-center col-span-3">
                      <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                        {item.mendapat}
                      </h2>
                      <p className="text-start text-xl ms-10">
                        <span className="font-bold">{item.bantuan}</span>
                      </p>
                    </section>
                    <section className="col-span-1 flex flex-col justify-center items-end">
                      <IconEdit
                        onClick={() => {
                          setOpenModal(true);
                          setEditTittle("Mendapat " + item.bantuan);
                          setSlug(item.slug);
                        }}
                      />
                    </section>
                  </section>
                </Card>
              </>
            ))}
          </section>
          <ModalBansos
            isOpen={isOpen}
            setOpenModal={setOpenModal}
            tittle={editTittle}
            dataBansos={dataBansos}
            slug={slug}
            onAction={getDataBansos}
          />
        </>
      )}
    </Admin>
  );
};

export default BansosAdmin;

const ModalBansos = ({
  isOpen,
  setOpenModal,
  tittle,
  dataBansos,
  slug,
  onAction,
}) => {
  const [dataBansosEdit, setDataBansosEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/bansos/update/${dataBansosEdit.id}`,
        dataBansosEdit
      );
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Edit Data Bansos Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit Data Bansos Gagal !!");
      onAction();
    }
  }

  useEffect(() => {
    setDataBansosEdit(dataBansos);
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
            onChange={(e) => {
              setDataBansosEdit({
                ...dataBansosEdit,
                [slug]: e.target.value,
              });
            }}
            value={dataBansosEdit[slug]}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleUpdate()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading || dataBansosEdit[slug] == ""
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          disabled={isLoading || dataBansosEdit[slug] == ""}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
