"use client"
import Image from "next/image"
import partner1 from "../../public/img/partners/partner1.png"
import partner2 from "../../public/img/partners/partner2.png"
import partner3 from "../../public/img/partners/partner3.png"
import { useAppContext } from "@/context-api/AppContext"
export const Partners = () => {
    const { language } = useAppContext()
    return(<>
             <div className="text-center my-10 text-3xl font-bold ">{language === "English" ? "Our Partrners": "हमारे सहयोगियों"}</div>
        <div className="w-full mt-10 bg-white shadow-2xl p-10">
            <div className="flex justify-evenly flex-wrap space-x-5 gap-y-5">
                <div className="w-1/3 md:w-fit">
                    <Image src={partner2} alt="" width={280} height={350} />
                </div>
                <div className="w-1/3 md:w-fit" >
                    <Image src={partner1} alt="" width={280} height={350} />
                </div>
                <div className="w-1/3 md:w-fit">
                    <Image src={partner3} alt="" width={280} height={350} />
                </div>
            </div>
        </div>
        </>
    )
}