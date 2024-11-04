import { Table } from "flowbite-react";
import Admin from "../adminLayout";
import { AccordionItem } from "../penduduk/penduduk";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { apbDesa } from "../../infografis/data/data";
import { Cell } from "recharts";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const APBDesaAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function getDataApbdesa() {
    try {
      const res = await apiKarangrejo.get("apb");
      //   console.log(res.data.umur);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(apbDesa);

  useEffect(() => {
    getDataApbdesa();
  }, []);
  return (
    <Admin>
      <div className="p-4">
        <AccordionItem title={"APB Desa"}>
          <div className="overflow-x-auto">
            <Table>
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
    </Admin>
  );
};

export default APBDesaAdmin;
