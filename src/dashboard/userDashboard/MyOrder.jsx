import useAuth from "hooks/useAuth";
import useOrders from "hooks/useOrders";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ModalImage from "react-modal-image";
import Sub from "./Sub";
const MyOrder = () => {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    fetch("https://server-narisha.malihatabassum.com/orders")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);
  const { user } = useAuth();

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to Delete");
    if (proceed) {
      const url = `https://server-narisha.malihatabassum.com/orders/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0)
            swal("Deleted", "Order Delete Successfully!", "success");
          const remainingUsers = orders.filter((user) => user._id !== id);
          setOrder(remainingUsers);
        });
    }
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 pt-6 lg:pt-6 my-4">
        <div className="flex justify-start item-start flex-col  ">
          <h1 className="text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9  text-gray-800 ">
            My Orders
          </h1>
        </div>
        {orders
          ?.filter((item) => item.user === user.email)
          ?.map((item) => (
            <div className="mt-6  flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 border-2 border-indigo-500 shadow">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <div className="flex justify-start flex-col gap-5">
                    <div className="flex justify-between items-center space-x-10 ">
                      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                        Order #{item?._id.slice(18, 31)}
                      </p>

                      <div className="bg-green-200 h-8 w-24 font-semibold rounded-md flex items-center justify-center cursor-pointer">
                        <span>{item?.order_status}</span>
                      </div>
                    </div>
                    <p className="text-base font-medium leading-6 text-gray-600">
                      Placed on 05 Sep 2022 22:46:56
                    </p>
                  </div>
                  {item.items.map((product) => (
                    <div className="mt-2 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <ModalImage
                          className=""
                          small={product.image}
                          large={product.image}
                          alt={product.title}
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                            {product.title}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-300">category: </span>{" "}
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6 text-gray-800">
                            {product.quantity}
                          </p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                            Tk {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>

                    <div>
                      <Sub key={item._id} {...item} />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                      Shipping
                    </h3>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center space-x-4">
                        <div class="w-8 h-8">
                          <img
                            class="w-full h-full"
                            alt="logo"
                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-center">
                          <p className="text-lg leading-6 font-semibold text-gray-800">
                            RedEX Delivery
                            <br />
                            <span className="font-normal">
                              Delivery with 24 Hours inside Dhaka.
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold leading-6 text-gray-800">
                        Tk 60.00
                      </p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                        View Carrier Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img src={user.photoURL} alt="avatar" />
                      <div className=" flex justify-start items-start flex-col space-y-2">
                        <p className="text-base font-semibold leading-4 text-left text-gray-800">
                          {item.shippingAddress.name}
                          {console.log(item)}
                        </p>
                        <p className="text-sm leading-5 bg-green-600 rounded text-gray-100 px-2 ">
                          ✔ Verifed
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                          stroke="#1F2937"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 7L12 13L21 7"
                          stroke="#1F2937"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="cursor-pointer text-sm leading-5 text-gray-800">
                        {item.shippingAddress.customerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {item?.shippingAddress?.address} ,
                          {item?.shippingAddress?.city}, Bangladesh.
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Billing Address
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {item?.shippingAddress?.address} ,
                          {item?.shippingAddress?.city}, Bangladesh.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyOrder;
