"use client"
import React, { useState } from 'react';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti';
import moment from "moment/moment";
import axios from 'axios';
import Link from 'next/link';
import { useAppContext } from '@/context-api/AppContext';


const ContactUsMain: React.FC = () => {
    const { language } = useAppContext()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [error, setError] = useState<string>("")
    const now = moment();
    const date = now.format("MM/DD/YY hh:mm a");
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10) setError("Please enter valid Phone no.")
        else {
            const data = {
                name, email, phone, message, date
            }
            axios.post(`${process.env.BASE_URL}contact/send-message`, data)
                .then(res => {
                    if (res.status === 200) {
                        window.alert("Message Sent.")
                        setName("")
                        setEmail("")
                        setPhone("")
                        setMessage("")
                        setError("")
                    }
                })
                .catch(e => {
                    console.log(e)
                    window.alert("Something went Wrong. Please try after some time.")
                })
        }
    };

    return (
        <>
            <section
                className="relative z-[1] overflow-hidden bg-white dark:bg-dark py-20 lg:py-[120px]"
            >
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4 lg:justify-between">
                        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                            <div className="mb-12 max-w-[570px] lg:mb-0">
                                <div className='text-2xl font-bold mx-auto w-fit mb-3'>
                                    { language === "English" ? "Contact Us": "संपर्क करें"}
                                </div>
                                <p
                                    className="text-base leading-relaxed text-center text-body-color dark:text-dark-6 mb-9"
                                >
                                 { language === "English" ? "Welcome to our website. We are a team dedicated to providing the best service possible. Our mission is to offer quality services that meet our customers' needs and exceed their expectations. With years of experience in our field, we are committed to innovation and excellence.": "हमारी वेब साईट में स्वागत है। हम सर्वोत्तम सेवा प्रदान करने के लिए समर्पित एक टीम हैं। हमारा मिशन ऐसी गुणवत्तापूर्ण सेवाएँ प्रदान करना है जो हमारे ग्राहकों की ज़रूरतों को पूरा करती हों और उनकी अपेक्षाओं से अधिक हों। अपने क्षेत्र में वर्षों के अनुभव के साथ, हम नवाचार और उत्कृष्टता के लिए प्रतिबद्ध हैं।"}
                                </p>
                                <div className="mb-8 flex flex-col items-center">
                                    <h4 className="text-xl font-bold ">
                                        Email Address
                                    </h4>
                                    <p className="text-base text-body-color dark:text-dark-6">
                                    teamsch.connect@gmail.com
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-y-3">
                                    <h4 className="text-xl font-bold ">FOLLOW US</h4>
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
                                        <Link href={'https://www.instagram.com/sch.hello/'} target='blank'  className="bg-[#0000FF] p-3 rounded-full group cursor-pointer">
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
                        </div>
                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div
                                className="relative p-8 bg-white rounded-lg shadow-lg dark:bg-dark-2 sm:p-12"
                            >
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            placeholder="Your Name"
                                            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Your Email"
                                            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text"
                                            placeholder="Your Phone"
                                            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <textarea
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={6}
                                            placeholder="Your Message"
                                            className="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-primary w-full resize-none rounded border py-3 px-[14px] text-base outline-none"
                                        ></textarea>
                                    </div>
                                    <div className='mb-6'>
                                        { error && 
                                            <div className='text-red-600'>{error}</div>
                                        }
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full p-3 bg-[#0000ff] text-white hover:bg-[#0d0de1] hover:shadow-2xl transition-all duration-500 border rounded border-primary bg-primary hover:bg-opacity-90"
                                        >
                                            { language === "English" ? "Send Message": "मेसेज भेजें"}
                                        </button>
                                    </div>
                                </form>
                                <div>
                                    <span className="absolute -top-10 -right-9 z-[-10]">
                                        <svg
                                            width="100"
                                            height="100"
                                            viewBox="0 0 100 100"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                                                fill="#0000FF"
                                            />
                                        </svg>
                                    </span>
                                    <span className="absolute -right-10 top-[90px] z-[-10]">
                                        <svg
                                            width="34"
                                            height="134"
                                            viewBox="0 0 34 134"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="31.9993"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 1.66665)"
                                                fill="#13C296"
                                            />
                                        </svg>
                                    </span>
                                    <span className="absolute -left-7 -bottom-7 z-[-10]">
                                        <svg
                                            width="107"
                                            height="134"
                                            viewBox="0 0 107 134"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="104.999"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 104.999 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 104.999 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 104.999 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 104.999 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 104.999 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 104.999 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 104.999 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 104.999 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 104.999 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="104.999"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 104.999 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="90.3333"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 90.3333 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="75.6654"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 75.6654 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="31.9993"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 31.9993 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="60.9993"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 60.9993 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="17.3333"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 17.3333 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="132"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 132)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="117.333"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 117.333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="102.667"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 102.667)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="88"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 88)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="73.3333"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 73.3333)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="45"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 45)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="16"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 16)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="59"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 59)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="30.6666"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 30.6666)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="46.3333"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 46.3333 1.66665)"
                                                fill="#13C296"
                                            />
                                            <circle
                                                cx="2.66536"
                                                cy="1.66665"
                                                r="1.66667"
                                                transform="rotate(180 2.66536 1.66665)"
                                                fill="#13C296"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ContactUsMain;
