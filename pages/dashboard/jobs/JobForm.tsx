import { renderInputField } from "@/components/InputComponents/InputComponents";
import { Job } from "@/components/dashboard_components/JobList";
import { POST, PUT } from "@/constants/fetchConfig";
import { JOB_INPUTS } from "@/constants/templates";
import { Toast } from "@/constants/toastConfig";
import router from "next/router";
import React, { useEffect, useState } from "react";
// Use dynamic for lazy loading ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

interface Props {
  selectedJob: Job | null;
}

const JobForm: React.FC<Props> = ({ selectedJob }) => {
  const [post, setPost] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [description, setDescription] = useState("");

  // Attention
  const [isChanged, setIsChanged] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const wasChanged = () => {
    if (
      post !== selectedJob?.post ||
      salary !== selectedJob?.salary.toString() ||
      location !== selectedJob?.location ||
      contractType !== selectedJob?.contractType ||
      description !== selectedJob?.description
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  useEffect(() => {
    const { action } = router.query;
    setIsModify(action === "edit");

    if (isModify) {
      setPost(selectedJob?.post ?? "");
      setSalary(selectedJob?.salary.toString() ?? "");
      setLocation(selectedJob?.location ?? "");
      setContractType(selectedJob?.contractType ?? "");
      setDescription(selectedJob?.description ?? "");
    }
  }, [isModify]);

  useEffect(() => {
    if (isModify) {
      wasChanged();
    }
  }, [post, salary, location, contractType, description]);

  // Function to add job
  const addJob = async () => {
    try {
      const newJob = {
        post: post,
        salary: Number(salary),
        location: location,
        contractType: contractType,
        description: description,
        status: "test",
      };

      // Perform validation to check if all variables are not empty
      if (
        post.trim() === "" ||
        salary?.trim() === "" ||
        location?.trim() === "" ||
        contractType?.trim() === "" ||
        description.trim() === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }

      var response;
      if (!isModify) {
        response = await POST(`/jobs`, newJob);
      } else {
        if (!isChanged) {
          return alert("Values were not changed");
        }

        response = await PUT(`/jobs/${selectedJob?._id}`, newJob);
      }

      console.log(`Job ${isModify ? "edited" : "added"} successfully!`);
      router.back();
      Toast.fire({
        icon: "success",
        title: `Job ${isModify ? "edited" : "added"} successfully!`,
      });
      // router.reload();

      // Clear form fields after successful addition
      // setPrice('');
      // setTypeColis('');
      // setTransportType('');
      // setUnit('');
      // setDescription('');
      // setQuantity('');
    } catch (error) {
      console.error("Error adding job:", error);
      alert(error);
      // Handle errors
    }
  };

  console.log(isModify);
  console.log(selectedJob);

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
        <p className="ml-2 font-semibold text-2xl">
          Créer un offre {isChanged.toString()}
        </p>
      </div>
      <div className="pt-5">
        <div className="px-4 py-3 pb-10 mb-10 bg-[#FAFBFF] rounded-[12px]">
          <div className="mb-5 flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between">
              <p className="mb-3 font-semibold text-2xl">
                Ajouter un offre d'emploi
              </p>
            </div>
          </div>
          {/* Table */}
          <div className="flex flex-col gap-5">
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              {renderInputField(JOB_INPUTS[0], post, (e) =>
                setPost(e.target.value)
              )}
              {renderInputField(JOB_INPUTS[1], salary, (e) =>
                setSalary(e.target.value)
              )}
            </div>
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              {renderInputField(JOB_INPUTS[2], location, (e) =>
                setLocation(e.target.value)
              )}
              {renderInputField(JOB_INPUTS[3], contractType, (e) =>
                setContractType(e.target.value)
              )}
            </div>
            <div className="flex w-full justify-between items-start gap-[12px] relative flex-[0_0_auto]">
              <div className="w-full">
                <p className="mb-2">{JOB_INPUTS[4].label}</p>
                {
                  <ReactQuill
                    className="w-full h-[475px] mb-10"
                    theme="snow"
                    placeholder="Write job description"
                    onChange={setDescription}
                    value={description}
                  />
                }
              </div>
            </div>
            <center>
              <button
                onClick={addJob}
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

export default JobForm;
