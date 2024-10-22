import { Navbar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import {
  IconUser,
  IconCash,
  IconChartBar,
  IconPackage,
  IconCrown,
  IconNumbers,
} from "@tabler/icons-react";

const InfografisLink = () => {
  const navigate = useNavigate();

  const infografisMenu = [
    {
      icon: <IconUser />,
      name: "Penduduk",
      link: "/infografis/",
    },
    {
      icon: <IconCash />,
      name: "APBDes",
      link: "/infografis/apb-desa",
    },
    {
      icon: <IconChartBar />,
      name: "Stunting",
      link: "/infografis/stunting",
    },
    {
      icon: <IconPackage />,
      name: "Bansos",
      link: "/infografis/bansos",
    },
    {
      icon: <IconCrown />,
      name: "IDM",
      link: "/infografis/idm",
    },
    {
      icon: <IconNumbers />,
      name: "SDGs",
      link: "/infografis/sdgs",
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
                {infografisMenu.map((item, index) => {
                  return (
                    <Button
                      color="gray"
                      className="w-20 lg:w-28"
                      onClick={() => navigate(`${item.link}`)}
                    >
                      <section className="flex flex-col justify-center items-center">
                        {item.icon}
                        <p>{item.name}</p>
                      </section>
                    </Button>
                  );
                })}
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
            {infografisMenu.map((item, index) => {
              if (index < 3) {
                return (
                  <Button
                    to={item.link}
                    color="gray"
                    className="w-32"
                    onClick={() => navigate(`${item.link}`)}
                  >
                    <section className="flex flex-col justify-center items-center">
                      {item.icon}
                      <p>{item.name}</p>
                    </section>
                  </Button>
                );
              }
            })}
          </Button.Group>
          <Button.Group outline>
            {infografisMenu.map((item, index) => {
              if (index > 2) {
                return (
                  <Button
                    to={item.link}
                    color="gray"
                    className="w-32"
                    onClick={() => navigate(`${item.link}`)}
                  >
                    <section className="flex flex-col justify-center items-center">
                      {item.icon}
                      <p>{item.name}</p>
                    </section>
                  </Button>
                );
              }
            })}
          </Button.Group>
        </div>
      </section>
    </>
  );
};

export default InfografisLink;
