import { useEffect, useState } from "react";
// import { AddClientModal } from "./AddClientModal";
import { BaseUrl } from "@/constants/templates";
import router from "next/router";
// import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";

export interface Job {
    _id: string;
    post: string;
    type: string;
    location: string;
    description: string;
    date: string;
    salary: string;
}

export const JobListComponent = () => {

    const [modify, setModify] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState<Job>();
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
        if (showModal) { setModify(false) }
    }

    const handleModify = (item: Job) => {
        setModify(true)
        setSelectedEmployee(item)
        toggleShowModal()
    }

    const [jobsData, setJobsData] = useState<Job[]>([
        { _id: "0", post: "Chef de chantier", type: "Plein temps", location: "Burkina-Faso", description: "Lorem ipsum che d", date: "08 JANVIER 2023", salary: "500,000" },
        { _id: "1", post: "Chauffeur", type: "Temps partiel", location: "Bénin", description: "Lorem ipsum che d", date: "08 JANVIER 2023", salary: "750,000", },
        { _id: "2", post: "Manager", type: "Plein temps", location: "Togo", description: "Lorem ipsum che d", date: "08 JANVIER 2023", salary: "1,000,000", },
        { _id: "3", post: "Achat Pneu ", type: "Temps partiel", location: "Côte d'Ivoire", description: "Lorem ipsum che d", date: "08 JANVIER 2023", salary: "900,000", },
    ]);

    useEffect(() => {
        // fetchEmployeesData()
    }, [])

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const [itemId, setItemId] = useState("")

    const handleSetItemId = (id: string) => {
        setItemId(id)
    }

    // const handleDeleteItem = async () => {
    //     try {
    //         console.log(`Deleting employee with ID: ${itemId}`);
    //         const response = await fetch(`${BaseUrl}/employees/${itemId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json()
    //             alert(`Error => ${errorData.message}`)
    //             throw new Error(`Failed to delete`);
    //         }

    //         alert(`deleted successfully!`); // Show success alert
    //         // window.location.reload(); // Refresh the page

    //     } catch (error) {
    //         console.error(`Error deleting:`, error);
    //         alert(`Failed to delete`); // Show error alert
    //     }
    // };


    // // Function to fetch employees data
    // const fetchEmployeesData = async () => {
    //     try {
    //         const response = await fetch(`${BaseUrl}/employees`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }

    //         const data: Job[] = await response.json();
    //         // Set the fetched data into state
    //         setEmployeesData(data);

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         // Handle errors
    //     }
    // };

    return (
        <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
            <div className="flex flex-row justify-between items-center">
                <p className="mb-3 font-semibold text-2xl">Gestion des offres d'emplois</p>
                <button onClick={toggleShowModal} className="inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] relative bg-[#3D75B0] rounded-md">
                    <div onClick={() => {
                        router.push("/dashboard/jobs?action=new")
                    }} className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                        Créer un offre
                    </div>
                    <i className="fa-solid fa-plus ml-1 text-white"></i>
                </button>
            </div> 
            <div className="pt-5">
                <div className="px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between">
                            <p className="mb-3 font-semibold text-2xl">Liste des offres d'emplois</p>
                        </div>
                        <div className="flex w-[50%] items-start gap-[8px] px-[20px] py-[16px] relative bg-white rounded-[10px] border border-solid border-[#4763e4]">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-[14px] tracking-[0] leading-[normal]">
                                Vous cherchez quel offre ...
                            </p>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="flex flex-col rounded-[12px] border-blue-600">
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-gray-500">
                                            <th className="py-2 px-4 border-b">Poste</th>
                                            <th className="py-2 px-4 border-b">Type de contrat</th>
                                            <th className="py-2 px-4 border-b">Proximité</th>
                                            <th className="py-2 px-4 border-b">Description</th>
                                            <th className="py-2 px-4 border-b">Date de creation</th>
                                            <th className="py-2 px-4 border-b">Salaire</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobsData.map((item) => (
                                            <tr key={item._id}>
                                                <td className="py-2 px-4 border-b">{item.post}</td>
                                                <td className="py-2 px-4 border-b">{item.type}</td>
                                                <td className="py-2 px-4 border-b">{item.location}</td>
                                                <td className="py-2 px-4 border-b">{item.description}</td>
                                                <td className="py-2 px-4 border-b">{item.date}</td>
                                                <td className="py-2 px-4 border-b flex justify-center">
                                                    <div className={`px-4 py-2 rounded-3xl items-center justify-center text-center ${item.salary.toLocaleLowerCase() === "1,000,000" ? 'bg-[#DCFCE7]' : "bg-[#FFEDD5]"} ${item.salary.toLocaleLowerCase() === "1,000,000" ? 'text-[#166534]' : "text-[#9A3412]"}`}>{item.salary} fcfa</div>
                                                </td>
                                                <td className="py-2 px-4 border-b text-center">
                                                    {/* Add your action buttons or links here */}
                                                    <i onClick={() => { setItemId(item._id); toggleShowDeleteModal() }} className="fa-regular fa-trash-can text-red-600"></i>
                                                    <i onClick={() => handleModify(item)} className="ml-4 fa-regular fa-pen-to-square text-[#5C73DB]"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <AddClientModal
                isVisible={showModal}
                onClose={toggleShowModal}
                type='employee'
                isModify={modify}
                selectedUser={selectedEmployee!}
            />

            <DeleteCountryModal
                isVisible={showDeleteModal}
                onClose={() => { toggleShowDeleteModal() }}
                onYesClick={handleDeleteItem}
            /> */}

        </div>
    );
};