import React from "react";

export const renderInputField = (
    input: { id: any; label: any; placeholder?: string; type?: "text" | "textarea" | "select"; options?: string[] | undefined },
    value: string,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSelect?: (event: React.FormEvent<HTMLSelectElement>) => void,
    selectList?: any[],
) => {
    return (
        <div className="w-[45%] inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
            <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                {input.label}
            </div>
            <div className="relative w-[100%]">
                {input.type === "text" && <input
                    maxLength={300}
                    type="text"
                    id={input.id}
                    value={value}
                    onChange={handleChange}
                    className="w-full p-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
                    placeholder={input.placeholder}
                />}
                {
                    input.type == "select" && <select id={input.id} onChange={handleSelect} value={value}
                        className="w-[520px] p-2 pb-[10px] text-gray-900 bg-white border border-gray-200 rounded-lg">

                        {selectList?.map(item => <option value={item}>{item}</option>)}

                    </select>
                }
                {input.id == "password" && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fa-solid fa-eye-slash text-gray-700"></i>
                </div>}
            </div>
        </div>

    );
}