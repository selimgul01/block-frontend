import { GiBookAura } from "react-icons/gi";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaPenNib } from "react-icons/fa";
import { openModal } from "../redux/posts/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import AuthPage from "../pages/AuthPage";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const {token} = useSelector(state => state.auth)
  // const token = localStorage.getItem("token");

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
    <>
      <div className="max-w-screen-xl m-auto bg-white py-5 px-5 flex items-center justify-between border border-gray-200 rounded-full mt-5 ">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <GiBookAura size={40} className="text-blue-950" />
          <h1 className="text-3xl font-semibold text-blue-950">BLOGGER</h1>
        </div>
        <div className=" flex items-center space-x-10 ">
          <span
            onClick={() => navigate("/")}
            className=" font-semibold text-blue-600 hover:scale-110 transition-all cursor-pointer "
          >
            ANA SAYFA
          </span>
          <span
            onClick={myPostHandler}
            className=" font-semibold text-blue-600 hover:scale-110 transition-all cursor-pointer "
          >
            GÖNDERİLERİM
          </span>
        </div>
        <div className="flex items-center space-x-10 ">
          <div
            onClick={createBlogHandler}
            className="flex items-center space-x-3 border border-blue-500 py-1 px-4 rounded-xl cursor-pointer hover:scale-110 transition-all"
          >
            <FaPenNib className="text-blue-600" />
            <span className="font-semibold text-lg text-blue-500 ">
              Bloğunu Oluştur
            </span>
          </div>
          {token ? (
            <div onClick={logoutHandler} className=" flex items-center space-x-3 border border-red-500  py-1 px-2 rounded-xl  hover:scale-110 transition-all cursor-pointer">
              <span className="text-red-500 text-sm">ÇIKIŞ YAP</span>
              <IoMdLogOut
                
                size={21}
                className="text-red-600 cursor-pointer "
              />
            </div>
          ) : (
            <div onClick={()=>navigate("/auth")} className=" flex items-center space-x-3 border border-green-500  py-1 px-2 rounded-xl  hover:scale-110 transition-all cursor-pointer">
              <span className="text-green-500 text-sm">GİRİŞ YAP</span>
              <IoMdLogIn
                size={21}
                className="text-green-600 cursor-pointer "
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
