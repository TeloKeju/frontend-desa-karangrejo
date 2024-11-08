import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import Admin from "../adminLayout";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import apiKarangrejo from "../../../lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DataUMKM = () => {
  const [dataUMKM, setDataUMKM] = useState([]);

  const [isOpen, setOpenModal] = useState(false);
  const [action, setAction] = useState("add");
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      setDataUMKM(res.data.umkm);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUMKM();
  }, []);
  return (
    <Admin>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <TextInput type="search" className="w-1/3" placeholder="Cari UMKM" />
          <button
            className="flex gap-2 justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setOpenModal(true);
              setAction("add");
              setTitle("Menambahkan Data UMKM");
            }}
          >
            <IconPlus /> Tambah Data UMKM
          </button>
        </div>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Contact</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataUMKM?.map((item, i) => (
              <Table.Row key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.rating}</Table.Cell>
                <Table.Cell>{item.contact}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell className="flex items-center gap-1">
                  <IconEdit />
                  <IconTrash />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <ModalUMKM
        isOpen={isOpen}
        setShowModal={setOpenModal}
        action={action}
        onAction={getDataUMKM}
        title={title}
      />
    </Admin>
  );
};

export default DataUMKM;

const ModalUMKM = ({ isOpen, setShowModal, title, action, onAction }) => {
  return (
    <Modal show={isOpen} onClose={() => setShowModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {action == "add" ? (
        <ModalAdd setShowModal={setShowModal} onAction={onAction} />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAdd = ({ setShowModal, onAction }) => {
  const [image, setImage] = useState();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState();
  const [contact, setContact] = useState();
  const [price, setPrice] = useState();

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddUMKM() {
    const formData = new FormData();

    formData.append("name", nama);
    formData.append("image", image);
    formData.append("description", deskripsi);
    formData.append("contact", "+62"+contact);
    formData.append("price", price);
    try {
      //   console.logf(formData);
      setIsLoading(true);
      const res = await apiKarangrejo.post("/umkm", formData);
      setIsLoading(false);
      setShowModal(false);
      toast.success("Input UMKM Berhasil !!");
      onAction();
    } catch (error) {
      setIsLoading(false);
      setShowModal(false);
      toast.error("Input UMKM Gagal !!");
      onAction();
      console.log(error);
    }
  }
  return (
    <>
      <ModalBody>
        <form className="space-y-3">
          <div>
            <Label>Gambar UMKM</Label>
            <FileInput
              placeholder="Masukkan Gambar"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <Label>Nama UMKM</Label>
            <TextInput
              placeholder="Masukkan Nama UMKM"
              type="text"
              required
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Textarea
              rows={6}
              placeholder="Masukkan Deskripsi UMKM"
              required
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <div className="flex items-center w-full">
              <span className="px-3 py-2 bg-gray-100 rounded-l-md outline-1 outline-black">+62</span>
              <input
                type="number"
                placeholder="Masukkan Contact UMKM"
                required
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-e-md px-3 py-2 outline-1 outline-slate-300"
              />
            </div>
          </div>
          <div>
            <Label>Price</Label>
            <TextInput
              type="number"
              placeholder="Masukkan Price UMKM"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          className={`w-full bg-blue-500 ${
            isLoading || !image || !nama || !deskripsi || !price || !contact
              ? "opacity-30 cursor-not-allowed "
              : ""
          }`}
          disabled={
            isLoading || !image || !nama || !deskripsi || !price || !contact
          }
          onClick={handleAddUMKM}
        >
          Tambah
        </Button>
      </ModalFooter>
    </>
  );
};
