import React, { useState, useEffect } from "react";
import { useUserInfo } from "../../ContextAPI";
import { FaAngleDown } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import DOMPurify from "dompurify";

const Inbox = () => {
  const { theme, setEmailCount } = useUserInfo();
  const isLightMode = theme === "light";

  const [emailList, setEmailList] = useState([]);

  const fetchEmailList = async () => {
    try {
      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGV2ZWxvcGVyLnN1YmlneWFAZ21haWwuY29tIiwiaWQiOjEwOTYsImZpcnN0TmFtZSI6IlNVQklHWUEiLCJsYXN0TmFtZSI6IlNVQkVESSJ9LCJpYXQiOjE3MjQxNzkxMjksImV4cCI6MTc1NTcxNTEyOX0.qr5VbxU121ZnAQP7By3D4slFjs7HEErt_0VgcwfYJVg",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch email list");
      }

      const data = await response.json();
      setEmailList(data.data || []);
      setEmailCount(data.data.length);
    } catch (error) {
      console.error("Error fetching email list:", error);
    }
  };

  useEffect(() => {
    fetchEmailList();
  }, []);

  const getFirstThreeWords = (html) => {
    const text = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    const words = text.split(" ").slice(0, 7).join(" ");
    return words;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      <div
        className={`h-[90vh] w-[94vw] ${
          isLightMode ? "bg-white text-black" : "bg-black text-white"
        } flex`}
      >
        <div
          className={`w-[25%] ${
            isLightMode
              ? "bg-gray-100 border-gray-300"
              : "bg-green-00 border-gray-500"
          } border-r-2 px-5 py-3 pt-4 h-full`}
        >
          <div
            className={`border-b-2 ${
              isLightMode ? "border-gray-300" : "border-gray-500"
            } pb-3`}
          >
            <div className="flex justify-between">
              <p
                className={`flex text-lg font-semibold ${
                  isLightMode ? "text-gray-800" : "text-gray-500"
                }`}
              >
                <span className="text-blue-400">
                  All Inbox(s) <br />
                  <span
                    className={`text-sm font-normal ${
                      isLightMode ? "text-gray-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`${isLightMode ? "text-black" : "text-white"}`}
                    >
                      {emailList.length}/{emailList.length}
                    </span>{" "}
                    Inboxes selected
                  </span>
                </span>
              </p>
              <div
                className={`flex justify-center items-center rounded-md cursor-pointer ${
                  isLightMode ? "text-gray-600" : "text-gray-200"
                }`}
              >
                <IoReload onClick={fetchEmailList} />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <input
                type="search"
                placeholder="Search"
                className={`w-[90%] py-2 px-3 rounded-md ${
                  isLightMode
                    ? "bg-gray-200 text-black"
                    : "bg-gray-500 text-white"
                } outline-none mt-4`}
              />
            </div>

            <div
              className={`flex justify-between mt-4 text-sm ${
                isLightMode ? "text-gray-800" : "text-white"
              }`}
            >
              <p>
                <span
                  className={`bg-gray-700 text-blue-400 py-1 px-2 rounded-lg ${
                    isLightMode ? "text-blue-400" : "text-white"
                  }`}
                >
                  {emailList.length}
                </span>{" "}
                New Replies
              </p>
              <p className="flex items-center gap-3">
                Newest{" "}
                <span className="cursor-pointer">
                  <FaAngleDown />
                </span>
              </p>
            </div>
          </div>

          {/* Email List */}
          <div className={`mt-3 ${isLightMode ? "text-black" : "text-white"}`}>
            <ul>
              {emailList.map((email, index) => (
                <li
                  key={index}
                  className={`px-4 py-8 border-b-2 ${
                    isLightMode ? "border-gray-200" : "border-gray-500"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <p className="text-sm">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            isLightMode ? "bg-blue-400" : "bg-blue-500"
                          } mr-2`}
                        ></span>
                        {email.fromEmail.charAt(0).toUpperCase() +
                          email.fromEmail.slice(1)}
                      </p>

                      <div
                        className={`text-sm ml-4 ${
                          isLightMode ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {formatDate(email.sentAt)}{" "}
                      </div>
                    </div>

                    <div className="text-sm ml-4">
                      {getFirstThreeWords(email.subject)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`w-[50%] ${
            isLightMode
              ? "bg-gray-200 border-gray-300"
              : "bg-yellow-400 border-gray-500"
          } border-r-2 h-full`}
        ></div>
        <div
          className={`w-[25%] ${
            isLightMode ? "bg-blue-200" : "bg-blue-400"
          } h-full`}
        ></div>
      </div>
    </>
  );
};

export default Inbox;
