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
      link: "/idm",
    },
    {
      name: "Berita",
      link: "/berita",
    },
  ];

  return (
    <>
      <section className="relative z-50">
        <Navbar fluid rounded className="fixed top-0 left-0 right-0">
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Kabupaten_Kediri_%28Seal_of_Kediri_Regency%29.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
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
