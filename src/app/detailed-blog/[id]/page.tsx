"use client";
import BlogCard from "@/Components/BlogCard";
import { CategoryType, blogDataType } from "@/interface/apiInterface";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import DOMPurify from 'dompurify';
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "@/Components/Modal";
import moment from "moment/moment";


const BlogGridSection = () => {
    const { id } = useParams()
    const router = useRouter()
    // const pathRouter = routerRouter()
    // const { asPath } = pathRouter
    const pageUrl = typeof window !== "undefined" && `${window.location.protocol}//${window.location.host}/detailed-blog/${id}`
    const [blog, setBlog] = useState<blogDataType>()
    const [category, setCategory] = useState<CategoryType>()
    const [suggestedBlogs, setSuggestedBlogs] = useState<blogDataType[]>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [comment, setComment] = useState("")
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const now = moment();
    const date = now.format("MM/DD/YY hh:mm a");

    function isEmail(val:string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(val)){
          return false;
        }
        return true
    }

    let total = 0
    useEffect(() => {
        axios.get(`${process.env.BASE_URL}blog/single-blog/${id}`)
            .then(res => {                
                setBlog(res.data.data[0])
                document.title = res.data.data[0].title
                axios
                    .get(`${process.env.BASE_URL}setting/single-category/${res.data.data[0].categoryId}`)
                    .then((res) => {
                        setCategory(res.data.data[0])
                    })
                    .catch((e) => {
                        console.log(e)
                    });
                axios.get(`${process.env.BASE_URL}blog/all-blog-by-category/${res.data.data[0].categoryId}?limit=4`)
                    .then(res => {
                        setSuggestedBlogs(res.data.blogs)
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }, [id, setBlog, setCategory])
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(blog ? blog?.title : "");
    const encodedSummary = encodeURIComponent(blog ? blog?.blogDetails : "");
    const sanitizeHTML = (data?: string): string => {
        if (data) {
            return DOMPurify.sanitize(data);

        }
        return ""
    }
    const handleSubmit = () => {
        if(!name || !email || !comment){
            setError("Please provide all details")
            return
        }
        if(!isEmail(email)){
            setError("Enter Valid Email")
            return
        }
        const data = {
            name, email, comment, blogId: blog?._id, date
        }
        axios.post(`${process.env.BASE_URL}comment/create-comment`, data)
            .then(res => {
                if (res.status === 200) {
                    window.alert("Message Sent.")
                    setName("")
                    setEmail("")
                    setComment("")
                    setError("")
                    closeModal()
                }
            })
            .catch(e => {
                console.log(e)
                window.alert("Something went Wrong. Please try after some time.")
            })
    }
    return (
        <>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="space-y-2">
        <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
            />
        <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
            />
        <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Please write your query"
            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
            />
            {
                error && 
            <div className="text-red-700">{error}</div>
            }
            <button className="p-3 bg-blue-700 text-white w-full rounded-md mx-auto" onClick={handleSubmit}>Submit</button>
            </div>
        </Modal>
            <Head>
                <title>Your Page Title</title>
                <meta property="og:title" content={blog?.title} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.location.protocol}//${window.location.host}/detailed-blog/${id}`} />
                <meta property="og:image" content={blog?.img} />
                <meta property="og:description" content={blog?.blogDetails} />
                {/* <meta property="og:site_name" content="Your Site Name" /> */}
                <meta name="twitter:card" content={blog?.img} />
                {/* <meta name="twitter:site" content="@YourTwitterHandle" /> */}
                <meta name="twitter:title" content={blog?.title} />
                <meta name="twitter:description" content={blog?.blogDetails} />
                <meta name="twitter:image" content={blog?.img} />
            </Head>
            <div className="w-10/12 md:w-1/2 mx-auto py-10 flex flex-col space-y-5 items-start">
                <div className="text-3xl md:text-6xl font-bold p-0">{blog?.title}</div>
                <div className="flex items-center space-x-5 pl-1 md:pl-3">
                    <div className="text-sm text-gray-600 font-bold">
                        {category?.categoryName}
                    </div>
                    <div className="text-xs">
                        {blog?.date}
                    </div>
                </div>
                <div className="w-full">
                    <img src={blog?.img} alt={blog?.title} />
                </div>
                <div className="flex flex-col md:flex-row md:relative md:top-0 w-full">
                    <div id="detailed-blog" className="basis-10/12" dangerouslySetInnerHTML={{ __html: sanitizeHTML(blog?.blogDetails) }} />
                    <div className="basis-2/12 flex md:flex-col justify-around  items-center h-full md:sticky md:top-36 mt-4 md:mt-0 bg-white md:bg-transparent p-3 md:p-0 mb-4 md:mb-0 rounded-full md:rounded-none">
                        <p className="text-gray-500 font-bold md:mb-10 text-2xl">share</p>
                        <Link className="border border-gray-500 rounded-full p-4 w-fit my-1 group hover:border-black cursor-pointer"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="blank"
                        >
                            <FiFacebook size={25} color="#316FF6" fill="#316FF6" className="group-hover:scale-125 transition-all duration-200" />
                        </Link>
                        <Link className="border border-gray-500 rounded-full p-4 w-fit my-1 group hover:border-black cursor-pointer"
                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="blank"
                        >
                            <FiTwitter size={25} color="#1DA1F2" fill="#1DA1F2" className="group-hover:scale-125 transition-all duration-200" />
                        </Link>
                        <Link className="border border-gray-500 rounded-full p-4 w-fit my-1 group hover:border-black cursor-pointer"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`} target="blank"
                        >
                            <FiLinkedin size={25} color="#0A66C2" fill="#0A66C2" className="group-hover:scale-125 transition-all duration-200" />
                        </Link>
                        <Link className="border border-gray-500 rounded-full p-4 w-fit my-1 group hover:border-black cursor-pointer"
                            href={`https://wa.me/?text=${encodeURIComponent(blog?.title + " - " + pageUrl)}`} target="blank"
                        >
                            <IoLogoWhatsapp color="green" size={25}  className="group-hover:scale-125 transition-all duration-200" />
                        </Link>
                    </div>
                </div>
                <div className="flex space-x-3 my-5">
                    <h2 className="py-1 font-bold text-lg">
                    Related Tags : 
                    </h2>
                    {
                        blog?.tags.map(tag => {
                            return(
                                <h3 key={tag} className="bg-gray-300 px-3 py-1 leading-none flex items-center text-center rounded-xl">#{tag}</h3>
                            )
                        })
                    }
                </div>
                {
                    blog?.categoryId  === "65e77c5c3f7de3e5013f8a8e" &&
                    <div className="font-bold">
                    Still, if you have any questions related to the above blog, Please click <span className="text-blue-600 cursor-pointer" onClick={openModal}>Here</span>
                </div>
                }
                <div className="w-full">
                    <div className="text-xl font-bold">YOU MAY ALSO LIKE</div>
                    <hr className="w-full" />
                    <div className="flex flex-col md:flex-row py-5 space-y-4 md:space-y-0 md:space-x-4">
                        {
                            suggestedBlogs?.map(item => {
                                if (item._id !== blog?._id && total < 3) {
                                    total += 1
                                    return (
                                        <BlogCard key={item._id} blog={item} category={category} />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default BlogGridSection;
