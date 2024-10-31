import { Label, Modal, Table, TextInput } from "flowbite-react";
import { AccordionItem } from "./penduduk";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";

const DataPekerjaan = () => {
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [action, setAction] = useState("");

  async function getDataPekerjaan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/pekerjaan");

      setDataPekerjaan(res.data.pekerjaan);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataPekerjaan();
  }, []);
  return (
    <AccordionItem title={"Berdasarkan Pekerjaan"}>
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="">
            <Table.Head className="">
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Pekerjaan</Table.HeadCell>
              <Table.HeadCell>Jumlah</Table.HeadCell>
              <Table.HeadCell className=""></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dataPekerjaan?.map((item, i) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell>{item.pekerjaan}</Table.Cell>
                  <Table.Cell>{item.jumlah}</Table.Cell>
                  <Table.Cell className="lg:max-w-10 flex gap-1">
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setDataEdit(item);
                        setAction("edit");
                      }}
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setDataEdit(item);
                        setAction("delete");
                      }}
                    >
                      <IconTrash />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
        </div>
      )}
      <ModalPekerjaan
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        dataEdit={dataEdit}
        action={action}
        onAction={getDataPekerjaan}
      />
    </AccordionItem>
  );
};

export default DataPekerjaan;

const ModalPekerjaan = ({
  isOpen,
  setOpenModal,
  dataEdit,
  onAction,
  action,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      {action === "edit" ? (
        <ModalEditPekerjaan
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : action === "delete" ? (
        <ModalDeletePekerjaan
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : (
        <ModalAddPekerjaan setOpenModal={setOpenModal} onAction={onAction} />
      )}
    </Modal>
  );
};

const ModalEditPekerjaan = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataEditValues, setDataEditValues] = useState(dataEdit);

  async function handleEditPekerjaan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/pekerjaan/update/${dataEdit.id}`, {
        pekerjaan: dataEditValues.pekerjaan,
        jumlah: dataEditValues.jumlah,
      });

      setIsLoading(false);
      setOpenModal(false);
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction();
    }
  }

  useEffect(() => {
    setDataEditValues(dataEdit);
  }, [dataEdit]);

  return (
    <>
      <Modal.Header>Edit Pekerjaan</Modal.Header>
      <Modal.Body>
        <div>
          <Label>Nama Pekerjaan</Label>
          <TextInput
            placeholder={`Masukkan Pekerjaan`}
            type="text"
            size={"xl"}
            value={dataEditValues.pekerjaan}
            onChange={(e) => {
              setDataEditValues({
                ...dataEditValues,
                pekerjaan: e.target.value,
              });
            }}
          />
          <br />
          <Label>Jumlah Pekerja</Label>
          <TextInput
            placeholder={`Masukkan Jumlah Pekerja`}
            type="number"
            size={"xl"}
            value={dataEditValues.jumlah}
            onChange={(e) => {
              setDataEditValues({
                ...dataEditValues,
                jumlah: e.target.value,
              });
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleEditPekerjaan()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Update
        </button>
      </Modal.Footer>
    </>
  );
};

const ModalAddPekerjaan = ({ setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAdd, setDataAdd] = useState({
    pekerjan: "",
    jumlah: "",
  });

  async function handleAddPekerjaan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/pekerjaan`, {
        pekerjaan: dataAdd.pekerjaan,
        jumlah: dataAdd.jumlah,
      });

      setIsLoading(false);
      setOpenModal(false);
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
      <Modal.Header>Tambah Pekerjaan</Modal.Header>
      <Modal.Body>
        <div>
          <Label>Pekerjaan</Label>
          <TextInput
            placeholder={`Masukkan Pekerjaan`}
            type="text"
            size={"xl"}
            value={dataAdd.pekerjaan}
            onChange={(e) => {
              setDataAdd({
                ...dataAdd,
                pekerjaan: e.target.value,
              });
            }}
          />
          <br />
          <Label>Jumlah Pekerja</Label>
          <TextInput
            placeholder={`Masukkan Jumlah Pekerja`}
            type="number"
            size={"xl"}
            value={dataAdd.jumlah}
            onChange={(e) => {
              setDataAdd({
                ...dataAdd,
                jumlah: e.target.value,
              });
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleAddPekerjaan()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Tambah
        </button>
      </Modal.Footer>
    </>
  );
};

const ModalDeletePekerjaan = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete(params) {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/pekerjaan`, {
        id: dataEdit.id,
      });

      setIsLoading(false);
      setOpenModal(false);
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction;
    }
  }
  return (
    <>
      <Modal.Header>Hapus Pekerjaan</Modal.Header>
      <Modal.Body className="text-center text-2xl">
        Menghapus data pekerjaan {dataEdit.pekerjaan} !!
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleDelete()}
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
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Batal
        </button>
      </Modal.Footer>
    </>
  );
};
