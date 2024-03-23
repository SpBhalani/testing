"use client"
import { useAppContext } from "@/context-api/AppContext"
import { CategoryType, blogDataType } from "@/interface/apiInterface"
import axios from "axios"
import { useEffect, useState } from "react"
import Preloader from "./Preloader"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const InSpotlight = () => {
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
                    setCategory(englishCategories[0])
                }
                else {
                    setCategory(hindiCategories[0])
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
                <div className="text-center my-10 text-3xl font-bold">{ language === "English" ? "In Spotlight" : "सुर्खियों में" }</div>
                <div className="flex flex-col items-center md:flex-row px-5 space-y-5 md:space-y-0 md:space-x-5 md:justify-center py-5">
                    {
                        blogs?.map((blog, index) => {
                            if (blog.categoryId === category?._id && total < 4) {
                                total += 1
                                return (
                                    <div 
                                        onClick={() => router.push(`/detailed-blog/${blog._id}`)}
                                    className=" w-4/5 md:max-w-sm overflow-hidden shadow-xl h-[300px] cursor-pointer hover:scale-105 transition-all duration-200" key={blog._id}>
                                        <div className="w-full md:h-[60%] overflow-hidden">
                                        <Image src={blog.img} alt={blog.title} width={400} height={200} layout="fixed" />
                                        </div>
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{blog.title}</div>
                                            <p className="text-gray-700 text-base">
                                                {blog.description.slice(0,50) + (blog.description.length > 50 ? "..." : "")}
                                            </p>
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