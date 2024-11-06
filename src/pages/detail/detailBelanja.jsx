import { Card, Rating, Button } from "flowbite-react";
import { FormatRupiah } from "@arismun/format-rupiah";

import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

const DetailBelanja = () => {
  const [dataUMKM, setDataUMKM] = useState([]);

  const localtion = useLocation();
  const pathName = localtion.pathname.split("/")[2];

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      setDataUMKM(res.data.umkm.filter((item) => item.id == pathName)[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUMKM();
  }, [pathName]);
  return (
    <>
      <main className="">
        <section
          className="container p-5  mx-auto py-8"
          style={{ minHeight: "calc(100vh - 84px)" }}
        >
          <Card>
            <section className="grid grid-cols-1 sm:grid-cols-8 gap-6">
              <img
                src={import.meta.env.VITE_IMAGE_BASE + "/" + dataUMKM?.image}
                className="col-span-2 w-full max-h-[500px]"
                alt="Image Belanja"
              />
              <section className="col-span-6">
                <section className="flex gap-3 flex-col">
                  <h1 className="font-medium text-3xl text-start">
                    {dataUMKM?.name}
                  </h1>
                  <section className="flex flex-row gap-3">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                    <p>|</p>
                    <p>
                      Penilaian{" "}
                      <span className="text-slate-400">
                        ({dataUMKM?.rating || 0})
                      </span>
                    </p>
                  </section>
                </section>
                <h2 className="text-3xl font-bold text-start mt-2">
                  <FormatRupiah value={dataUMKM?.price} />
                </h2>
                <p className="text-start mt-4">{dataUMKM?.description}F</p>
                <Button color="gray" className="mt-6">
                  <IconBrandWhatsapp /> &nbsp; Hubungi Penjual
                </Button>
                <section className="flex flex-row gap-4 mt-1">
                  Bagikan:
                  <Link to={""}>
                    <IconBrandInstagram />
                  </Link>
                  <Link to={""}>
                    <IconBrandFacebook />
                  </Link>
                  <Link to={""}>
                    <IconBrandWhatsapp />
                  </Link>
                </section>
              </section>
            </section>
          </Card>
        </section>
      </main>
    </>
  );
};

export default DetailBelanja;
