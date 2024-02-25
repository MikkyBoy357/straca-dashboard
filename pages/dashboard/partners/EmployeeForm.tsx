import { renderInputField } from '@/components/InputComponents/InputComponents'
import { JOB_INPUTS, USER_CONFIG_INPUTS } from '@/constants/templates'
import router from 'next/router'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EmployeeForm = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
            <div className="flex flex-row justify-start items-center">
                <button onClick={() => { router.back() }} className='px-4 py-2 bg-slate-400 rounded-sm'>
                    <i className="fa-solid fa-arrow-left text-white"></i>
                </button>
                <p className="ml-2 font-semibold text-2xl">Créer un collaborateur</p>
            </div>
            <div className="pt-5">
                <div className="px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
                    <div className="mb-5 flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between">
                            <p className="mb-3 font-semibold text-2xl">Ajouter un collaborateur</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            {renderInputField(USER_CONFIG_INPUTS[0], email, (e) => setEmail(e.target.value))}
                            {renderInputField(USER_CONFIG_INPUTS[1], phone, (e) => setPhone(e.target.value))}
                        </div>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            {renderInputField(USER_CONFIG_INPUTS[2], lastName, (e) => setLastName(e.target.value))}
                            {renderInputField(USER_CONFIG_INPUTS[3], firstName, (e) => setFirstName(e.target.value))}
                        </div>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            {renderInputField(USER_CONFIG_INPUTS[4], title, (e) => setTitle(e.target.value))}
                            {renderInputField(USER_CONFIG_INPUTS[5], password, (e) => setPassword(e.target.value), undefined, undefined, undefined, showPass, setShowPass)}
                        </div>
                        <center>
                            <button onClick={() => { }} className="px-10 py-2 bg-[#3D75B0] text-white rounded-md">
                                Enregistrer
                            </button>
                        </center>

                    </div>
                </div>
            </div>
            {/* Form */}


        </div>
    )
}

export default EmployeeForm