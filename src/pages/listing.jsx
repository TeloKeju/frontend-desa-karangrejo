const Listing = () => {
  return (
    <>
      <main className="mt-20">
        <section className="container p-5 mx-auto mt-10">
          <section>
            <section>
              <h1 className="uppercase font-bold text-3xl text-start">
                Peta Desa
              </h1>
              <p className="font-semibold text-lg text-start">
                Menampilkan Peta Desa Dengan <i>Interest Point</i> Desa
                Karangrejo
              </p>
            </section>
            <section className="my-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15806.063585592974!2d112.0432787447341!3d-7.945518621430898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f7572ab20f71%3A0x1380449abe9d426f!2sKarangrejo%2C%20Kec.%20Kandat%2C%20Kabupaten%20Kediri%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1728295722179!5m2!1sid!2sid"
                width={"100%"}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Listing;
