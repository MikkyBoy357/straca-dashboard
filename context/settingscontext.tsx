import { BlogType } from "@/components/dashboard_components/SettingComponents/blogcard";
import { CountryType } from "@/components/dashboard_components/SettingComponents/countrycard";
import { ProductType } from "@/components/dashboard_components/SettingComponents/productcard";
import { VehicleType } from "@/components/dashboard_components/SettingComponents/vehiclecard";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SettingsContextProps {
  selectedProductType: ProductType | null;
  setSelectedProductType: (item: ProductType | null) => void;
  selectedBlogType: BlogType | null;
  setSelectedBlogType: (item: BlogType | null) => void;
  selectedVehicleType: VehicleType | null;
  setSelectedVehicleType: (item: VehicleType | null) => void;
  selectedCountryType: CountryType | null;
  setSelectedCountryType: (item: CountryType | null) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType | null>(null);
  const [selectedBlogType, setSelectedBlogType] = useState<BlogType | null>(
    null
  );
  const [selectedVehicleType, setSelectedVehicleType] =
    useState<VehicleType | null>(null);
  const [selectedCountryType, setSelectedCountryType] =
    useState<CountryType | null>(null);
  return (
    <SettingsContext.Provider
      value={{
        selectedProductType,
        setSelectedProductType,
        selectedBlogType,
        setSelectedBlogType,
        selectedVehicleType,
        setSelectedVehicleType,
        selectedCountryType,
        setSelectedCountryType,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
