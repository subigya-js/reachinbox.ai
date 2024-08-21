import React from "react";
import google from "../../images/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUserInfo } from "../../ContextAPI";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setName, setPicture } = useUserInfo();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log("User Info:", res.data);
        setName(res.data.given_name);
        setPicture(res.data.picture);
        console.log("User Picture URL Set To:", res.data.picture);
        navigate("/onebox");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  return (
    <div className="h-[90vh] bg-black flex justify-center items-center">
      <div className="h-[40%] w-[30%] bg-[#0d0d0d] rounded-md text-gray-300 flex flex-col items-center justify-center gap-7">
        <p className="text-center">Create a new account</p>

        <button
          onClick={login}
          className="flex gap-4 items-center border px-6 py-2 justify-center w-[70%] rounded-md text-white hover:bg-gray-200 hover:text-black  duration-200"
        >
          <img src={google} alt="Google logo" className="h-5 w-5" />
          <span>Sign Up with Google</span>
        </button>

        <a
          href="/onebox"
          className="px-4 py-3 rounded-md bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-blue-700 hover:to-purple-700 transition-all duration-500"
        >
          Create an Account
        </a>
        <p className="text-[14px]">
          Already have an account?{" "}
          <span>
            <a
              href="/onebox"
              className="font-semibold hover:underline duration-200"
            >
              Sign in
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
