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
import { apbDesa } from "../../infografis/data/data";
import { Cell } from "recharts";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

const APBDesaAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [action, setAction] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [isOpen, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  async function getDataApbdesa() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("apb");
      setIsLoading(false);
    } catch (error) {
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
          <div className="overflow-x-auto w-full">
            <Table className="w-full overflow-x-auto">
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Tahun</Table.HeadCell>
                <Table.HeadCell>Pendapatan</Table.HeadCell>
                <Table.HeadCell>Belanja</Table.HeadCell>
                <Table.HeadCell>Pengeluaran</Table.HeadCell>
                <Table.HeadCell>Penerimaan</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {apbDesa?.map((items, i) => (
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
                    <Table.Cell className="lg:min-w-7 flex gap-1">
                      <button>
                        <IconEdit />
                      </button>
                      <button>
                        <IconTrash />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </AccordionItem>
      </div>
      <ModalAPBDesa isOpenModal={isOpen} setOpenModal={setOpenModal} action={action} onAction={getDataApbdesa} title={title}/>
    </Admin>
  );
};

export default APBDesaAdmin;

const ModalAPBDesa = ({ setOpenModal, isOpenModal, onAction, action , title }) => {
  return (
    <Modal show={isOpenModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>{title}</ModalHeader>
      {
        action == "tambah" ? (
          <ModalAddAPBDesa setOpenModal={setOpenModal} onAction={onAction}/>
        ) : ""
      }
    </Modal>
  );
};

const ModalAddAPBDesa = ({setOpenModal , onAction}) => {
  const [dataAddAPBDesa, setDataAddAPBDesa] = useState({
    tahun: "",
    pendapatan: "",
    belanja: "",
    pengeluaran: "",
    penerimaan: "",
  });

  return (
    <>
      <ModalBody>
        <form className="space-y-4">
          <div>
            <Label htmlFor="tahun" className="px-1 mb-1">
              Tahun
            </Label>
            <TextInput
              placeholder="Masukkan Tahun"
              name="tahun"
              type="number"
              onChange={(e) =>
                setDataAddAPBDesa({
                  ...dataAddAPBDesa,
                  tahun: e.target.value,
                })
              }
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
          <button id="submitdataAPB" className="hidden">
            submit
          </button>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="w-full">
          <Button
            type="submit"
            className={`w-full ${
              dataAddAPBDesa.tahun === "" ||
              dataAddAPBDesa.pendapatan === "" ||
              dataAddAPBDesa.belanja === "" ||
              dataAddAPBDesa.pengeluaran === "" ||
              dataAddAPBDesa.penerimaan === ""
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
            onClick={() => document.getElementById("submitdataAPB").click()}
            disabled={
              dataAddAPBDesa.tahun === "" ||
              dataAddAPBDesa.pendapatan === "" ||
              dataAddAPBDesa.belanja === "" ||
              dataAddAPBDesa.pengeluaran === "" ||
              dataAddAPBDesa.penerimaan === ""
            }
          >
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};


