// import Link from "next/link";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Profil Desa",
      link: "/profile-desa",
    },
    {
      name: "Infografis",
      link: "/infografis",
    },
    {
      name: "Listing",
      link: "/listing",
    },
    {
      name: "IDM",
      link: "/infografis/idm",
    },
    {
      name: "Berita",
      link: "/berita",
    },
    {
      name: "Belanja",
      link: "/belanja",
    },
    // {
    //   name: "PPID",
    //   link: "/ppid",
    // },
  ];

  return (
    <>
      <section className="relative z-50 bg">
        <Navbar fluid rounded className="fixed top-0 left-0 right-0">
          <Navbar.Brand href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Kabupaten_Kediri_%28Seal_of_Kediri_Regency%29.svg"
              className="mr-3 h-12 sm:h-16"
              alt="Desa Karangrejo"
            />
            <section className="text-start self-center whitespace-nowrap text-xl dark:text-white">
              <h1 className="font-bold">Desa Karangrejo</h1>
              <span className="font-medium">Kabupaten Kediri</span>
            </section>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {headerMenu.map((item, i) => (
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

export default Header;
