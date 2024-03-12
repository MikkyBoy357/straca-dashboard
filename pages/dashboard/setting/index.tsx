import React, { ReactElement, useState } from "react";
import DashboardLayout from "../layout";
import {
  Job,
  JobListComponent,
} from "@/components/dashboard_components/JobList";
import { useRouter } from "next/router";
import { Client } from "@/components/dashboard_components/ClientList";
import { SettingScreen } from "@/components/dashboard_components/settingScreen";
import SettingsForm from "./settingsForm";
import { ProductType } from "@/components/dashboard_components/SettingComponents/productcard";
import { VehicleType } from "@/components/dashboard_components/SettingComponents/vehiclecard";

const SettingsPage = () => {
  const router = useRouter();
  const { action, type } = router.query; // Access action query parameter
  console.log(`type==>${type}`);


  return (
    <>
      {!action && !type ? (
        <SettingScreen />
      ): (
        <SettingsForm />
      )}
    </>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SettingsPage;
