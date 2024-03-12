import { useCallback, useEffect, useState } from "react";
// import { AddClientModal } from "./AddClientModal";
import { BaseUrl } from "@/constants/templates";
import router, { useRouter } from "next/router";
import BlogGridCard from "@/pages/dashboard/blogs/BlogGridCard";
import { DELETE, GET } from "@/constants/fetchConfig";
import { User } from "./users-permissions/UsersPermissionsList";
import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
// import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";

export interface Blog {
    _id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    status: string;
    createdBy: User | null;
    createdAt: string;
}

export const BlogListComponent = () => {
    const [showGrid, setShowGrid] = useState(false);

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [modify, setModify] = useState(false);
    const [searchText, setSearchText] = useState("");

    const [selectedEmployee, setSelectedEmployee] = useState<Blog>();
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
        if (showModal) { setModify(false) }
    }

    const handleModify = (item: Blog) => {
        setModify(true)
        setSelectedEmployee(item)
        toggleShowModal()
    }

    // const [blogsData, setBlogsData] = useState<Blog[]>([
    //     { _id: "0", title: "Mikky", category: "Savoir-faire", editor: "Bob BOKO bob@straca.com", description: "Lorem ipsum che d", date: "08 JANVIER 2023", status: "Publié" },
    //     { _id: "1", title: "Martin", category: "Actualités", editor: "Floyd ADEOTI floyd@straca.com", description: "Lorem ipsum che d", date: "08 JANVIER 2023", status: "Brouillon", },
    //     { _id: "2", title: "Kilian", category: "Savoir-faire", editor: "Ronald BIGNON ronald@straca.com", description: "Lorem ipsum che d", date: "08 JANVIER 2023", status: "Publié", },
    //     { _id: "3", title: "Abdoul", category: "Actualités", editor: "Marvin AKO marvin@straca.com", description: "Lorem ipsum che d", date: "08 JANVIER 2023", status: "Brouillon", },
    // ]);


    const [blogsData, setBlogsData] = useState<Blog[]>([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const [itemId, setItemId] = useState("")

    const handleSetItemId = (id: string) => {
        setItemId(id)
    }

    const handleDeleteItem = async () => {
        try {
            console.log(`Deleting employee with ID: ${itemId}`);
            const response = await DELETE(`/blogs/${itemId}`);

            alert(`deleted successfully!`);
            router.reload();
        } catch (error) {
            console.error(`Error deleting:`, error);
            alert(`Failed to delete`); // Show error alert
        }
    };

    // Function to fetch commandes data
    const fetchBlogsData = useCallback(async () => {
        try {
            const response = await GET(
                `/blogs${searchText.length > 0 ? `?search=${searchText}` : ""}`,
            );

            const data: Blog[] = response;
            // Set the fetched data into state
            setBlogsData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    }, [searchText]);

    useEffect(() => {
        fetchBlogsData().finally(() => setLoading(false));
    }, [fetchBlogsData]);

    return (
        <div className="bg-white h-full pl-5 pr-16 pt-12 flex flex-col text-black">
            <div className="flex flex-row justify-between items-center">
                <p className="mb-3 font-semibold text-2xl">Gestion des Blogs</p>
                <button onClick={toggleShowModal} className="inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] relative bg-[#3D75B0] rounded-md">
                    <div onClick={() => {
                        router.push("/dashboard/blogs?action=new")
                    }} className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                        Ajouter un blog
                    </div>
                    <i className="fa-solid fa-plus ml-1 text-white"></i>
                </button>
            </div>
            <div className="pt-5">
                <div className="px-4 py-3 pb-10 bg-[#FAFBFF] rounded-[12px]">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-between">
                            <p className="mb-3 font-semibold text-2xl">Liste des blogs</p>
                        </div>
                        <div className="flex flex-row w-[60%] justify-between">
                            <div className="relative w-[90%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Recherche ..."
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                />
                            </div>
                            <button onClick={() => { setShowGrid(!showGrid) }} className='px-4 py-2 bg-slate-400 rounded-sm'>
                                <i className={`${showGrid ? 'fa-solid' : 'fa-brands'} ${showGrid ? 'fa-list' : 'fa-windows'} text-slate-800`}></i>
                            </button>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="flex flex-col rounded-[12px] border-blue-600">
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                {(showGrid ?
                                    (
                                        // Grid
                                        <div className="gap-y-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full">
                                            {blogsData.map((item) => (<BlogGridCard blog={item} />))}
                                        </div>
                                    ) :
                                    (
                                        // Table
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="text-gray-500">
                                                    <th className="py-2 px-4 border-b">Titre</th>
                                                    <th className="py-2 px-4 border-b">Catégorie</th>
                                                    <th className="py-2 px-4 border-b">Editeur</th>
                                                    <th className="py-2 px-4 border-b">Description</th>
                                                    <th className="py-2 px-4 border-b">Date de creation</th>
                                                    <th className="py-2 px-4 border-b">Status</th>
                                                    <th className="py-2 px-4 border-b">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blogsData.map((item) => (
                                                    <tr key={item._id}>
                                                        <td className="py-2 px-4 border-b">{item.title}</td>
                                                        <td className="py-2 px-4 border-b">{item.category}</td>
                                                        <td className="py-2 px-4 border-b">{item.createdBy!.email}</td>
                                                        <td className="py-2 px-4 border-b">{item.description}</td>
                                                        <td className="py-2 px-4 border-b">{item.createdAt}</td>
                                                        <td className="py-2 px-4 border-b flex justify-center">
                                                            <div className={`px-4 py-2 rounded-3xl items-center justify-center text-center ${item.status.toLocaleLowerCase() === "published" ? 'bg-[#DCFCE7]' : "bg-[#FFEDD5]"} ${item.status.toLocaleLowerCase() === "published" ? 'text-[#166534]' : "text-[#9A3412]"}`}>{item.status}</div>
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
                                    )
                                )}
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
            */}
            <DeleteCountryModal
                isVisible={showDeleteModal}
                onClose={() => { toggleShowDeleteModal() }}
                onYesClick={handleDeleteItem}
            /> 

        </div>
    );
};