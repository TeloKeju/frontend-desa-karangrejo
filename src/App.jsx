import "./App.css";
import Header from "./components/header";
import { FooterDev } from "./components/footer";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Home from "./pages/home";
import ProfileDesa from "./pages/profilDesa";
import Listing from "./pages/listing";
import IDM from "./pages/infografis/idm";
import Berita from "./pages/berita";
import Belanja from "./pages/belanja";

import PPID from "./pages/ppid";

import Penduduk from "./pages/infografis/penduduk";
import APBDesa from "./pages/infografis/apbDesa";
import Stunting from "./pages/infografis/stunting";
import Bansos from "./pages/infografis/bansos";
import SDGs from "./pages/infografis/sdgs";

import DetailBerita from "./pages/detail/detailBerita";
import DetailBelanja from "./pages/detail/detailBelanja";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-desa" element={<ProfileDesa />} />
        <Route path="/listing" element={<Listing />} />
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
        {/* <Route path="/infografis/penduduk" element={<Penduduk />} /> */}
      </Routes>
      <FooterDev />
    </BrowserRouter>
  );
}

export default App;
