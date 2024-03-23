"use client"
import { useAppContext } from "@/context-api/AppContext"
import { CategoryType } from "@/interface/apiInterface"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti"

export const Footer = () => {
    const { language, setLanguage } = useAppContext()
    const router = useRouter()
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.BASE_URL}setting/category`)
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <div className="bg-[#3B2E2E] mt-10 pb-10 text-center md:flex md:items-center md:justify-between md:px-40 md:text-left">
                <div className="flex justify-around p-10 w-full md:basis-1/2">
                    <div className="flex text-white flex-col gap-y-2 basis-1/2">
                        <div className="font-bold md:text-lg">Company</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer" onClick={() => router.push('/')}>Home</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer" onClick={() => router.push('/about')}>About Us</div>
                        {categories.map((category) => {
                            if (category.categoryLanguage === language) {
                                return (
                                    <div className="text-gray-300 text-sm md:text-base cursor-pointer" key={category._id} onClick={() => router.push('/blogs/'+ category._id)}>{category.categoryName}</div>
                                )
                            }
                        }
                        )}
                    </div>
                    <div className="flex text-white flex-col gap-y-2 basis-1/2 md:basis-1/2">
                        <div className="font-bold md:text-lg cursor-pointer">Resources</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer">Privacy Policy</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer">Terms and Condition</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer" onClick={() => router.push('/')}>Blog</div>
                        <div className="text-gray-300 text-sm md:text-base cursor-pointer" onClick={() => router.push('/contact')}>Contact Us</div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-3">
                    <div className="text-[24px] font-bold text-white">FOLLOW US</div>
                    <div className="flex justify-center gap-x-5 w-full items-center">
                        <Link href={'https://www.instagram.com/sch.hello/'} target='blank' className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
                            <TiSocialTwitter color="white" size={30} className=" group-hover:scale-110 " />
                        </Link>
                        <Link href={'https://www.linkedin.com/company/100532480/admin/feed/posts/'} target='blank' className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
                            <TiSocialLinkedin color="white" size={30} className=" group-hover:scale-110 " />
                        </Link>
                        <Link href={'https://www.instagram.com/sch.hello/'} target='blank' className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
                            <TiSocialYoutube color="white" size={30} className=" group-hover:scale-110 " />
                        </Link>
                        <Link href={'https://www.instagram.com/sch.hello/'} target='blank' className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
                            <svg className=" group-hover:scale-110 " width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.946 5.33081C7.84058 5.33081 5.33569 7.83569 5.33569 10.9412C5.33569 14.0466 7.84058 16.5515 10.946 16.5515C14.0515 16.5515 16.5564 14.0466 16.5564 10.9412C16.5564 7.83569 14.0515 5.33081 10.946 5.33081ZM10.946 14.5886C8.93921 14.5886 7.29858 12.9529 7.29858 10.9412C7.29858 8.92944 8.93433 7.2937 10.946 7.2937C12.9578 7.2937 14.5935 8.92944 14.5935 10.9412C14.5935 12.9529 12.9529 14.5886 10.946 14.5886ZM18.0945 5.10132C18.0945 5.82886 17.5085 6.40991 16.7859 6.40991C16.0584 6.40991 15.4773 5.82397 15.4773 5.10132C15.4773 4.37866 16.0632 3.79272 16.7859 3.79272C17.5085 3.79272 18.0945 4.37866 18.0945 5.10132ZM21.8103 6.42944C21.7273 4.67651 21.3269 3.12378 20.0427 1.84448C18.7634 0.565185 17.2107 0.164795 15.4578 0.0769043C13.6511 -0.0256348 8.23608 -0.0256348 6.42944 0.0769043C4.6814 0.159912 3.12866 0.560303 1.84448 1.8396C0.560303 3.1189 0.164795 4.67163 0.0769043 6.42456C-0.0256348 8.2312 -0.0256348 13.6462 0.0769043 15.4529C0.159912 17.2058 0.560303 18.7585 1.84448 20.0378C3.12866 21.3171 4.67651 21.7175 6.42944 21.8054C8.23608 21.908 13.6511 21.908 15.4578 21.8054C17.2107 21.7224 18.7634 21.322 20.0427 20.0378C21.322 18.7585 21.7224 17.2058 21.8103 15.4529C21.9128 13.6462 21.9128 8.23608 21.8103 6.42944ZM19.4763 17.3914C19.0955 18.3484 18.3582 19.0857 17.3962 19.4714C15.9558 20.0427 12.5378 19.9109 10.946 19.9109C9.35425 19.9109 5.9314 20.0378 4.49585 19.4714C3.53882 19.0906 2.80151 18.3533 2.41577 17.3914C1.84448 15.9509 1.97632 12.533 1.97632 10.9412C1.97632 9.34937 1.84937 5.92651 2.41577 4.49097C2.79663 3.53394 3.53394 2.79663 4.49585 2.41089C5.93628 1.8396 9.35425 1.97144 10.946 1.97144C12.5378 1.97144 15.9607 1.84448 17.3962 2.41089C18.3533 2.79175 19.0906 3.52905 19.4763 4.49097C20.0476 5.9314 19.9158 9.34937 19.9158 10.9412C19.9158 12.533 20.0476 15.9558 19.4763 17.3914Z" fill="white" />
                            </svg>

                            {/* <TiSocialInstagram color="white" size={30} /> */}
                        </Link>
                        <Link href={'https://www.facebook.com/profile.php?id=61556255527607'} target='blank' className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
                            <TiSocialFacebook color="white" size={30} className=" group-hover:scale-110 " />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-y-2 py-2 md:py-0 bg-[#000042] justify-around text-white items-center h-28 md:h-20 ">
                <div>Copywrite @ School Chale Ham 2024</div>
                <div className="flex gap-x-2">Crafted with
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.17208C3.92211 4.4222 4.93934 4.00093 6 4.00093C7.06066 4.00093 8.07789 4.4222 8.828 5.17208L10 6.34308L11.172 5.17208C11.541 4.79004 11.9824 4.48531 12.4704 4.27567C12.9584 4.06604 13.4833 3.95569 14.0144 3.95108C14.5455 3.94646 15.0722 4.04767 15.5638 4.24879C16.0554 4.44992 16.502 4.74693 16.8776 5.1225C17.2532 5.49807 17.5502 5.94468 17.7513 6.43626C17.9524 6.92785 18.0536 7.45457 18.049 7.98569C18.0444 8.5168 17.934 9.04168 17.7244 9.5297C17.5148 10.0177 17.21 10.4591 16.828 10.8281L10 17.6571L3.172 10.8281C2.42212 10.078 2.00085 9.06074 2.00085 8.00008C2.00085 6.93942 2.42212 5.92219 3.172 5.17208Z" fill="#FF0000" />
                        </svg>
                    </span>
                    India !   </div>
                <div className="flex border-2 border-white text-sm md:text-base font-bold">
                    <div className={`py-1 px-2 md:px-4 ${language === "English" ? "bg-white text-black" : ""} cursor-pointer`} onClick={() => {setLanguage("English"); router.push('/')}}>English</div>
                    <div className={`py-1 px-2 md:px-4 ${language === "Hindi" ? "bg-white text-black" : ""} cursor-pointer `} onClick={() => {setLanguage("Hindi"); router.push('/')}} >Hindi</div>
                </div>
            </div>
        </>
    )
}