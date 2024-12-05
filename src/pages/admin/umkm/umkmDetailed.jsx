import { useParams } from "react-router-dom";
import Admin from "../adminLayout";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";

const UMKMDetailed = () => {
  const [dataUMKM, setDataUMKM] = useState([]);

  const { id } = useParams();

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      const res2 = await apiKarangrejo.get("/comment");
      console.log(res2.data);
      setDataUMKM(res.data.umkm.filter((item) => item.id == id));
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getDataUMKM();
  }, []);
  return (
    <Admin>
      <div>UMKMDetailed</div>
    </Admin>
  );
};

export default UMKMDetailed;
