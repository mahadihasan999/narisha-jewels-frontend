import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import useAuth from "hooks/useAuth";
import useOrder from "hooks/useOrders";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";

import Heading from "assets/Form/Heading";
import { toast, Toaster } from "react-hot-toast";

import { useState } from "react";
import { useEffect } from "react";
import Details from "./Details";
import { Link } from "react-router-dom";
const ManageProdcuts = (props) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [orders, setOrder] = useState([]);
  const { user } = useAuth();
  //handle delete
  const ref = React.createRef();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to Delete");
    if (proceed) {
      const url = `https://server-narisha.malihatabassum.com/orders/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) toast.success("Delete Successfully!");
          const remainingUsers = orders.filter((user) => user._id !== id);
          setOrder(remainingUsers);
        });
    }
  };

  useEffect(() => {
    fetch("https://server-narisha.malihatabassum.com/orders")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

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

  const handlePass = (id) => {
    console.log(id);
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <Heading text="Manage All Orders" />
      <h2 className="text-center">Total {orders.length} Orders Found</h2>
      {/* All travel places  */}
      <Toaster />
      <div></div>
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden sm:rounded-lg shadow-md">
              <table className="min-w-full">
                <thead className="bg-indigo-500 poppins">
                  <tr>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-center uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Customer Name
                    </th>

                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Contact Number
                    </th>

                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Items
                    </th>

                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr className="bg-white border-b poppins" key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center justify-center">
                        <div className="flex items-center justify-center space-x-3">
                          <div className="flex gap-2">
                            <Link to={`/order-details/${item._id}`}>
                              <div className="border border-green-200 h-8 w-16 mb-4 md:mb-0 rounded-md flex items-center justify-center cursor-pointer">
                                <span className="text-xs text-green-500 font-normal">
                                  Details
                                </span>
                              </div>
                            </Link>
                            <div className="bg-green-200 h-8 w-24 font-semibold mb-4 md:mb-0 rounded-md flex items-center justify-center cursor-pointer">
                              <span>{item?.order_status}</span>
                            </div>
                          </div>
                          <AiOutlineDelete
                            className="cursor-pointer text-2xl text-red-600"
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td>
                      {/* order details modal section */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?._id.slice(18, 31)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.shippingAddress?.name}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item?.shippingAddress?.number}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        ({item?.items?.length} items)
                      </td>

                      <td className="text-sm text-gray-700  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item?.payment_status} ({" "}
                        <span className=" e-upper-case text-green-500">
                          {item?.paymentMethod}
                        </span>{" "}
                        )
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
  );
};

export default ManageProdcuts;
