import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const PPID = () => {
  return (
    <>
      <main className="mt-20 my-24">
        <section className="container mx-auto p-4 mt-10">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <section className="flex flex-col justify-center gap-3">
              <h1 className=" text-start font-bold text-4xl">PPID</h1>
              <p className="text-start text-xl">
                Pejabat Pengelola Informasi dan Dokumentasi (PPID) adalah
                pejabat yang bertanggung jawab di bidang penyimpanan,
                pendokumentasian, penyediaan, dan/atau pelayanan informasi di
                badan publik.
              </p>
              <section className="flex justify-start">
                <Card className="w-56">
                  <h1 className="text-start text-lg font-bold">
                    Dasar Hukum PPID
                  </h1>
                </Card>
              </section>
            </section>
            <section>
              <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link to={"#"}>
                  <Card className="">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-3-DFdUkXec.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Informasi <br /> Secara Berkala
                    </h1>
                  </Card>
                </Link>
                <Link to={"#"}>
                  <Card className=" ">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-2-SbK3LIat.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Informasi <br /> Serta Merta
                    </h1>
                  </Card>
                </Link>
                <Link to={"#"}>
                  <Card className=" ">
                    <img
                      src="https://cdn.digitaldesa.com/statics/profil-v2/assets/explore-menu-2-SbK3LIat.png"
                      alt=""
                    />
                    <h1 className="text-xs md:text-sm font-semibold uppercase">
                      Informasi <br /> Setiap Saat
                    </h1>
                  </Card>
                </Link>
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default PPID;
