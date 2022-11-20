import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
// import Heading from './Heading';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 } from "uuid";
import Label from "assets/Form/Label";
import TextField from "assets/Form/TextField";
import Button from "assets/Form/Button";
import Heading from "assets/Form/Heading";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

const options = [
  { value: "fingureRing", label: "Finger Ring" },
  { value: "Earrings", label: "Earrings" },
  { value: "chain", label: "Chain" },
  { value: "necklaces", label: "Necklaces" },
  { value: "angles", label: "Bangles" },
  { value: "nosepins", label: "Nosepins" },
  { value: "Saree Pin", label: "Saree Pin" },
  { value: "kids", label: "Kids" },
  { value: "top-earpin", label: "Top/Earpin" },
  { value: "payals-nupur", label: "Payals & Nupur" },
];

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [image, setImageData] = useState();
  const [loading, setLoading] = useState();

  const key = v4();
  const [selectedOption, setSelectedOption] = useState(null);
  const category = selectedOption?.label;

  //button loading

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
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    //open widget
    myWidget.open();
  }

  //   const { uuid } = require("uuidv4");
  //   const key = uuid();
  //   console.log(key);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      category,
      title,
      key,
      description,
      price,
      image,
      date,
    };

    fetch("https://nameless-refuge-09989.herokuapp.com/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          swal("Product Added!", "Added Successfully", "success");
          history.push("/dashboard");
          e.preventDefault();
        } else {
          swal(
            "Unsuccessful !",
            "Product  not added to the database!",
            "error"
          );
        }
      });
  };

  return (
    <>
      <div className="container mx-auto ">
        <Heading text="Add product" />
        <Toaster></Toaster>
        <form
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-4"
          onSubmit={handleSubmit}
        >
          {/* title and description  */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category" text="Category" />
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <Label htmlFor="title" text="Product Name" />
            <TextField
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {/* description  */}
            <Label htmlFor="description" text="Description" />
            <textarea
              id="description"
              cols="30"
              rows="6"
              className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="Price" text="Price" />
            <TextField
              id="Price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {/* 
            <Label htmlFor="date" text="Date" />
            <DatePicker
              onChange={setDate}
              required
              selected={date}
              isClearable
              placeholderText="I have been cleared!"
              className="py-2 rounded"
            /> */}

            <div className="pt-3 flex gap-2 items-center justify-start">
              <span
                required
                onClick={handleOpenWidget}
                id="upload_widget"
                className={
                  image
                    ? "font-normal border border-green-100 bg-green-500 text-gray-100 px-4 py-2 rounded "
                    : "font-normal border border-gray-500 bg-white text-gray-800 px-4 py-2 rounded  cursor-pointer"
                }
              >
                {image ? (
                  <div className="flex gap-2">
                    Uploaded{" "}
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/FFFFFF/checked--v1.png"
                      alt="img"
                    />
                  </div>
                ) : (
                  "Choose Photo"
                )}
              </span>
            </div>

            {/* button  */}
            <div className="mt-10 flex justify-center items-center">
              <Button text="Update Product" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
