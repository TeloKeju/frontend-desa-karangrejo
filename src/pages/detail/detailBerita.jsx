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

import { Link } from "react-router-dom";

const DetailBerita = () => (
  <>
    <main className="mt-20">
      <section className="container p-5  mx-auto mt-10">
        <section className="grid grid-cols-1 xl:grid-cols-8 gap-3">
          <section className="col-span-6">
            <Card>
              <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="/" icon={IconHome}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/berita">Berita</Breadcrumb.Item>
                <Breadcrumb.Item>Judul Berita</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="font-bold text-start text-3xl">Judul Berita</h1>
              <section className="flex flex-col lg:flex-row justify-between">
                <section className="flex flex-col lg:flex-row gap-6">
                  <section className="flex flex-row gap-2">
                    <IconClock /> 27 Oktober 2024
                  </section>
                  <section className="flex flex-row gap-2">
                    <IconUser /> Ditulis oleh{" "}
                    <span className="font-semibold">Admin Desa karangrejo</span>
                  </section>
                </section>
                <section className="flex flex-row gap-2">
                  <IconEye /> Dilihat <span className="font-semibold">500</span>{" "}
                  Kali
                </section>
              </section>
              <img src="https://placehold.co/100" className="w-full" alt="" />
              <section>
                <p className="text-start p-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                  voluptatibus? Est dicta nesciunt repudiandae aperiam animi
                  ducimus quos, totam molestiae, error commodi quo fugit quam
                  nihil quas obcaecati reiciendis necessitatibus? Enim fugiat ex
                  aperiam nihil optio totam ipsum quibusdam quia deserunt
                  temporibus. Iusto natus eligendi, enim atque voluptatibus
                  vitae excepturi nostrum expedita sequi nesciunt laborum at
                  rerum ullam! Quisquam, repudiandae? Molestias distinctio
                  omnis, magnam magni, nesciunt illo repellendus alias tempore
                  dicta, quasi possimus in? Molestiae vitae consectetur aut
                  ratione repellat, consequuntur tenetur ullam possimus, soluta
                  excepturi id et numquam debitis!
                </p>
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
              <h1 className="text-start font-bold">Berita Terbaru</h1>
              <section className="flex flex-row gap-3">
                <img src="https://placehold.co/100" className="w-16 " alt="" />
                <section>
                  <h1 className="text-start font-medium">Judul Berita</h1>
                  <section className="flex flex-row gap-1  text-slate-400">
                    <IconClock /> 27 Oktober 2024
                  </section>
                  <section className="flex flex-row gap-2 text-slate-400">
                    <IconEye /> Dilihat{" "}
                    <span className="font-semibold">500</span> Kali
                  </section>
                </section>
              </section>
            </Card>
          </section>
        </section>
      </section>
    </main>
  </>
);

export default DetailBerita;
