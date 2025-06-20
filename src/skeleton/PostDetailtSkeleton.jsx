
const PostDetailtSkeleton = () => {
  return (
    <>
      <div className="max-w-screen-xl m-auto p-5 flex flex-col space-y-10 bg-white mt-10 w-full rounded-md animate-pulse">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

            <div className="flex items-center space-x-2">
              <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-10 w-20 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>

        <div className="w-full h-96 bg-gray-200 rounded-md"></div>

        <div className="text-slate-900 text-lg space-y-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  );
};

export default PostDetailtSkeleton;
