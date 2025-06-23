import { GiBookAura } from "react-icons/gi";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaBars, FaPenNib } from "react-icons/fa";
import { openModal } from "../redux/posts/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import AuthPage from "../pages/AuthPage";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const createBlogHandler = () => {
    if (token) {
      dispatch(openModal());
    } else {
      toast.error("Önce Kayıt Olmasılın!");
      navigate("/auth");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const myPostHandler = () => {
    if (token) {
      navigate("/my-posts");
    } else {
      toast.error("Önce Kayıt Olmasılın!");
      navigate("/auth");
    }
  };
  

  return (
    <div className="py-10">
      <div className="container m-auto bg-white py-5 px-5 flex items-center justify-between border border-gray-200 rounded-full  ">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer justify-center"
        >
          <img className="w-[75px]" src="/Group20.png" alt="" />
          <h1 className="text-3xl  text-purple-950 font-bold">BLOGGER</h1>
        </div>

        <div className="hidden sm:flex sm:items-center sm:space-x-10 ">
          <span
            onClick={() => navigate("/")}
            className=" font-semibold text-purple-700 hover:scale-110 transition-all cursor-pointer "
          >
            ANA SAYFA
          </span>
          <span
            onClick={myPostHandler}
            className=" font-semibold text-purple-700 hover:scale-110 transition-all cursor-pointer "
          >
            GÖNDERİLERİM
          </span>
        </div>
        <FaBars className="flex xl:hidden mr-10 text-purple-700 hover:scale-105 transition-all cursor-pointer" size={28}/>
        <div className="hidden xl:flex items-center space-x-10 ">
          
          <div
            onClick={createBlogHandler}
            className="flex items-center space-x-3 border border-purple-700 text-purple-700 py-1 px-4 rounded-xl cursor-pointer hover:scale-110 transition-all"
          >
            <FaPenNib className="text-purple-700" />
            <span className="font-semibold text-lg text-purple-700 ">
              Bloğunu Oluştur
            </span>
          </div>
          {token ? (
            <div
              onClick={logoutHandler}
              className=" flex items-center space-x-3 border border-red-500  py-1 px-2 rounded-xl  hover:scale-110 transition-all cursor-pointer"
            >
              <span className="text-red-500 text-sm">ÇIKIŞ YAP</span>
              <IoMdLogOut size={21} className="text-red-600 cursor-pointer " />
            </div>
          ) : (
            <div
              onClick={() => navigate("/auth")}
              className=" flex items-center space-x-3 border border-green-500  py-1 px-2 rounded-xl  hover:scale-110 transition-all cursor-pointer"
            >
              <span className="text-green-500 text-sm">GİRİŞ YAP</span>
              <IoMdLogIn size={21} className="text-green-600 cursor-pointer " />
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default Navbar;
