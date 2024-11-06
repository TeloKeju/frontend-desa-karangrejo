"use client";

import {
  IconCamera,
  IconCaretLeft,
  IconCaretRight,
  IconCash,
  IconDoorExit,
  IconNews,
  IconShoppingBag,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Admin = ({ children }) => {
  const navMenu = [
    {
      icon: <IconUser size={32} />,
      name: "Penduduk",
      link: "",
    },
    {
      icon: <IconCash size={32} />,
      name: "APBDesa",
      link: "apb-desa",
    },
    {
      icon: <IconNews size={32} />,
      name: "Berita",
      link: "berita",
    },
    {
      icon: <IconCamera size={32} />,
      name: "Galeri",
      link: "galeri",
    },
    {
      icon: <IconUsers size={32} />,
      name: "SOTK",
      link: "sotk",
    },
    {
      icon: <IconShoppingBag size={32} />,
      name: "UMKM",
      link: "umkm",
    },
    // {
    //   icon: <IconChartBar size={32} />,
    //   name: "Stunting",
    //   link: "stunting",
    // },
    // {
    //   icon: <IconPackage size={32} />,
    //   name: "Bansos",
    //   link: "bansos",
    // },
    // {
    //   icon: <IconCrown size={32} />,
    //   name: "IDM",
    //   link: "idm",
    // },
    // {
    //   icon: <IconNumber size={32} />,
    //   name: "SDGs",
    //   link: "sdgs",
    // },
  ];

  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  function handleLogOut() {
    deleteCookie("token");
    return navigate("/");
  }

  const token = getCookie("token");

  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <section className="w-full flex bg-blue-400">
      <div
        className={`w-1/5 min-h-[100vh] min-w-[288px] ${
          open ? "block" : "hidden"
        } transition-all duration-1000 absolute lg:relative bg-blue-400 left-0 z-10 lg:z-0`}
      >
        <div className="flex items-center h-28 px-6 relative">
          <div className="flex gap-3 items-top">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Kabupaten_Kediri_%28Seal_of_Kediri_Regency%29.svg"
              alt=""
              className="w-12"
            />
            <div className="text-start text-white">
              <h1 className="text-base font-bold leading-5">DESA KARANGREJO</h1>
              <h1 className="text-sm font-bold">KECAMATAN KANDAT</h1>
              <p className="text-xs ">Kediri, Jawa Timur</p>
            </div>
          </div>
          <div className="absolute -right-6 z-10 lg:hidden">
            <button
              className={`text-white rounded-full p-2 bg-blue-500 hover:bg-blue-500 ${
                open ? "" : "bg-blue-500"
              }`}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IconCaretLeft size={30} />
              ) : (
                <IconCaretRight size={30} />
              )}
            </button>
          </div>
        </div>
        <div className="h-[calc(100vh-112px)]">
          <ul>
            {navMenu.map((item, i) => (
              <li
                className="text-white text-start text-2xl leading-6 py-4 px-6 flex items-center gap-2"
                key={i}
              >
                {item.icon}
                <Link to={`/admin/${item.link}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${open ? "w-full lg:w-4/5" : "w-full"}`}>
        <div className="h-28 flex items-center justify-end relative">
          <div className="absolute -left-6">
            <button
              className={`text-white rounded-full p-2 hover:bg-blue-500 ${
                open ? "" : "bg-blue-500"
              }`}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <IconCaretLeft size={30} />
              ) : (
                <IconCaretRight size={30} />
              )}
            </button>
          </div>
          <div className="me-2">
            <button
              className="rounded-full p-4 text-white font-bold"
              onClick={handleLogOut}
            >
              <IconDoorExit />
            </button>
          </div>
        </div>
        <div className="bg-white h-[calc(100vh-112px)] overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Admin;
