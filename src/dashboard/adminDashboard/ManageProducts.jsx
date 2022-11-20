import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import SignleProduct from "./SignleProduct";

const ManageProducts = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["lastword", "lyrics", "totalLastCharacter"]);
  const [searchParamRhy] = useState(["totalLastCharacter"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [filterPara, setFilterPara] = useState(["All"]);

  // const [searchSort] = useState("totalLine");

  useEffect(() => {
    fetch("https://nameless-refuge-09989.herokuapp.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {}
      );
  }, []);

  const data = Object.values(items);

  function search(data) {
    if (filterPara == "All") {
      items.sort();
    }
    if (filterPara == "totalLine") {
      items.sort((a, b) => {
        return a.totalLine - b.totalLine;
      });
    }
    if (filterPara == "date") {
      items.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
    if (filterPara == "dateUpdated") {
      items.sort((a, b) => {
        return new Date(b.dateUpdated) - new Date(a.dateUpdated);
      });
    }

    return data.filter((item) => {
      if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
            -1
          );
        });
      }

      if (filterParam == "totalLastCharacter") {
        return searchParamRhy.some((newItem) => {
          return (
            item[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
            -1
          );
        });
      }
    });
  }

  // items.forEach((e) => {
  //     console.log(`${e.totalLine}`);
  // });

  // DELETE AN USER
  const handleDeleteProduct = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://nameless-refuge-09989.herokuapp.com/products/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Successfully deleted!");
            const remainingUsers = items.filter(
              (product) => product._id !== id
            );
            setItems(remainingUsers);
          }
        });
    }
  };

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className=" h-[100vh]">
      <div className="mx-auto container">
        <Toaster></Toaster>
        <div className="flex p-4 lg:p-8 flex-col items-center justify-center">
          <div className="w-full  flex items-center justify-center">
            {/* search bar */}
            <div className=" flex flex-row">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="border-none rounded-l-md lg:px-10 md:px-6 px-2 py-[8px]"
                placeholder="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <span className="sr-only">Search</span>

              <select
                onChange={(e) => {
                  setFilterParam(e.target.value);
                }}
                className="custom-select border-l py-[8px] rounded-r-md"
                aria-label=""
              >
                <option value="All">All</option>

                <option value="totalLastCharacter">End Rhymes</option>
              </select>
              <span className="focus"></span>
            </div>
          </div>
        </div>

        {loading ? (
          <div class="flex items-center justify-center space-x-2 animate-pulse mt-20">
            <div class="w-5 h-5 bg-gray-700 rounded-full"></div>
            <div class="w-5 h-5 bg-gray-600 rounded-full"></div>
            <div class="w-5 h-5 bg-gray-500 rounded-full"></div>
          </div>
        ) : (
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden ">
            <h1 className="text-gray-600  font-semibold pr-2 text-md text-left py-2 tracking-normal leading-4 ">
              Total products found {items.length}
            </h1>
            <table className="min-w-full border-2 border-indigo-500 text-center">
              <thead>
                <tr className="h-16 bg-indigo-500 border py-8 text-center font-bold">
                  <th className="text-gray-600   font-semibold pr-2 text-sm border tracking-normal leading-4">
                    Category
                  </th>
                  <th className=" text-gray-600  font-semibold text-sm border tracking-normal leading-4 border">
                    Product Image
                  </th>
                  <th className=" text-gray-600  font-semibold text-sm border tracking-normal leading-4 border ">
                    ID
                  </th>

                  <th className="text-gray-600  font-semibold pr-2 text-sm border tracking-normal leading-4">
                    Product Name
                  </th>
                  <th className="text-gray-600  font-semibold px-2 text-sm border tracking-normal leading-4">
                    Price
                  </th>
                  <th className="text-gray-600  font-semibold px-2 text-sm border tracking-normal leading-4">
                    Descriptions
                  </th>
                  <th className="text-gray-600  font-semibold px-2 text-sm border tracking-normal leading-4">
                    Modified
                  </th>
                  <td className="text-gray-600   font-semibold px-2 text-sm border tracking-normal leading-4">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, index) => (
                  <SignleProduct
                    handleDeleteProduct={handleDeleteProduct}
                    product={item}
                    index={index}
                    key={index}
                    {...item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
