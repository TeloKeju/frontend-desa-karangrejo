import { Link, useParams } from "react-router-dom";
import Admin from "../adminLayout";
import { useEffect, useState } from "react";
import apiKarangrejo from "../../../lib/axios";
import { Button, Card, Label, Modal, Rating, TextInput } from "flowbite-react";
import { FormatRupiah } from "@arismun/format-rupiah";
import {
  IconArrowAutofitRight,
  IconArrowLeft,
  IconMessage,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { toast } from "react-toastify";

const UMKMDetailed = () => {
  const [dataUMKM, setDataUMKM] = useState([]);
  const [dataKomentar, setDataKomentar] = useState([]);

  const [isOpen, setOpenModal] = useState(false);

  const { id } = useParams();

  async function getDataUMKM() {
    try {
      const res = await apiKarangrejo.get("/umkm");
      const res2 = await apiKarangrejo.get("/comment", {
        params: {
          id: id,
        },
      });
      setDataKomentar(res2.data.comment);
      setDataUMKM(res.data.umkm.filter((item) => item.id == id)[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUMKM();
  }, []);
  return (
    <Admin>
      <section className="p-4">
        <Link
          to={"/admin/umkm"}
          className="flex justify-start items-center mb-4 gap-1"
        >
          <IconArrowLeft /> kembali
        </Link>
        <Card>
          <section className="lg:flex gap-6">
            <div className="bg-slate-500 lg:w-2/5 h-full">
              <img
                src={import.meta.env.VITE_IMAGE_BASE + "/" + dataUMKM?.image}
                className="w-full h-[300px] object-cover rounded-md"
                alt="Image Belanja"
              />
            </div>
            <section className="mt-4 lg:mt-0">
              <section className="flex gap-3 flex-col">
                <h1 className="font-medium text-3xl text-start">
                  {dataUMKM?.name}
                </h1>
                <section className="flex flex-row gap-3">
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                  <p>|</p>
                  <p>
                    Penilaian{" "}
                    <span className="text-slate-400">
                      ({dataUMKM?.rating || 0})
                    </span>
                  </p>
                </section>
              </section>
              <h2 className="text-3xl font-bold text-start mt-2">
                <FormatRupiah value={dataUMKM?.price} />
              </h2>
              <p className="text-start mt-4">{dataUMKM?.description}</p>
            </section>
          </section>
          <section>
            <div className="flex items-center gap-2 justify-center py-4 relative">
              <p className="text-lg absolute pb-2">Komentar</p>
              <hr className="w-full" />
            </div>
            {dataKomentar?.map((item, i) => {
              if (i == 0) {
                return (
                  <div
                    className="text-start space-y-3 border border-slate-300 rounded-sm p-4"
                    key={i}
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-full w-8 h-8 bg-gray-400">
                        <img
                          src="/person-icon.jpg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <p>{item?.nama || ""}</p>
                    </div>
                    <div>{item?.comment || ""}</div>
                    <div>
                      <p className="text-slate-400 text-sm font-light">
                        {item?.date || ""}
                      </p>
                    </div>
                  </div>
                );
              }
            })}

            <div className="mt-6">
              <p
                className="text-blue-600 underline italic"
                onClick={() => setOpenModal(true)}
              >
                See More
              </p>
            </div>
          </section>
        </Card>
      </section>
      <PopUpCommentContainer
        dataKomentar={dataKomentar}
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        onAction={getDataUMKM}
      />
    </Admin>
  );
};

export default UMKMDetailed;

const PopUpCommentContainer = ({
  dataKomentar,
  isOpen,
  setOpenModal,
  onAction,
}) => {
  const [dataEdit, setDataEdit] = useState({});
  const [isOpenEdit, setOpenModalEdit] = useState(false);
  const [action, setAction] = useState("");

  return (
    <section
      className={`w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-50 flex items-end ${
        isOpen ? "" : "hidden"
      }`}
    >
      <section className="w-full bg-white rounded-t-lg p-4 transition-all">
        <div className="flex justify-between items-center">
          <Button
            color="blue"
            onClick={() => {
              setOpenModalEdit(true);
              setAction("add");
            }}
          >
            <IconMessage />
            <p className="ms-2">Tambah Komentar</p>
          </Button>
          <Button color="red" onClick={() => setOpenModal(false)}>
            <IconX />
          </Button>
        </div>
        <div className="relative my-6 flex justify-center items-center">
          <p className="absolute pb-2 text-lg">Komentar</p>
          <hr className="w-full" />
        </div>
        <section className="min-h-[50vh] max-h-[70vh] overflow-auto space-y-4">
          {dataKomentar?.map((item, i) => {
            if (true) {
              return (
                <div
                  className="text-start space-y-3 border border-slate-300 rounded-sm p-4 relative"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-8 h-8 bg-gray-400">
                      <img
                        src="/person-icon.jpg"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <p>{item?.nama || ""}</p>
                  </div>
                  <div>{item?.comment || ""}</div>
                  <div>
                    <p className="text-slate-400 text-sm font-light">
                      {item?.date || ""}
                    </p>
                  </div>
                  <div className="absolute top-0 right-2">
                    <Button
                      color="red"
                      onClick={() => {
                        setOpenModalEdit(true);
                        setDataEdit(item);
                        setAction("delete");
                      }}
                    >
                      <IconTrash />
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </section>
      </section>
      <ModalUMKMDetailed
        isOpen={isOpenEdit}
        setOpenModal={setOpenModalEdit}
        dataEdit={dataEdit}
        action={action}
        onAction={onAction}
      />
    </section>
  );
};

const ModalUMKMDetailed = ({
  isOpen,
  setOpenModal,
  dataEdit,
  action,
  onAction,
}) => {
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      {action == "add" ? (
        <ModalAddComment setOpenModal={setOpenModal} onAction={onAction} />
      ) : action == "delete" ? (
        <ModalDeleteComment
          setOpenModal={setOpenModal}
          onAction={onAction}
          dataEdit={dataEdit}
        />
      ) : (
        ""
      )}
    </Modal>
  );
};

const ModalAddComment = ({ setOpenModal, onAction }) => {
  const [nama, setNama] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  async function handleAddComment(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.post(`/comment`, {
        nama: nama,
        rating: rating,
        date: today,
        comment: comment,
        umkm_id: id,
      });
      setIsLoading(false);
      toast.success("Komentar Berhasil Ditambahkan");
      setOpenModal(false);
      onAction();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setOpenModal(false);
      toast.error("Komentar Gagal Ditambahkan");
    }
  }

  var disabled = isLoading || nama == "" || comment == "" || rating == 0;

  return (
    <>
      <Modal.Header>Tambah Komentar</Modal.Header>
      <Modal.Body>
        <form className="space-y-4" onSubmit={handleAddComment}>
          <div>
            <Label>Nama</Label>
            <TextInput
              type="text"
              placeholder="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Comment</Label>
            <TextInput
              type="text"
              placeholder="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Rating</Label>
            <div className="flex w-full">
              <input
                type="number"
                placeholder="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="rounded-none rounded-s-md"
                min={1}
                max={10}
              />
              <div className="text-white font-bold bg-blue-500 flex items-center px-2 rounded-e-md outline-1 outline-blue-500">
                / 10
              </div>
            </div>
          </div>
          <button
            id="submitAddComent"
            type="submit"
            className="hidden"
          ></button>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button
          color="blue"
          form="submitAddComent"
          onClick={() => document.getElementById("submitAddComent").click()}
          disabled={disabled}
        >
          Tambah
        </Button>
        <Button
          color="red"
          onClick={() => setOpenModal(false)}
          disabled={disabled}
        >
          Cancle
        </Button>
      </Modal.Footer>
    </>
  );
};

const ModalDeleteComment = ({ setOpenModal, onAction, dataEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeleteComment() {
    setIsLoading(true);
    try {
      const res = await apiKarangrejo.delete(`/comment?id=${dataEdit.id}`);
      toast.success("Komentar Berhasil Dihapus");
    } catch (error) {
      toast.error("Komentar Gagal Dihapus");
      console.log(error);
    }
    setOpenModal(false);
    setIsLoading(false);
    onAction();
  }
  return (
    <>
      <Modal.Header>Delete Komentar</Modal.Header>
      <Modal.Body>
        <div className="text-center text-2xl">
          Menghapus data komentar {dataEdit.nama} !!{" "}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button onClick={handleDeleteComment} disabled={isLoading} color="blue">
          Delete
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => setOpenModal(false)}
          color="red"
        >
          Cancle
        </Button>
      </Modal.Footer>
    </>
  );
};
