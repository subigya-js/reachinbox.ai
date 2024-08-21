import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useUserInfo } from "../../ContextAPI";

const Inbox = () => {
  const NA = `<span clasName="text-blue-400">N/A</span>`;
  const { theme, setEmailCount } = useUserInfo();
  const isLightMode = theme === "light";

  const [emailList, setEmailList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchEmailList = async () => {
    setIsLoading(true);
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
      console.log("Email List Data:", data.data);
    } catch (error) {
      console.error("Error fetching email list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmailThread = async (threadId) => {
    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`,
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
        throw new Error("Failed to fetch email thread");
      }

      const data = await response.json();
      console.log("Selected Email Data:", data);
      setSelectedEmail(data);
      console.log("Thread ID:", data.data[0]?.threadId);
    } catch (error) {
      console.error("Error fetching email thread:", error);
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

  const sortedEmails = [...emailList].sort((a, b) => {
    const dateA = new Date(a.sentAt);
    const dateB = new Date(b.sentAt);
    return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
  });

  const filteredEmails = sortedEmails.filter((email) =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          } border-r-2 px-5 py-3 pt-6 h-full`}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`placeholder-gray-400 w-[90%] py-2 px-3 rounded-md ${
                  isLightMode
                    ? "bg-gray-300 text-black"
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
                  className={`py-1 px-2 rounded-lg ${
                    isLightMode
                      ? "text-blue-600 bg-gray-200"
                      : "text-white bg-gray-600"
                  }`}
                >
                  {filteredEmails.length}
                </span>{" "}
                New Replies
              </p>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-sm"
                >
                  {sortOrder}{" "}
                  <span className="cursor-pointer">
                    <FaAngleDown />
                  </span>
                </button>
                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-0 w-30 ${
                      isLightMode
                        ? "bg-white border-gray-300"
                        : "bg-gray-800 border-gray-700"
                    } border shadow-lg rounded-md z-10`}
                  >
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        isLightMode
                          ? "text-gray-800 hover:bg-gray-100"
                          : "text-gray-200 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        setSortOrder("Newest");
                        setShowDropdown(false);
                      }}
                    >
                      Newest
                    </button>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        isLightMode
                          ? "text-gray-800 hover:bg-gray-100"
                          : "text-gray-200 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        setSortOrder("Oldest");
                        setShowDropdown(false);
                      }}
                    >
                      Oldest
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className={`mt-3 ${isLightMode ? "text-black" : "text-white"}`}>
            <ul className="flex flex-col gap-5">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : filteredEmails.length === 0 ? (
                <p>No emails found.</p>
              ) : (
                filteredEmails.map((email) => (
                  <li
                    key={email.id} // Ensure this is a unique value
                    className={`px-4 py-8 border-b-2 ${
                      isLightMode
                        ? "border-gray-300 hover:text-gray-800 hover:bg-gray-300"
                        : "border-gray-800 hover:bg-gray-800"
                    } cursor-pointer hover:bg-gray-300 hover:rounded-lg`}
                    onClick={() => fetchEmailThread(email.threadId)}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between">
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
                            isLightMode ? "text-gray-600" : "text-gray-500"
                          }`}
                        >
                          {formatDate(email.sentAt)}
                        </div>
                      </div>

                      <div className="text-sm ml-4">
                        {getFirstThreeWords(email.subject)}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Email Content */}
        <div
          className={`w-[50%] ${
            isLightMode
              ? "bg-gray-200 border-gray-300"
              : "bg-ellow-400 border-gray-500"
          } border-r-2 h-full  pt-3 pb-6`}
        >
          {selectedEmail && selectedEmail.data ? (
            <div>
              {/* Header  */}
              <div
                className={`h-[10vh] border-b-2 border-gray-500 py-2 px-4 bg-green-00 flex flex-col justify-center gap-1`}
              >
                <p
                  className={`text-lg font-semibold ${
                    isLightMode ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  {selectedEmail.data[0]?.fromName}
                </p>
                <p className="text-sm">{selectedEmail.data[0]?.fromEmail}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center">Select an email to view details</p>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div
          className={`w-[25%] flex flex-col gap-5 ${
            isLightMode ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <div className="flex justify-center w-full">
            <div
              className={`p-3 mt-8 w-[80%] rounded-md ${
                isLightMode ? "bg-gray-200" : "bg-gray-600"
              }`}
            >
              <p
                className={`${isLightMode ? "text-gray-800" : "text-gray-100"}`}
              >
                Lead Details
              </p>
            </div>
          </div>

          {selectedEmail && selectedEmail.data ? (
            <div className={`p-4`}>
              <div className="flex justify-between">
                <div
                  className={`text-sm flex flex-col gap-2 ${
                    isLightMode ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  <p>Name</p>
                  <p>Contact No</p>
                  <p>Email ID</p>
                  <p>LinkedIn</p>
                  <p>Company Name</p>
                </div>
                <div
                  className={`text-sm flex flex-col gap-2 ${
                    isLightMode ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  <p>
                    {selectedEmail.data[0].fromName
                      ? selectedEmail.data[0].fromName
                      : NA}
                  </p>
                  <p>
                    {selectedEmail.data[0].fromContact
                      ? selectedEmail.data[0].fromContact
                      : "N/A"}
                  </p>
                  <p>{selectedEmail.data[0].fromEmail}</p>
                  <p>
                    {selectedEmail.data[0].fromLinedin
                      ? selectedEmail.data[0].fromLinedin
                      : "N/A"}
                  </p>
                  <p>
                    {selectedEmail.data[0].fromCompany
                      ? selectedEmail.data[0].fromCompany
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center">
                Select an email to view Lead details
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Inbox;
