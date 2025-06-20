import React from "react";

const NavbarSkeleton = () => {
  return (
    <>
      <div className="max-w-screen-xl m-auto bg-white py-5 px-5 flex items-center justify-between border border-gray-200 rounded-full mt-5 ">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>

          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className=" flex items-center space-x-10 ">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>

          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-10 ">
          <div className="flex items-center space-x-3 border border-gray-300 py-1 px-4 rounded-xl cursor-pointer">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>

            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default NavbarSkeleton;
