import {
  FileInput,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import Admin from "../adminLayout";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import apiKarangrejo from "../../../lib/axios";
import { data } from "autoprefixer";

const NewsPageAdmin = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");

  let displayedNews = news.filter((e) =>
    e?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const [isOpen, setOpenModal] = useState(false);
  const [action, setAction] = useState("add");
  const [dataEdit, setDataEdit] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  async function getDataNews(params) {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.get("/news");

      setNews(res.data.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataNews();
  }, []);

  return (
    <Admin>
      <section className="p-4">
        <div className="w-full flex justify-between items-center">
          <div className="w-2/5">
            <TextInput
              id="search"
              type="search"
              placeholder="Cari berita..."
              values={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setOpenModal(true);
                setAction("add");
              }}
            >
              <IconPlus />
              Tambah Berita
            </button>
          </div>
        </div>
        <div className="w-full mt-4">
          {isLoading ? (
            <section className="w-full min-h-[50vh] flex justify-center items-center bg-slate-100">
              <div>Loading.....</div>
            </section>
          ) : (
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Judul</Table.HeadCell>
                <Table.HeadCell>Tanggal Publish</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {displayedNews.map((item, index) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell>{item.publish_date}</Table.Cell>
                      <Table.Cell className="lg:max-w-10 flex gap-1">
                        <button
                          onClick={() => {
                            setAction("edit");
                            setOpenModal(true);
                            setDataEdit(item);
                          }}
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => {
                            setAction("delete");

                            setOpenModal(true);
                            setDataEdit(item);
                          }}
                        >
                          <IconTrash />
                        </button>
                        <button
                          onClick={() => {
                            alert("p")
                            setAction("show");
                            setOpenModal(true);
                            setDataEdit(item);
                          }}
                        >
                          <IconEye />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </div>
      </section>
      <ModalBerita
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        dataEdit={dataEdit}
        onAction={() => getDataNews()}
        action={action}
      />
    </Admin>
  );
};

export default NewsPageAdmin;

const ModalBerita = ({ isOpen, setOpenModal, dataEdit, onAction, action }) => {
  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      {action == "add" ? (
        <ModalAddBerita setOpenModal={setOpenModal} onAction={onAction} />
      ) : action == "edit" ? (
        <ModalEditBerita
          dataEdit={dataEdit}
          setOpenModal={setOpenModal}
          onAction={onAction}
        />
      ) : action == "delete" ? (
        <ModalDeleteNews
          dataEdit={dataEdit}
          onAction={onAction}
          setOpenModal={setOpenModal}
        />
      ) : (
        <ModalDetailNews setOpenModal={setOpenModal} data={dataEdit} />
      )}
      {/* {action === "edit" ? (
          <ModalEditPekerjaan
            dataEdit={dataEdit}
            setOpenModal={setOpenModal}
            onAction={onAction}
          />
        ) : action === "delete" ? (
          <ModalDeletePekerjaan
            dataEdit={dataEdit}
            setOpenModal={setOpenModal}
            onAction={onAction}
          />
        ) : (
          <ModalAddPekerjaan setOpenModal={setOpenModal} onAction={onAction} />
        )} */}
    </Modal>
  );
};

const ModalAddBerita = ({ setOpenModal, onAction }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddNews() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      setIsLoading(true);

      const res = await apiKarangrejo.post("/news", formData);

      setIsLoading(false);
      setOpenModal(false);
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction();
    }
  }

  return (
    <>
      <Modal.Header>Menambahkan Berita</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gambar
            </Label>
            <FileInput
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <Label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Judul
            </Label>
            <TextInput
              type="text"
              name="title"
              id="title"
              placeholder="Masukkan judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Konten
            </Label>
            <Textarea
              id="content"
              rows="4"
              placeholder="Masukkan konten"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md w-full ${
              isLoading || title == "" || content == "" || image == null
                ? "opacity-50"
                : ""
            }`}
            onClick={handleAddNews}
            disabled={
              isLoading || title == "" || content == "" || image == null
            }
          >
            Submit
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

const ModalEditBerita = ({ dataEdit, setOpenModal, onAction }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditNews(params) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      setIsLoading(true);

      const res = await apiKarangrejo.post(
        `/news/update/${dataEdit.id}`,
        formData
      );

      setIsLoading(false);
      setOpenModal(false);
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction();
    }
  }

  useEffect(() => {
    setTitle(dataEdit.title);
    setContent(dataEdit.content);
    setImage(dataEdit.image);
  }, [dataEdit]);
  return (
    <>
      <Modal.Header>Edit Berita</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gambar
            </Label>
            <FileInput
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={true}
            />
          </div>
          <div>
            <Label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Judul
            </Label>
            <TextInput
              type="text"
              name="title"
              id="title"
              placeholder="Masukkan judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Konten
            </Label>
            <Textarea
              id="content"
              rows="4"
              placeholder="Masukkan konten"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md w-full ${
              isLoading || title == "" || content == "" || image == null
                ? "opacity-50"
                : ""
            }`}
            onClick={handleEditNews}
            disabled={
              isLoading || title == "" || content == "" || image == null
            }
          >
            Submit
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

const ModalDeleteNews = ({ dataEdit, setOpenModal, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(dataEdit);
  

  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await apiKarangrejo.delete(`/news?id=${dataEdit.id}`);

      console.log(res.data);
      

      setIsLoading(false);
      setOpenModal(false);
      onAction();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setOpenModal(false);
      onAction;
    }
  }
  return (
    <>
      <Modal.Header>Hapus Berita</Modal.Header>
      <Modal.Body className="text-center text-2xl">
        Menghapus data pekerjaan {dataEdit.title} !!
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleDelete()}
          className={`w-full rounded-md flex justify-center bg-red-600 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Hapus
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Batal
        </button>
      </Modal.Footer>
    </>
  );
};

const ModalDetailNews = ({ setOpenModal, data }) => {
  return (
    <>
      <Modal.Header>Detail Berita</Modal.Header>
      <Modal.Body className="text-center text-2xl">Detail</Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => setOpenModal(false)}
          className={`w-full rounded-md flex justify-center bg-blue-400 px-4 py-5 text-white text-lg `}
        >
          Close
        </button>
      </Modal.Footer>
    </>
  );
};
