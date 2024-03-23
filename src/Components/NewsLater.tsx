"use client"
import Image from 'next/image'
import subscribeTo from '../../public/img/subscribe.png'
import whatsapp from '../../public/img/whatsapp.png'
import { useState } from 'react'
import axios from 'axios'
import { useAppContext } from '@/context-api/AppContext'
import Link from 'next/link'
export const NewsLater = () => {
    const { language } = useAppContext()
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")

    function isEmail(val:string) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(val)){
          return false;
        }
        return true
    }

    const handleSubscribe = () => {
        if(!email) {
            setError("Please enter your Email.")
            return
        }
        if(!isEmail(email)) {
            setError("Please enter valid Email.")
            return
        }
        axios.post(`${process.env.BASE_URL}subscribe/create`,{ email })
        .then(res => {
            if(res.data.message === "Success"){
                window.alert("Thank you for Subcribing our Newsletter.")
                setEmail("")
            }
        })
        .catch(e => {
            console.log(e);
            
        })
    }
    return (
        <div className="flex flex-col md:flex-row">
            <div className='flex flex-col items-center space-y-5 bg-white py-10 md:basis-2/3'>
                <div className='text-[16px] font-bold'>{language === "English" ? "NEWSLETTER" : "न्यूजलैटर"}</div>
                <div className='text-[30px] font-bold text-[#0866ff]'>{language === "English" ? "Subscribe Our Newsletter": "हमारे न्यूज़लेटर की सदस्यता लें"}</div>
                <div className='text-[15px] text-center text-[#303030] md:w-1/2'>
                  { language === "English" ?
                    "Join The Squad. Get your daily updates from School Chale Ham in your inbox.\nTogether, Let's Redefine Education!"
                    :
                    "जॉइन करें हमारे स्क्वाड में। अपने इनबॉक्स में स्कूल चले हम से रोजाना अपडेट पाएं।\nसाथ में, शिक्षा को पुनः परिभाषित करें!"
                  }
                </div>
                <div className='flex'>
                    <input
                        type="email"
                        placeholder="Enter mail.."
                        required
                        value={email}
                        onChange={(e) => {setEmail(e.target.value); setError("")}}
                        className="w-3/4 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-2xl"
                    />
                    <button className='text-white bg-[#0866ff] p-3 rounded-r-lg' onClick={handleSubscribe}>
                    {language === "English" ? "Subscribe" : "सदस्यता लें"}
                    </button>
                </div>
                    { error && <div className='text-red-700'>{error}</div> }
            </div>
            <div className='bg-[#075E54] px-5 flex flex-col items-center space-y-5 py-10 md:basis-1/3'>
                <Link href={'https://whatsapp.com/channel/0029VaOZVvq5Ejxw7LTv9o3R'} target='_blank' className='flex items-center space-x-3 cursor-pointer'>
                    <Image src={subscribeTo} alt='' width={45} height={45} />
                    <div className='text-xl font-bold text-white'>{language === "English" ? "Join Our Community" : "हमारी संस्था से जुड़े"}</div>
                </Link>
                <Link href={'https://whatsapp.com/channel/0029VaOZVvq5Ejxw7LTv9o3R'} target='_blank' className='cursor-pointer'>
                    <Image src={whatsapp} alt='' width={90} height={90} />
                </Link>
            </div>
        </div>
    )
}