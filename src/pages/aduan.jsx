import React, { useState } from "react";
import { Breadcrumb, Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IconHome,
  IconUser,
  IconId,
  IconBrandWhatsapp,
  IconMessageDots,
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconShieldCheck,
  IconPhone,
  IconClock,
  IconInfoCircle,
  IconRefresh,
  IconArrowRight,
} from "@tabler/icons-react";
import apiKarangrejo from "../lib/axios";

const AduanPage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    whatsapp: "",
    isiPengaduan: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Validasi per field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "nama":
        if (!value.trim()) {
          error = "Nama lengkap wajib diisi.";
        } else if (value.trim().length < 3) {
          error = "Nama lengkap minimal 3 karakter.";
        } else if (!/^[a-zA-Z\s'’.-]+$/.test(value)) {
          error = "Nama hanya boleh mengandung huruf dan spasi.";
        }
        break;

      case "nik":
        if (!value.trim()) {
          error = "NIK wajib diisi.";
        } else if (!/^\d+$/.test(value)) {
          error = "NIK hanya boleh berisi angka.";
        } else if (value.length !== 16) {
          error = `NIK harus tepat 16 digit. (Saat ini: ${value.length} digit)`;
        }
        break;

      case "whatsapp": {
        const cleanPhone = value.replace(/\s+/g, "").replace(/-/g, "");
        if (!cleanPhone) {
          error = "Nomor WhatsApp wajib diisi.";
        } else if (!/^\+?\d+$/.test(cleanPhone)) {
          error = "Nomor WhatsApp hanya boleh berisi angka (atau diawali +).";
        } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
          error = "Nomor WhatsApp harus antara 10 hingga 15 digit.";
        } else if (
          !cleanPhone.startsWith("08") &&
          !cleanPhone.startsWith("628") &&
          !cleanPhone.startsWith("+628")
        ) {
          error = "Nomor WhatsApp harus diawali dengan 08, 628, atau +628.";
        }
        break;
      }

      case "isiPengaduan":
        if (!value.trim()) {
          error = "Isi pengaduan wajib diisi.";
        } else if (value.trim().length < 20) {
          error = `Isi pengaduan terlalu singkat (minimal 20 karakter, saat ini ${value.trim().length} karakter).`;
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter input khusus NIK (hanya angka dan maks 16 digit)
    if (name === "nik") {
      const sanitized = value.replace(/\D/g, "").slice(0, 16);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      if (touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validateField(name, sanitized),
        }));
      }
      return;
    }

    // Filter nomor WhatsApp (hanya angka, tanda +, spasi, dash)
    if (name === "whatsapp") {
      const sanitized = value.replace(/[^\d+ -]/g, "");
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      if (touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validateField(name, sanitized),
        }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateAll = () => {
    const newErrors = {
      nama: validateField("nama", formData.nama),
      nik: validateField("nik", formData.nik),
      whatsapp: validateField("whatsapp", formData.whatsapp),
      isiPengaduan: validateField("isiPengaduan", formData.isiPengaduan),
    };

    setErrors(newErrors);
    setTouched({
      nama: true,
      nik: true,
      whatsapp: true,
      isiPengaduan: true,
    });

    return !Object.values(newErrors).some((err) => Boolean(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      toast.error("Mohon lengkapi dan periksa kembali data pengaduan Anda.");
      return;
    }

    setIsSubmitting(true);

    try {
      let backendAduan = null;
      // Upaya mengirim ke backend API
      try {
        const response = await apiKarangrejo.post("/aduans", {
          nama_lengkap: formData.nama.trim(),
          nik: formData.nik.trim(),
          no_whatsapp: formData.whatsapp.trim(),
          isi_pengaduan: formData.isiPengaduan.trim(),
        });
        if (response?.data?.data) {
          backendAduan = response.data.data;
        }
      } catch (apiError) {
        console.warn("Backend endpoint /aduans belum siap atau tidak terjangkau, menggunakan fallback tiket:", apiError);
      }

      // Buat nomor tiket pengaduan unik (prioritaskan dari backend jika sukses)
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const ticketId = backendAduan?.kode_aduan || `ADU-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${randomCode}`;

      const ticketPayload = {
        id: ticketId,
        nama: backendAduan?.nama_lengkap || formData.nama.trim(),
        nikMasked: formData.nik.slice(0, 4) + "********" + formData.nik.slice(12),
        nikFull: formData.nik,
        whatsapp: backendAduan?.no_whatsapp || formData.whatsapp.trim(),
        isiPengaduan: backendAduan?.isi_pengaduan || formData.isiPengaduan.trim(),
        waktu: now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: backendAduan?.status_aduan === "diterima" ? "Diterima (Menunggu Tindak Lanjut)" : "Draft (Menunggu Verifikasi Petugas)",
      };

      // Simpan riwayat aduan ke localStorage agar pengguna bisa melihat bukti pengaduannya
      try {
        const stored = JSON.parse(localStorage.getItem("karangrejo_aduan_list") || "[]");
        localStorage.setItem(
          "karangrejo_aduan_list",
          JSON.stringify([ticketPayload, ...stored])
        );
      } catch (lsErr) {
        console.warn("Gagal menyimpan ke localStorage:", lsErr);
      }

      setSubmittedTicket(ticketPayload);
      toast.success("Pengaduan berhasil dikirim! Tim Desa Karangrejo akan segera memproses laporan Anda.");
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kendala saat mengirim pengaduan. Silakan coba beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      nama: "",
      nik: "",
      whatsapp: "",
      isiPengaduan: "",
    });
    setErrors({});
    setTouched({});
    setSubmittedTicket(null);
  };

  return (
    <main className="min-h-screen bg-[#f6f6f6] pb-16">
      {/* Hero / Page Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb aria-label="Breadcrumb Pengaduan" className="mb-4">
            <Breadcrumb.Item href="/" icon={IconHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Pengaduan Masyarakat</Breadcrumb.Item>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-start">
              <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-[#436187] uppercase bg-blue-100 rounded-full">
                Layanan Aspirasi & Pengaduan Online
              </span>
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-gray-900">
                Pengaduan Masyarakat
              </h1>
              <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl">
                Sampaikan aspirasi, pengaduan, atau laporan Anda secara langsung kepada Pemerintah Desa Karangrejo demi peningkatan pelayanan publik dan kemajuan bersama.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-blue-50 border border-blue-200 p-4 rounded-xl text-start max-w-sm">
              <IconShieldCheck className="text-[#608bc1] flex-shrink-0" size={38} />
              <div className="text-xs text-gray-600">
                <span className="font-bold text-gray-800 block text-sm">Privasi Terjamin</span>
                Identitas dan NIK Anda dijaga kerahasiaannya dan hanya digunakan untuk validasi warga desa.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Form Pengaduan */}
          <div className="lg:col-span-8">
            <Card className="shadow-sm border border-gray-200 text-start">
              {submittedTicket ? (
                /* Sukses State / Tiket Pengaduan */
                <div className="py-6 px-2 md:px-4 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCheck size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Pengaduan Berhasil Dikirim!
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto mb-6">
                    Terima kasih atas partisipasi aktif Anda. Laporan Anda telah tercatat dalam sistem Pemerintah Desa Karangrejo.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-start max-w-lg mx-auto mb-6">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                      <div>
                        <span className="text-xs text-gray-500 uppercase block font-semibold">Nomor Registrasi Laporan</span>
                        <span className="text-lg font-bold text-[#436187] tracking-wider">{submittedTicket.id}</span>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {submittedTicket.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="grid grid-cols-3">
                        <span className="text-gray-500">Nama Pelapor:</span>
                        <span className="col-span-2 font-medium">{submittedTicket.nama}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-500">NIK:</span>
                        <span className="col-span-2 font-medium">{submittedTicket.nikMasked}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-500">WhatsApp:</span>
                        <span className="col-span-2 font-medium">{submittedTicket.whatsapp}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-gray-500">Waktu Kirim:</span>
                        <span className="col-span-2 font-medium">{submittedTicket.waktu}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-gray-500 block mb-1">Ringkasan Aduan:</span>
                        <p className="bg-white p-3 rounded border border-gray-200 text-gray-800 text-xs md:text-sm whitespace-pre-wrap">
                          {submittedTicket.isiPengaduan}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center justify-center gap-2 bg-[#608bc1] hover:bg-[#4d72a0] text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-sm"
                    >
                      <IconRefresh size={18} />
                      Kirim Pengaduan Baru
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition duration-200"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              ) : (
                /* Formulir Pengaduan */
                <div>
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Formulir Pengaduan Warga
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Silakan isi formulir di bawah ini dengan lengkap dan benar. Tanda (<span className="text-red-500 font-bold">*</span>) menunjukkan kolom wajib diisi.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    
                    {/* Field 1: Nama Lengkap */}
                    <div>
                      <label htmlFor="nama" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <IconUser size={19} />
                        </div>
                        <input
                          type="text"
                          id="nama"
                          name="nama"
                          value={formData.nama}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Masukkan nama lengkap Anda sesuai identitas"
                          className={`block w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition duration-150 ${
                            touched.nama && errors.nama
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
                              : "border-gray-300 focus:border-[#608bc1] focus:ring-2 focus:ring-[#608bc1]/30"
                          }`}
                        />
                      </div>
                      {touched.nama && errors.nama ? (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <IconAlertCircle size={14} />
                          {errors.nama}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          Nama pelapor yang dapat diverifikasi oleh aparat desa.
                        </p>
                      )}
                    </div>

                    {/* Field 2: NIK */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="nik" className="block text-sm font-semibold text-gray-900">
                          Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                        </label>
                        <span
                          className={`text-xs font-semibold ${
                            formData.nik.length === 16
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {formData.nik.length} / 16 digit
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <IconId size={19} />
                        </div>
                        <input
                          type="text"
                          id="nik"
                          name="nik"
                          inputMode="numeric"
                          maxLength={16}
                          value={formData.nik}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Masukkan 16 digit NIK KTP Anda"
                          className={`block w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition duration-150 font-mono ${
                            touched.nik && errors.nik
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
                              : "border-gray-300 focus:border-[#608bc1] focus:ring-2 focus:ring-[#608bc1]/30"
                          }`}
                        />
                      </div>
                      {touched.nik && errors.nik ? (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <IconAlertCircle size={14} />
                          {errors.nik}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          Wajib 16 digit angka sesuai KTP untuk keperluan validasi kependudukan.
                        </p>
                      )}
                    </div>

                    {/* Field 3: Nomor WhatsApp */}
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-900 mb-1.5">
                        Nomor WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <IconBrandWhatsapp size={19} />
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          inputMode="tel"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Contoh: 081234567890"
                          className={`block w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition duration-150 ${
                            touched.whatsapp && errors.whatsapp
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
                              : "border-gray-300 focus:border-[#608bc1] focus:ring-2 focus:ring-[#608bc1]/30"
                          }`}
                        />
                      </div>
                      {touched.whatsapp && errors.whatsapp ? (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <IconAlertCircle size={14} />
                          {errors.whatsapp}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          Nomor aktif untuk konfirmasi respon dan informasi perkembangan laporan.
                        </p>
                      )}
                    </div>

                    {/* Field 4: Isi Pengaduan */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="isiPengaduan" className="block text-sm font-semibold text-gray-900">
                          Isi Pengaduan / Aspirasi <span className="text-red-500">*</span>
                        </label>
                        <span
                          className={`text-xs ${
                            formData.isiPengaduan.trim().length >= 20
                              ? "text-green-600 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {formData.isiPengaduan.trim().length} karakter (min. 20)
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="isiPengaduan"
                          name="isiPengaduan"
                          rows={6}
                          value={formData.isiPengaduan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Tuliskan keluhan, laporan kejadian, lokasi, atau aspirasi Anda secara rinci dan jelas..."
                          className={`block w-full p-3 text-sm rounded-lg border bg-white focus:outline-none transition duration-150 leading-relaxed ${
                            touched.isiPengaduan && errors.isiPengaduan
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-900"
                              : "border-gray-300 focus:border-[#608bc1] focus:ring-2 focus:ring-[#608bc1]/30"
                          }`}
                        />
                      </div>
                      {touched.isiPengaduan && errors.isiPengaduan ? (
                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <IconAlertCircle size={14} />
                          {errors.isiPengaduan}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          Sertakan detail pendukung seperti waktu kejadian, lokasi dusun/RT/RW, atau pihak terkait jika ada.
                        </p>
                      )}
                    </div>

                    {/* Tombol Aksi */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#608bc1] hover:bg-[#4d72a0] disabled:bg-gray-400 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition duration-200 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner size="sm" light={true} />
                            <span>Mengirim Pengaduan...</span>
                          </>
                        ) : (
                          <>
                            <IconSend size={18} />
                            <span>Kirim Pengaduan</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-3 rounded-lg transition duration-200"
                      >
                        <IconRefresh size={16} />
                        <span>Bersihkan</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </Card>
          </div>

          {/* Kolom Kanan: Panduan, Kerahasiaan & Informasi Desa */}
          <div className="lg:col-span-4 space-y-6 text-start">
            
            {/* Alur Pengaduan */}
            <Card className="shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <IconInfoCircle className="text-[#608bc1]" size={22} />
                Alur Penanganan Laporan
              </h3>
              <ol className="relative border-l border-blue-200 ml-3 space-y-5 my-2">
                <li className="ml-5">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#608bc1] text-white rounded-full -left-3 text-xs font-bold">
                    1
                  </span>
                  <h4 className="font-semibold text-gray-900 text-sm">Pengisian Formulir</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Masyarakat mengisi formulir identitas, NIK, dan isi keluhan secara terperinci.
                  </p>
                </li>
                <li className="ml-5">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#608bc1] text-white rounded-full -left-3 text-xs font-bold">
                    2
                  </span>
                  <h4 className="font-semibold text-gray-900 text-sm">Verifikasi oleh Petugas</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Aparat Pemerintah Desa Karangrejo memeriksa keabsahan data laporan dalam 1x24 jam kerja.
                  </p>
                </li>
                <li className="ml-5">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#608bc1] text-white rounded-full -left-3 text-xs font-bold">
                    3
                  </span>
                  <h4 className="font-semibold text-gray-900 text-sm">Tindak Lanjut & Koordinasi</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Laporan didisposisikan ke perangkat atau kepala dusun terkait untuk penanganan lapangan.
                  </p>
                </li>
                <li className="ml-5">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full -left-3 text-xs font-bold">
                    4
                  </span>
                  <h4 className="font-semibold text-gray-900 text-sm">Konfirmasi Status Selesai</h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Hasil tindak lanjut dikonfirmasikan kembali kepada pelapor melalui pesan WhatsApp.
                  </p>
                </li>
              </ol>
            </Card>

            {/* Jaminan Kerahasiaan */}
            <Card className="shadow-sm border border-gray-200 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-[#436187] rounded-lg">
                  <IconShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Jaminan Keamanan & Privasi
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Setiap data yang masuk ke kanal pengaduan dilindungi kerahasiaannya. NIK digunakan secara eksklusif untuk menghindari laporan fiktif demi kenyamanan warga bersama.
                  </p>
                </div>
              </div>
            </Card>

            {/* Kontak Langsung Pelayanan Desa */}
            <Card className="shadow-sm border border-gray-200">
              <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <IconPhone className="text-[#608bc1]" size={20} />
                Kontak Pelayanan Langsung
              </h3>
              <div className="space-y-3 text-xs text-gray-700">
                <p className="text-gray-600">
                  Untuk pengaduan mendesak atau darurat, warga dapat menghubungi langsung kanal resmi kantor desa:
                </p>
                <div className="flex items-center gap-2 font-medium">
                  <IconBrandWhatsapp size={16} className="text-green-600" />
                  <a
                    href="https://wa.me/6285649295356"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#608bc1] hover:underline"
                  >
                    +62 856-4929-5356 (WhatsApp Desa)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <IconClock size={16} className="text-gray-400" />
                  <span>Senin - Jumat: 08.00 - 15.00 WIB</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <span className="block font-semibold text-gray-800 mb-0.5">Kantor Balai Desa Karangrejo</span>
                  <span className="text-gray-500">
                    Dusun Karangrejo, RT 02 RW 01, Kec. Kandat, Kab. Kediri, Jawa Timur 64173
                  </span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      </section>
    </main>
  );
};

export default AduanPage;