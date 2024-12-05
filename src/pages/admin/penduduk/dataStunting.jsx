import { Button, Label, Modal, Table, TextInput, Toast } from "flowbite-react";
import { AccordionItem } from "./penduduk";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import {
  IconButterflyFilled,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "react-toastify";

const AdminStunting = () => {
  const [isLoading, setIsLoading] = useState();
  const [search, setSearch] = useState("");

  const [dataStuting, setDataStunting] = useState([]);

  const [dataEdit, setDataEdit] = useState({});
  const [isOpen, setOpenModal] = useState(false);
  const [action, setAction] = useState("");

  async function getDataStunting() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/stunting");
      setDataStunting(res.data.stunting);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataStunting();
  }, []);
  return (
    <AccordionItem title={"Data Stunting"}>
      {isLoading ? (
        <div className="min-h-20 flex items-center justify-center">
          Loading....
        </div>
      ) : (
        <section>
          <div className="mb-4 flex items-center justify-between w-full">
            <div className="w-2/5">
              <TextInput
                className="w-full"
                type="search"
                placeholder="Cari Data Stunting"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <Button
              onClick={() => {
                setOpenModal(true);
                setAction("add");
              }}
            >
              <IconPlus />
              <p className="ml-2">Tambah Data</p>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Tahun</Table.HeadCell>
              <Table.HeadCell>Jumlah</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dataStuting?.map((item, index) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{item.tahun}</Table.Cell>
                  <Table.Cell>{item.jumlah}</Table.Cell>
                  <Table.Cell className="flex justify-end">
                    <div className="flex gap-2 items-center max-w-[100px]">
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
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
      )}
      <ModalDataStunting
        isOpen={isOpen}
        dataEdit={dataEdit}
        onAction={getDataStunting}
        setIsOpen={setOpenModal}
        action={action}
      />
    </AccordionItem>
  );
};

export default AdminStunting;

const ModalDataStunting = ({
  isOpen,
  setIsOpen,
  dataEdit,
  onAction,
  action,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      {action == "edit" ? (
        <ModalEditStunting
          dataEdit={dataEdit}
          onAction={onAction}
          setIsOpen={setIsOpen}
        />
      ) : action == "add" ? (
        <ModalAddStunting onAction={onAction} setOpenModal={setIsOpen} />
      ) : action == "delete" ? (
        <ModalDeleteStunting
          dataEdit={dataEdit}
          onAction={onAction}
          setOpenModal={setIsOpen}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalEditStunting = ({ setIsOpen, dataEdit, onAction }) => {
  const [tahun, setTahun] = useState(dataEdit?.tahun || "YYYY");
  const [jumlah, setJumlah] = useState(dataEdit?.jumlah || 0);

  const [isLoading, setIsLoading] = useState(false);

  var disabled = isLoading ? true : false || tahun == "" || jumlah == "";

  async function updateDataStunting(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/stunting/update/${dataEdit.tahun}`,
        {
          tahun,
          jumlah,
        }
      );
      onAction();
      setIsLoading(false);
      setIsOpen(false);
      toast.success("Data Berhasil Diupdate");
    } catch (error) {
      setIsLoading(false);
      setIsOpen(false);
      toast.error("Data Gagal Diupdate");
      console.log(error);
    }
  }
  return (
    <>
      <Modal.Header>Edit Data Stunting</Modal.Header>
      <Modal.Body>
        <form onSubmit={updateDataStunting}>
          <Label>Tahun</Label>
          <TextInput
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            required
          />
          <br />
          <Label>Jumlah</Label>
          <TextInput
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            required
          />

          <button
            type="submit"
            className="d-none"
            id="updateDataStunting"
          ></button>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button
          onClick={() => document.getElementById("updateDataStunting").click()}
          disabled={disabled}
        >
          Update
        </Button>
        <Button
          color="red"
          onClick={() => setIsOpen(false)}
          disabled={disabled}
        >
          Cancle
        </Button>
      </Modal.Footer>
    </>
  );
};

const ModalAddStunting = ({ onAction, setOpenModal }) => {
  const [tahun, setTahun] = useState("");
  const [jumlah, setJumlah] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  var disabled = isLoading ? true : false || tahun == "" || jumlah == "";

  async function addDataStunting(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/stunting`, {
        tahun,
        jumlah,
      });
      onAction();
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Data Berhasil Ditambahkan");
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Data Gagal Ditambahkan");
      console.log(error);
    }
  }
  return (
    <>
      <Modal.Header>Edit Data Stunting</Modal.Header>
      <Modal.Body>
        <form onSubmit={addDataStunting}>
          <Label>Tahun</Label>
          <TextInput
            value={tahun}
            placeholder="YYYY"
            onChange={(e) => setTahun(e.target.value)}
            required
          />
          <br />
          <Label>Jumlah</Label>
          <TextInput
            value={jumlah}
            placeholder="masukkan jumlah"
            onChange={(e) => setJumlah(e.target.value)}
            required
          />

          <button
            type="submit"
            className="d-none"
            id="addDataStunting"
          ></button>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button
          onClick={() => document.getElementById("addDataStunting").click()}
          disabled={disabled}
        >
          Tambah
        </Button>
        <Button
          color="red"
          onClick={() => setIsOpen(false)}
          disabled={disabled}
        >
          Cancle
        </Button>
      </Modal.Footer>
    </>
  );
};

const ModalDeleteStunting = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/stunting?id=${dataEdit.tahun}`);
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Data Berhasil Dihapus");
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Data Gagal Dihapus");
      onAction;
    }
  }
  return (
    <>
      <Modal.Header>Hapus Data Stunting</Modal.Header>
      <Modal.Body>
        <p>Apakah anda yakin ingin menghapus data ini ?</p>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button
          color="red"
          onClick={handleDelete}
          loading={isLoading}
          disabled={isLoading}
        >
          Hapus
        </Button>
        <Button
          color="red"
          onClick={() => setOpenModal(false)}
          disabled={isLoading}
        >
          Cancle
        </Button>
      </Modal.Footer>
    </>
  );
};
