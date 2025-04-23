import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import ImgBackground from './img/Illustration.png'
import { Toaster, toast } from 'react-hot-toast';
import { TextField, Box } from "@mui/material";
import { api } from '../Asghar'


const SignUpVerification = () => {

    const [verification, setVerification] = useState('')

    useEffect(() => {
        const value = localStorage.getItem('emailveri');
        setVerification(value);
    }, [])


    const navigate = useNavigate();
    const inputs = Array.from({ length: 6 }, () => useRef(null));
    const [valueInputs, setValueInputs] = useState('');


    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            if (index < 5) inputs[index + 1].current.focus();
        }
        const valInp = inputs.map((ref) => ref.current.value).join('')
        setValueInputs(valInp);
    };


    const reqValeu = {
        userEmail: verification,
        code: valueInputs,
    }


    const handleVerify = async () => {
        try {
            const response = await api.post('https://c4c1-89-44-9-169.ngrok-free.app/auth/confirm', reqValeu);
            toast.success(`Email is verified`, { duration: 2000 });
            localStorage.removeItem('emailveri');
            setTimeout(() => {
                navigate('/login');
            }, 1000)
            console.log(response.data)
        } catch (error) {
            toast.error(`Email is invalid`, { duration: 2000 });
        }
        setValueInputs('');
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

                                <div className="flex flex-col gap-2">
                                    <h1 className="text-xl text-center mt-2 font-bold text-[#6358dc]">Email Verification</h1>
                                    <p className="text-center">{`Please check your email ( ${verification} )`}
                                        <br />
                                        Then enter the 6-digit code to continue.
                                    </p>
                                </div>

                                <Box display="flex" gap={1}>
                                    {inputs.map((ref, i) => (
                                        <TextField
                                            key={i}
                                            inputRef={ref}
                                            inputProps={{
                                                maxLength: 1,
                                                style: { textAlign: "center", fontSize: "1.5rem", width: "2rem" },
                                            }}
                                            onChange={(e) => handleChange(e, i)}
                                        />
                                    ))}
                                </Box>
                                <button type="button" className="w-full h-[60px] bg-[#6358DC] text-white rounded-lg cursor-pointer" onClick={handleVerify}>Verify</button>
                                <Toaster position="top-center" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SignUpVerification;
