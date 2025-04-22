import { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import ImgBackground from './img/Illustration.png';


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false); /* نشون دادن پسورد */
    const [userEmail, setUserEmail] = useState("");/* ذخیره ایمیل کاربر */
    const [userName, setUserName] = useState("");/* ذخیره نام کاربر */
    const [userPassword, setUserPassword] = useState("") /* ذخیره رمز کاربر */
    const navigate = useNavigate();

    const handleSignUp = async () => {/* اطلاعات کاربر ارسال به بکند */
        if (!userName.trim()) {
            toast.error('The username is incorrect, please correct it.', { duration: 2000 })
        }
        else if (userPassword.trim().length <= 5) {
            toast.error('The password is incorrect, please correct it.', { duration: 2000 })
        }
        else if (!userEmail.trim().includes('@gmail.com')) {
            toast.error('Please enter your email correctly.', { duration: 2000 })
        }
        else {
            const data = {
                userName: userName,
                userEmail: userEmail,
                password: userPassword,
            };

            try {
                const response = await axios.post('https://c4c1-89-44-9-169.ngrok-free.app/auth/register', data);
                if (response.data.statusCode == 200) {
                    toast.success(`Account created successfully! Let’s get started.`, { duration: 2000 });
                    navigate('/signup/verification')
                }
            } catch (error) {
                toast.error(`This email is already registered. Try logging in instead`);
            }
        }
        localStorage.setItem('emailveri', userEmail)
        setUserEmail('')
        setUserName('')
        setUserPassword('')
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#6358DC] p-4">
            {/* بخش اصلی */}
            <main className="w-full max-w-[1200px] border border-white rounded-3xl p-4">
                <section className="bg-[#f4f7fa] w-full rounded-3xl flex flex-col lg:flex-row px-4 md:px-10 py-8 gap-6 lg:gap-0">
                    {/* عکس سمت چپ صفحه */}
                    <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
                        <img
                            className="w-[65%] h-[65%] object-contain"
                            src={ImgBackground}
                            alt="illustration"
                        />
                    </div>
                    {/* فرم صفحه */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-[450px] bg-white rounded-xl p-6">
                            {/* قسمت header */}
                            <div className="flex flex-col items-center gap-2 mb-6">
                                <h2 className="text-[#2F2F2F] font-bold text-md">
                                    Welcome to
                                </h2>
                                <h1 className="text-[#6358DC] font-bold text-4xl">Taskora</h1>
                            </div>

                            <hr className="text-[#BFBFBF] mb-4" />
                            {/* قسمت inputs */}
                            <div className="flex flex-col gap-4">
                                {/* ایمیل */}
                                <div className="w-full h-[58px] bg-[#ECECEC] flex items-center gap-4 rounded-md px-4">
                                    <PersonIcon fontSize="medium" />
                                    <div className="flex flex-col w-full py-2">
                                        <label className="text-[12px]">Name</label>
                                        <input
                                            name="name"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            type="text"
                                            className="outline-none bg-transparent text-sm"
                                            placeholder="abolfazl"
                                        />
                                    </div>
                                </div>
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

                                {/* دکمه لاگین و لینک ثبت‌نام */}
                                <div className="flex flex-col gap-4 items-center mt-2">
                                    <button
                                        type="button"
                                        className="w-full h-[50px] bg-[#6358DC] text-white rounded-lg text-base"
                                        onClick={handleSignUp}
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-sm">
                                        You have an account?{" "}
                                        <a href="/login" className="text-[#6358DC] font-medium">
                                            Login
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

export default SignUpPage;