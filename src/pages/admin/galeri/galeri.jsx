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

const GaleriAdmin = () => {
  const [galeri, setGaleri] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const [title, setTitle] = useState("");

  async function getDataGaleri() {
    try {
      const res = await apiKarangrejo.get("/galery");
      setGaleri(res.data.galery);
    } catch (error) {
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
              Tambah Berita
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Gambar</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {galeri.map((item, i) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                >
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={import.meta.env.VITE_IMAGE_BASE + "/" + item?.image}
                      alt="Galeri Alt"
                      className="w-[200px]"
                    />
                  </Table.Cell>

                  <Table.Cell className="text-center w-10">
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setAction("delete");
                        setTitle("Hapus Galery");
                        setIdEdit(item?.id);
                      }}
                    >
                      <IconTrash />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
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
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
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
      onAction();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setOpenModal(false);
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
