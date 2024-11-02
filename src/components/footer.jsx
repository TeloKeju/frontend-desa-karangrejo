"use client";

import { Button, Footer, Popover } from "flowbite-react";
import {
  IconBrandInstagram,
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
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white"
            ></h3>
          </div>
          <div className="px-3 py-2">
            <p>{noTelp}</p>
          </div>
        </div>
      }
    >
      <p className="text-white text-start">{childern}</p>
    </Popover>
  );
}

export function FooterDev() {
  return (
    <Footer bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-1 px-6 py-8 md:grid-cols-12 md:gap-6">
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
                className="mb-3 text-start text-lg"
              />
              <div className="flex-col flex gap-1 text-lg">
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"/"}>Home</Link>
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"/"}>Home</Link>
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"/"}>Home</Link>
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-start">
                  <Link to={"/"}>Home</Link>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Footer.Title
                title="Telepon Penting"
                className="mb-3 text-start text-lg"
              />
              <div className="flex-col flex gap-1">
                <PopOverTelp
                  noTelp={"+6289768766890"}
                  childern={"Damkar Kandat"}
                />
                <PopOverTelp
                  noTelp={"+6289768766890"}
                  childern={"Ambulance Desa"}
                />
                <PopOverTelp
                  noTelp={"+6289768766890"}
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
                className="mb-3 text-start text-lg"
              />
              <div className="flex-col flex gap-1">
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconPhone size={18} /> +6286876787678
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconMail size={18} /> abogoboga@gmail.com
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconClock size={18} /> Senin-Jumat : 08.00-16.00
                </div>
                <div className="flex gap-1 items-center flex-wrap text-white text-sm text-start">
                  <IconHome size={18} /> Jalan Raya Wates-Kediri
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="DRTPM" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={IconBrandInstagram} />
            {/* <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} /> */}
          </div>
        </div>
      </div>
    </Footer>
  );
}
