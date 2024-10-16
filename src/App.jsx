import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/header";
import { FooterDev } from "./components/footer";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Home from "./pages/home";
import ProfileDesa from "./pages/profilDesa";
import Listing from "./pages/listing";
import Infografis from "./pages/infografis";
import IDM from "./pages/idm";
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
        <Route path="/infografis/penduduk" element={<Infografis />} />
        <Route path="/idm" element={<IDM />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/infografis/penduduk" element={<Penduduk />} />
        {/* <Route path="/test" element={<Penduduk />} /> */}
      </Routes>
      <FooterDev />
    </BrowserRouter>
  );
}

export default App;
