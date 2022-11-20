import React, { useEffect, useContext } from "react";
import ProductCard from "../components/Product";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts,
} from "../contexts/products";
import { CommonStateContext } from "../contexts/common";
import Filter from "components/Filter/Filter";
import { useState } from "react";
import Skeleton from "layouts/Skeleton";
import { CommonDispatchContext, setSearchKeyword } from "../contexts/common";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup,
} from "../contexts/cart";
const Home = () => {
  const { products, isLoading, isLoaded } = useContext(ProductsStateContext);
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);
  const [loading, setLoading] = useState();
  const commonDispatch = useContext(CommonDispatchContext);
  const [FilterTab, setFilterTab] = useState("Earrings");

  const handleSearchInput = (event) => {
    return setSearchKeyword(commonDispatch, event.target.value);
  };
  const productsList =
    products &&
    products?.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleMenuTabs = (type) => {
    setFilterTab(type);
  };
  return (
    <div className="my-8 max-w-screen-xl mx-auto px-4 pt-6 lg:pt-6 my-12">
      {/* <Filter></Filter> */}
      <div class=" relative mx-auto text-gray-600 justify-center items-center flex blcok  lg:hidden md:hidden block">
        <input
          onChange={handleSearchInput}
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button
          className={
            FilterTab === "Earrings"
              ? " bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 mt-4  flex items-center justify-center px-2"
              : " bg-indigo-100 text-gray-600 rounded shadow  rounded-md hover:bg-indigo-150 active:bg-indigo-200 disabled:opacity-50 mt-4 px-2 flex items-center justify-center"
          }
          onClick={() => handleMenuTabs("Earrings")}
        >
          Earrings
        </button>
        <button
          className={
            FilterTab === "Necklaces"
              ? " bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 mt-4  flex items-center justify-center px-2"
              : " bg-indigo-100 text-gray-600 rounded shadow  rounded-md hover:bg-indigo-150 active:bg-indigo-200 disabled:opacity-50 mt-4 px-2 flex items-center justify-center"
          }
          onClick={() => handleMenuTabs("Necklaces")}
        >
          Necklaces
        </button>
        <button
          className={
            FilterTab === "Finger Ring"
              ? " bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 mt-4  flex items-center justify-center px-2"
              : " bg-indigo-100 text-gray-600 rounded shadow  rounded-md hover:bg-indigo-150 active:bg-indigo-200 disabled:opacity-50 mt-4 px-2 flex items-center justify-center"
          }
          onClick={() => handleMenuTabs("Finger Ring")}
        >
          Finger Ring
        </button>
      </div>
      {/* middle */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {productsList
          ?.filter((item) => FilterTab === item.category)
          ?.map((data) =>
            loading ? (
              <Skeleton key={data._id} />
            ) : (
              <ProductCard key={data._id} {...data} />
            )
          )}
      </div>
    </div>
  );
};

export default Home;
