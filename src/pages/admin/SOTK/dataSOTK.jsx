import {
  Button,
  Card,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import Admin from "../adminLayout";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import apiKarangrejo from "../../../lib/axios";
import { useEffect, useState } from "react";
// import { sotk } from "../../data/data";

const DataSOTK = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");

  const [sotk, setSotk] = useState([]);

  async function getDataSOTK() {
    try {
      const res = await apiKarangrejo.get("/sotk");
      setSotk(res.data.sotk);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataSOTK();
  }, []);
  return (
    <Admin>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl lg:text-3xl text-start">
            Data SOTK
          </h1>
          <button
            className="leading-normal flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setAction("tambah");
              setShowModal(true);
              setTitle("Tambah Data SOTK");
            }}
          >
            <IconPlus />
            Tambah Data SOTK
          </button>
        </div>
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {sotk.map((item, i) => {
            return (
              <>
                <section className="flex justify-center relative" key={i}>
                  <Card
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    renderImage={() => {
                      return (
                        <div className="flex justify-center items-center relative w-full">
                          <img
                            className="h-[300px] w-[400px] object-cover"
                            src={
                              import.meta.env.VITE_IMAGE_BASE + "/" + item.image
                            }
                            alt=""
                          />
                          <div className="absolute flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-s-lg right-0 bottom-0">
                            <IconTrash
                              onClick={() => {
                                setShowModal(true);
                                setAction("hapus");
                                setDataEdit(item);
                                setTitle("Hapus Data SOTK");
                              }}
                            />
                            <IconEdit
                              onClick={() => {
                                setShowModal(true);
                                setDataEdit(item);
                                setTitle("Edit Data SOTK");
                                setAction("edit");
                              }}
                            />
                          </div>
                        </div>
                      );
                    }}
                  >
                    <h5 className="text-base md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.nama}
                    </h5>
                    <p className="text-sm md:text-base font-normal text-gray-700 dark:text-gray-400">
                      {item.jabatan}
                    </p>
                  </Card>
                </section>
              </>
            );
          })}
        </section>
      </div>
      <ModalSOTK
        title={title}
        action={action}
        isOpen={showModal}
        setOpenModal={setShowModal}
        onAction={getDataSOTK}
        dataEdit={dataEdit}
      />
    </Admin>
  );
};

export default DataSOTK;

const ModalSOTK = ({
  title,
  action,
  isOpen,
  setOpenModal,
  onAction,
  dataEdit,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {action == "tambah" ? (
        <ModalAddSOTK setOpenModal={setOpenModal} onAction={onAction} />
      ) : action == "hapus" ? (
        <ModalDeleteSOTK
          onAction={onAction}
          setOpenModal={setOpenModal}
          dataEdit={dataEdit}
        />
      ) : action == "edit" ? (
        <ModalEditSOTK
          onAction={onAction}
          setOpenModal={setOpenModal}
          dataEdit={dataEdit}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAddSOTK = ({ setOpenModal, onAction }) => {
  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddSOTK() {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);

    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post("/sotk", formData);
      setOpenModal(false);
      setIsLoading(false);
      onAction();
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      onAction();
      console.log(error);
    }
  }
  return (
    <>
      <ModalBody>
        <form>
          <div>
            <FileInput onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="jabatan">Jabatan</Label>
            <TextInput
              id="jabatan"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setJabatan(e.target.value)}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          className={`w-full bg-blue-500 ${
            isLoading || !image || !nama || !jabatan
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          disabled={isLoading || !image || !nama || !jabatan}
          onClick={handleAddSOTK}
        >
          Save
        </Button>
        {/* <Button className="w-full bg-red-500">Cancel</Button> */}
      </ModalFooter>
    </>
  );
};

const ModalEditSOTK = ({ setOpenModal, onAction, dataEdit }) => {
  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");

  useEffect(() => {
    if (dataEdit) {
      setImage(dataEdit.image);
      setNama(dataEdit.nama);
      setJabatan(dataEdit.jabatan);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditSOTK() {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);

    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post("/sotk", formData);
      setOpenModal(false);
      setIsLoading(false);
      onAction();
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      onAction();
      console.log(error);
    }
  }
  return (
    <>
      <ModalBody>
        <form>
          <div>
            <FileInput onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setNama(e.target.value)}
              value={nama}
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="jabatan">Jabatan</Label>
            <TextInput
              id="jabatan"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setJabatan(e.target.value)}
              value={jabatan}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          className={`w-full bg-blue-500 ${
            isLoading || !image || !nama || !jabatan
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
          disabled={isLoading || !image || !nama || !jabatan}
          onClick={handleEditSOTK}
        >
          Save
        </Button>
        {/* <Button className="w-full bg-red-500">Cancel</Button> */}
      </ModalFooter>
    </>
  );
};

const ModalDeleteSOTK = ({ setOpenModal, onAction, dataEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeleteSotk() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/sotk?id=${dataEdit.id}`);
      setOpenModal(false);
      onAction();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      onAction();
      console.log(error);
    }
  }
  return (
    <>
      <ModalBody>
        <h1 className="text-center">
          Apakah Anda Yakin Mau Menghapus Data Ini !!
        </h1>
      </ModalBody>
      <ModalFooter>
        <Button className="w-full bg-red-500" onClick={handleDeleteSotk}>
          Hapus
        </Button>
        <Button
          className="w-full bg-blue-500"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};
