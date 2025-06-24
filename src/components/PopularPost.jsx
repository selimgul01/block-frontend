import { CiClock2 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PopularPost = () => {
  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate()

  
  return (
    <div  className="bg-white w-full xl:w-[400px] flex flex-col space-y-5  px-5 py-5 rounded-lg cursor-pointer">
      <h1 className=" text-xl font-bold text-slate-800 mb-5">
        Popüler Gönderiler
      </h1>
      {posts?.slice(0, 4).map((post,i) => (
        <div onClick={()=>navigate(`detail/${post._id}`)} key={i}  className="flex items-start justify-start   space-x-3 hover:scale-105 transition-all ">
          <img
            className="object-cover w-[120px] h-full rounded-lg"
            src={`http://localhost:5000 
https://blog-backend-hn49.onrender.com/uploads/${post?.image}`}
            alt=""
          />
          <div className="flex flex-col">
            <div className="text-md text-gray-800 font-semibold">
              {post.title}
            </div>
            <div className="flex text-gray-700 items-center space-x-2 ">
              
              <CiClock2 /> <span>{post?.createdAt?.substring(0,10)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularPost;
