import axios from "axios";
import { ProductsStateContext } from "contexts/products";
import useData from "hooks/useData";
import useProducts from "hooks/UseProducts";
import Skeleton from "layouts/Skeleton";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropertiesProductCard from "./singleItem";

const Properties = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [allData, setAllData] = React.useState(() => {
    const apiUrl = "https://server-narisha.malihatabassum.com/products";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAllData(data.products));
  });
  return (
    <div className="my-8 max-w-screen-xl mx-auto px-4 pt-6 lg:pt-6 my-28">
      <div className="text-center ">
        <h1 className="text-2xl text-gray-700 font-semibold">All Properties</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {allData?.map((data) =>
          loading ? (
            <Skeleton key={data._id} />
          ) : (
            <PropertiesProductCard key={data._id} {...data} />
          )
        )}
      </div>
    </div>
  );
};

export default Properties;
