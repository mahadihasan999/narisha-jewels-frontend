import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "assets/Form/Button";
import Label from "assets/Form/Label";
import TextField from "assets/Form/TextField";
import Heading from "assets/Form/Heading";
import ManageBlogs from "./ManageBlogs";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [summary, setSummery] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [image, setImageData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("summary", summary);
    // formData.append("excerpt", excerpt);
    // formData.append("date", date);
    // formData.append("image", image);
    const formData = {
      title,
      excerpt,
      summary,
      date,
      image,
    };
    console.log(formData);

    fetch("https://server-narisha.malihatabassum.com/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully Added!");
          //   history.push("/dashboard");
          setTitle("");
          setExcerpt("");
          setSummery("");
          setLoading(false);
          setImageData("");
          // window.scrollTo(-100, -100);
        } else {
          toast.error("This didn't work.");
        }
      });
  };

  //post to database

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhucdoev3",
        uploadPreset: "nj-upload-preset",
      },

      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageData(result.info.url);
        }
        if (result.event) {
          setLoading(!loading);
        }
      }
    );

    //open widget
    myWidget.open();
  }
  return (
    <div className="container mx-auto ">
      <Heading text="Add Blogs" />
      <Toaster />

      <form
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6  mx-2"
        onSubmit={handleSubmit}
      >
        {/* title and description  */}

        <div className="flex flex-col space-y-2">
          <Label htmlFor="title" text="Title" />
          <TextField
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Label htmlFor="summary" text="Summary" />
          <textarea
            id="Excerpt"
            cols="28"
            rows="3"
            value={summary}
            className="border border-gray-200  py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
            required
            onChange={(e) => setSummery(e.target.value)}
          ></textarea>
          {/* description  */}
          <Label htmlFor="Excerpt" text="Description" />
          <textarea
            id="Excerpt"
            cols="30"
            rows="4"
            value={excerpt}
            className="border border-gray-200  py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
            required
            onChange={(e) => setExcerpt(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-8 flex flex-col gap-2 items-start justify-start">
          <div onClick={handleOpenWidget} className="flex gap-3">
            <button
              className="bg-gray-100 border border-gray-400 px-6 py-2 rounded"
              type="button"
            >
              <div class="flex justify-center items-center">
                {image ? (
                  <span class=" text-green-500 font-semibold">
                    Uploaded done
                  </span>
                ) : (
                  <span>Choose File</span>
                )}
              </div>
            </button>

            <div className="px-6 flex items-center flex-no-wrap">
              <div className="">
                <div
                  className="w-12 h-12 bg-cover bg-center 
                
                rounded-md"
                >
                  <img
                    src={image}
                    alt={image}
                    className="h-full w-full overflow-hidden object-cover rounded border-2 border-white dark:border-gray-700 shadow"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button text="Add Blog" type="submit" />
          </div>
        </div>
      </form>
      <ManageBlogs />
    </div>
  );
};

export default AddBlogs;
