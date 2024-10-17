import InfografisLink from "./link";

const Penduduk = () => {
  //   console.log("test");
  return (
    <>
      {/* LINK INFOGRAFIS */}
      <main className="mt-20">
        <InfografisLink />
        <section className="container p-5  mx-auto mt-10">
          <section className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            <section className="flex justify-center items-center">
              <section>
                <h1 className="text-start text-3xl font-bold uppercase">
                  Demografi <br /> Penduduk
                </h1>
                <p className="text-start text-xl">
                  Memberikan informasi lengkap mengenai karakteristik demografi
                  penduduk suatu wilayah. Mulai dari jumlah penduduk, usia,
                  jenis kelamin, tingkat pendidikan, pekerjaan, agama, dan aspek
                  penting lainnya yang menggambarkan komposisi populasi secara
                  rinci.
                </p>
              </section>
            </section>
            <section className="flex justify-center sm:justify-end">
              <img
                src="https://cdn.digitaldesa.com/statics/profil-v2/assets/other-1-DEP2VegA.png"
                alt=""
                className="w-80"
              />
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Penduduk;
