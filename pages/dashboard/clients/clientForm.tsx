import { renderInputField } from "@/components/InputComponents/InputComponents";
import { Client } from "@/components/dashboard_components/ClientList";
import { POST, PUT } from "@/constants/fetchConfig";
import {
  CLIENTS_CONFIG_INPUTS,
  JOB_INPUTS,
  USER_CONFIG_INPUTS,
} from "@/constants/templates";
import { Toast } from "@/constants/toastConfig";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  selectedClient: Client | null;
}
const ClientForm: React.FC<Props> = ({ selectedClient }) => {
  const router = useRouter();
  const { action } = router.query;
  const [isModify, setIsModify] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const wasChanged = () => {
    if (
      email !== selectedClient?.email ||
      phone !== selectedClient?.phone ||
      firstName !== selectedClient?.firstName ||
      lastName !== selectedClient?.lastName ||
      address !== selectedClient?.address
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };
  useEffect(() => {
    if (action === "edit") {
      setIsModify(true);
      if (isModify) {
        setEmail(selectedClient?.email ?? "");
        setAddress(selectedClient?.address ?? "");
        setFirstName(selectedClient?.firstName ?? "");
        setLastName(selectedClient?.lastName ?? "");
        setPhone(selectedClient?.phone ?? "");
      }
    }
  }, [isModify]);
  useEffect(() => {
    if (isModify) {
      wasChanged();
    }
  }, [email, password, firstName, lastName, address, phone]);
  const addClient = async() => {
    try {
      const newClient = {
        firstName: firstName, 
        lastName: lastName,
        address: address,
        password: password,
        phone: phone,
        email: email,
        type: 'client',
      };
      if (
        firstName?.trim() === "" ||
        lastName?.trim() === "" ||
        address?.trim() === "" ||
        password?.trim() === "" ||
        phone?.trim() === "" ||
        email?.trim() === ""
      ) {
        alert(`All fields are required`);
        return;
      }
      var response;
      if (!isModify) {
        response = await POST(`/auth/signup`, newClient);
      } else {
        if (!isChanged) {
          return alert("Values were not changed");
        }

        response = await PUT(`/clients/${selectedClient?._id}`, newClient);
      }

      console.log(`Client ${isModify ? "edited" : "added"} successfully!`);
      router.back();
      Toast.fire({
        icon: "success",
        title: `Client ${isModify ? "edited" : "added"} successfully!`,
      });
    } catch (error) {}
  };
  return (
    <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
      <div className="flex flex-row justify-start items-center">
        <button
          onClick={() => {
            router.back();
          }}
          className="px-4 py-2 bg-slate-400 rounded-sm"
        >
          <i className="fa-solid fa-arrow-left text-white"></i>
        </button>
        <p className="ml-2 font-semibold text-2xl">Créer un collaborateur</p>
      </div>
      <div className="pt-5">
        <div className="px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
          <div className="mb-5 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between">
              <p className="mb-3 font-semibold text-2xl">
                Ajouter un collaborateur {isModify.toString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              {renderInputField(CLIENTS_CONFIG_INPUTS[0], email, (e) =>
                setEmail(e.target.value)
              )}
              {renderInputField(CLIENTS_CONFIG_INPUTS[1], phone, (e) =>
                setPhone(e.target.value)
              )}
            </div>
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              {renderInputField(CLIENTS_CONFIG_INPUTS[2], lastName, (e) =>
                setLastName(e.target.value)
              )}
              {renderInputField(CLIENTS_CONFIG_INPUTS[3], firstName, (e) =>
                setFirstName(e.target.value)
              )}
            </div>
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              {renderInputField(CLIENTS_CONFIG_INPUTS[4], address, (e) =>
                setAddress(e.target.value)
              )}
              {renderInputField(
                CLIENTS_CONFIG_INPUTS[5],
                password,
                (e) => setPassword(e.target.value),
                undefined,
                undefined,
                undefined,
                showPass,
                setShowPass
              )}
            </div>
            <center>
              <button
                onClick={addClient}
                className="px-10 py-2 bg-[#3D75B0] text-white rounded-md"
              >
                Enregistrer
              </button>
            </center>
          </div>
        </div>
      </div>
      {/* Form */}
    </div>
  );
};

export default ClientForm;
