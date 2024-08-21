import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useUserInfo } from "../../ContextAPI";

const OneboxHeader = () => {
  const { name, toggleTheme, theme } = useUserInfo();
  const isLightMode = theme === 'light';

  const headerBgColor = isLightMode ? 'bg-gray-200' : 'bg-[#161616]';
  const borderColor = isLightMode ? 'border-black' : '';

  const toggleBtnColor = isLightMode ? 'text-gray-600' : 'text-gray-300'; 

  const textColor = isLightMode ? 'text-gray-700' : 'text-gray-300'; 

  return (
    <div className={`w-[94vw] h-[10vh] ${headerBgColor} flex items-center justify-between pl-10 pr-5 border-b ${borderColor}`}>
      <p className={`font-bold ${textColor}`}>Onebox</p>

      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className={`text-xl ${toggleBtnColor}`}>
          {isLightMode ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
        <div>
          <p className={`flex items-center ${textColor}`}>
            {name}'s Workplace{" "}
            <span className="mt-1 cursor-pointer">
              <FaAngleDown />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneboxHeader;
