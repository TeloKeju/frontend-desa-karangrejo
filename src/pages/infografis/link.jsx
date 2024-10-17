import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

import {
  IconUser,
  IconCash,
  IconChartBar,
  IconPackage,
  IconCrown,
  IconNumbers,
} from "@tabler/icons-react";

const InfografisLink = () => {
  const infografisMenu = [
    {
      icon: <IconUser />,
      name: "Home",
      // link: "/",
    },
    {
      icon: <IconUser />,
      name: "Home",
      // link: "/",
    },
    {
      icon: <IconUser />,
      name: "Home",
      // link: "/",
    },
    {
      icon: <IconUser />,
      name: "Home",
      // link: "/",
    },
  ];

  return (
    <>
      <section className="p-2">
        <section className=" hidden md:flex md:justify-between ">
          <section className="text-start self-center whitespace-nowrap text-3xl  dark:text-white uppercase font-bold ">
            <h1>
              Infografis <br /> desa Karangrejo
            </h1>
          </section>
          <section>
            <div className="flex flex-wrap">
              <Button.Group outline>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconUser className="" />
                    <p>Penduduk</p>
                  </section>
                </Button>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconCash className="" />
                    <p>APBDes</p>
                  </section>
                </Button>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconChartBar className="" />
                    <p>Stunting</p>
                  </section>
                </Button>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconPackage className="" />
                    <p>Bansos</p>
                  </section>
                </Button>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconCrown className="" />
                    <p>IDM</p>
                  </section>
                </Button>
                <Button color="gray" className="w-20 lg:w-28">
                  <section className="flex flex-col justify-center items-center">
                    <IconNumbers className="" />
                    <p>APBDes</p>
                  </section>
                </Button>
              </Button.Group>
            </div>
          </section>
        </section>

        <div className="flex flex-wrap md:hidden justify-center items-center mt">
          <section className=" self-center whitespace-nowrap text-3xl  dark:text-white uppercase font-bold ">
            <h1>
              Infografis <br /> desa Karangrejo
            </h1>
          </section>
          <Button.Group outline>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconUser className="" />
                <p>Penduduk</p>
              </section>
            </Button>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconCash className="" />
                <p>APBDes</p>
              </section>
            </Button>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconChartBar className="" />
                <p>Stunting</p>
              </section>
            </Button>
          </Button.Group>
          <Button.Group outline>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconPackage className="" />
                <p>Bansos</p>
              </section>
            </Button>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconCrown className="" />
                <p>IDM</p>
              </section>
            </Button>
            <Button color="gray" className="w-32">
              <section className="flex flex-col justify-center items-center">
                <IconNumbers className="" />
                <p>APBDes</p>
              </section>
            </Button>
          </Button.Group>
        </div>
      </section>
    </>
  );
};

export default InfografisLink;
