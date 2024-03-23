"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useAppContext } from "@/context-api/AppContext";
import { CategoryType, blogDataType } from "@/interface/apiInterface";
import axios from "axios";
import Preloader from "./Preloader";
export default function HomeBanner() {
  const { language } = useAppContext()
  const [hindiBlogs, setHindiBlogs] = useState<blogDataType[]>([])
  const [englishBlogs, setEnglishBlogs] = useState<blogDataType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.BASE_URL}blog/blog-home`)
      .then(res => {
        setHindiBlogs(res.data.blogs.hindiBlogs)
        setEnglishBlogs(res.data.blogs.englishBlog)
        setIsLoading(false)
      })
      .catch(e => {
        console.log(e)
        setIsLoading(false)
      })
  }, [language])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>
  };
  if (isLoading) {
    return <Preloader />
  }
  return (

    <div className="slider-container relative -z-10">

      {
        language === "English" ?

          <Slider {...settings} className="z-10">
              {
                englishBlogs.map((blog, index) => {
                  if (index < 2) {
                    return (
                      <div className="relative" key={blog._id}>
                        <img src={blog.img} className="w-full h-[25vh] md:h-[80vh]" alt=""  />
                        <div className="text-white w-full mx-auto absolute bottom-0 left-0 right-0 bg-gradient-to-b  from-transparent to-black font-bold text-sm md:text-4xl px-5 md:px-20 text-center py-4 md:py-20">
                          {blog.title}
                        </div>
                      </div>
                    )
                  }
                })
              }
              {
                hindiBlogs.map((blog, index) => {
                  if (index < 1) {
                    return (
                      <div className="relative" key={blog._id}>
                        <img src={blog.img} className="w-full h-[25vh] md:h-[80vh]" alt=""  />
                        <div className="text-white w-full mx-auto absolute bottom-0 left-0 right-0 bg-gradient-to-b  from-transparent to-black font-bold text-sm md:text-4xl px-5 md:px-20 text-center py-4 md:py-20">
                          {blog.title}
                        </div>
                      </div>
                    )
                  }
                })
              }
          </Slider>
          :

          <Slider {...settings} className="z-10">
            {
              hindiBlogs.map((blog, index) => {
                if (index < 2) {
                  return (
                    <div className="relative" key={blog._id}>
                      <img src={blog.img} className="w-full h-[25vh] md:h-[80vh]" alt="" />
                      <div className="text-white w-full mx-auto absolute bottom-0 left-0 right-0 bg-gradient-to-b  from-transparent to-black font-bold text-sm md:text-4xl px-5 md:px-20 text-center py-4 md:py-20">
                        {blog.title}
                      </div>
                    </div>
                  )
                }
              })
            }
            {
              englishBlogs.map((blog, index) => {
                if (index < 1) {
                  return (
                    <div className="relative" key={blog._id}>
                      <img src={blog.img} className="w-full h-[25vh] md:h-[80vh]" alt=""  />
                      <div className="text-white w-full mx-auto absolute bottom-0 left-0 right-0 bg-gradient-to-b  from-transparent to-black font-bold text-sm md:text-4xl px-5 md:px-20 text-center py-4 md:py-20">
                        {blog.title}
                      </div>
                    </div>
                  )
                }
              })
            }


        </Slider>
      }
    </div>
  );
}