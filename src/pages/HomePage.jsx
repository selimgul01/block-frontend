import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import NewContentModal from "../components/NewContentModal";
import { useEffect } from "react";
import { getAllPosts } from "../redux/posts/postSlice";
import BlogCardSkeleton from "../skeleton/BlogCardSkeleton";
import Tags from "../components/Tags";
import PopularPost from "../components/PopularPost";
import Hero from "../components/Hero";

const HomePage = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="container m-auto" >
      <Hero/>
      <div className="mt-10  xl:flex  xl:justify-between   xl:space-x-5  space-y-3 pb-20  ">
        <div className="p-3">
          <Tags />
        </div>
        <div className=" flex flex-col space-y-5 rounded-lg ">
          {isModalOpen && <NewContentModal />}
          {loading
            ? Array.from({ length: 12 })?.map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : posts?.map((post, i) => <BlogCard post={post} key={i} />)}
        </div>

        <div className="flex flex-col space-y-4 ">
          <PopularPost />
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
