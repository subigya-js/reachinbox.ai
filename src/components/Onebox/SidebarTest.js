import React from "react";
import logowhite from "../../images/logowhite.jpeg";
import defaultphoto from "../../images/default.png";
import { GoHomeFill } from "react-icons/go";
import { RiUserSearchFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";
import { BsFillInboxFill } from "react-icons/bs";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { useUserInfo } from "../../ContextAPI";

const Sidebar = () => {
  const { picture, theme, emailCount } = useUserInfo();
  const userPicture = picture || defaultphoto;

  const sidebarBgColor = theme === "light" ? "bg-gray-300" : "bg-[#0d0c0c]";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const popupBgColor = "bg-red-400";

  return (
    <div
      className={`w-[6vw] h-[100vh] ${sidebarBgColor} flex flex-col py-5 items-center justify-between`}
    >
      <img
        src={logowhite}
        alt="Reachinbox Logo"
        className="h-10 w-10 rounded-md"
      />

      <ul className="flex flex-col justify-between items-center h-[60%]">
        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <GoHomeFill />
          </button>
        </li>

        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <RiUserSearchFill />
          </button>
        </li>

        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <IoMdMail />
          </button>
        </li>

        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <IoIosSend />
          </button>
        </li>

        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <TfiMenuAlt />
          </button>
        </li>

        <li className="relative bg-gray-500 py-1 px-2 rounded-lg">
          <button className={`text-2xl relative ${textColor}`}>
            <BsFillInboxFill />
            <span
              className={`absolute rounded-full text-[9px] font-bold h-6 w-6 text-center flex justify-center items-center top-[-15px] right-[-20px] ${popupBgColor}`}
            >
              {emailCount > 9 ? `${emailCount}+` : emailCount}
            </span>
          </button>
        </li>

        <li className="relative">
          <button className={`text-2xl ${textColor}`}>
            <BiSolidBarChartAlt2 />
          </button>
        </li>
      </ul>

      <div>
        <img
          src={userPicture}
          alt="UserPhoto"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
