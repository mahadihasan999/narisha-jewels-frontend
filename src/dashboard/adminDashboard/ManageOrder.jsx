// import Heading from "assets/Form/Heading";
import useAuth from "hooks/useAuth";
import useOrder from "hooks/useOrders";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { FiBook } from "react-icons/fi";
import swal from "sweetalert";
import ModalImage from "react-modal-image";

const ManageProdcuts = (props) => {
  const [orders, setOrder] = useOrder();
  const { user } = useAuth();
  //handle delete
  const ref = React.createRef();
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to Delete");
    if (proceed) {
      const url = `https://nameless-refuge-09989.herokuapp.com/orders/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0)
            swal("Order Deleted", "Delete Successfully!", "success");
          const remainingUsers = orders.filter((user) => user._id !== id);
          setOrder(remainingUsers);
        });
    }
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdate = (id) => {
    const proceed = window.confirm("Are you sure, you want to approve?");
    console.log(id);
    if (proceed) {
      const url = `https://nameless-refuge-09989.herokuapp.com/orders/${id}`;
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
            swal("Order", "Approved Successfully!", "success");
          }
        });
    }
  };

  return (
    <div>
      {/* heading   */}
      {/* <Heading text="Manage All Orders" /> */}
      <h2 className="text-center">Total {orders.length} Orders Found</h2>
      {/* All travel places  */}
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
                      Grand Total
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
                      {/* <td className="px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center justify-center">
                        <div className="flex items-center justify-center space-x-3">
                          {item.status === "pending" ? (
                            <div className="">
                              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative text-xs text-yellow-400 font-normal">
                                New Order
                              </span>
                              <FcApproval
                                className="cursor-pointer text-2xl text-green-600"
                                onClick={() => handleUpdate(item._id)}
                              />
                            </div>
                          ) : (
                            <div className="bg-green-200 h-8 w-24 mb-4 md:mb-0 rounded-md flex items-center justify-center">
                              <span className="text-xs text-green-500 font-normal">
                                Confirmed
                              </span>
                            </div>
                          )}
                          <AiOutlineDelete
                            className="cursor-pointer text-2xl text-red-600"
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td> */}

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex gap-2">
                        #{item?._id.slice(18, 31)}
                        <button
                          onClick={openModal}
                          className="px-2 bg-indigo-500 text-gray-100"
                        >
                          Details
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item.phone}
                      </td>

                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {Object?.keys(item.order).map((item) => (
                          <div>
                            <p className="flex flex-row ">
                              <span className="text-green-500">
                                <FiBook />
                              </span>
                              {item}
                            </p>
                          </div>
                        ))}
                      </td> */}

                      {/* <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                        {Object?.values(item.order).map((item) => (
                          <div>
                            <p className="flex flex-row ">
                              <span className="text-green-500"></span>
                              {item}
                            </p>
                          </div>
                        ))}
                      </td> */}
                      <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                        <span className="tab-text">TK {item.grandTotal}</span>
                      </td>

                      {item.payment === "Paid" ? (
                        <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                          {item.payment}
                        </td>
                      ) : (
                        <td className="text-sm text-red-500  font-semibold px-6 py-4 whitespace-nowrap ">
                          {item.payment}
                        </td>
                      )}
                      {/* <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item.bkashNumber}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item.trxID}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item.address}
                      </td>
                      <td className="text-sm text-green-500  font-semibold px-6 py-4 whitespace-nowrap ">
                        {item.city}
                      </td> */}
                      {/* <td className="text-sm text-gray-500  px-6 py-4 whitespace-nowrap ">
                        {item.createdAt.slice(0, 10)}
                      </td> */}

                      {/* <Pdf targetRef={ref} filename="code-example.pdf">
                                                        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                                                    </Pdf> */}

                      {/* <button {handleDownload} class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                                                        <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                                        <span>Download</span>
                                                    </button> */}

                      {/* <div ref={ref}>
                                                <h1>Hello CodeSandbox</h1>
                                                <h2>Start editing to see some magic happen!</h2>
                                                <h1> What is your name </h1>
                                            </div> */}
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
