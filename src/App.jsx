import "./App.css";
import Header from "./components/header";
import { FooterDev } from "./components/footer";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Home from "./pages/home";
import ProfileDesa from "./pages/profilDesa";
import Listing from "./pages/listing";
import IDM from "./pages/infografis/idm";
import Berita from "./pages/berita";

import Penduduk from "./pages/infografis/penduduk";
import APBDesa from "./pages/infografis/apbDesa";
import Stunting from "./pages/infografis/stunting";
import Bansos from "./pages/infografis/bansos";
import SDGs from "./pages/infografis/sdgs";

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
        <Route path="/berita" element={<Berita />} />
        {/* <Route path="/infografis/penduduk" element={<Penduduk />} /> */}
      </Routes>
      <FooterDev />
    </BrowserRouter>
  );
}

export default App;
