import { renderInputField } from "@/components/InputComponents/InputComponents";
import { ADD_ORDER_INPUTS } from "@/constants/templates";
import router from "next/router";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const OrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [searchKeyword1, setSearchKeyword1] = useState("");
  const [lat1, setLat1] = useState("");
  const [lon1, setLon1] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [searchKeyword2, setSearchKeyword2] = useState("");
  const [lat2, setLat2] = useState("");
  const [lon2, setLon2] = useState("");

  // Helper function to generate arrow functions for setters
  const generateSetterFunction = (setter: any) => (e: any) =>
    setter(e.target.value);

  const backgroundImage =
    "https://s3-alpha-sig.figma.com/img/e820/b309/33faaf77f8af260428a9b35d9f503bf6?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cuKH-bisdmxyI9xwNl09-7tWsQIFEV9A6HkbVZ60UdB8iNYoNwZkxyGPB~GnBJnfmHUl-KXNeGS-7skVzZqqnYLxSyIeGPXmGvNqlszXkEpGQwgRbGv4QJQj~emtO4aiKNMIxU7ncab6tXkEL4NltsI44oHc0g7oAPGb~GsreJ-TExtg-G71j5dQZ~44xaU~bwzfIRRrXw8ezKy7xSTaHvW~spqq8OpPHFtB0k8OjUGCu6lIDgBDWFi1rDPZvRsKMKTHCG1CE6fA9XlWjOwHT3rU54qQnuT37YBFq9GWoP91Xprwzd2fUdVzSiuY6SbJCzVbFN2CFpFxUHsMZxLVzg__";

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
        <p className="ml-2 font-semibold text-2xl">Créer un commande</p>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex pt-5 justify-between">
          <div className="w-[65%] px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
            <div className="mb-5 flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between">
                <p className="mb-3 font-semibold text-2xl">Commande N</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center">
              <div className="flex w-full justify-between items-start gap-[18px] relative flex-[0_0_auto]">
                <div className="w-[10%]">
                  {renderInputField(
                    ADD_ORDER_INPUTS[0],
                    startDate,
                    (e) => setStartDate(e.target.value),
                    undefined,
                    undefined,
                    "w-full"
                  )}
                </div>
                {renderInputField(
                  ADD_ORDER_INPUTS[1],
                  serviceType,
                  (e) => setServiceType(e.target.value),
                  undefined,
                  undefined,
                  "w-[50%]"
                )}
                {renderInputField(
                  ADD_ORDER_INPUTS[2],
                  vehicle,
                  (e) => setVehicle(e.target.value),
                  undefined,
                  undefined,
                  "w-[30%]"
                )}
              </div>
              <div className="flex w-full justify-between items-start gap-[18px] relative flex-[0_0_auto]">
                <div className="w-[50%] flex justify-start gap-14">
                  {renderInputField(
                    ADD_ORDER_INPUTS[3],
                    endDate,
                    (e) => setEndDate(e.target.value),
                    undefined,
                    undefined,
                    "w-[20%]"
                  )}
                  {renderInputField(
                    ADD_ORDER_INPUTS[4],
                    weight,
                    (e) => setWeight(e.target.value),
                    undefined,
                    undefined,
                    "w-[20%]"
                  )}
                  {renderInputField(
                    ADD_ORDER_INPUTS[5],
                    volume,
                    (e) => setVolume(e.target.value),
                    undefined,
                    undefined,
                    "w-[20%]"
                  )}
                </div>
                {renderInputField(
                  ADD_ORDER_INPUTS[6],
                  price,
                  (e) => setPrice(e.target.value),
                  undefined,
                  undefined,
                  "w-[30%]"
                )}
              </div>
              <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
                {renderInputField(ADD_ORDER_INPUTS[7], status, (e) =>
                  setStatus(e.target.value)
                )}
                <div className="w-[45%]">
                  <p className="">{ADD_ORDER_INPUTS[8].label}</p>
                  <ReactQuill
                    id="description"
                    className="w-full"
                    theme="snow"
                    placeholder="Write job description"
                    onChange={setDescription}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Client info */}
          <div className="flex flex-col w-[34%] gap-5 px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between">
                <p className="mb-3 font-semibold text-2xl">Client N</p>
              </div>
            </div>
            {renderInputField(
              ADD_ORDER_INPUTS[9],
              client,
              (e) => setClient(e.target.value),
              undefined,
              undefined,
              "w-[40%]"
            )}
            <div className="flex w-full justify-start items-start gap-5 relative flex-[0_0_auto]">
              {renderInputField(
                ADD_ORDER_INPUTS[10],
                countryCode,
                (e) => setCountryCode(e.target.value),
                undefined,
                undefined,
                "w-[20%]"
              )}
              {renderInputField(
                ADD_ORDER_INPUTS[11],
                phone,
                (e) => setPhone(e.target.value),
                undefined,
                undefined,
                "w-[40%]"
              )}
            </div>
            {renderInputField(
              ADD_ORDER_INPUTS[12],
              email,
              (e) => setEmail(e.target.value),
              undefined,
              undefined,
              "w-[65%]"
            )}
          </div>
        </div>
        {/* Addresse de depart */}
        <div className="flex flex-col w-full gap-5 px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
          <div className="mb-5 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between">
              <p className="mb-3 font-semibold text-2xl">Addresse de départ</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            {renderInputField(
              ADD_ORDER_INPUTS[13],
              clientAddress,
              (e) => setClientAddress(e.target.value),
              undefined,
              undefined,
              "w-full"
            )}
            {renderInputField(
              ADD_ORDER_INPUTS[14],
              searchKeyword1,
              (e) => setSearchKeyword1(e.target.value),
              undefined,
              undefined,
              "w-full"
            )}
            <div
              className="w-full h-72 rounded-lg bg-slate-400"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                className="rounded-lg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.12)", // Dark grey with 12% opacity
                }}
              ></div>
            </div>
            <div className="flex w-full justify-between items-start gap-5 relative flex-[0_0_auto]">
              {renderInputField(
                ADD_ORDER_INPUTS[15],
                lat1,
                (e) => setLat1(e.target.value),
                undefined,
                undefined,
                "w-[45%]"
              )}
              {renderInputField(
                ADD_ORDER_INPUTS[16],
                lon1,
                (e) => setLon1(e.target.value),
                undefined,
                undefined,
                "w-[45%]"
              )}
            </div>
          </div>
        </div>
        {/* Adresse du destinataire */}
        <div className="flex flex-col w-full gap-5 px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
          <div className="mb-5 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between">
              <p className="mb-3 font-semibold text-2xl">
                Adresse du destinataire
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            {renderInputField(
              ADD_ORDER_INPUTS[17],
              searchKeyword2,
              (e) => setSearchKeyword2(e.target.value),
              undefined,
              undefined,
              "w-full"
            )}
            {renderInputField(
              ADD_ORDER_INPUTS[18],
              lat2,
              (e) => setLat2(e.target.value),
              undefined,
              undefined,
              "w-full"
            )}
            <div
              className="w-full h-72 rounded-lg bg-slate-400"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                className="rounded-lg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.12)", // Dark grey with 12% opacity
                }}
              ></div>
            </div>
            <div className="flex w-full justify-between items-start gap-5 relative flex-[0_0_auto]">
              {renderInputField(
                ADD_ORDER_INPUTS[19],
                lon2,
                (e) => setLon2(e.target.value),
                undefined,
                undefined,
                "w-[45%]"
              )}
              {renderInputField(
                ADD_ORDER_INPUTS[20],
                price,
                (e) => setPrice(e.target.value),
                undefined,
                undefined,
                "w-[45%]"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Form */}
      <center>
        <button
          onClick={() => {}}
          className="my-5 px-10 py-2 bg-[#3D75B0] text-white rounded-md"
        >
          Enregistrer
        </button>
      </center>
    </div>
  );
};

export default OrderForm;
