import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../redux/posts/postSlice";
import { closeModal, editModal } from "../redux/posts/modalSlice";
import NewContentModal from "../components/NewContentModal";
import { getUsers } from "../redux/auth/authSlice";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { singlePost } = useSelector((state) => state.posts);
  const { isEdit } = useSelector((state) => state.modal);
  const { allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])

  const currentUser = allUsers.find((a)=> a._id === singlePost?.user )

  const modalOpenHandler = () => {
    dispatch(editModal());
  };

  const deletedHandler = () => {
    dispatch(deletePost(id));
    navigate("/my-posts")
  };
  useEffect(() => {
    if (id) dispatch(getPostById(id));
  }, [id, dispatch]);

  if (!singlePost) return "post bulunamadı";

  const { title, subtitle, tags, content, image } = singlePost;

  return (
    <>
      {isEdit && <NewContentModal />}
      <div className="max-w-screen-xl m-auto p-5 flex flex-col space-y-10 bg-white mt-10  w-full rounded-md">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            {singlePost?.user === user?._id && (
              <div className="flex items-center space-x-2">
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
            )}
          </div>

          <div className="text-gray-700 text-xl">{subtitle}</div>
          <div className="text-gray-700 text-sm border border-gray-700 p-1 rounded-full text-center cursor-pointer inline-block w-max px-2 py-1">
            #{tags}
          </div>
        </div>

        <img
          className="w-full   rounded-md "
          src={`https://blog-backend-hn49.onrender.com/uploads/${image}`}
          alt="react"
        />

        <div className=" text-cyan-900 font-semibold text-lg ">{content}</div>
        <div className="flex items-center justify-end text-cyan-900 font-semibold border-b">Created by: {currentUser.username}</div>
      </div>
    </>
  );
};

export default BlogDetailPage;
