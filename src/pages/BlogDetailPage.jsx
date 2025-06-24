import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../redux/posts/postSlice";
import { closeModal, editModal } from "../redux/posts/modalSlice";
import NewContentModal from "../components/NewContentModal";
import { getUsers } from "../redux/auth/authSlice";
import PopularPost from "../components/PopularPost"; // Eğer kullanılıyorsa kalsın
import { HiDotsVertical } from "react-icons/hi";

// PrimeReact Sidebar bileşenini import edin
import { Sidebar } from "primereact/sidebar"; // Bu satırı projenizde aktif ettiğinizden emin olun

const BlogDetailPage = () => {
  const { id } = useParams();
  const { singlePost } = useSelector((state) => state.posts);
  const { isEdit } = useSelector((state) => state.modal);
  const { allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visibleRight, setVisibleRight] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const currentUser = allUsers.find((a) => a._id === singlePost?.user);

  const modalOpenHandler = () => {
    dispatch(editModal());
    setVisibleRight(false);
  };

  const deletedHandler = () => {
    dispatch(deletePost(id));
    navigate("/my-posts");
    setVisibleRight(false);
  };

  useEffect(() => {
    if (id) dispatch(getPostById(id));
  }, [id, dispatch]);

  if (!singlePost) return "post bulunamadı";

  const { title, subtitle, tags, content, image } = singlePost;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          visibleRight
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisibleRight(false)}
      ></div>

      <div className="container m-auto flex items-start justify-center my-10 relative">
        {isEdit && <NewContentModal />}
        <div className="p-5 flex flex-col space-y-10 bg-white rounded-md w-full ">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
              {singlePost?.user === user?._id && (
                <>
                  <HiDotsVertical
                    onClick={() => setVisibleRight(true)}
                    className="md:hidden cursor-pointer hover:scale-110 transition-all text-4xl"
                  />

                  <div className="hidden md:flex md:items-center space-x-2">
                    <button
                      onClick={modalOpenHandler}
                      className="px-3 py-2 border border-blue-500 font-semibold rounded-md hover:scale-110 transition-all text-blue-700 "
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={deletedHandler}
                      className="px-3 py-2 border border-red-500 font-semibold rounded-md hover:scale-110 transition-all text-red-700"
                    >
                      Sil
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="text-gray-800 text-xl">{subtitle}</div>
            <div className="text-gray-800 text-sm border border-gray-800 p-1 rounded-full text-center cursor-pointer inline-block w-max px-2 py-1">
              #{tags}
            </div>
          </div>

          <img
            className="w-full rounded-md"
            src={`http://localhost:5000 
https://blog-backend-hn49.onrender.com/uploads/${image}`}
            alt="blog post"
          />

          <div className="text-cyan-900 font-semibold text-lg">{content}</div>
          <div className="flex items-center justify-end text-cyan-900 font-semibold border-b">
            Created by: {currentUser?.username}
          </div>
        </div>

        <Sidebar
          position="right"
          visible={visibleRight}
          onHide={() => setVisibleRight(false)}
          className=" md:w-80 bg-white"
          modal={false}
        >
          <div className="p-4 flex flex-col space-y-4">
            <h3 className="text-xl font-bold mb-4">Gönderi Seçenekleri</h3>

            <button
              onClick={modalOpenHandler}
              className="w-full px-4 py-2 border border-blue-500 font-semibold rounded-md hover:scale-105 transition-all text-blue-700"
            >
              Düzenle
            </button>

            <button
              onClick={deletedHandler}
              className="w-full px-4 py-2 border border-red-500 font-semibold rounded-md hover:scale-105 transition-all text-red-700"
            >
              Sil
            </button>
          </div>
        </Sidebar>
        {/* --- */}
      </div>
    </>
  );
};

export default BlogDetailPage;
