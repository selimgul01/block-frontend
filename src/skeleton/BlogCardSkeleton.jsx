
const BlogCardSkeleton = () => {



  return (
    
    <div className="w-full flex flex-col space-y-2 bg-white shadow-lg animate-pulse">
      <div className="h-[275px] bg-gray-300 w-full rounded"></div>

      <div className="flex flex-col space-y-4 px-2 py-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-20 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>

      <div className="h-6 bg-gray-300 rounded w-28 mx-2 mb-4"></div>
    </div>
    
  )
}

export default BlogCardSkeleton
