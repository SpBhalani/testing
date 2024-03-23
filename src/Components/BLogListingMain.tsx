"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Pagination from "@/Components/Pagination";
import { CategoryType, blogDataType } from "@/interface/apiInterface";
import { useParams, useRouter } from "next/navigation";
import Preloader from "@/Components/Preloader";
import BlogCard from "@/Components/BlogCard";
import { useAppContext } from "@/context-api/AppContext";
import { Metadata } from "next";

const BlogGridSection = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(9);
    const [totalPages, setotalPages] = useState<number>(0);
    const [currentPage, setcurrentPage] = useState<number>(1);
    const [category,setCategory] = useState<CategoryType>()
    const [loading, setLoading] = useState<boolean>(false);
    const [blog, setBlog] = useState<blogDataType[]>([])
    const { id } = useParams()
    const { language,setLanguage } = useAppContext()
    const router = useRouter()
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.BASE_URL}blog/all-blog-by-category/${id}?page=${page}&limit=${limit}`)
            .then((res) => {
                setBlog(res.data.blogs);
                setotalPages(res.data.totalPages);
                setcurrentPage(res.data.currentPage);
            })
            .catch((e) => console.log(e));
            axios
            .get(`${process.env.BASE_URL}setting/single-category/${id}`)
            .then((res) => {
                setCategory(res.data.data[0])                
                setLoading(false);
            })
            .catch((e) => {
                console.log(e)
                setLoading(false)
            });
    }, [page, limit, setBlog, language, setCategory]);
    if(loading){
        return(
            <Preloader />
        )
    }
    return (
        <section className="w-10/12 md:w-1/2 mx-auto">
            <div className="font-bold text-5xl my-10 text-center">{category?.categoryName}</div>
            <div className="mt-10">
                <div className=" flex flex-wrap gap-5 justify-center">
                    {blog.length ? (
                        blog.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <div key={index} className="border overflow-hidden w-full shadow-xl cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200 rounded-2xl"
                                    onClick={() => router.push('/detailed-blog/'+item._id)}
                                    >
                                        <img src={item.img} alt={item.title} className="w-full h-60 object-cover" />
                                        <div className="px-5 py-2 ">
                                            <p className="text-sm text-gray-400">{category?.categoryName}</p>

                                            <h5 className="text-2xl font-semibold mb-5">{item.title}</h5>
                                            <p className="text-sm text-gray-400">{item.date}</p>

                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return <BlogCard blog={item} category={category} key={item._id}/>
                            }
                        }
                        )
                    ) : (
                        <>
                            {loading ? (
                                <>
                                    <Preloader />
                                </>
                            ) : (
                                <>
                                    <p className="text-center mt-5"> { language === "English" ? "No Blog Found" : "कोई ब्लॉग नहीं मिला"} </p>
                                </>
                            )}
                        </>
                    )}
                </div>

                {blog?.length ? (
                    <div className="flex justify-center">
                        <div className="col-12">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                setPage={setPage}
                                Pagination_space="flex justify-center mt-40  mb-45"
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
};

export default BlogGridSection;
