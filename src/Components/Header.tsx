"use client"
import { useAppContext } from "@/context-api/AppContext";
import { CategoryType } from "@/interface/apiInterface";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import Image from "next/image";
import logoImage from '../../public/img/logo.png'
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export const Header = () => {
  const [nav, setNav] = useState(false);
  const router = useRouter()
  const path = usePathname()
  const { language, setLanguage, setEnglishCategories, setHindiCategories } = useAppContext()
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const links = [
    {
      id: 1,
      link: "/",
      label: "Home"
    },
    {
      id: 2,
      link: "/about",
      label: "About"
    },
  ];
  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.BASE_URL}setting/category`)
      .then(res => {
          setCategories(res.data)
        let hindiCategories: CategoryType[] = res.data.filter((category: CategoryType) => category.categoryLanguage === "Hindi");
        let EnglishCategories: CategoryType[] = res.data.filter((category: CategoryType) => category.categoryLanguage === "English");
        setEnglishCategories(EnglishCategories);
        setHindiCategories(hindiCategories);
          setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Preloader />
  }
  return (
    <div className="flex justify-between items-center w-full h-28 px-4 text-white bg-[#1E1E1E] sticky top-0 nav shadow-2xl z-10">
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
          <h1 className="md:ml-2 cursor-pointer" onClick={() => router.push('/')} >
            <Image src={logoImage} alt="Logo" width={120} height={200} className="md:hidden" />
            <Image src={logoImage} alt="Logo" width={170} height={100} className="hidden md:block" />
          </h1>
      <div className="flex border-2 border-white text-sm md:text-base font-bold">
        <div className={`py-1 px-2 md:px-4 ${language === "English" ? "bg-white text-black" : ""} cursor-pointer`} onClick={() => {setLanguage("English"); router.push('/')}}>English</div>
        <div className={`py-1 px-2 md:px-4 ${language === "Hindi" ? "bg-white text-black" : ""} cursor-pointer `} onClick={() => {setLanguage("Hindi"); router.push('/')}} >Hindi</div>
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, link, label }) => (
          <li
            key={id}
            className={`nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline hover:border-b-2 border-white pb-2 mr-2 ${path === link ? "border-b-2" : ""}`}
          >
            <div onClick={() => router.push(link)}>{label}</div>
          </li>
        ))}
        {categories.map((category) => {
          if (category.categoryLanguage === language) {
            return (
              <li
                key={category._id}
                className={`nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline hover:border-b-2 border-white pb-2 mr-2 ${path === "/blogs/"+category._id ? "border-b-2" : ""}`}
              >
                <div onClick={() => router.push(`/blogs/${category._id}`)} >{category.categoryName}</div>
              </li>
            )
          }
        }
        )}
      </ul>
      <div
        className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline border-2 border-white rounded-xl p-2 hidden md:block"
      >
        <Link href={'/contact'}>Contact Us</Link>
      </div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-50 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} color="white" /> : <FaBars size={30} color="white" />}
        {/* {nav ? <Close/> : <Open />} */}
      </div>

      {nav && (
        <ul className="flex flex-col items-center absolute top-0 left-0 w-full text-2xl space-y-5 h-screen bg-gradient-to-b from-[#1E1E1E] via-[#1E1E1E] to-[#f0f2f5] text-white z-40">
          <Image src={logoImage} alt="Logo" width={200} height={200} className="mb-28" />
          {links.map(({ id, link, label }) => (
            <li
              key={id}
              className={`nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline hover:border-b-2 border-white pb-2 mr-2 ${path === link ? "border-b-2" : ""}`}
            >
              <Link href={link} onClick={() => setNav(false)}>{label}</Link>
            </li>
          ))}
          {categories.map((category) => {
            if (category.categoryLanguage === language) {
              return (
                <li
                  key={category._id}
                  className={`nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline hover:border-b-2 border-white pb-2 mr-2 ${path === category.categoryName.replaceAll(" ", "-") ? "border-b-2" : ""}`}
                >
                  <div onClick={() => {setNav(false); router.push(`/blogs/${category._id}`)}}>{category.categoryName}</div>
                </li>
              )
            }
          }
          )}
          <div
            className="nav-links px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 hover:text-white duration-200 link-underline border-2 border-white rounded-xl p-2"
          >
            <Link href={'/contact'} onClick={() => setNav(false)}>Contact Us</Link>
          </div>
        </ul>

      )}
    </div>
  );
};

