import React from 'react'

const Hero = () => {
  return (
     <div className="bg-[url('/Group19.png')] flex items-center justify-center h-screen w-full bg-center bg-cover bg-no-repeat rounded-lg">
        <div className="w-full h-full flex flex-col justify-start items-start p-5">
          <img src="/Group30.png" alt="" />
          <h1 className=" max-w-60 font-semibold text-slate-800" >
            Koddan Habere,
            Bilimden Sağlığa;
            Merak Ettiğin Her
            Şey Burada
          </h1>
        </div>
      </div>
  )
}

export default Hero
