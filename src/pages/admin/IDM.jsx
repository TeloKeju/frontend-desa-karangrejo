import Admin from "./adminLayout";
import { idm } from "../infografis/data/data";
import {
  Accordion,
  Button,
  Card,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Table,
  TableBody,
  TextInput,
} from "flowbite-react";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";
import { toast } from "react-toastify";

const IDMAdmin = () => {
  const headerIDM = [
    "No",
    "tahun",
    "skor",
    "status",
    "target Status",
    "skor Minimal",
    "penambahan",
    "skor IKS",
    "skor IKE",
    "skor IKL",
    "",
  ];

  const [isOpen, setOpenModal] = useState(false);
  const [action, setAction] = useState("add");
  const [title, setTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [dataIDM, setDataIDM] = useState([]);

  const [search, setSearch] = useState("");

  const displayedIDM = dataIDM.filter(
    (e) =>
      e.tahun == search ||
      e.skor == search ||
      e.status.includes(search.toUpperCase()) ||
      e.targetStatus.includes(search.toUpperCase()) ||
      e.skorMinimal == search ||
      e.penambahan == search ||
      e.skorIKS == search ||
      e.skorIKE == search ||
      e.skorIKL == search
  );

  async function getDataIDM() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/idm");
      setDataIDM(res.data.idm);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataIDM();
  }, []);

  return (
    <>
      <Admin>
        <section className="p-4">
          <div className="w-full flex justify-between items-center">
            <div className="w-2/5">
              <TextInput
                placeholder="Cari data IDM"
                type="search"
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <Button
                className="w-full md:w-auto bg-blue-500"
                onClick={() => {
                  setOpenModal(true);
                  setTitle("Tambah IDM");
                  setAction("add");
                }}
              >
                <IconPlus /> Tambah Data IDM
              </Button>
            </div>
          </div>
          <div className="w-full mt-4">
            {isLoading ? (
              <section className="w-full min-h-[50vh] flex justify-center items-center bg-slate-100">
                <div>Loading.....</div>
              </section>
            ) : (
              <div className="overflow-auto">
                <Table>
                  <Table.Head>
                    {headerIDM.map((item, index) => {
                      return (
                        <Table.HeadCell key={index}>{item}</Table.HeadCell>
                      );
                    })}
                  </Table.Head>
                  <TableBody className="divide-y">
                    {displayedIDM?.map((item, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{item.tahun}</Table.Cell>
                        <Table.Cell>{item.skor}</Table.Cell>
                        <Table.Cell>{item.status}</Table.Cell>
                        <Table.Cell>{item.targetStatus}</Table.Cell>
                        <Table.Cell>{item.skorMinimal}</Table.Cell>
                        <Table.Cell>{item.penambahan}</Table.Cell>
                        <Table.Cell>{item.skorIKS}</Table.Cell>
                        <Table.Cell>{item.skorIKE}</Table.Cell>
                        <Table.Cell>{item.skorIKL}</Table.Cell>
                        <Table.Cell className="flex gap-1">
                          <IconEdit
                            onClick={() => {
                              setOpenModal(true);
                              setAction("edit");
                              setTitle("Edit IDM");
                              setDataEdit(item);
                            }}
                          />
                          <IconTrash
                            onClick={() => {
                              setOpenModal(true);
                              setAction("delete");
                              setTitle("Hapus IDM");
                              setDataEdit(item);
                            }}
                          ></IconTrash>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <ModalIDM
            isOpen={isOpen}
            setShowModal={setOpenModal}
            action={action}
            onAction={getDataIDM}
            dataEdit={dataEdit}
            title={title}
          />
        </section>
      </Admin>
    </>
  );
};

export default IDMAdmin;

const ModalIDM = ({
  isOpen,
  setShowModal,
  title,
  action,
  onAction,
  dataEdit,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setShowModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {action == "add" ? (
        <ModalAdd onAction={onAction} setOpenModal={setShowModal} />
      ) : action == "edit" ? (
        <ModalEdit
          onAction={onAction}
          setOpenModal={setShowModal}
          dataEdit={dataEdit}
        />
      ) : action == "delete" ? (
        <ModalDelete
          onAction={onAction}
          setShowModal={setShowModal}
          dataEdit={dataEdit}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAdd = ({ onAction, setOpenModal }) => {
  const kategoriStatusIDM = [
    { name: "Pilih status", value: "" },
    { name: "Mandiri", value: "Mandiri" },
    { name: "Maju", value: "Maju" },
    { name: "Berkembang", value: "Berkembang" },
    { name: "Tertinggal", value: "Tertinggal" },
    { name: "Sangat Tertinggal", value: "Sangat Tertinggal" },
  ];

  const [tahun, setTahun] = useState("");
  const [skor, setSkor] = useState("");
  const [status, setStatus] = useState("");
  const [targetStatus, setTargetStatus] = useState("");
  const [skorMinimal, setSkorMinimal] = useState();
  const [penambahan, setPenambahan] = useState();
  const [skorIKS, setSkorIKS] = useState();
  const [skorIKE, setSkorIKE] = useState();
  const [skorIKL, setSkorIKL] = useState();

  const [isLoading, setIsLoading] = useState(false);

  async function addDataIDM(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post("/idm", {
        tahun,
        skor,
        status,
        targetStatus,
        skorMinimal,
        penambahan,
        skorIKS,
        skorIKE,
        skorIKL,
      });
      setIsLoading(false);
      toast.success("Tambah Data IDM Berhasil !!");
      onAction();
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.errors?.tahun[0] || "Tambah Data IDM Gagal !!"
      );
      onAction();
    }
    setOpenModal(false);
  }

  return (
    <>
      <ModalBody>
        <form className="space-y-3" onSubmit={addDataIDM}>
          <div>
            <Label>Tahun</Label>
            <TextInput
              type="text"
              placeholder="Masukkan tahun ( YYYY )"
              onChange={(e) => setTahun(e.target.value)}
              pattern="[0-9]{4}"
              required
            />
          </div>
          <div>
            <Label>Skor</Label>
            <TextInput
              type="number"
              placeholder="Masukkan skor"
              onChange={(e) => setSkor(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select onChange={(e) => setStatus(e.target.value)} required>
              {kategoriStatusIDM.map((item, i) => (
                <option key={i} value={item.value.toUpperCase()}>
                  {item.name.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Target Status</Label>
            <Select onChange={(e) => setTargetStatus(e.target.value)} required>
              {kategoriStatusIDM.map((item, i) => (
                <option key={i} value={item.value.toUpperCase()}>
                  {item.name.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Skor Minimal</Label>
            <TextInput
              type="number"
              placeholder="Masukkan minimal"
              onChange={(e) => setSkorMinimal(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div>
            <Label>Penambahan</Label>
            <TextInput
              type="number"
              placeholder="Masukkan Penambahan"
              onChange={(e) => setPenambahan(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Skor IKS</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKS"
                onChange={(e) => setSkorIKS(e.target.value)}
                step={0.00001}
                required
              />
            </div>
            <div>
              <Label>Skor IKE</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKE"
                onChange={(e) => setSkorIKE(e.target.value)}
                step={0.00001}
                required
              />
            </div>
            <div>
              <Label>Skor IKL</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKL"
                onChange={(e) => setSkorIKL(e.target.value)}
                step={0.00001}
                required
              />
            </div>
          </div>
          <button type="submit" id="submitIDM" className="d-none"></button>
        </form>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          onClick={() => document.getElementById("submitIDM").click()}
          disabled={isLoading}
          className={`${isLoading ? "cursor-wait opacity-20" : ""}`}
        >
          <span>Simpan</span>
        </Button>
        <Button
          onClick={() => setOpenModal(false)}
          disabled={isLoading}
          className={`bg-red-500 ${isLoading ? "cursor-wait opacity-20" : ""}`}
        >
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

const ModalDelete = ({ setShowModal, onAction, dataEdit }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteIDM() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/idm?id=${dataEdit.tahun}`);
      setIsLoading(false);
      setShowModal(false);
      toast.success("Hapus Data IDM Berhasil !!");
      onAction();
    } catch (error) {
      setIsLoading(false);
      setShowModal(false);
      toast.error("Hapus Data IDM Gagal !!");
      onAction();
    }
  }

  return (
    <>
      <ModalBody>
        <p className="text-center">
          Apakah anda yakin ingin menghapus data ini ?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full bg-red-500"
          disabled={isLoading}
          onClick={handleDeleteIDM}
        >
          Hapus
        </Button>
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => setShowModal(false)}
        >
          Batal
        </Button>
      </ModalFooter>
    </>
  );
};

const ModalEdit = ({ setOpenModal, onAction, dataEdit }) => {
  const kategoriStatusIDM = [
    { name: "Pilih status", value: "" },
    { name: "Mandiri", value: "Mandiri" },
    { name: "Maju", value: "Maju" },
    { name: "Berkembang", value: "Berkembang" },
    { name: "Tertinggal", value: "Tertinggal" },
    { name: "Sangat Tertinggal", value: "Sangat Tertinggal" },
  ];

  const [tahun, setTahun] = useState(dataEdit.tahun);
  const [skor, setSkor] = useState(dataEdit.skor);
  const [status, setStatus] = useState(dataEdit.status);
  const [targetStatus, setTargetStatus] = useState(dataEdit.targetStatus);
  const [skorMinimal, setSkorMinimal] = useState(dataEdit.skorMinimal);
  const [penambahan, setPenambahan] = useState(dataEdit.penambahan);
  const [skorIKS, setSkorIKS] = useState(dataEdit.skorIKS);
  const [skorIKE, setSkorIKE] = useState(dataEdit.skorIKE);
  const [skorIKL, setSkorIKL] = useState(dataEdit.skorIKL);

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditIDM(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/idm/update/${dataEdit.tahun}`, {
        tahun,
        skor,
        status,
        targetStatus,
        skorMinimal,
        penambahan,
        skorIKS,
        skorIKE,
        skorIKL,
      });
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Edit Data IDM Berhasil !!");
      onAction();
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit Data IDM Gagal !!");
      onAction();
    }
  }

  return (
    <>
      <ModalBody>
        <form className="space-y-3" onSubmit={handleEditIDM}>
          <div>
            <Label>Tahun</Label>
            <TextInput
              type="text"
              placeholder="Masukkan tahun ( YYYY )"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              pattern="[0-9]{4}"
              required
            />
          </div>
          <div>
            <Label>Skor</Label>
            <TextInput
              type="number"
              placeholder="Masukkan skor"
              value={skor}
              onChange={(e) => setSkor(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select onChange={(e) => setStatus(e.target.value)} required>
              {kategoriStatusIDM.map((item, i) => (
                <option
                  key={i}
                  value={item.value.toUpperCase()}
                  selected={item.value.toUpperCase() === status?.toUpperCase()}
                >
                  {item.name.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Target Status</Label>
            <Select onChange={(e) => setTargetStatus(e.target.value)} required>
              {kategoriStatusIDM.map((item, i) => (
                <option
                  key={i}
                  value={item.value.toUpperCase()}
                  selected={
                    item.value.toUpperCase() === targetStatus?.toUpperCase()
                  }
                >
                  {item.name.toUpperCase()}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Skor Minimal</Label>
            <TextInput
              type="number"
              placeholder="Masukkan minimal"
              value={skorMinimal}
              onChange={(e) => setSkorMinimal(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div>
            <Label>Penambahan</Label>
            <TextInput
              type="number"
              placeholder="Masukkan Penambahan"
              value={penambahan}
              onChange={(e) => setPenambahan(e.target.value)}
              step={0.00001}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Skor IKS</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKS"
                value={skorIKS}
                onChange={(e) => setSkorIKS(e.target.value)}
                step={0.00001}
                required
              />
            </div>
            <div>
              <Label>Skor IKE</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKE"
                value={skorIKE}
                onChange={(e) => setSkorIKE(e.target.value)}
                step={0.00001}
                required
              />
            </div>
            <div>
              <Label>Skor IKL</Label>
              <TextInput
                type="number"
                placeholder="Masukkan skor IKL"
                value={skorIKL}
                onChange={(e) => setSkorIKL(e.target.value)}
                step={0.00001}
                required
              />
            </div>
          </div>
          <button type="submit" id="submitEditIDM" className="d-none"></button>
        </form>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          onClick={() => document.getElementById("submitEditIDM").click()}
          disabled={isLoading}
          className={`${isLoading ? "cursor-wait opacity-20" : ""}`}
        >
          <span>Simpan</span>
        </Button>
        <Button
          onClick={() => setOpenModal(false)}
          disabled={isLoading}
          className={`bg-red-500 ${isLoading ? "cursor-wait opacity-20" : ""}`}
        >
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};
