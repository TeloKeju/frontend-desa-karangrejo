import { Card, Rating, Button } from "flowbite-react";
import { FormatRupiah } from "@arismun/format-rupiah";

import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
  IconX,
} from "@tabler/icons-react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

const DetailBelanja = () => {
  const [dataUMKM, setDataUMKM] = useState([]);
  const [dataKomentar, setDataKomentar] = useState([]);
  const [isOpen, setOpenModal] = useState(false);

  const { id } = useParams();

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      const res2 = await apiKarangrejo.get("/comment", {
        params: {
          id: id,
        },
      });
      setDataKomentar(res2.data.comment);
      setDataUMKM(res.data.umkm.filter((item) => item.id == id)[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUMKM();
  }, [id]);

  return (
    <>
      <main className="">
        <section
          className="container p-5  mx-auto py-8"
          style={{ minHeight: "calc(100vh - 84px)" }}
        >
          <Card>
            <section className="lg:flex gap-6">
              <div className="bg-slate-500 lg:w-2/5 h-full">
                <img
                  src={import.meta.env.VITE_IMAGE_BASE + "/" + dataUMKM?.image}
                  className="w-full h-[300px] object-cover rounded-md"
                  alt="Image Belanja"
                />
              </div>
              <section className="mt-4 lg:mt-0">
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
                <p className="text-start mt-4">{dataUMKM?.description}</p>
              </section>
            </section>
            <section>
              <div className="flex items-center gap-2 justify-center py-4 relative">
                <p className="text-xl font-light absolute pb-2">Komentar</p>
                <hr className="w-full" />
              </div>
              {dataKomentar?.map((item, i) => {
                if (i == 0) {
                  return (
                    <div
                      className="flex items-start text-start rounded-sm p-4 gap-4"
                      key={i}
                    >
                      <div className="flex items-center pt-1">
                        <div className="rounded-full w-8 h-8 bg-gray-400">
                          <img
                            src="/person-icon.jpg"
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <p>
                          {item?.nama || ""} -{" "}
                          <span className="text-slate-400 font-light leading-none">
                            {item?.date || ""}
                          </span>
                        </p>
                        <div className="mt-2">{item?.comment || ""}</div>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="mt-6">
                <p
                  className="text-blue-600 underline italic"
                  onClick={() => setOpenModal(true)}
                >
                  See More
                </p>
              </div>
            </section>
          </Card>
        </section>
        <PopUpCommentContainer
          dataKomentar={dataKomentar}
          isOpen={isOpen}
          setOpenModal={setOpenModal}
          onAction={getDataUMKM}
        />
      </main>
    </>
  );
};

export default DetailBelanja;

const PopUpCommentContainer = ({ dataKomentar, isOpen, setOpenModal }) => {
  return (
    <section
      className={`w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-50 flex items-end ${
        isOpen ? "" : "hidden"
      }`}
    >
      <section className="w-full bg-white rounded-t-lg p-4 transition-all">
        <div className="flex justify-end items-center">
          <Button color="red" onClick={() => setOpenModal(false)}>
            <IconX />
          </Button>
        </div>
        <div className="relative my-6 flex justify-center items-center">
          <p className="absolute pb-2 text-xl font-light">Komentar</p>
          <hr className="w-full" />
        </div>
        <section className="min-h-[50vh] max-h-[70vh] overflow-auto space-y-4">
          {dataKomentar?.map((item, i) => {
            if (true) {
              return (
                <div
                  className="flex items-start text-start rounded-sm p-4 gap-4"
                  key={i}
                >
                  <div className="flex items-center pt-1">
                    <div className="rounded-full w-8 h-8 bg-gray-400">
                      <img
                        src="/person-icon.jpg"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p>
                      {item?.nama || ""} -{" "}
                      <span className="text-slate-400 font-light leading-none">
                        {item?.date || ""}
                      </span>
                    </p>
                    <div className="mt-2">{item?.comment || ""}</div>
                  </div>
                </div>
              );
            }
          })}
        </section>
      </section>
    </section>
  );
};
