import {
  Button,
  FileInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TextInput,
} from "flowbite-react";
import Admin from "../adminLayout";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { apbDesa } from "../../infografis/data/data";
import apiKarangrejo from "../../../lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const [title, setTitle] = useState("");

  async function getDataGaleri() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/galery");
      setIsLoading(false);
      setGaleri(res.data.galery);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataGaleri();
  }, []);
  return (
    <Admin>
      <div className="p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="w-2/5">
            <TextInput
              id="search"
              type="search"
              placeholder="Cari berita..."
              // values={search}
              // onChange={(e) => {
              //   setSearch(e.target.value);
              // }}
            />
          </div>

          <div>
            <button
              className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setOpenModal(true);
                setAction("add");
                setTitle("Menambahkan Galery");
              }}
            >
              <IconPlus />
              Tambah Galery
            </button>
          </div>
        </div>
        {isLoading ? (
          <section className="w-full min-h-[50vh] flex justify-center items-center bg-slate-100">
            <div>Loading.....</div>
          </section>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galeri.map((item, index) => (
              <div className="col-span-1 relative" key={index}>
                <img
                  src={import.meta.env.VITE_IMAGE_BASE + "/" + item?.image}
                  alt="Galeri Alt"
                  className="w-full h-[200px] lg:h-[280px] object-cover rounded-sm"
                />

                <button
                  className="absolute top-2 right-2 bg-red-400 text-white p-2 rounded-sm"
                  onClick={() => {
                    setOpenModal(true);
                    setAction("delete");
                    setTitle("Menghapus Galery");
                    setIdEdit(item.id);
                  }}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalGaleri
        isShow={openModal}
        setOpenModal={setOpenModal}
        action={action}
        title={title}
        idEdit={idEdit || ""}
        onAction={getDataGaleri}
      />
    </Admin>
  );
};

export default GaleriAdmin;

const ModalGaleri = ({
  isShow,
  setOpenModal,
  action,
  title,
  idEdit,
  onAction,
}) => {
  return (
    <Modal show={isShow} onClose={() => setOpenModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {action == "add" ? (
        <ModalAddGaleri setOpenModal={setOpenModal} onAction={onAction} />
      ) : action == "delete" ? (
        <ModalDeleteGalery
          idEdit={idEdit}
          onAction={onAction}
          setOpenModal={setOpenModal}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAddGaleri = ({ setOpenModal, onAction }) => {
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddGaleri() {
    const formData = new FormData();
    formData.append("image", image);
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post("/galery", formData);
      setOpenModal(false);
      setIsLoading(false);
      toast.success("Input Galery Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Input Galery Gagal !!");
      onAction();
    }
  }
  return (
    <>
      <ModalBody>
        <FileInput onChange={(e) => setImage(e.target.files[0])} />
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full"
          onClick={handleAddGaleri}
          disabled={!image || isLoading}
        >
          Upload
        </Button>
      </ModalFooter>
    </>
  );
};

const ModalDeleteGalery = ({ setOpenModal, idEdit, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteGaleri() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/galery?id=${idEdit}`);
      setOpenModal(false);
      setIsLoading(false);
      toast.success("Delete Galery Berhasil !!");
      onAction();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setOpenModal(false);
      toast.error("Delete Galery Gagal !!");
      onAction();
    }
  }
  return (
    <>
      <ModalBody className="text-3xl text-center">Hapus Data Galeri</ModalBody>
      <ModalFooter>
        <Button
          className="w-full bg-red-500"
          onClick={handleDeleteGaleri}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button
          className="w-full"
          onClick={() => setOpenModal(false)}
          disabled={isLoading}
        >
          Close
        </Button>
      </ModalFooter>
    </>
  );
};
