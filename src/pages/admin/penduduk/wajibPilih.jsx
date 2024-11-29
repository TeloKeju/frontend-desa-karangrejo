import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { AccordionItem } from "./penduduk";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiKarangrejo from "../../../lib/axios";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

const WajibPilihAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wajibPilih, setWajibPilih] = useState([]);

  const [isOpen, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [action, setAction] = useState("");

  async function getDataWajibPilih(s) {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get(`/wajibpilih`);

      setWajibPilih(res.data.wajib_pilih);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataWajibPilih();
  }, []);

  return (
    <AccordionItem title={"Wajib Pilih"}>
      <section>
        <Table>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Tahun</Table.HeadCell>
            <Table.HeadCell>Jumlah</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {wajibPilih.map((item, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.wajib_pilih}</Table.Cell>
                <Table.Cell className="flex gap-1">
                  <IconEdit
                    onClick={() => {
                      setOpenModal(true);
                      setDataEdit(item);
                      setAction("edit");
                    }}
                  />
                  <IconTrash
                    onClick={() => {
                      setOpenModal(true);
                      setDataEdit(item);
                      setAction("delete");
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
      <div className="flex justify-end mt-8">
        <button
          onClick={() => {
            setOpenModal(true);
            setAction("add");
          }}
          className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <IconPlus />
          Tambah Data
        </button>
      </div>
      <ModalWajibPilih
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        dataEdit={dataEdit}
        action={action}
        onAction={getDataWajibPilih}
      />
    </AccordionItem>
  );
};

export default WajibPilihAdmin;

const ModalWajibPilih = ({
  isOpen,
  setOpenModal,
  dataEdit,
  onAction,
  action,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        {action == "add"
          ? "Tambah Wajib Pilih"
          : action == "edit"
          ? "Edit Wajib Pilih"
          : "Hapus Wajib Pilih"}
      </Modal.Header>
      {action == "add" ? (
        <ModalAddWajibPilih setOpenModal={setOpenModal} onAction={onAction} />
      ) : action == "delete" ? (
        <ModalDeleteWajibPilih
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : action == "edit" ? (
        <ModalEditWajibPilih
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAddWajibPilih = ({ setOpenModal, onAction }) => {
  const [tahun, setTahun] = useState("");
  const [jumlah, setJumlah] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function addWajibPilih(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/wajibpilih`, {
        id: tahun,
        wajib_pilih: jumlah,
      });
      setIsLoading(false);
      toast.success("Tambah Wajib Pilih Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Tambah Wajib Pilih Gagal !!");
      onAction();
    }
    setOpenModal(false);
  }
  return (
    <>
      <Modal.Body>
        <form className="space-y-6" onSubmit={addWajibPilih}>
          <div>
            <Label htmlFor="tahun">Tahun</Label>
            <TextInput
              id="tahun"
              type="text"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              required={true}
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tahun">Jumlah</Label>
            <TextInput
              id="jumlah"
              type="number"
              placeholder="1000"
              required={true}
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>
          <button
            type="submit"
            id="submitWajibPilih"
            className="d-none"
          ></button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={`w-full bg-blue-500 py-3 ${
            isLoading || !tahun || !jumlah ? "opacity-50" : ""
          }`}
          disabled={isLoading || !tahun || !jumlah}
          onClick={() => document.getElementById("submitWajibPilih").click()}
        >
          Tambah
        </Button>
      </Modal.Footer>
    </>
  );
};

const ModalDeleteWajibPilih = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteWajibPilih() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/wajibpilih?id=${dataEdit.id}`);
      setIsLoading(false);
      onAction();
      toast.success("Hapus Wajib Pilih Berhasil !!");
    } catch (error) {
      setIsLoading(false);
      onAction();
      toast.error("Hapus Wajib Pilih Gagal !!");
    }
    setOpenModal(false);
  }

  return (
    <>
      <Modal.Body className="text-center text-2xl">
        Menghapus data wajib pilih !!
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleDeleteWajibPilih()}
          className={`w-full rounded-md flex justify-center bg-red-600 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Hapus
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Batal
        </button>
      </Modal.Footer>
    </>
  );
};

const ModalEditWajibPilih = ({ dataEdit, setOpenModal, onAction }) => {
  const [tahun, setTahun] = useState(dataEdit.id);
  const [jumlah, setJumlah] = useState(dataEdit.wajib_pilih);

  const [isLoading, setIsLoading] = useState(false);

  async function editWajibPilih(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/wajibpilih/update/${dataEdit.id}`,
        {
          id: tahun,
          wajib_pilih: jumlah,
        }
      );
      setIsLoading(false);
      toast.success("Edit Wajib Pilih Berhasil !!");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Edit Wajib Pilih Gagal !!");
      onAction();
    }
    setOpenModal(false);
  }
  return (
    <>
      <Modal.Body>
        <form className="space-y-6" onSubmit={editWajibPilih}>
          <div>
            <Label htmlFor="tahun">Tahun</Label>
            <TextInput
              id="tahun"
              type="text"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              required={true}
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tahun">Jumlah</Label>
            <TextInput
              id="jumlah"
              type="number"
              placeholder="1000"
              required={true}
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>
          <button
            type="submit"
            id="submitWajibPilih"
            className="d-none"
          ></button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={`w-full bg-blue-500 py-3 ${
            isLoading || !tahun || !jumlah ? "opacity-50" : ""
          }`}
          disabled={isLoading || !tahun || !jumlah}
          onClick={() => document.getElementById("submitWajibPilih").click()}
        >
          Edit
        </Button>
      </Modal.Footer>
    </>
  );
};
