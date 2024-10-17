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

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-desa" element={<ProfileDesa />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/infografis/penduduk" element={<Penduduk />} />
        <Route path="/infografis/idm" element={<IDM />} />
        <Route path="/berita" element={<Berita />} />
        {/* <Route path="/infografis/penduduk" element={<Penduduk />} /> */}
      </Routes>
      <FooterDev />
    </BrowserRouter>
  );
}

export default App;
