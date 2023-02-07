import ProductCard from "components/Product";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const Details = () => {
  const { id } = useParams();
  console.log(id);
  const [order, setOrder] = useState("");
  let totalQuantity = 0;
  let total = 0;
  console.log(order);
  //total cost
  // for (const product of order?.items) {
  //   if (!product.quantity) {
  //     product.quantity = 1;
  //   }
  //   total = total + product.price * product.quantity;
  //   totalQuantity = totalQuantity + product.quantity;
  // }
  order?.items?.map(function (product) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  });

  const shipping = total > 0 ? 60 : 0;
  const grandTotal = total + shipping;
  useEffect(() => {
    fetch(`https://server-narisha.malihatabassum.com/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [id]);
  console.log(order);
  const { user } = useAuth();

  const handleUpdate = (id) => {
    const proceed = window.confirm("Are you sure, you want to approve?");
    console.log(id);
    if (proceed) {
      const url = `https://server-narisha.malihatabassum.com/orders/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.modifiedCount > 0) {
            toast.success("Approved Successfully!");
          }
        });
    }
  };

  const handleConfrim = (id) => {
    console.log(id);
    const status = "confirmed";
    const updateSpot = { status };
    console.log(updateSpot);
    //update
    fetch(`https://server-narisha.malihatabassum.com/orders/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSpot),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order Confirm Successfully!");
        }
        // history.push("#");
      });
  };

  return (
    <div className="py-10">
      <Toaster center />
      <div className="container mx-auto py-14 px-4 md:px-6 xl:px-20">
        <div className="flex flex-col justify-center items-center ">
          <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
            <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">
              Order Summary #{order?._id?.slice(18, 31)}
            </h3>
            <div className="pt-2 text-base font-semibold leading-4  text-gray-500 gap-1 flex flex-col">
              <h1>Customer Name : {order?.shippingAddress?.name}</h1>
              <h1>Email : {order?.shippingAddress?.customerEmail} </h1>
              <h1>Phone : {order?.shippingAddress?.number} </h1>
            </div>
            <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
              {order?.items?.map((data) => (
                <div
                  key={data._id}
                  className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full"
                >
                  <div className="w-40 md:w-32">
                    <img
                      className="hidden md:block"
                      src={data.image}
                      alt="girl-in-yellow-dress"
                    />
                    <img
                      className="md:hidden "
                      src={data.image}
                      alt="girl-in-yellow-dress"
                    />
                  </div>
                  <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                    <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                      <h3 className="text-lg md:text-xl font-semibold leading-6 md:leading-5  text-gray-800">
                        {data?.title}
                      </h3>
                      <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                        <p className="text-sm leading-none text-gray-600">
                          Size: <span className="text-gray-800"> Open</span>
                        </p>
                        <p className="text-sm leading-none text-gray-600">
                          Quantity: <span className="text-gray-800"> 01</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                      <p className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                        Tk . {data?.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
              <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                    Billing Address
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                    {order?.shippingAddress?.address},
                    {order?.shippingAddress?.city}, Bangladesh
                  </p>
                </div>
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                    Shipping Address
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                    {order?.shippingAddress?.address},
                    {order?.shippingAddress?.city}, Bangladesh
                  </p>
                </div>
                <div className="flex jusitfy-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4  text-gray-800">
                    Shipping Method
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                    Takes up to 3 working days
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 w-full">
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      Tk. {total}
                    </p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        N/A
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">0.00</p>
                  </div>
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      Tk. {shipping}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    Tk. {grandTotal}
                  </p>
                </div>
                <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                  {order?.order_status === "confirmed" ? (
                    <button className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800  w-full text-base font-medium leading-4 text-white bg-green-500  disabled">
                      Order confirmed Successfully
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConfrim(order._id)}
                      className="py-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  w-full text-base font-medium leading-4 text-white bg-gray-800 hover:bg-black"
                    >
                      Confrim Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
