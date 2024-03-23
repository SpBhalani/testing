"use client"
import { useAppContext } from "@/context-api/AppContext"
import { CategoryType, blogDataType } from "@/interface/apiInterface"
import axios from "axios"
import { useEffect, useState } from "react"
import Preloader from "./Preloader"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const Academics = () => {
    const { language, hindiCategories, englishCategories } = useAppContext()
    const [category, setCategory] = useState<CategoryType>()
    const [blogs, setBlogs] = useState<blogDataType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    let total = 0
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.BASE_URL}blog/all-blog`)
            .then(res => {
                setBlogs(res.data.blogs)
                if (language === "English") {
                    setCategory(englishCategories[1])
                }
                else {
                    setCategory(hindiCategories[1])
                }
                setIsLoading(false)
            })
            .catch(e => {
                console.log(e)
                setIsLoading(false)
            })


    }, [language, hindiCategories, englishCategories])
    if (isLoading) {
        return <Preloader />
    }
    return (
        <>
            <div className="w-full mt-10">
                <div className="text-center my-10 text-3xl font-bold">{ language === "English" ? "The Academics" : "शिक्षाविद"}</div>
                <div className="flex flex-col items-center md:flex-row md:flex-wrap px-5 md:justify-center py-5 md:w-8/12 md:mx-auto">
                    {
                        blogs?.map((blog, index) => {
                            if (blog.categoryId === category?._id && total < 4) {
                                total += 1
                                return (
                                    <div 
                                        onClick={() => router.push(`/detailed-blog/${blog._id}`)}
                                        className="flex md:h-60 overflow-hidden my-5 md:m-5 shadow-lg rounded-tr-3xl rounded-bl-3xl md:basis-2/5 hover:scale-105 transition-all duration-200 cursor-pointer" key={blog._id}>
                                        <div className="px-6 py-4 basis-1/2 flex flex-col">
                                            <div className="font-bold text-lg mb-2">{blog.title}</div>
                                            <p className="text-gray-700 text-sm mb-3">
                                                {blog.description.slice(0, 50) + (blog.description.length > 50 ? "..." : "")}
                                            </p>
                                            <p className="text-sm mt-auto">{blog.date}</p>
                                        </div>
                                        <div className="basis-1/2 flex items-center justify-center p-5">
                                            <Image src={blog.img} alt={blog.title} width={200} height={150} className="basis-1/2" />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}