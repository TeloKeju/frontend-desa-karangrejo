import { useEffect, useState } from "react";
import { Card, Modal, Spinner, Table, TextInput } from "flowbite-react";
import {
  IconBrandWhatsapp,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconEye,
  IconInbox,
  IconMessageDots,
  IconRefresh,
  IconArrowBackUp,
  IconSearch,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import Admin from "./adminLayout";
import apiKarangrejo from "../../lib/axios";

const statusTabs = [
  { label: "Semua", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Diterima", value: "diterima" },
];

function formatTanggal(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 0812xxxx -> 62812xxxx untuk tautan wa.me
function linkWhatsapp(nomor) {
  const digits = (nomor || "").replace(/\D/g, "");
  const intl = digits.startsWith("0") ? "62" + digits.slice(1) : digits;
  return `https://wa.me/${intl}`;
}

const StatusBadge = ({ status }) =>
  status === "diterima" ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
      <IconCheck size={14} /> Diterima
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
      <IconClock size={14} /> Draft
    </span>
  );

const AduanAdmin = () => {
  const [dataAduan, setDataAduan] = useState([]);
  const [meta, setMeta] = useState({});
  const [summary, setSummary] = useState({ total: 0, draft: 0, diterima: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState(null);
  const [updatingKode, setUpdatingKode] = useState("");

  async function getDataAduan() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/aduans", {
        params: { status, search: keyword, page, per_page: 10 },
      });
      setDataAduan(res.data.data);
      setMeta(res.data.meta);
      setSummary(res.data.summary);
    } catch (error) {
      console.log(error);
      toast.error("Data aduan gagal dimuat !!");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataAduan();
  }, [status, keyword, page]);

  // tunda pencarian sampai admin berhenti mengetik
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setKeyword(search.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  async function handleUpdateStatus(aduan, statusBaru) {
    try {
      setUpdatingKode(aduan.kode_aduan);
      const res = await apiKarangrejo.patch(
        `/aduans/${aduan.kode_aduan}/status`,
        { status_aduan: statusBaru }
      );
      toast.success(
        statusBaru === "diterima"
          ? `Aduan ${aduan.kode_aduan} diterima !!`
          : `Aduan ${aduan.kode_aduan} dikembalikan ke draft`
      );
      if (selected?.kode_aduan === aduan.kode_aduan) {
        setSelected(res.data.data);
      }
      getDataAduan();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Status aduan gagal diubah !!"
      );
    } finally {
      setUpdatingKode("");
    }
  }

  const statCards = [
    {
      label: "Total Aduan",
      value: summary.total,
      icon: <IconInbox size={28} />,
      style: "bg-blue-100 text-[#436187]",
    },
    {
      label: "Menunggu Verifikasi",
      value: summary.draft,
      icon: <IconClock size={28} />,
      style: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Diterima",
      value: summary.diterima,
      icon: <IconCheck size={28} />,
      style: "bg-green-100 text-green-600",
    },
  ];

  return (
    <Admin>
      <section className="p-4 bg-[#f6f6f6] min-h-full text-start">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-[#436187] uppercase bg-blue-100 rounded-full">
              Layanan Pengaduan
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Aduan Warga</h1>
            <p className="text-sm text-gray-500">
              Aduan baru masuk berstatus <b>draft</b>. Periksa isinya, lalu
              ubah statusnya menjadi <b>diterima</b>.
            </p>
          </div>
          <button
            onClick={getDataAduan}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50"
          >
            <IconRefresh size={18} /> Muat Ulang
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {statCards.map((item) => (
            <Card key={item.label} className="shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.style}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setStatus(tab.value);
                    setPage(1);
                  }}
                  className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition duration-150 ${
                    status === tab.value
                      ? "bg-[#608bc1] text-white shadow-sm"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <TextInput
              type="search"
              icon={IconSearch}
              placeholder="Cari kode, nama, NIK, WhatsApp, atau isi aduan..."
              className="w-full md:w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoading ? (
            <section className="w-full min-h-[40vh] flex justify-center items-center">
              <Spinner size="xl" />
            </section>
          ) : dataAduan.length === 0 ? (
            <section className="w-full min-h-[40vh] flex flex-col gap-2 justify-center items-center text-gray-500">
              <IconMessageDots size={48} className="text-gray-300" />
              <p>Belum ada aduan yang sesuai.</p>
            </section>
          ) : (
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Kode Aduan</Table.HeadCell>
                  <Table.HeadCell>Tanggal Masuk</Table.HeadCell>
                  <Table.HeadCell>Pelapor</Table.HeadCell>
                  <Table.HeadCell>WhatsApp</Table.HeadCell>
                  <Table.HeadCell>Isi Pengaduan</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataAduan.map((item, i) => (
                    <Table.Row key={item.kode_aduan} className="bg-white">
                      <Table.Cell>{(meta.from || 1) + i}</Table.Cell>
                      <Table.Cell className="font-mono font-semibold text-[#436187] whitespace-nowrap">
                        {item.kode_aduan}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {formatTanggal(item.created_at)}
                      </Table.Cell>
                      <Table.Cell>
                        <p className="font-medium text-gray-900">
                          {item.nama_lengkap}
                        </p>
                        <p className="text-xs font-mono">{item.nik}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <a
                          href={linkWhatsapp(item.no_whatsapp)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-green-600 hover:underline whitespace-nowrap"
                        >
                          <IconBrandWhatsapp size={16} />
                          {item.no_whatsapp}
                        </a>
                      </Table.Cell>
                      <Table.Cell className="max-w-xs">
                        <p className="line-clamp-2">{item.isi_pengaduan}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <StatusBadge status={item.status_aduan} />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <button
                            title="Lihat detail"
                            onClick={() => setSelected(item)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
                          >
                            <IconEye size={20} />
                          </button>
                          {item.status_aduan === "draft" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(item, "diterima")
                              }
                              disabled={updatingKode === item.kode_aduan}
                              className="inline-flex items-center gap-1 bg-[#608bc1] hover:bg-[#4d72a0] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200 disabled:opacity-50 whitespace-nowrap"
                            >
                              <IconCheck size={14} /> Terima
                            </button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}

          {meta.last_page > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
              <p>
                Menampilkan {meta.from}–{meta.to} dari {meta.total} aduan
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1 || isLoading}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
                >
                  <IconChevronLeft size={18} />
                </button>
                <span>
                  Halaman {meta.current_page} / {meta.last_page}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= meta.last_page || isLoading}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40"
                >
                  <IconChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </Card>
      </section>

      <ModalDetailAduan
        aduan={selected}
        onClose={() => setSelected(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={updatingKode === selected?.kode_aduan}
      />
    </Admin>
  );
};

export default AduanAdmin;

const ModalDetailAduan = ({ aduan, onClose, onUpdateStatus, isUpdating }) => {
  return (
    <Modal show={!!aduan} onClose={onClose} size="2xl">
      <Modal.Header>Detail Aduan</Modal.Header>
      {aduan && (
        <>
          <Modal.Body className="text-start">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="font-mono font-bold text-lg text-[#436187]">
                  {aduan.kode_aduan}
                </span>
                <StatusBadge status={aduan.status_aduan} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Nama Lengkap</p>
                  <p className="font-medium text-gray-900">
                    {aduan.nama_lengkap}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">NIK</p>
                  <p className="font-medium text-gray-900 font-mono">
                    {aduan.nik}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">No. WhatsApp</p>
                  <a
                    href={linkWhatsapp(aduan.no_whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-green-600 hover:underline"
                  >
                    <IconBrandWhatsapp size={16} /> {aduan.no_whatsapp}
                  </a>
                </div>
                <div>
                  <p className="text-gray-500">Tanggal Masuk</p>
                  <p className="font-medium text-gray-900">
                    {formatTanggal(aduan.created_at)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Isi Pengaduan</p>
                <p className="bg-white p-3 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap">
                  {aduan.isi_pengaduan}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-end">
            {aduan.status_aduan === "draft" ? (
              <button
                onClick={() => onUpdateStatus(aduan, "diterima")}
                disabled={isUpdating}
                className="inline-flex items-center justify-center gap-2 bg-[#608bc1] hover:bg-[#4d72a0] text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-sm disabled:opacity-50"
              >
                <IconCheck size={18} />
                {isUpdating ? "Menyimpan..." : "Terima Aduan"}
              </button>
            ) : (
              <button
                onClick={() => onUpdateStatus(aduan, "draft")}
                disabled={isUpdating}
                className="inline-flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-6 py-2.5 rounded-lg font-medium transition duration-200 disabled:opacity-50"
              >
                <IconArrowBackUp size={18} />
                {isUpdating ? "Menyimpan..." : "Kembalikan ke Draft"}
              </button>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition duration-200"
            >
              Tutup
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};
