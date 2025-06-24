import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import BlogDetailPage from './pages/BlogDetailPage'
import Auth from './pages/AuthPage';
import MyPosts from './pages/MyPosts';
import { useSelector } from 'react-redux';
import NavbarSkeleton from './skeleton/NavbarSkeleton';
import PostDetailtSkeleton from './skeleton/PostDetailtSkeleton';

function App() {

  const {loading} = useSelector(state => state.posts)
  
 
  return (
    <div className=' w-full '>
     <BrowserRouter>
     
     {(loading ? <NavbarSkeleton/> : <Navbar/> )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path='my-posts/detail/:id' element={ <BlogDetailPage/> } />
        <Route path='/detail/:id' element={ <BlogDetailPage/> } />
        <Route path='/auth' element={<Auth/>} />
      </Routes>
     </BrowserRouter>
     <Toaster />
    </div>
  )
}

export default App
