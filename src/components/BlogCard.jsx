import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const { title, subtitle, tags, content, image, _id } = post;

  return (
    <div className=" w-full  flex flex-col  space-y-2 bg-white shadow-lg rounded-lg ">
      <div className=" w-full h-full  flex items-center justify-center pt-5 pb-2 ">
        <img
          src={`https://blog-backend-hn49.onrender.com/uploads/${image}`}
          alt="react"
          className="w-[300px] h-[150px] object-cover hover:scale-110 transition-all  rounded-2xl"
        />
      </div>

      <div className="flex flex-col space-y-4 px-2">
        <h1 className="text-xl font-bold text-purple-900">{title}</h1>
        <h3 className="text-lg text-purple-900">{subtitle}</h3>
        <p className="text-purple-950 ">
          {post?.content?.length > 300
            ? `${post?.content?.substring(0, 300)}. . .`
            : content}
        </p>
        <p className="border rounded-xl  text-gray-600 py-1 px-2 w-32  cursor-pointer text-sm text-center">
          #{tags}
        </p>
      </div>

      <div
        onClick={() => navigate(`detail/${_id}`)}
        className=" text-xl flex justify-start text-slate-800 font-semibold p-2 cursor-pointer"
      >
        Daha Fazla...
      </div>
    </div>
  );
};

export default BlogCard;
