import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TextInput,
} from "flowbite-react";
import Admin from "../adminLayout";
import { AccordionItem } from "../penduduk/penduduk";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { toast, useToast } from "react-toastify";

const APBDesaAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apbDesa, setApbDesa] = useState([]);

  const [search, setSearch] = useState("");
  const displayAPB = apbDesa.filter(
    (item) => search == "" || item.tahun == search
  );

  const [action, setAction] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [isOpen, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  async function getDataApbdesa() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/apb");
      setApbDesa(res.data.apb);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getDataApbdesa();
  }, []);
  return (
    <Admin>
      <div className="p-4">
        <AccordionItem title={"APB Desa"}>
          <div className="mb-4 w-full md:flex space-y-4 md:space-y-0 justify-between">
            <TextInput
              id="search"
              type="search"
              placeholder="Cari Data APBDesa Pada Tahun..."
              className="md:w-1/3 w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="flex gap-2 w-full md:w-auto bg-blue-500">
              <IconPlus />{" "}
              <span
                className="leading-normal"
                onClick={() => {
                  setOpenModal(true);
                  setAction("tambah");
                  setTitle("Tambah Data APBDesa");
                }}
              >
                Tambah Data APBDesa
              </span>
            </Button>
          </div>
          {isLoading ? (
            <section className="w-full min-h-[50vh] flex justify-center items-center bg-slate-100">
              <div>Loading.....</div>
            </section>
          ) : (
            <div className="overflow-x-auto w-full">
              <Table className="w-full overflow-x-auto">
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Tahun</Table.HeadCell>
                  <Table.HeadCell>Pendapatan</Table.HeadCell>
                  <Table.HeadCell>Belanja</Table.HeadCell>
                  <Table.HeadCell>Pengeluaran</Table.HeadCell>
                  <Table.HeadCell>Penerimaan</Table.HeadCell>
                  <Table.HeadCell>Hasil Desa</Table.HeadCell>
                  <Table.HeadCell>Transfer</Table.HeadCell>
                  <Table.HeadCell>
                    Penyelenggaraan Pemerintah Desa
                  </Table.HeadCell>
                  <Table.HeadCell>Pelaksanaan Pembangunan</Table.HeadCell>
                  <Table.HeadCell>Pembinaan Kemasyarakatan</Table.HeadCell>
                  <Table.HeadCell>Pemberdayaan Masyarakatan</Table.HeadCell>
                  <Table.HeadCell>Penanggulangan Bencana</Table.HeadCell>
                  <Table.HeadCell>Lain - Lain</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {displayAPB?.map((items, i) => (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell>{items.tahun}</Table.Cell>
                      <Table.Cell>{items.pendapatan}</Table.Cell>
                      <Table.Cell>{items.belanja}</Table.Cell>
                      <Table.Cell>{items.pengeluaran}</Table.Cell>
                      <Table.Cell>{items.penerimaan}</Table.Cell>
                      <Table.Cell>{items.hasil_desa}</Table.Cell>
                      <Table.Cell>{items.transfer}</Table.Cell>
                      <Table.Cell>
                        {items.penyelenggaraan_pemerintahan_desa}
                      </Table.Cell>
                      <Table.Cell>
                        {items.pelaksanaan_pembangunan_desa}
                      </Table.Cell>
                      <Table.Cell>
                        {items.pembinaan_kemasyarakatan_desa}
                      </Table.Cell>
                      <Table.Cell>
                        {items.pemberdayaan_masyarakat_desa}
                      </Table.Cell>
                      <Table.Cell>{items.penanggulangan_bencana}</Table.Cell>
                      <Table.Cell>{items.lain}</Table.Cell>
                      <Table.Cell className="lg:min-w-7 flex gap-1">
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setAction("edit");
                            setTitle("Edit Data APBDesa");
                            setDataEdit(items);
                          }}
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setAction("delete");
                            setTitle("Hapus Data APBDesa");
                            setDataEdit(items);
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
          )}
        </AccordionItem>
      </div>
      <ModalAPBDesa
        isOpenModal={isOpen}
        setOpenModal={setOpenModal}
        action={action}
        onAction={getDataApbdesa}
        title={title}
        dataEdit={dataEdit}
        dataValidator={apbDesa}
      />
    </Admin>
  );
};

export default APBDesaAdmin;

