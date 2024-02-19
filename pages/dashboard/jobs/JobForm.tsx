import { renderInputField } from '@/components/InputComponents/InputComponents'
import { JOB_INPUTS } from '@/constants/templates'
import router from 'next/router'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobForm = () => {
    const [post, setPost] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
            <div className="flex flex-row justify-start items-center">
                <button onClick={() => { router.back() }} className='px-4 py-2 bg-slate-400 rounded-sm'>
                    <i className="fa-solid fa-arrow-left text-white"></i>
                </button>
                <p className="ml-2 font-semibold text-2xl">Créer un offre</p>
            </div>
            <div className="pt-5">
                <div className="px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
                    <div className="mb-5 flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between">
                            <p className="mb-3 font-semibold text-2xl">Ajouter un offre d'emploi</p>
                        </div>
                    </div>
                    {/* Table */}
                    <div className='flex flex-col gap-5'>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            {renderInputField(JOB_INPUTS[0], post, (e) => setPost(e.target.value))}
                            {renderInputField(JOB_INPUTS[1], salary, (e) => setSalary(e.target.value))}
                        </div>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            {renderInputField(JOB_INPUTS[2], location, (e) => setLocation(e.target.value))}
                            {renderInputField(JOB_INPUTS[3], type, (e) => setType(e.target.value))}
                        </div>
                        <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                            <div className='w-full'>
                                <p className='mb-2'>{JOB_INPUTS[4].label}</p>
                                <ReactQuill className='w-full' theme="snow" placeholder="Write job description" onChange={setDescription} />
                            </div>
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

export default JobForm