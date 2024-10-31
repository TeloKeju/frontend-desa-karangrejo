import { Card } from "flowbite-react";
import { agama, jumlahPenduduk, perkawinan } from "../../infografis/data/data";
import Admin from "../adminLayout";
import { IconEdit } from "@tabler/icons-react";
import apiKarangrejo from "../../../lib/axios";
import { useEffect, useState } from "react";
import JumlahPenduduk from "./jumlahPenduduk";
import DataAgama from "./dataAgama";
import DataPendidikanAdmin from "./dataPendidikan";
import DataUmur from "./dataUmur";
import DataPekerjaan from "./dataPekerjaan";

const PendudukAdmin = () => {
  return (
    <Admin>
      <div className="bg-reg-100">
        <section className="p-4 flex flex-col gap-3">
          <JumlahPenduduk />
          <DataPendidikanAdmin />
          <DataAgama />
          <DataUmur />
          <DataPekerjaan />
        </section>
      </div>
    </Admin>
  );
};

export default PendudukAdmin;

export const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="font-bold text-xl lg:text-4xl text-start">
          {title}
        </span>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-100">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};
