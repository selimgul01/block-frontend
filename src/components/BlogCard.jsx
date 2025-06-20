import { useNavigate } from "react-router-dom";

const BlogCard = ({post}) => {

  const navigate = useNavigate()

  const {title, subtitle, tags, content, image, _id} = post

  return (
    <div className=" w-full  flex flex-col  space-y-2 bg-white shadow-lg">
      <div className="h-[275px]">
        <img src={`http://localhost:5000/uploads/${image}`} alt="react" className="w-full h-full " />
      </div>

      <div className="flex flex-col space-y-4 px-2">
        <h1 className="text-xl font-bold">
          {title}
        </h1>
        <h3 className="text-lg font-">{subtitle}</h3>
        <p className="text-gray-600 ">
          {post?.content?.length > 300 ? `${post?.content?.substring(0,300)}. . .` : content }
        </p>
        <p className="border rounded-xl  text-gray-600 py-1 px-2 w-32  cursor-pointer text-sm text-center">#{tags}</p>
      </div>

      <div onClick={()=> navigate(`detail/${_id}`)} className=" flex justify-start text-blue-600 font-semibold p-2 cursor-pointer">Daha Fazla...</div>
    </div>
  );
};

export default BlogCard;