const ModalAPBDesa = ({
  setOpenModal,
  isOpenModal,
  onAction,
  action,
  title,
  dataEdit,
  dataValidator,
}) => {
  return (
    <Modal show={isOpenModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {action == "tambah" ? (
        <ModalAddAPBDesa
          setOpenModal={setOpenModal}
          onAction={onAction}
          dataValidator={dataValidator}
        />
      ) : action == "delete" ? (
        <ModalDeleteAPDDEsa
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : action == "edit" ? (
        <ModalEditAPBDesa
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

const ModalAddAPBDesa = ({ setOpenModal, onAction, dataValidator }) => {
  const [dataAddAPBDesa, setDataAddAPBDesa] = useState({
    tahun: "",
    pendapatan: "",
    belanja: "",
    pengeluaran: "",
    penerimaan: "",
    hasil_desa: "",
    transfer: "",
    lain: "",
    penyelenggaraan_pemerintahan_desa: "",
    pelaksanaan_pembangunan_desa: "",
    pembinaan_kemasyarakatan_desa: "",
    pemberdayaan_masyarakat_desa: "",
    penanggulangan_bencana: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  var isDisabled =
    dataAddAPBDesa.tahun == "" ||
    dataAddAPBDesa.pendapatan == "" ||
    dataAddAPBDesa.belanja == "" ||
    dataAddAPBDesa.pengeluaran == "" ||
    dataAddAPBDesa.penerimaan == "" ||
    dataAddAPBDesa.hasil_desa == "" ||
    dataAddAPBDesa.transfer == "" ||
    dataAddAPBDesa.lain == "" ||
    dataAddAPBDesa.penyelenggaraan_pemerintahan_desa == "" ||
    dataAddAPBDesa.pelaksanaan_pembangunan_desa == "" ||
    dataAddAPBDesa.pembinaan_kemasyarakatan_desa == "" ||
    dataAddAPBDesa.pemberdayaan_masyarakat_desa == "" ||
    dataAddAPBDesa.penanggulangan_bencana == ""
      ? true
      : false;

  const [error, setError] = useState({
    tahun: false,
    pendapatan: false,
    belanja: false,
    pengeluaran: false,
    penerimaan: false,
  });

  async function handleAddAPBDesa() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post("/apb", dataAddAPBDesa);
      onAction();
      setIsLoading(false);
      setOpenModal(false);
      toast.success("Input APB Desa Berhasil !!");
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Data APB Desa Gagal Ditambah !!");
      console.log(error);
    }
  }

  return (
    <>
      <ModalBody>
        <form className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="tahun" className="px-1 mb-1">
                Tahun
              </Label>
              <TextInput
                placeholder="Masukkan Tahun"
                name="tahun"
                type="number"
                onChange={(e) =>
                  dataValidator?.find((item) => item.tahun == e.target.value)
                    ? (setDataAddAPBDesa({
                        ...dataAddAPBDesa,
                        tahun: "",
                      }),
                      setError({ ...error, tahun: "Tahun Sudah Ada" }))
                    : (setDataAddAPBDesa({
                        ...dataAddAPBDesa,
                        tahun: e.target.value,
                      }),
                      setError({ ...error, tahun: "" }))
                }
              />
              {error.tahun && <p className="text-red-500">{error.tahun}</p>}
            </div>
            <div>
              <Label htmlFor="pendapatan" className="px-1 mb-1">
                Pendapatan
              </Label>
              <TextInput
                placeholder="Masukkan Pendapatan"
                name="pendapatan"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    pendapatan: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="belanja" className="px-1 mb-1">
                Belanja
              </Label>
              <TextInput
                placeholder="Masukkan Belanja"
                type="number"
                name="belanja"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    belanja: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="pengeluaran" className="px-1 mb-1">
                Pengeluaran
              </Label>
              <TextInput
                placeholder="Masukkan Pengeluaran"
                name="pengeluaran"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    pengeluaran: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="penerimaan" className="px-1 mb-1">
                Penerimaan
              </Label>
              <TextInput
                placeholder="Masukkan Penerimaan"
                name="penerimaan"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    penerimaan: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="penerimaan" className="px-1 mb-1">
                Pendapatan Transfer
              </Label>
              <TextInput
                placeholder="Masukkan pendapatan transfer"
                name="trasfer"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    transfer: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="penerimaan" className="px-1 mb-1">
                Pendapatan Lain
              </Label>
              <TextInput
                placeholder="Masukkan pendapatan lain"
                name="lain"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    lain: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Label htmlFor="penerimaan" className="px-1 mb-1">
                Hasil Desa
              </Label>
              <TextInput
                placeholder="Masukkan pendapatan lain"
                name="lain"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    hasil_desa: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label
                htmlFor="penyelenggaraan_pemerintahan_desa"
                className="px-1 mb-1"
              >
                Penyelenggaraan Pemerintah
              </Label>
              <TextInput
                placeholder="Masukkan penyelenggaraan pemerintah"
                name="penyelenggaraan_pemerintahan_desa"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    penyelenggaraan_pemerintahan_desa: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label
                htmlFor="pelaksanaan_pembangunan_desa"
                className="px-1 mb-1"
              >
                Pelaksanaan Pembangunan
              </Label>
              <TextInput
                placeholder="Masukkan pelaksanaan pembangunan"
                name="pelaksanaan_pembangunan_desa"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    pelaksanaan_pembangunan_desa: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label
                htmlFor="pembinaan_kemasyarakatan_desa"
                className="px-1 mb-1"
              >
                Pembinaan Kemasyarakatan
              </Label>
              <TextInput
                placeholder="Masukkan pembinaan kemasyarakatan"
                name="pembinaan_kemasyarakatan_desa"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    pembinaan_kemasyarakatan_desa: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label
                htmlFor="pemberdayaan_masyarakat_desa"
                className="px-1 mb-1"
              >
                Pemberdayaan Masyarakat
              </Label>
              <TextInput
                placeholder="Masukkan pemberdayaan masyarakat"
                name="pemberdayaan_masyarakat_desa"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    pemberdayaan_masyarakat_desa: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="penanggulangan_bencana" className="px-1 mb-1">
                Penanggulangan Bencana
              </Label>
              <TextInput
                placeholder="Masukkan penanggulangan bencana"
                name="penanggulangan_bencana"
                type="number"
                onChange={(e) => {
                  setDataAddAPBDesa({
                    ...dataAddAPBDesa,
                    penanggulangan_bencana: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="w-full">
          <Button
            type="submit"
            className={`w-full ${
              isLoading || isDisabled ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={() => handleAddAPBDesa()}
            disabled={isLoading || isDisabled}
          >
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

const ModalDeleteAPDDEsa = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/apb?id=${dataEdit.tahun}`);

      setIsLoading(false);
      onAction();
      toast.success("Data Berhasil Dihapus");
      setOpenModal(false);
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Data Tidak Berhasil Dihapus");
      console.log(error);
    }
  }
  return (
    <>
      <Modal.Body className="text-center text-2xl">
        Menghapus data APBDesa {dataEdit.tahun} !!
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

const ModalEditAPBDesa = ({ setOpenModal, dataEdit, onAction }) => {
  const [dataEditAPBDesa, setDataEditAPBDesa] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setDataEditAPBDesa(dataEdit);
  }, [dataEdit]);

  var isDisabled =
    dataEditAPBDesa.tahun == "" ||
    dataEditAPBDesa.pendapatan == "" ||
    dataEditAPBDesa.belanja == "" ||
    dataEditAPBDesa.pengeluaran == "" ||
    dataEditAPBDesa.penerimaan == "" ||
    dataEditAPBDesa.hasil_desa == "" ||
    dataEditAPBDesa.transfer == "" ||
    dataEditAPBDesa.lain == "" ||
    dataEditAPBDesa.penyelenggaraan_pemerintahan_desa == "" ||
    dataEditAPBDesa.pelaksanaan_pembangunan_desa == "" ||
    dataEditAPBDesa.pembinaan_kemasyarakatan_desa == "" ||
    dataEditAPBDesa.pemberdayaan_masyarakat_desa == "" ||
    dataEditAPBDesa.penanggulangan_bencana == ""
      ? true
      : false;

  async function handleEditAPBDesa() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(
        `/apb/update/${dataEdit.tahun}`,
        dataEditAPBDesa
      );

      setIsLoading(false);
      onAction();
      setOpenModal(false);
      toast.success("Edit APB Desa Berhasil !!");
    } catch (error) {
      setIsLoading(false);
      setOpenModal(false);
      toast.error("Edit APB Desa Gagal !!");
      console.log(error);
    }
  }
  return (
    <>
      <ModalBody>
        <form className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div>
              <Label htmlFor="tahun" className="px-1 mb-1">
                Tahun
              </Label>
              <TextInput
                placeholder="Masukkan Tahun"
                name="tahun"
                type="number"
                onChange={(e) =>
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    tahun: e.target.value,
                  })
                }
                value={dataEditAPBDesa.tahun}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="pendapatan" className="px-1 mb-1">
                Pendapatan
              </Label>
              <TextInput
                placeholder="Masukkan Pendapatan"
                name="pendapatan"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    pendapatan: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.pendapatan}
              />
            </div>
            <div>
              <Label htmlFor="belanja" className="px-1 mb-1">
                Belanja
              </Label>
              <TextInput
                placeholder="Masukkan Belanja"
                type="number"
                name="belanja"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    belanja: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.belanja}
              />
            </div>
            <div>
              <Label htmlFor="pengeluaran" className="px-1 mb-1">
                Pengeluaran
              </Label>
              <TextInput
                placeholder="Masukkan Pengeluaran"
                name="pengeluaran"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    pengeluaran: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.pengeluaran}
              />
            </div>
            <div>
              <Label htmlFor="penerimaan" className="px-1 mb-1">
                Penerimaan
              </Label>
              <TextInput
                placeholder="Masukkan Penerimaan"
                name="penerimaan"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    penerimaan: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.penerimaan}
              />
            </div>
            <div>
              <Label htmlFor="transfer" className="px-1 mb-1">
                Transfer
              </Label>
              <TextInput
                placeholder="Masukkan Transfer"
                name="transfer"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    transfer: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.transfer}
              />
            </div>
            <div>
              <Label htmlFor="lain" className="px-1 mb-1">
                Lain-lain
              </Label>
              <TextInput
                placeholder="Masukkan Lain-lain"
                name="lain"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    lain: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.lain}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Label htmlFor="hasil_desa" className="px-1 mb-1">
                Hasil Desa
              </Label>
              <TextInput
                placeholder="Masukkan Hasil Desa"
                name="hasil_desa"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    hasil_desa: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.hasil_desa}
              />
            </div>

            <div>
              <Label
                htmlFor="penyelenggaraan_pemerintahan_desa"
                className="px-1 mb-1"
              >
                Penyelenggaraan Pemerintahan Desa
              </Label>
              <TextInput
                placeholder="Masukkan Penyelenggaraan Pemerintahan Desa"
                name="penyelenggaraan_pemerintahan_desa"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    penyelenggaraan_pemerintahan_desa: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.penyelenggaraan_pemerintahan_desa}
              />
            </div>
            <div>
              <Label
                htmlFor="pelaksanaan_pembangunan_desa"
                className="px-1 mb-1"
              >
                Pelaksanaan Pembangunan Desa
              </Label>
              <TextInput
                placeholder="Masukkan Pelaksanaan Pembangunan Desa"
                name="pelaksanaan_pembangunan_desa"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    pelaksanaan_pembangunan_desa: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.pelaksanaan_pembangunan_desa}
              />
            </div>
            <div>
              <Label
                htmlFor="pembinaan_kemasyarakatan_desa"
                className="px-1 mb-1"
              >
                Pembinaan Kemasyarakatan Desa
              </Label>
              <TextInput
                placeholder="Masukkan Pembinaan Kemasyarakatan Desa"
                name="pembinaan_kemasyarakatan_desa"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    pembinaan_kemasyarakatan_desa: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.pembinaan_kemasyarakatan_desa}
              />
            </div>
            <div>
              <Label
                htmlFor="pemberdayaan_masyarakat_desa"
                className="px-1 mb-1"
              >
                Pemberdayaan Masyarakat Desa
              </Label>
              <TextInput
                placeholder="Masukkan Pemberdayaan Masyarakat Desa"
                name="pemberdayaan_masyarakat_desa"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    pemberdayaan_masyarakat_desa: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.pemberdayaan_masyarakat_desa}
              />
            </div>
            <div>
              <Label htmlFor="penanggulangan_bencana" className="px-1 mb-1">
                Penanggulangan Bencana
              </Label>
              <TextInput
                placeholder="Masukkan Penanggulangan Bencana"
                name="penanggulangan_bencana"
                type="number"
                onChange={(e) => {
                  setDataEditAPBDesa({
                    ...dataEditAPBDesa,
                    penanggulangan_bencana: e.target.value,
                  });
                }}
                value={dataEditAPBDesa.penanggulangan_bencana}
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="w-full">
          <Button
            type="submit"
            className={`w-full ${
              isLoading || isDisabled ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={() => handleEditAPBDesa()}
            disabled={isLoading || isDisabled}
          >
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};
