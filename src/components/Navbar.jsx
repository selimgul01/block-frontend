import React, { useState } from "react";
import { FaBars, FaPenNib } from "react-icons/fa";
import { IoMdLogOut, IoMdLogIn } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // navigate için
import { logout } from "../redux/auth/authSlice";
import { openModal } from "../redux/posts/modalSlice";
import toast from "react-hot-toast";




const Sidebar = ({ visible, onHide, position, className, children }) => {
  const sidebarClasses = `fixed top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
    position === "right" ? "right-0" : "left-0"
  } ${
    visible
      ? "translate-x-0"
      : position === "right"
      ? "translate-x-full"
      : "-translate-x-full"
  } ${className}`;

  return (
    <div className={sidebarClasses} style={{ zIndex: 1000 }}>
      {" "}
      {/* Sidebar'ın z-index'i yüksek olmalı */}
      <div className="p-4">
        <button
          onClick={onHide}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

function Header() {
  const [visibleRight, setVisibleRight] = useState(false);
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
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          visibleRight
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisibleRight(false)}
      ></div>

      <div className="py-10 relative">
        <div className="container m-auto bg-white py-5 px-5 flex items-center justify-between border border-gray-200 rounded-full">
          <div
            onClick={() => navigate("/")}
            className="flex items-center sm:space-x-3 space-x-1 cursor-pointer justify-center"
          >
            <img className="sm:w-[75px] w-[50px]" src="/Group20.png" alt="" />
            <h1 className="xl:text-3xl sm:text-xl text-lg  text-purple-950 font-bold">BLOGGER</h1>
          </div>

          <div className="flex items-center sm:space-x-10  space-x-3 mr-5">
            <span
              onClick={() => navigate("/")}
              className=" lg:text-xl sm:text-lg text-sm  font-semibold text-purple-700 hover:scale-110 transition-all cursor-pointer "
            >
              ANA SAYFA
            </span>
            <span
              onClick={myPostHandler}
              className=" lg:text-xl sm:text-lg text-sm font-semibold text-purple-700 hover:scale-110 transition-all cursor-pointer "
            >
              GÖNDERİLERİM
            </span>
          </div>

          
          <Sidebar
            position="right"
            visible={visibleRight}
            onHide={() => setVisibleRight(false)}
            className="bg-white fixed z-50"
          >
           
            <div className=" flex flex-col space-y-4">
              <h2>Sidebar</h2>
              <div
                onClick={createBlogHandler}
                className="flex items-center justify-center space-x-3 border border-purple-700 text-purple-700 py-1 px-4 rounded-xl cursor-pointer hover:scale-110 transition-all "
              >
                <span className="font-semibold text-lg text-purple-700 ">
                  Bloğunu Oluştur
                </span>
                <FaPenNib className="text-purple-700" />

              </div>
              {token ? (
                <div
                  onClick={logoutHandler}
                  className=" flex items-center justify-center space-x-3 border border-red-500 py-1 px-4 rounded-xl hover:scale-110 transition-all cursor-pointer"
                >
                  <span className="text-red-500 text-sm">ÇIKIŞ YAP</span>
                  <IoMdLogOut
                    size={21}
                    className="text-red-600 cursor-pointer "
                  />
                </div>
              ) : (
                <div
                  onClick={() => navigate("/auth")}
                  className=" flex items-center space-x-3 border border-green-500 py-1 px-2 rounded-xl hover:scale-110 transition-all cursor-pointer"
                >
                  <span className="text-green-500 text-sm">GİRİŞ YAP</span>
                  <IoMdLogIn
                    size={21}
                    className="text-green-600 cursor-pointer "
                  />
                </div>
              )}
            </div>
          </Sidebar>

          <FaBars
            onClick={() => setVisibleRight(true)}
            className="flex xl:hidden mr-10 text-purple-700 hover:scale-105 transition-all cursor-pointer"
            size={28}
          />

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
                className=" flex items-center space-x-3 border border-red-500 py-1 px-2 rounded-xl hover:scale-110 transition-all cursor-pointer"
              >
                <span className="text-red-500 text-sm">ÇIKIŞ YAP</span>
                <IoMdLogOut
                  size={21}
                  className="text-red-600 cursor-pointer "
                />
              </div>
            ) : (
              <div
                onClick={() => navigate("/auth")}
                className=" flex items-center space-x-3 border border-green-500 py-1 px-2 rounded-xl hover:scale-110 transition-all cursor-pointer"
              >
                <span className="text-green-500 text-sm">GİRİŞ YAP</span>
                <IoMdLogIn
                  size={21}
                  className="text-green-600 cursor-pointer "
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
