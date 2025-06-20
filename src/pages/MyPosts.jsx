import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import NewContentModal from "../components/NewContentModal";
import { useEffect } from "react";
import { getAllPosts, getMyPosts } from "../redux/posts/postSlice";
import BlogCardSkeleton from "../skeleton/BlogCardSkeleton";
import { FaRegSmileBeam } from "react-icons/fa";
import { openModal } from "../redux/posts/modalSlice";

const MyPosts = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const { myPosts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <>
      
      {myPosts.length <= 0 ? (
        <div className=" w-full h-screen flex items-center justify-center pb-20">
          {isModalOpen && <NewContentModal />}
          <div
            onClick={()=>dispatch(openModal())}
            className=" flex items-center justify-center p-10 rounded-xl  space-x-4 text-4xl text-blue-600 border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110 transition-all"
          >
            <span>HEMEN İLK BLOĞUNU OLUŞTUR </span>
            <FaRegSmileBeam />
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl m-auto mt-20  grid grid-cols-3 gap-5 ">
          {isModalOpen && <NewContentModal />}
          {loading
            ? Array.from({ length: 12 })?.map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : myPosts?.map((post, i) => <BlogCard post={post} key={i} />)}
        </div>
      )}
    </>
  );
};

export default MyPosts;
