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
      icon: IconUser,
      name: "Home",
      link: "/",
    },
    {
      name: "Profil Desa",
      link: "/profile-desa",
    },
    {
      name: "Infografis",
      link: "/infografis/penduduk",
    },
    {
      name: "Listing",
      link: "/listing",
    },
    {
      name: "IDM",
      link: "/idm",
    },
    {
      name: "Berita",
      link: "/berita",
    },
  ];

  return (
    <>
      <section className="p-2">
        <section className="flex justify-between">
          <section className="text-start self-center whitespace-nowrap text-3xl  dark:text-white uppercase font-bold">
            <h1>
              Infografis <br /> desa Karangrejo
            </h1>
          </section>
          <section>
            <div className="flex flex-wrap gap-2">
              <Button.Group outline>
                <Button color="gray" className="">
                  <IconUser className="mr-3 h-4 w-4" />
                  Penduduk
                </Button>
                <Button color="gray">
                  <IconCash className="mr-3 h-4 w-4" />
                  APBDes
                </Button>
                <Button color="gray">
                  <IconChartBar className="mr-3 h-4 w-4" /> <br />
                  Stunting
                </Button>
                <Button color="gray">
                  <IconPackage className="mr-3 h-4 w-4" />
                  Bansos
                </Button>
                <Button color="gray">
                  <IconCrown className="mr-3 h-4 w-4" />
                  IDM
                </Button>
                <Button color="gray">
                  <IconNumbers className="mr-3 h-4 w-4" />
                  SDGs
                </Button>
              </Button.Group>
            </div>
          </section>
        </section>
      </section>
      <section className="">
        <Navbar fluid rounded className="relative">
          <Navbar.Brand href="https://flowbite-react.com">
            <span className=" text-start self-center whitespace-nowrap text-3xl  dark:text-white uppercase font-bold">
              Infografis <br /> desa Karangrejo
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {infografisMenu.map((item, i) => (
              <Navbar.Link key={i}>
                <Link to={item.link}>{item.name}</Link>
              </Navbar.Link>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </section>
    </>
  );
};

export default InfografisLink;
