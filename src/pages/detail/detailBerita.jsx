import { Card, Breadcrumb } from "flowbite-react";
import {
  IconHome,
  IconClock,
  IconUser,
  IconEye,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../lib/axios";

const DetailBerita = () => {
  const [dataBerita, setDataBerita] = useState([]);
  const [detailedBerita, setDetailedBerita] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const localtion = useLocation();
  const pathName = localtion.pathname.split("/")[2];

  async function getDataBerita() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/news");
      setDataBerita(res.data.news);
      setDetailedBerita(
        res.data.news.filter((items) => items.id === pathName)[0]
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getDataBerita();
  }, [pathName]);

  return (
    <>
      <main className="my-10">
        <section className="container p-5  mx-auto">
          <section className="grid grid-cols-1 xl:grid-cols-8 gap-y-3 xl:gap-x-3">
            <section className="col-span-6">
              <Card>
                <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/" icon={IconHome}>
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/berita">Berita</Breadcrumb.Item>
                  <Breadcrumb.Item>{detailedBerita.title}</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="font-bold text-start text-3xl">
                  {detailedBerita.title}
                </h1>
                <section className="flex flex-col lg:flex-row justify-between">
                  <section className="flex flex-col lg:flex-row gap-6">
                    <section className="flex flex-row gap-2">
                      <IconClock /> {detailedBerita.publish_date}
                    </section>
                    <section className="flex flex-row gap-2">
                      <IconUser /> Ditulis oleh{" "}
                      <span className="font-semibold">
                        Admin Desa karangrejo
                      </span>
                    </section>
                  </section>
                  <section className="flex flex-row gap-2">
                    <IconEye /> Dilihat{" "}
                    <span className="font-semibold">
                      {detailedBerita.views}
                    </span>{" "}
                    Kali
                  </section>
                </section>
                <img
                  src={
                    import.meta.env.VITE_IMAGE_BASE + "/" + detailedBerita.image
                  }
                  className="w-full"
                  alt=""
                />
                <section>
                  <p className="text-start p-5">{detailedBerita.content}</p>
                </section>
                <section className="flex flex-row gap-4">
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
              </Card>
            </section>
            <section className="col-span-2 ">
              <Card className="flex flex-col gap-6 w-full">
                <h1 className="text-start font-bold mb-4">Berita Terbaru</h1>
                {dataBerita.map((item, i) => {
                  if (i <= 5) {
                    return (
                      <>
                        <Link
                          className="flex flex-row gap-3"
                          key={i}
                          to={`/berita/${item.id}`}
                        >
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_BASE + "/" + item.image
                            }
                            className="w-16 h-[70px] object-cover"
                            alt=""
                          />
                          <section>
                            <h1 className="mb-2 text-start font-medium">
                              {item.title}
                            </h1>
                            <section className="flex flex-row gap-1 items-center text-slate-400 text-sm">
                              <IconClock size={18} /> {item.publish_date}
                            </section>
                            <section className="flex flex-row gap-1 items-center text-slate-400 text-sm">
                              <IconEye size={18} /> Dilihat{" "}
                              <span className="font-semibold">
                                {item.views}
                              </span>{" "}
                              Kali
                            </section>
                          </section>
                        </Link>
                        <hr />
                      </>
                    );
                  }
                })}
              </Card>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default DetailBerita;
