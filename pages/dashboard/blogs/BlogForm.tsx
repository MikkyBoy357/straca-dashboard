import { renderInputField } from "@/components/InputComponents/InputComponents";
import DropdownComponent from "@/components/InputComponents/dropdowncomponent";
import { Blog } from "@/components/dashboard_components/BlogList";
import { BlogType } from "@/components/dashboard_components/SettingComponents/blogcard";
import { GET, POST, PUT } from "@/constants/fetchConfig";
import { BLOG_INPUTS, JOB_INPUTS } from "@/constants/templates";
import { Toast } from "@/constants/toastConfig";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
// Use dynamic for lazy loading ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const backgroundImage =
    "https://s3-alpha-sig.figma.com/img/e820/b309/33faaf77f8af260428a9b35d9f503bf6?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cuKH-bisdmxyI9xwNl09-7tWsQIFEV9A6HkbVZ60UdB8iNYoNwZkxyGPB~GnBJnfmHUl-KXNeGS-7skVzZqqnYLxSyIeGPXmGvNqlszXkEpGQwgRbGv4QJQj~emtO4aiKNMIxU7ncab6tXkEL4NltsI44oHc0g7oAPGb~GsreJ-TExtg-G71j5dQZ~44xaU~bwzfIRRrXw8ezKy7xSTaHvW~spqq8OpPHFtB0k8OjUGCu6lIDgBDWFi1rDPZvRsKMKTHCG1CE6fA9XlWjOwHT3rU54qQnuT37YBFq9GWoP91Xprwzd2fUdVzSiuY6SbJCzVbFN2CFpFxUHsMZxLVzg__";

  // Attention
  const [isChanged, setIsChanged] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [blogTypes, setBlogTypes] = useState<BlogType[]>([]);
  useEffect(() => {
    const fetchBlogTypes = async () => {
      try {
        const response = await GET("/blogType"); 
        const data: BlogType[] = response;
        setBlogTypes(data);
      } catch (error) {
        console.error("Error fetching blog types:", error);
      }
    };

    fetchBlogTypes();
  }, []);

  console.log(`blog====>${blogTypes.length}`)
  const [selectedItem, setSelectedItem] = useState<Blog>({
    _id: "",
    title: "",
    category: "",
    image: "",
    description: "",
    status: "",
    createdBy: null,
    createdAt: "",
  });

  // Function to add blog
  const addBlog = async (isPublish: boolean) => {
    //
    const session: any | Session = await getSession();
    const currentUser = session?.user;
    console.log(session?.user.id);

    try {
      const newBlog = {
        title: title,
        category: category,
        image: image,
        description: description,
        status: isPublish ? "published" : "drafted",
        createdBy: currentUser.id,
      };

      // Perform validation to check if all variables are not empty
      if (
        title.trim() === "" ||
        category?.trim() === "" ||
        image.trim() === "" ||
        description.trim() === "" ||
        // contractType?.trim() === "" ||
        description.trim() === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }

      var response;
      if (!isModify) {
        response = await POST(`/blogs`, newBlog);
      } else {
        if (!isChanged) {
          return alert("Values were not changed");
        }

        response = await PUT(`/blogs/${selectedItem._id}`, newBlog);
      }

      console.log(`Blog ${isModify ? "edited" : "added"} successfully!`);
      router.back();
      Toast.fire({
        icon: "success",
        title: `Blog ${isModify ? "edited" : "added"} successfully!`,
      });
   
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(error);
    }
  };
  const handleDropdownChange = (event: any) => {
    setCategory(event.target.value);
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
        <p className="ml-2 font-semibold text-2xl">Créer un blog</p>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex pt-5 justify-between">
          <div className="w-full px-4 py-3 pb-10 mb-10 bg-[#FAFBFF] rounded-[12px]">
            <div className="mb-5 flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between">
                <p className="mb-3 font-semibold text-2xl">Blog</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center">
              {renderInputField(
                BLOG_INPUTS[0],
                title,
                (e) => setTitle(e.target.value),
                undefined,
                undefined,
                "w-full"
              )}

              <div className="flex w-full justify-between items-start gap-[18px] relative flex-[0_0_auto]">
             
                <div className="w-[30%]">
                  <DropdownComponent
                    input={{
                      id: "category",
                      label: "Catégorie",
                      placeholder: "Select a category", // Optional placeholder
                    }}
                    value={category}
                    handleSelect={handleDropdownChange}
                    selectList={blogTypes}
                    className="w-full"
                  />
                </div>
                {renderInputField(
                  BLOG_INPUTS[2],
                  image,
                  (e) => setImage(e.target.value),
                  undefined,
                  undefined,
                  "w-[30%]"
                )}

                <button
                  onClick={() => addBlog(false)}
                  className="my-5 px-10 py-2 text-[#3D75B0] bg-white rounded-md"
                >
                  Enregistrer
                </button>

                <button
                  onClick={() => addBlog(true)}
                  className="my-5 px-10 py-2 bg-[#3D75B0] text-white rounded-md"
                >
                  Publier
                </button>
              </div>

              <div className="w-full">
                <p className="">{BLOG_INPUTS[3].label}</p>
                <ReactQuill
                  className="w-full h-[475px] mb-10"
                  theme="snow"
                  placeholder="Write job description"
                  onChange={setDescription}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
