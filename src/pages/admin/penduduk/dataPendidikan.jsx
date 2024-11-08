import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { jumlahPenduduk, perkawinan } from "../../infografis/data/data";
import { AccordionItem } from "./penduduk";
import { Card, Modal, TextInput } from "flowbite-react";
import { IconEdit } from "@tabler/icons-react";

import { Table } from "flowbite-react";
import { toast } from "react-toastify";

const DataPendidikanAdmin = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setOpenModal] = useState(false);
  const [editTittle, setEditTittle] = useState("");
  const [currentValues, setCurrentValues] = useState({});
  const [idEdit, setIdEdit] = useState(0);

  async function getDataPendidikan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/penduduk/pendidikan");
      if (res.data) {
        setPendidikan(res.data.pendidikan);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataPendidikan();
  }, []);
  return (
    <AccordionItem title={"Berdasarkan Pendidikan"}>
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
            {pendidikan.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </Table.Cell>
                <Table.Cell>{item.jenis_pendidikan}</Table.Cell>
                <Table.Cell>{item.jumlah}</Table.Cell>
                <Table.Cell className="w-9">
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setEditTittle(item.jenis_pendidikan);
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
      <ModalPendidikan
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        tittle={editTittle}
        currentValues={currentValues}
        idEdit={idEdit}
        getDataPendidikan={getDataPendidikan}
      />
    </AccordionItem>
  );
};

export default DataPendidikanAdmin;

const ModalPendidikan = ({ isOpen, setOpenModal, tittle, currentValues , idEdit , getDataPendidikan }) => {
  const [editValues , setEditValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleEditPendidikan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/penduduk/pendidikan/update/${idEdit}`, {
        pendidikan : tittle,
        jumlah : editValues
      })
      setIsLoading(false);
      setOpenModal(false);
      getDataPendidikan();
      toast.success("Data Pendidikan berhasil diupdate");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      getDataPendidikan();
      toast.error("Data Pendidikan gagal diupdate");
    }
  }

  useEffect(()=>{
    setEditValues(currentValues)
  },[isOpen])
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
            value={editValues}
            onChange={(e) => setEditValues(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleEditPendidikan()}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${isLoading || !editValues ? "opacity-30 cursor-not-allowed" : ""}`}
          disabled={isLoading || !editValues}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};
