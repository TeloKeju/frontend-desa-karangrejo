import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header";
import { FooterDev } from "./components/footer";

import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/home";
import ProfileDesa from "./pages/profilDesa";
import Listing from "./pages/listing";
import IDM from "./pages/infografis/idm";
import Berita from "./pages/berita";
import Belanja from "./pages/belanja";
import Pemerintah from "./pages/pemerintah";
import Galeri from "./pages/galeri";

import PPID from "./pages/ppid";

import Penduduk from "./pages/infografis/penduduk";
import APBDesa from "./pages/infografis/apbDesa";
import Stunting from "./pages/infografis/stunting";
import Bansos from "./pages/infografis/bansos";
import SDGs from "./pages/infografis/sdgs";

import DetailBerita from "./pages/detail/detailBerita";
import DetailBelanja from "./pages/detail/detailBelanja";
import PendudukAdmin from "./pages/admin/penduduk/penduduk";
import StuntingAdmin from "./pages/admin/stunting";
import APBDesaAdmin from "./pages/admin/apbDesa/apbdesa";
import BansosAdmin from "./pages/admin/bansos";
import SDGsAdmin from "./pages/admin/sdgs";
import IDMAdmin from "./pages/admin/IDM";
import NewsPageAdmin from "./pages/admin/news";
import Login from "./pages/admin/login/login";
import GaleriAdmin from "./pages/admin/galeri/galeri";
import DataSOTK from "./pages/admin/SOTK/dataSOTK";
import DataUMKM from "./pages/admin/umkm";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import UMKMDetailed from "./pages/admin/umkm/umkmDetailed";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    // <BrowserRouter>
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-desa" element={<ProfileDesa />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/pemerintah" element={<Pemerintah />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/infografis">
          <Route index element={<Penduduk />} />
          <Route path="idm" element={<IDM />} />
          <Route path="apb-desa" element={<APBDesa />} />
          <Route path="stunting" element={<Stunting />} />
          <Route path="bansos" element={<Bansos />} />
          <Route path="sdgs" element={<SDGs />} />
        </Route>

        {/* <Route path="/berita" element={<Berita />} /> */}

        <Route path="/berita">
          <Route index element={<Berita />} />
          <Route path=":id" element={<DetailBerita />} />
        </Route>

        <Route path="/belanja">
          <Route index element={<Belanja />} />
          <Route path=":id" element={<DetailBelanja />} />
        </Route>

        <Route path="/ppid">
          <Route index element={<PPID />} />
          <Route path="dasar-hukum" element={<IDM />} />
          <Route path="berkala" element={<APBDesa />} />
          <Route path="serta-merta" element={<Stunting />} />
          <Route path="setiap-saat" element={<Bansos />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin">
          <Route index element={<PendudukAdmin />} />
          <Route path="stunting" element={<StuntingAdmin />} />
          <Route path="sotk" element={<DataSOTK />} />
          <Route path="apb-desa" element={<APBDesaAdmin />} />
          <Route path="galeri" element={<GaleriAdmin />} />
          <Route path="bansos" element={<BansosAdmin />} />
          <Route path="idm" element={<IDMAdmin />} />
          <Route path="sdgs" element={<SDGsAdmin />} />
          <Route path="berita" element={<NewsPageAdmin />} />
          <Route path="umkm" element={<DataUMKM />} />
          <Route path="umkm/:id" element={<UMKMDetailed />} />
          {/* <Route path="penduduk" element={<PendudukAdmin />} /> */}
        </Route>
        {/* <Route path="/infografis/penduduk" element={<Penduduk />} /> */}
      </Routes>
      {!isAdminRoute && <FooterDev />}
      {/* </BrowserRouter> */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={""}
      />
    </>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default App;
