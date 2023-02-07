import React, { useEffect, useContext } from "react";
import ProductCard from "../components/Product";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts,
} from "../contexts/products";
import { CommonStateContext } from "../contexts/common";
import { useState } from "react";
import Skeleton from "layouts/Skeleton";
import { CommonDispatchContext, setSearchKeyword } from "../contexts/common";
import {
  GiCrystalEarrings,
  GiIntricateNecklace,
  GiLinkedRings,
} from "react-icons/gi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Home = () => {
  const { products } = useContext(ProductsStateContext);
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);
  const [loading, setLoading] = useState();
  const commonDispatch = useContext(CommonDispatchContext);

  const [FilterTab, setFilterTab] = useState("All");

  if (FilterTab === "") {
    setFilterTab("");
  }

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
    <section className="max-w-screen-xl mx-auto  my-8 ">
      <div clasName="px-4 ">
        <div className="flex items-center flex-col">
          <h1 className="text-3xl sm:text-3xl xl:text-4xl font-semibold leading-6 ">
            New Arrivals
          </h1>
          <h1 className="text-gray-600 font-normal text-md pb-3 pt-2">
            Add our products to weekly lineup
          </h1>
        </div>
        {/* npm i @headlessui/react @restart/hooks axios-mock-adapter clsx date-fns
        react-error-boundary react-query @types/react-router-dom --legacy-peer-deps */}
        <div class=" relative mx-auto text-gray-600 justify-center items-center flex blcok  lg:hidden md:hidden block">
          <input
            onChange={handleSearchInput}
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
        </div>
        {/* onClick={() => handleMenuTabs("Earrings")} */}
        {/* onClick={() => handleMenuTabs("Necklaces")} */}
        {/* onClick={() => handleMenuTabs("Finger Ring")} */}
        <div className="hidden lg:block md:block">
          <div className="flex items-center justify-center space-x-10 cursor-pointer ">
            <button
              onClick={() => handleMenuTabs("Earrings")}
              className="text-gray-600 font-normal text-md py-3 cursor-pointer focus:font-semibold"
            >
              Earrings
            </button>
            <button
              onClick={() => handleMenuTabs("Necklaces")}
              className="text-gray-600 font-normal text- py-3 cursor-pointer focus:font-semibold"
            >
              Necklaces
            </button>
            <button
              onClick={() => handleMenuTabs("Finger Ring")}
              className="text-gray-600 font-normal text-md py-3 cursor-pointer focus:font-semibold"
            >
              Rings
            </button>
            <button className="text-gray-600 font-normal text-md py-3 cursor-pointer focus:font-semibold">
              Bracelets
            </button>
          </div>
        </div>
        <div className="py-4 flex items-center justify-between mx-4 block lg:hidden md:hidden focus:font-semibold">
          <div>
            <select
              onChange={(e) => handleMenuTabs(e.target.value)}
              className="w-32 py-2 px-2"
            >
              <option value="ALL">ALL</option>
              <option value="Earrings">Earrings</option>
              <option value="Necklaces">Necklace</option>
              <option value="Finger Ring">Finger Rings</option>
              {/* <option value="audi"></option> */}
            </select>
          </div>

          <div className="bg-gray-700 w-18 py-2 px-2 text-gray-100 cursor-pointer">
            FILTER
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
          {productsList
            ?.filter(
              (item) => FilterTab === item.category || FilterTab === "All"
            )
            ?.map((data) =>
              loading ? (
                <Skeleton key={data._id} />
              ) : (
                <ProductCard key={data._id} {...data} />
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default Home;
// ?.filter((item) => FilterTab === item.category)
