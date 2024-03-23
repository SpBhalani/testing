"use client"
import Image from "next/image"
import contributeImage from "../../public/img/contribute.png"
import { useAppContext } from "@/context-api/AppContext"
import Modal from "./Modal"
import { useState } from "react"
import qrImage from "../../public/img/qr.jpeg"
import Link from "next/link"

export const ContributeSection = () => {
    const { language } = useAppContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
     return(
         <>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-semibold text-gray-900 text-center">{language === "English" ?"Thank you for supporting student empowerment!":"छात्र सशक्तिकरण का समर्थन करने के लिए धन्यवाद!"}</h2>
        <p className="mt-4 text-gray-600 text-center">{language === "English" ?"Scan the QR code to make a meaningful contribution towards fostering academic achievements and campus creativity.":"शैक्षणिक उपलब्धियों और परिसर रचनात्मकता को बढ़ावा देने में सार्थक योगदान देने के लिए QR कोड को स्कैन करें।"}</p>
            <Image src={qrImage} alt="QR Code" height={250} width={250} className="mx-auto" />
        <p className="mt-4 text-gray-600 text-center">{language === "English" ? <> After making your payment, please click <Link className='text-blue-600 underline' href={'/'}>here</Link> to submit your name, location, and amount for our records.</>:<>अपना भुगतान करने के बाद, हमारे रिकॉर्ड के लिए अपना नाम, स्थान और राशि जमा करने के लिए कृपया <Link className='text-blue-600 underline' href={'/'}>यहां </Link> पर क्लिक करें।</>}</p>
        <h2 className="text-sm font-semibold text-gray-900 text-center">{language === "English" ?"Thank you for your contribution!":"आपके आपके योगदान हेतु धन्यवाद!"}</h2>
      </Modal>
        <div className="px-5 pt-5 md:px-10 md:pt-10 bg-[#4444FF] mt-5 ">
            <div className="text-[30px] md:text-[47px] text-white font-semibold text-center mb-5">{language === "English" ? "Empower Education: Support Our Cause.": "शिक्षा को सशक्त बनाएं: हमारे उद्देश्य का समर्थन करें।"}</div>
            <div className="text-[15px] md:text-[22px] text-[#EFEFEF] text-center px-1 md:px-10">{language === "English" ?"By supporting the biggest positive movement, you're fueling a transformative journey in education across India. Your contribution directly enables us to amplify inspiring stories of students and provide vital resources to schools in need. Together, we're fostering a culture of empowerment, unlocking the potential of every child, and building a brighter future for generations to come. Join us in this impactful movement and be a part of something truly extraordinary. Your support makes all the difference.": "सबसे बड़े सकारात्मक आंदोलन का समर्थन करके, आप पूरे भारत में शिक्षा में एक परिवर्तनकारी यात्रा को बढ़ावा दे रहे हैं। आपका योगदान सीधे तौर पर हमें छात्रों की प्रेरणादायक कहानियों को बढ़ाने और जरूरतमंद स्कूलों को महत्वपूर्ण संसाधन प्रदान करने में सक्षम बनाता है। साथ मिलकर, हम सशक्तीकरण की संस्कृति को बढ़ावा दे रहे हैं, प्रत्येक बच्चे की क्षमता को उजागर कर रहे हैं और आने वाली पीढ़ियों के लिए एक उज्जवल भविष्य का निर्माण कर रहे हैं। इस प्रभावशाली आंदोलन में हमारे साथ जुड़ें और वास्तव में किसी असाधारण चीज़ का हिस्सा बनें। आपके समर्थन से बहुत फर्क पड़ता है."}</div>
            <div className="w-full flex flex-col items-center my-10 gap-y-5 ">
                <div className="">
                    <Image src={contributeImage} alt="" width={600} height={350} className=""/>
                </div>
                <div className="md:text-[25px] bg-[#00FF1D] p-2 md:p-5 w-fit h-fit rounded-bl-xl rounded-tr-xl self-center mb-5 cursor-pointer hover:shadow-lg hover:text-gray-700" onClick={openModal}>
                {language === "English" ?"Contribute For Students Future":"छात्रों के भविष्य के लिए योगदान करें"}
                </div>
            </div>
        </div>
         </>
    )
}