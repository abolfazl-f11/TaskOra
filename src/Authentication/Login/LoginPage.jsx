import { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false); /* نشون دادن پسورد */
    const [userEmail, setUserEmail] = useState("");/* ذخیره ایمیل کاربر */
    const [userPassword, setUserPassword] = useState("") /* ذخیره رمز کاربر */
    const navigate = useNavigate();

    const handleLogin = async () => {/* اطلاعات کاربر ارسال به بکند */
        const data = {
            userEmail: userEmail,
            password: userPassword,
        };

        try {
            const response = await axios.post('http://192.168.137.1:3000/auth/login', data);
            console.log('Login successful:', response.data);
            navigate('/')
        } catch (error) {
            console.error('error sending data:', error)
        }
    }


    return (
        <div className="h-screen flex items-center justify-center bg-[#6358DC]">
            {/* بخش اصلی */}
            <main className="w-[90%] h-[90%] border-[1px] border-solid border-white rounded-3xl p-4">
                <section className="bg-[#f4f7fa] w-full h-full rounded-3xl flex px-10 py-8">
                    {/* عکس سمت چپ صفحه */}
                    <div className="flex items-center justify-center w-[50%]">
                        <img className="w-[65%] h-[65%]" src="src/Authentication/Login/img/Illustration.png" alt="not loding" />
                    </div>
                    {/* فرم صفحه */}
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <div className="w-[80%] h-full bg-white rounded-xl p-6 justify-self-center">
                            {/* قسمت header */}
                            <div className="h-[30%] flex flex-col justify-between">
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className="text-[#2F2F2F] font-bold text-md">Welcome to</h2>
                                    <h1 className="text-[#6358DC] font-bold text-4xl">Taskora</h1>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button className="h-14 rounded-lg shadow shadow-[#d3d3d3] flex items-center justify-center gap-4 cursor-pointer">
                                        <img className="w-6 h-6" src="src/Authentication/Login/img/search 1.svg" alt="" />
                                        Login with Google
                                    </button>
                                </div>
                            </div>
                            <hr className="mt-4 text-[#BFBFBF]" />
                            {/* قسمت inputs */}
                            <div className="w-full h-[70%] flex flex-col gap-6">
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="w-full h-[58px] bg-[#ECECEC] flex items-center justify-center gap-6 rounded-md px-6">
                                        <MailIcon fontSize="large" />
                                        <div className="flex flex-col w-full h-full py-2">
                                            <label className="text-[12px]">Email</label>
                                            <input name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="outline-none bg-transparent" placeholder="example@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="w-full h-[58px] bg-[#ECECEC] flex items-center justify-center gap-6 rounded-md px-6">
                                        <img className="w-6 h-6" src="src/Authentication/Login/img/iconLogin2.svg" alt="" />
                                        <div className="flex flex-col w-full h-full py-2">
                                            <label className="text-[12px]">Password</label>
                                            <input name="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type={showPassword ? "text" : "password"} className="outline-none bg-transparent" placeholder="*********" />
                                        </div>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <a href="/login/forgot-password" className="text-[13px] text-[#6358DC] self-center">Forgot Password?</a>
                                    <div className="flex flex-col gap-8 items-center">
                                        <button type="button" className="w-full h-[60px] bg-[#6358DC] text-white rounded-lg cursor-pointer" onClick={handleLogin}>Login</button>
                                        <p>Don't have an account?<a href="/signup" className="text-[#6358DC]">Sign Up</a></p>
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