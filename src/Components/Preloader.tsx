import Image from "next/image";
import React from "react";

const Preloader = () => {
  return (
    <>
      <div className=" fixed top-0 bottom-0 left-0 right-0 z-[999999] bg-white">
        <div className="w-[50px] h-[50px] inline-block p-0 text-left box-border absolute top-1/2 left-1/2 -ml-[25px] -mt-[25px]">
          <span className="absolute w-[80px] h-[80px] inline-block rounded-full bg-[#3951ca] animate-[preloader_1.3s_linear_infinite]"></span>
          <span className="absolute w-[80px] h-[80px] inline-block rounded-full bg-[#3951ca] animate-[preloader_1.3s_linear_infinite] delay-[-0.8s]"></span>
        </div>
      </div>
    </>
  );
};

export default Preloader;
