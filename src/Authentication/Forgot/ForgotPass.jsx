import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ImgBackground from './Img/Illustration.png'
import MailIcon from '@mui/icons-material/Mail';
import { Toaster, toast } from 'react-hot-toast';


const ForgotPass = () => {
    const [userEmail, setUserEmail] = useState("");/* ذخیره ایمیل کاربر */
    const navigate = useNavigate();

    const handleLogin = async () => {/* اطلاعات کاربر ارسال به بکند */
        const data = {
            Email: userEmail,
        };

        try {
            await axios.post('https://9858-89-44-9-169.ngrok-free.app//auth/forgot-password', data);
            toast.success(`A password reset link has been sent to your email. Please check your inbox (and spam folder too).`, { duration: 2000 });
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } catch (error) {
            toast.error(`We couldn't find an account with this email. Please create a new one to reset your password`);
            navigate('/signup')
        }
        setUserEmail('');
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-[#6358DC] p-4">
            {/* بخش اصلی */}
            <main className="w-full max-w-[1200px] border border-white rounded-3xl p-4">
                <section className="bg-[#f4f7fa] w-full rounded-3xl flex flex-col lg:flex-row px-4 md:px-10 py-8 gap-6 lg:gap-0">
                    {/* عکس سمت چپ صفحه */}
                    <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
                        <img
                            className="w-[75%] h-[75%] object-contain"
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
                            <hr className="mb-4 text-[#BFBFBF]" />
                            {/* قسمت inputs */}
                            <div className="flex flex-col gap-6">
                                <h1 className="text-xl text-center mt-2 font-bold text-[#6358dc]">Forgot Password</h1>
                                <div className="w-full h-[58px] bg-[#ECECEC] flex items-center gap-4 rounded-md px-4">
                                    <MailIcon fontSize="large" />
                                    <div className="flex flex-col w-full py-2">
                                        <label className="text-[12px]">Name</label>
                                        <input
                                            name="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            type="email"
                                            className="outline-none bg-transparent"
                                            placeholder="example@gmail.com"
                                        />
                                    </div>
                                </div>
                                <button type="button" className="w-full h-[60px] bg-[#6358DC] text-white rounded-lg cursor-pointer" onClick={handleLogin}>Submit</button>
                                <Toaster position="top-center" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ForgotPass;
