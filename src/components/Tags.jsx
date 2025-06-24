import { CiHashtag } from "react-icons/ci";
import {useDispatch}  from "react-redux"
import { getAllPosts } from "../redux/posts/postSlice";

 
const tags = ["teknoloji", "programlama", "gundem", "sağlık", "bilim"];

const Tags = () => {

  const dispatch = useDispatch()

  const categoryHandler = (tag) => {
     dispatch(getAllPosts(tag))
  }

  return (
    <div className=" flex xl:flex-col xl:w-[350px] justify-between border-b  xl:space-y-4 space-x-3 py-5 px-10 text-[#5f4ca6]  overflow-auto  bg-white rounded-xl">
      {tags?.map((tag,i) => (
        <span key={i} onClick={()=>categoryHandler(tag)}  className="flex items-center cursor-pointer px-5 py-2 hover:scale-110 transition-all  rounded-lg border-b border-gray-400 font-semibold">
          <CiHashtag size={20} />
          {tag}
        </span>
      ))}

    </div>
  );
};

export default Tags;
