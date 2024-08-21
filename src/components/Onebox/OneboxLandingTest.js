import React from "react";
import oneboxDefault from "../../images/oneboxDefault.png";
import { useUserInfo } from "../../ContextAPI";

const OneboxLanding = () => {
  const { theme } = useUserInfo();
  const isLightMode = theme === "light";

  return (
    <div
      className={`h-[90vh] w-[94vw] ${isLightMode ? "bg-white" : "bg-black"}`}
    >
      <div
        className={`text-center flex flex-col justify-center items-center h-full gap-10 ${
          isLightMode ? "text-black" : "text-white"
        }`}
      >
        <img src={oneboxDefault} className="h-[270px]" alt="Onebox Default" />
        <p className="font-bold text-xl">
          It's the beginning of a legendary sales pipeline
        </p>
        <p className="w-[17%] text-center">
          When you have inbound E-mail you'll see them here
        </p>
      </div>
    </div>
  );
};

export default OneboxLanding;
