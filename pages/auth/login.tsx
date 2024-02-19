import { BaseUrl } from "@/constants/templates";
import Image from "next/image";
import router from "next/router";
import React, { useState } from "react";



const Login = () => {
    const [email, setEmail] = useState("admin@gmail.com");
    const [pass, setPass] = useState("123456");

    const handleClick = () => {
        router.push('/dashboard');
    };

    const handleCreateAccount = () => {
        router.push('/signup')
    }

    const handleSubmit = () => {
        router.push('/dashboard');
    }

    return (
        <div className="h-screen flex flex-row bg-white">
            <div className="w-1/2 flex flex-col justify-between px-8">
                <div className="w-full mb-8">
                    {/* Image centered horizontally and at the top */}
                    <img
                        src="/logo/logo1.svg"
                        alt="Header Logo"
                        className="mx-auto mt-5 block"
                        width={`70%`}
                        height={24}
                    />
                </div>

                <center>
                    <div className="w-[70%] flex flex-col mb-36 bg-[#FAFBFF] p-8 gap-8 justify-center items-center">
                        <h2 className="text-2xl text-[#005A9B] font-semibold">Connexion</h2>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="Username or Email"
                        />
                        <input
                            type="password"
                            className="w-full p-2 border rounded-md"
                            placeholder="Password"
                        />
                        <button
                            onClick={handleSubmit}

                            className="w-full py-3 px-4 bg-[#3D75B0] text-white rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </div>
                </center>
                <>d</>



            </div>
            <div className="w-1/2 bg-cover bg-center" style={{
                backgroundImage: "url(https://s3-alpha-sig.figma.com/img/3dea/fa45/29636683ee34027e975f74ede6fc95dd?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IObGQNt9GjKrOnchg2ls1Kdoh3ZV18NUL~qQM-gcnjRScXsQIIWuFGRZg0M66euncif-W-ry-ug60456yrqPkLaDExMzezhlZh5TFzNpS77FEuNmzKrolCaW6ujjDnkP~7kCcu8poAzpN2rJU1-gnoNBiKTCiQNOzJ87CDSfDlsZOzTjqOp5VjJbnA1Nx~S0r0sG6KRaAGkaRV0sRfHzhl9zHT~wIHiPTz1~TBPiuqVpUszDFlt4pK95sprq09MqzcSYKi40hYV0DMsbS4KmHNTRPc0Qy0uAgX-BbeIZXzqHrblLXEGX0eSDtdtMjkLk0nuu-HDkrckU4won2C0Ylg__)"
            }}>
                {/* Add optional content for the background section */}
            </div>

        </div>
    );
}

export default Login;