import { Modal, Table, TextInput } from "flowbite-react";
import { AccordionItem } from "./penduduk";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { IconEdit } from "@tabler/icons-react";
import { toast } from "react-toastify";

const DataUmur = () => {
  const [dataUmur, setDataUmur] = useState();
  const [isLoading, setIsLoading] = useState();

  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [currentValues, setCurrentValues] = useState({});
  const [idEdit, setIdEdit] = useState(0);

  async function getDataUmur() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/penduduk/umur");
      setDataUmur(res.data.umur);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataUmur();
  }, []);

  return (
    <AccordionItem title={"Data Umur"}>
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <Table>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Pendidikan</Table.HeadCell>
            <Table.HeadCell>Jumlah</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataUmur?.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </Table.Cell>
                <Table.Cell>{item.umur}</Table.Cell>
                <Table.Cell>{item.jumlah}</Table.Cell>
                <Table.Cell className="w-9">
                  <button
                  onClick={() => {
                    setOpenModal(true);
                    setEditTittle(item.umur);
                    setCurrentValues(item.jumlah);
                    setIdEdit(item.id);
                  }}
                  >
                    <IconEdit />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <ModalUmur
        currentValues={currentValues}
        tittle={editTittle}
        idEdit={idEdit}
        setOpenModal={setOpenModal}
        isOpen={isOpen}
        onAction={getDataUmur}
      />
    </AccordionItem>
  );
};

export default DataUmur;

const ModalUmur = ({
  isOpen,
  setOpenModal,
  tittle,
  currentValues,
  idEdit,
  onAction
}) => {
  const [editValues, setEditValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleEditUmur() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/penduduk/umur/update/${idEdit}`, {
        umur: tittle,
        jumlah: editValues,
      });
      setIsLoading(false);
      setOpenModal(false);
      onAction();
      toast.success("Berhasil Update Data Umur !!");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction();
      toast.error("Gagal Update Data Umur !!");
    }
  }

  useEffect(() => {
    setEditValues(currentValues);
  }, [isOpen]);
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>{tittle || ""} Tahun</Modal.Header>
      <Modal.Body>
        <div>
          <TextInput
            label="Jumlah Penduduk"
            placeholder={`Masukkan Jumlah ${tittle}`}
            type="number"
            size={"xl"}
            value={editValues}
            onChange={(e) => setEditValues(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleEditUmur()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading || !editValues ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={isLoading || !editValues}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
