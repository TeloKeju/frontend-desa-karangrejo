/* eslint-disable react/prop-types */
"use client";

import { Footer, Popover } from "flowbite-react";
import {
  IconBrandYoutube,
  IconBrandFacebook,
  IconClock,
  IconHome,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

function PopOverTelp({ childern, noTelp }) {
  return (
    <Popover
      aria-labelledby="default-popover"
      content={
        <Link
          to={`https://wa.me/${noTelp}`}
          target="_blank"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white"
            ></h3>
          </div>
          <div className="px-3 py-2">
            <p>{noTelp}</p>
          </div>
        </Link>
      }
    >
      <p className="text-white text-start cursor-pointer">{childern}</p>
    </Popover>
  );
}

export function FooterDev() {
  return (
    <Footer className="bg-[#7b9fcc]">
      <div className="w-full">
        <div className=" container mx-auto grid w-full grid-cols-1 px-4 py-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5 mb-10 md:mb-0">
            {/* <Footer.Title title="Company" /> */}
            <Footer.LinkGroup col>
              {/* <Footer.Link href="#">About</Footer.Link> */}
              <div className="flex gap-3 justify-center md:justify-start">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Kabupaten_Kediri_%28Seal_of_Kediri_Regency%29.svg"
                  alt=""
                  className="w-24"
                />
                <div className="mt-2 text-start text-white">
                  <h1>Desa Karangrejo</h1>
                  <h2>Kecamatan Kandat</h2>
                  <h2>Kabupaten Kediri</h2>
                  <h2>Provinsi Jawa Timur</h2>
                </div>
              </div>
            </Footer.LinkGroup>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-x-4 lg:gap-x-10 gap-x-8 col-span-7">
            <div className="col-span-1">
              <Footer.Title
                title="Jelajahi"
                className="mb-3 text-start font-bold text-white text-lg"
              />
              <div className="flex-col flex gap-1 text-lg">
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"https://cekdptonline.kpu.go.id/"} target="_blank">
                    Cek DPT Online
                  </Link>
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link
                    to={"https://cekbansos.kemensos.go.id/"}
                    target="_blank"
                  >
                    Cek DTKS
                  </Link>
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"https://kedirikab.go.id/"} target="_blank">
                    Laman Kab. Kediri
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Footer.Title
                title="Telepon Penting"
                className="mb-3 text-start font-bold text-white text-lg"
              />
              <div className="flex-col flex gap-1">
                <PopOverTelp
                  noTelp={"+6281232051122"}
                  childern={"Damkar Kabupaten Kediri"}
                />
                <PopOverTelp
                  noTelp={"+6285745127678"}
                  childern={"Ambulance Desa"}
                />
                <PopOverTelp
                  noTelp={"+625815264401"}
                  childern={"Bhabinkantibnas Desa"}
                />

                <PopOverTelp
                  noTelp={"+6289768766890"}
                  childern={"Babinsa Desa"}
                />
                <PopOverTelp
                  noTelp={"+6289768766890"}
                  childern={"PUSTU Kandat"}
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Footer.Title
                title="Kontak Desa"
                className="mb-3 text-start font-bold text-white text-lg"
              />
              <div className="flex-col flex gap-1">
                <Link
                  to={"https://wa.me/+6281559870098"}
                  className="flex gap-1 items-center flex-wrap text-white text-sm text-start"
                >
                  <IconPhone size={18} /> +6281559870098
                </Link>
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconMail size={18} /> pdkarangrejo@gmail.com
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconClock size={18} /> Senin - Jumat, 08.00 - 15.00
                </div>
                <div className="flex gap-1 items-start flex-wrap text-white text-sm text-start">
                  <IconHome size={18} />
                  <div>
                    Dusun Karangrejo, RT 1 RW 1
                    <br />
                    Desa Karangrejo
                    <br />
                    Kecamatan Kandat
                    <br />
                    Kabupaten Kediri
                    <br />
                    Kode Pos 64173
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#436187] py-6 ">
          <div className="container mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright className="text-white" by="DRTPM" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                className="text-white"
                href="https://www.facebook.com/PemdesKarangrejoKandatKediri"
                target="_blank"
                icon={IconBrandFacebook}
              />
              <Footer.Icon
                className="text-white"
                href="https://www.youtube.com/channel/UCNot-QC8Q8Fz826hpmqJtsw/"
                target="_blank"
                icon={IconBrandYoutube}
              />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}
