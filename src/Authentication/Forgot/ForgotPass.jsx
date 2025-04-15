import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ImgBackground from './Img/Illustration.png'
import MailIcon from '@mui/icons-material/Mail';


const ForgotPass = () => {
    const [userEmail, setUserEmail] = useState("");/* ذخیره ایمیل کاربر */
    const navigate = useNavigate();

    const handleLogin = async () => {/* اطلاعات کاربر ارسال به بکند */
        const data = {
            userEmail: userEmail,
        };

        try {
            const response = await axios.post('http://192.168.137.1:3000/auth/login', data);
            console.log('Login successful:', response.data);
            navigate('/login')

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
                        <img className="w-[65%] h-[65%]" src={ImgBackground} alt="not loding" />
                    </div>
                    {/* فرم صفحه */}
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <div className="w-[80%] h-full bg-white rounded-xl p-6 pt-16">
                            {/* قسمت header */}
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-[#2F2F2F] font-bold text-md">Welcome to</h2>
                                <h1 className="text-[#6358DC] font-bold text-4xl">Taskora</h1>
                            </div>
                            <hr className="mt-4 text-[#BFBFBF]" />
                            {/* قسمت inputs */}
                            <div className="flex flex-col gap-6">
                                <h1 className="text-xl text-center mt-2 font-bold text-[#6358dc]">Forgot Password</h1>
                                <div className="w-full h-[58px] bg-[#ECECEC] flex items-center justify-center gap-6 rounded-md px-6">
                                    <MailIcon fontSize="large" />
                                    <div className="flex flex-col w-full h-full py-2">
                                        <label className="text-[12px]">Email</label>
                                        <input name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="outline-none bg-transparent" placeholder="example@gmail.com" />
                                    </div>
                                </div>
                                <button type="button" className="w-full h-[60px] bg-[#6358DC] text-white rounded-lg cursor-pointer" onClick={handleLogin}>Submit</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ForgotPass;