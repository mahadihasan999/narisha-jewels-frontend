import Button from "assets/Form/Button";
import Heading from "assets/Form/Heading";
import Label from "assets/Form/Label";
import TextField from "assets/Form/TextField";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

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

const UpdateProducts = () => {
  const [products, setProducts] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [image, setImageData] = useState();
  const [images, setImages] = useState([]);

  const [selectedOption, setSelectedOption] = useState();
  const category = selectedOption?.label;
  const categoryData = [
    { value: "fingureRing", label: `${products.category}` },
  ];

  const a = [];
  if (typeof category !== "undefined") {
    a.push(category);
  } else {
    a.push(products.category);
  }
  const img = [];

  if (!image) {
    img.push(products.image);
  } else {
    img.push(image);
  }

  useEffect(() => {
    fetch(`https://server-narisha.malihatabassum.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [id]);

  //track the update
  const handleUpdate = (e) => {
    const { value, name } = e.target;

    setProducts((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //handleUpdate
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = products.title;
    const price = products.price;
    const description = products.description;
    const category = a[0];
    const image = img[0];
    const updateSpot = { category, title, price, description, image };

    //update
    fetch(`https://server-narisha.malihatabassum.com/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSpot),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          swal("Updated", "Update Successfully!", "success");
        }
        history.push("#");
      });
  };

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

  return (
    <div className="mx-4 ">
      <Toaster></Toaster>
      <div className="container mx-auto ">
        <Heading text="Update product" />
        <form
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-4"
          onSubmit={handleSubmit}
        >
          {/* title and description  */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category" text="Category" />
            <Select
              value={selectedOption ? selectedOption : categoryData}
              onChange={setSelectedOption}
              options={options}
            />

            <Label htmlFor="title" text="Product Name" />
            <TextField
              id="title"
              type="text"
              defaultValue={products.title}
              name="title"
              onChange={handleUpdate}
              required
            />

            {/* description  */}
            <Label htmlFor="description" text="Description" />
            <TextField
              id="description"
              cols="30"
              rows="4"
              className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
              required
              defaultValue={products.description}
              name="description"
              onChange={handleUpdate}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="Price" text="Price" />
            <TextField
              id="Price"
              type="text"
              name="price"
              defaultValue={products.price}
              onChange={handleUpdate}
              required
            />
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

              {image ? (
                ""
              ) : (
                <img
                  src={products.image}
                  alt="product-images"
                  height={64}
                  width={48}
                />
              )}
            </div>

            {/* button  */}
            <div className="mt-10 flex justify-center items-center">
              <Button text="Update Product" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
