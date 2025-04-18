import { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            userEmail: userEmail,
            password: userPassword,
        };

        try {
            const require = await axios.post(
                `http://192.168.137.1:3000/auth/login`,
                data
            );
            localStorage.setItem("userToken", require.data.accessToken);
            toast.success(`Welcome back! You’ve successfully logged in.`, {
                duration: 1500,
            });
            navigate("/");
        } catch (error) {
            toast.error(
                `It looks like you don't have an account yet. Please sign up to continue`
            );
        }
        setUserEmail("");
        setUserPassword("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#6358DC] p-4">
            <main className="w-full max-w-[1200px] border border-white rounded-3xl p-4">
                <section className="bg-[#f4f7fa] w-full rounded-3xl flex flex-col lg:flex-row px-4 md:px-10 py-8 gap-6 lg:gap-0">
                    {/* تصویر سمت چپ */}
                    <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
                        <img
                            className="w-[65%] h-[65%] object-contain"
                            src="src/Authentication/Login/img/Illustration.png"
                            alt="illustration"
                        />
                    </div>

                    {/* فرم لاگین */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-[450px] bg-white rounded-xl p-6">
                            {/* هدر */}
                            <div className="flex flex-col items-center gap-2 mb-6">
                                <h2 className="text-[#2F2F2F] font-bold text-md">
                                    Welcome to
                                </h2>
                                <h1 className="text-[#6358DC] font-bold text-4xl">Taskora</h1>
                            </div>

                            {/* دکمه گوگل */}
                            <div className="mb-4">
                                <button className="w-full h-14 rounded-lg shadow flex items-center justify-center gap-4 bg-white">
                                    <img
                                        className="w-6 h-6"
                                        src="src/Authentication/Login/img/search 1.svg"
                                        alt="Google icon"
                                    />
                                    Login with Google
                                </button>
                            </div>

                            <hr className="text-[#BFBFBF] mb-4" />

                            {/* فرم ورود */}
                            <div className="flex flex-col gap-4">
                                {/* ایمیل */}
                                <div className="w-full h-[58px] bg-[#ECECEC] flex items-center gap-4 rounded-md px-4">
                                    <MailIcon fontSize="medium" />
                                    <div className="flex flex-col w-full py-2">
                                        <label className="text-[12px]">Email</label>
                                        <input
                                            name="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            type="email"
                                            className="outline-none bg-transparent text-sm"
                                            placeholder="example@gmail.com"
                                        />
                                    </div>
                                </div>

                                {/* پسورد */}
                                <div className="w-full h-[58px] bg-[#ECECEC] flex items-center gap-4 rounded-md px-4">
                                    <img
                                        className="w-6 h-6"
                                        src="src/Authentication/Login/img/iconLogin2.svg"
                                        alt="Password Icon"
                                    />
                                    <div className="flex flex-col w-full py-2">
                                        <label className="text-[12px]">Password</label>
                                        <input
                                            name="password"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            className="outline-none bg-transparent text-sm"
                                            placeholder="*********"
                                        />
                                    </div>
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </div>

                                {/* لینک فراموشی رمز */}
                                <a
                                    href="/login/forgot-password"
                                    className="text-[13px] text-[#6358DC] self-end"
                                >
                                    Forgot Password?
                                </a>

                                {/* دکمه لاگین و لینک ثبت‌نام */}
                                <div className="flex flex-col gap-4 items-center mt-2">
                                    <button
                                        type="button"
                                        className="w-full h-[50px] bg-[#6358DC] text-white rounded-lg text-base"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                    <p className="text-sm">
                                        Don't have an account?{" "}
                                        <a href="/signup" className="text-[#6358DC] font-medium">
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                                <Toaster position="top-center" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LoginPage;
