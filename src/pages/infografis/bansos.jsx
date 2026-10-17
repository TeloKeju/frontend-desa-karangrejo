import { Link } from "react-router-dom";
import { bansos } from "./data/data";
import InfografisLink from "./link";

import { IconListSearch } from "@tabler/icons-react";

import { Card, TextInput, Button, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

// export InfografisLink

const Bansos = () => {
  const [displayBansos, setDisplayBansos] = useState([]);

  async function getDataBansos() {
    try {
      const res = await apiKarangrejo.get(`/bansos`);

      bansos[0].jumlah = res.data.Bansos[0].vaksin1;
      bansos[0].slug = "vaksin1";
      bansos[1].jumlah = res.data.Bansos[0].vaksin2;
      bansos[1].slug = "vaksin2";
      bansos[2].jumlah = res.data.Bansos[0].bnpt;
      bansos[2].slug = "bnpt";
      bansos[3].jumlah = res.data.Bansos[0].blt;
      bansos[3].slug = "blt";
      bansos[4].jumlah = res.data.Bansos[0].pkh;
      bansos[4].slug = "pkh";
      bansos[5].jumlah = res.data.Bansos[0].bst;
      bansos[5].slug = "bst";
      bansos[6].jumlah = res.data.Bansos[0].bantuanCaleg;
      bansos[6].slug = "bantuanCaleg";
      bansos[7].jumlah = res.data.Bansos[0].baznas;
      bansos[7].slug = "baznas";
      setDisplayBansos(bansos);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDataBansos();
  }, []);
  return (
    <main className="mt-20">
      <InfografisLink />
      <section className="container p-5  mx-auto mt-10">
        <h1 className=" text-start font-bold text-4xl">
          Jumlah Penerima Bansos
        </h1>
        <section className="grid sm:grid-cols-2 gap-3 mt-3">
          {displayBansos?.map((item) => (
            <>
              <Card className=" ">
                <section className="grid grid-cols-3">
                  <section className="col-span-1">
                    <section>
                      <p className="text-4xl font-bold">{item.jumlah}</p>
                      <p className="text-xl font-semibold">{item.penduduk}</p>
                    </section>
                  </section>
                  <section className=" flex flex-col justify-center col-span-2">
                    <h2 className="text-start text-xl font-semibold ms-10 uppercase">
                      {item.mendapat}
                    </h2>
                    <p className="text-start text-xl ms-10">
                      <span className="font-bold">{item.bantuan}</span>
                    </p>
                  </section>
                </section>
              </Card>
            </>
          ))}
        </section>
        <section className="mt-28">
          <h1 className=" text-start font-bold text-4xl">
            Cek Penerima Bansos
          </h1>
          <div className="flex flex-wrap gap-2 my-4 w-full h-24">
            <Button color="gray" className="items-center w-full">
              <IconListSearch></IconListSearch>
              <Link
                to={"https://cekbansos.kemensos.go.id/"}
                target="_blank"
                className="font-semibold text-xl ms-2"
              >
                Cek Penerima Bansos
              </Link>
            </Button>
          </div>
          {/* <div className="max-w">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              icon={IconSearch}
              placeholder="Masukkan NIK Penerima Bansos"
              required
            />
          </div> */}
        </section>
      </section>
    </main>
  );
};

export default Bansos;
