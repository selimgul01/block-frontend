import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/posts/modalSlice";
import { useEffect, useState } from "react";
import { createPost, updatePost } from "../redux/posts/postSlice";

const NewContentModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    tags: "",
    image: null,
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    tags: "",
  });

  const { isEdit } = useSelector((state) => state.modal);
  const { singlePost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const closeClickHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isEdit === true && singlePost) {
      setEditFormData({
        title: singlePost.title,
        subtitle: singlePost.subtitle,
        content: singlePost.content,
        tags: singlePost.tags,
      });
    }
  }, [singlePost, isEdit]);

  const onChanceHandler = (e) => {
    const { value, name, files } = e.target;
    if (isEdit && singlePost) {
      setEditFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      if (name === "image") {
        setFormData((prev) => ({ ...prev, image: files[0] }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", isEdit ? editFormData.title : formData.title);
    form.append("subtitle", isEdit ? editFormData.subtitle : formData.subtitle);
    form.append("content",isEdit ? editFormData.content : formData.content);
    form.append("tags", isEdit ? editFormData.tags : formData.tags);
    form.append("image", isEdit === false &&  formData.image);


    if (isEdit && singlePost) {

      dispatch(updatePost({data:form, id:singlePost._id}));
      dispatch(closeModal());
    } else {
      dispatch(createPost(form));
      dispatch(closeModal());
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center  ">
        <form className="xl:w-1/3 w-10/12  rounded-xl bg-white p-5 relative">
          <div
            onClick={closeClickHandler}
            className=" absolute right-5 text-2xl cursor-pointer "
          >
            <IoCloseCircleOutline />
          </div>
          <h1 className="text-gray-700 font-semibold text-2xl">
            {isEdit ? "Göndereyi Güncelle" : "Yeni Yazı Oluştur"}
          </h1>
          <div className="flex flex-col space-y-2 mt-5">
            <textarea
              value={isEdit ? editFormData.title : formData.title}
              name="title"
              type="text"
              rows={1}
              placeholder="Başlık"
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 "
              onChange={onChanceHandler}
            />
            <textarea
              value={isEdit ? editFormData.subtitle : formData.subtitle}
              name="subtitle"
              type="text"
              rows={1}
              placeholder="Alt Başlık"
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 "
              onChange={onChanceHandler}
            />
          </div>

          <div class="max-w-xs mt-3">
            <label
              id="tags"
              for="tags"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Tag Seçiniz:
            </label>
            <div class="relative">
              <select
                value={isEdit ? editFormData.tags : formData.tags}
                onChange={onChanceHandler}
                id="tags"
                name="tags"
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Lütfen Bir Tag Seçiniz</option>
                <option value="programlama">programlama</option>
                <option value="teknoloji">teknoloji</option>
                <option value="gundem">gündem</option>
                <option value="saglık">sağlık</option>
                <option value="bilim">bilim</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-3 rounded-lg flex flex-col ">
            <label
              htmlFor="content"
              className="text-gray-700 text-lg font-semibold"
            >
              İçerik
            </label>

            <textarea
              value={isEdit ? editFormData.content : formData.content}
              name="content"
              id="content"
              rows={4}
              placeholder="Ne Düşünüyorsunuz?"
              onChange={onChanceHandler}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            ></textarea>
          </div>
          {
            !isEdit && <div className="">
            <label
              htmlFor="image"
              className="  mt-2 block text-gray-700 text-lg font-semibold mb-2"
            >
              Görsel Yükle:
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={onChanceHandler}
              className=" bg-gray-100 text-gray-900  text-sm  rounded-full file:mr-4 file:py-1 file:px-4 file:rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:cursor-pointer "
            />
          </div>
          }
          

          <div className="flex items-center justify-end  my-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-2 rounded-lg font-bold hover:scale-110 hover:bg-blue-700 transition-all"
            >
              {isEdit ? "Göndereyi Güncelle" : "Gönderiyi Paylaş "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewContentModal;
