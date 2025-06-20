import { useDispatch, useSelector } from "react-redux"
import BlogCard from "../components/BlogCard"
import NewContentModal from "../components/NewContentModal"
import { useEffect } from "react"
import { getAllPosts } from "../redux/posts/postSlice"
import BlogCardSkeleton from "../skeleton/BlogCardSkeleton"

const HomePage = () => {

  const {isModalOpen} = useSelector(state => state.modal)
  const {posts,loading} = useSelector(state => state.posts)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getAllPosts())
  },[dispatch])
  
  return (
    <div className="max-w-screen-xl m-auto mt-20  grid grid-cols-3 gap-5 pb-20">
     { isModalOpen && <NewContentModal/> }
     { loading ? Array.from({length: 12})?.map((_,i)=>(
        <BlogCardSkeleton key={i} />
      )) : posts?.map((post,i)=>(
        <BlogCard post={post} key={i} />
      ))
     }
    </div>
  )
}

export default HomePage
