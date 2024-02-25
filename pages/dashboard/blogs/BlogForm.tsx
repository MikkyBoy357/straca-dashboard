import { renderInputField } from '@/components/InputComponents/InputComponents'
import { BLOG_INPUTS, JOB_INPUTS } from '@/constants/templates'
import router from 'next/router'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const backgroundImage = "https://s3-alpha-sig.figma.com/img/e820/b309/33faaf77f8af260428a9b35d9f503bf6?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cuKH-bisdmxyI9xwNl09-7tWsQIFEV9A6HkbVZ60UdB8iNYoNwZkxyGPB~GnBJnfmHUl-KXNeGS-7skVzZqqnYLxSyIeGPXmGvNqlszXkEpGQwgRbGv4QJQj~emtO4aiKNMIxU7ncab6tXkEL4NltsI44oHc0g7oAPGb~GsreJ-TExtg-G71j5dQZ~44xaU~bwzfIRRrXw8ezKy7xSTaHvW~spqq8OpPHFtB0k8OjUGCu6lIDgBDWFi1rDPZvRsKMKTHCG1CE6fA9XlWjOwHT3rU54qQnuT37YBFq9GWoP91Xprwzd2fUdVzSiuY6SbJCzVbFN2CFpFxUHsMZxLVzg__";

    return (
        <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
            <div className="flex flex-row justify-start items-center">
                <button onClick={() => { router.back() }} className='px-4 py-2 bg-slate-400 rounded-sm'>
                    <i className="fa-solid fa-arrow-left text-white"></i>
                </button>
                <p className="ml-2 font-semibold text-2xl">Créer un blog</p>
            </div>
            <div className='w-full flex flex-col gap-5'>
                <div className="flex pt-5 justify-between">
                    <div className="w-full px-4 py-3 pb-10 mb-10 bg-[#FAFBFF] rounded-[12px]">
                        <div className="mb-5 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-between">
                                <p className="mb-3 font-semibold text-2xl">Blog N</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 items-center'>
                            {renderInputField(BLOG_INPUTS[0], title, (e) => setTitle(e.target.value), undefined, undefined, "w-full")}

                            <div className="flex w-full justify-between items-start gap-[18px] relative flex-[0_0_auto]">
                                <div className='w-[30%]'>
                                    {renderInputField(BLOG_INPUTS[1], category, (e) => setCategory(e.target.value), undefined, undefined, "w-full")}
                                </div>
                                {renderInputField(BLOG_INPUTS[2], image, (e) => setImage(e.target.value), undefined, undefined, "w-[30%]")}

                                <button onClick={() => { }} className="my-5 px-10 py-2 text-[#3D75B0] bg-white rounded-md">
                                    Enregistrer
                                </button>

                                <button onClick={() => { }} className="my-5 px-10 py-2 bg-[#3D75B0] text-white rounded-md">
                                    Publier
                                </button>
                            </div>

                            <div className='w-full'>
                                <p className=''>{BLOG_INPUTS[3].label}</p>
                                <ReactQuill className='w-full h-[475px] mb-10' theme="snow" placeholder="Write job description" onChange={setDescription} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BlogForm