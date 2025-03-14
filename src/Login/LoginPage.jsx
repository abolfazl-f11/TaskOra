import { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-screen flex items-center justify-center bg-[#6358DC]">
            {/* بخش اصلی */}
            <main className="w-[90%] h-[90%] border-[1px] border-solid border-white rounded-3xl p-4">
                <section className="bg-[#f4f7fa] w-full h-full rounded-3xl flex px-10 py-8">
                    {/* عکس سمت چپ صفحه */}
                    <div className="flex items-center justify-center w-[50%]">
                        <img className="w-[65%] h-[65%]" src="src/Login/img/Illustration.png" alt="not loding" />
                    </div>
                    {/* فرم صفحه */}
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <div className="w-[80%] h-full bg-white rounded-xl p-6 justify-self-center">
                            {/* قسمت header */}
                            <div className="h-[30%] flex flex-col justify-between">
                                <div>
                                    <h2 className="text-[#2F2F2F] font-bold text-xl">Welcome to</h2>
                                    <h1 className="text-[#6358DC] font-bold text-3xl">Design School</h1>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button className="h-14 rounded-lg shadow shadow-[#d3d3d3] flex items-center justify-center gap-4 cursor-pointer">
                                        <img className="w-6 h-6" src="src/Login/img/search 1.svg" alt="" />
                                        Login with Google
                                    </button>
                                </div>
                            </div>
                            <hr className="mt-4 text-[#BFBFBF]" />
                            {/* قسمت inputs */}
                            <div className="w-full h-[70%] flex flex-col gap-4">
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="w-full h-16 bg-[#ECECEC] flex items-center justify-center gap-6 rounded-md px-6">
                                        <img className="w-6 h-6" src="src/Login/img/iconLogin1.svg" alt="" />
                                        <div className="flex flex-col w-full h-full py-2">
                                            <label className="text-[12px]">Email</label>
                                            <input type="email" className="outline-none" placeholder="example@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="w-full h-16 bg-[#ECECEC] flex items-center justify-center gap-6 rounded-md px-6">
                                        <img className="w-6 h-6" src="src/Login/img/iconLogin2.svg" alt="" />
                                        <div className="flex flex-col w-full h-full py-2">
                                            <label className="text-[12px]">Password</label>
                                            <input type={showPassword ? "text" : "password"} className="outline-none" placeholder="*********" />
                                        </div>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <input type="checkbox" />
                                            <p className="text-[13px]">Remember me</p>
                                        </div>
                                        <a href="" className="text-[13px] text-[#6358DC]">Forget Passwrod?</a>
                                    </div>
                                    <div className="flex flex-col gap-8 items-center">
                                        <button className="w-full h-[60px] bg-[#6358DC] text-white rounded-lg cursor-pointer">Login</button>
                                        <p>Don't have an account?<a href="" className="text-[#6358DC]">Register</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LoginPage;