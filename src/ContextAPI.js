import React, { createContext, useContext, useState } from "react";
import defaultphoto from "./images/default.png";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(defaultphoto);
  const [theme, setTheme] = useState("dark");
  const [emailCount, setEmailCount] = useState(0);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <UserInfoContext.Provider
      value={{
        name,
        setName,
        picture,
        setPicture,
        theme,
        toggleTheme,
        emailCount,
        setEmailCount,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
