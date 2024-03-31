// SettingsForm.tsx
import { renderInputField } from "@/components/InputComponents/InputComponents";
import { renderSettingsTextField } from "@/components/InputComponents/settinginputcomponent";
import { BlogType } from "@/components/dashboard_components/SettingComponents/blogcard";
import { CountryType } from "@/components/dashboard_components/SettingComponents/countrycard";
import { ProductType } from "@/components/dashboard_components/SettingComponents/productcard";
import { VehicleType } from "@/components/dashboard_components/SettingComponents/vehiclecard";
import { POST, PUT } from "@/constants/fetchConfig";
import { PRODUCT_CONFIG_INPUTS } from "@/constants/templates";
import { Toast } from "@/constants/toastConfig";
import { useSettings } from "@/context/settingscontext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SettingsForm: React.FC = () => {
  const router = useRouter();
  const { action, type } = router.query;
  const [label, setLabel] = useState<string>("");
  const [isModify, setIsModify] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [actionString, setActionString] = useState<string>("");
  const [typeString, setTypeString] = useState<string>("");
  const {
    selectedProductType,
    selectedBlogType,
    selectedCountryType,
    selectedVehicleType,
  } = useSettings();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<
    ProductType | BlogType | CountryType | VehicleType | null
  >(null);

  const wasChanged = () => {
    if (
      (type === "product" &&
        (label !== selectedProductType?.label ||
          description !== selectedProductType?.description)) ||
      (type === "blog" &&
        (label !== selectedBlogType?.label ||
          description !== selectedBlogType.description)) ||
      (type === "country" &&
        (label !== selectedCountryType?.label ||
          description !== selectedCountryType.description)) ||
      (type === "vehicle" &&
        (label !== selectedVehicleType?.label ||
          description !== selectedVehicleType.description))
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  useEffect(() => {
    if (action === "new" && typeof type === "string") {
      setActionString("créer");
      setTypeString(type);
    } else if (action === "edit" && typeof type === "string") {
      setActionString("modifier");
      setTypeString(type);
      setIsModify(true);
    }
  }, [action, type]);

  useEffect(() => {
    if (isModify && type) {
      if (type === "product" && selectedProductType) {
        setLabel(selectedProductType.label);
        setDescription(selectedProductType.description);
        setSelectedType(selectedProductType);
      } else if (type === "blog" && selectedBlogType) {
        setLabel(selectedBlogType.label);
        setDescription(selectedBlogType.description);
        setSelectedType(selectedBlogType);
      } else if (type === "country" && selectedCountryType) {
        setLabel(selectedCountryType.label);
        setDescription(selectedCountryType.description);
        setSelectedType(selectedCountryType);
      } else if (type === "vehicle" && selectedVehicleType) {
        setLabel(selectedVehicleType.label);
        setDescription(selectedVehicleType.description);
        setSelectedType(selectedVehicleType);
      }
    }
  }, [
    isModify,
    type,
    selectedProductType,
    selectedBlogType,
    selectedCountryType,
    selectedVehicleType,
  ]);

  useEffect(() => {
    if (isModify) {
      wasChanged();
    }
  }, [label, description]);

  const addType = async () => {
    const newType = {
      label: label,
      description: description,
    };
    if (label.trim() === "" || description.trim() === "") {
      return Toast.fire({
        icon: "error",
        title: `Les champs doivent être remplis`,
      });
    }

    try {
      var response;
      if (isModify === false) {
        response = await POST(`/${type}Type/`, newType);
        router.back();
        Toast.fire({
          icon: "success",
          title: `${typeString} added successfully!`,
        });
      } else {
        try {
          if (isChanged) {
            response = await PUT(`/${type}Type/${selectedType?._id}`, newType);
            router.back();
            Toast.fire({
              icon: "success",
              title: `${typeString} Edited Successfully`,
            });
          } else {
            alert("You changed nothing");
          }
        } catch (error) {
          alert(error);
        }
      }
    } catch (error) {
      alert(error);
    }
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
        <p className="ml-2 font-semibold text-2xl">{`${actionString} un ${typeString} ${isModify.toString()}`}</p>
      </div>

      {/* Form */}
      <div className="flex flex-col mt-12 gap-6">
        <div>{isChanged.toString()}</div>
        {renderSettingsTextField(PRODUCT_CONFIG_INPUTS[0], label, (e) => {
          setLabel(e.target.value);
        })}
        {renderSettingsTextField(PRODUCT_CONFIG_INPUTS[1], description, (e) =>
          setDescription(e.target.value)
        )}
      </div>
      <div className="mt-10 flex flex-row gap-5">
        <button
          onClick={addType}
          className="h-12 w-80 bg-[#3D75B0] text-white rounded-md"
        >
          Enregistrer
        </button>
        <button className="h-12 w-80 border-solid border-gray-400 border-2 text-black rounded-md">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;
