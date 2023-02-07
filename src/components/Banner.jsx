import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section className="reletive">
      <div className="pt-10 ">
        <div className="flex justify-center items-center md:justify-start  ">
          <img
            className="hidden lg:block  w-full static"
            src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675784800/yy_iwajgx_11zon_mzdncz.jpg"
            alt="narisha jewels f"
          />
          <div class="bg-gradient-to-r from-indigo-500 ...  "></div>
          <img
            className="md:block lg:hidden hidden  w-full static"
            src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675451234/md_kbadxw.png"
            alt="narisha jewels"
          />
          ;
          <img
            className="md:hidden w-full static "
            src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675490544/Untitled_design_11zon_ryfpcp.jpg"
            alt="narisha jewels"
          />
          {loading ? (
            ""
          ) : (
            <div className="flex absolute justify-start flex-col md:flex-row items-center overflow-hidden pt-4 ">
              <div className="py-32 sm:py-20  md:hidden   " />
              <div className="mt-10  lg:w-auto custom sm:mt-96 md:mt-0 h-full flex px-4 md:px-0  z-10 justify-center items-center md:items-start flex-col md:pl-20 lg:px-20 2xl:px-44 2xl:mx-40">
                <p className="mt-4 md:w-80 lg:w-2/3 xl:w-3/4 text-center md:text-left  text-base leading-normal text-indigo-700 pb-2 hidden lg:block md:block">
                  {" "}
                  Flat 50% Discount
                </p>
                <p className="text-3xl sm:text-3xl xl:text-4xl text-center md:text-left font-semibold leading-6 xl:leading-10 text-gray-700 md:w-96 2xl:w-2/3 ">
                  Silver And Diamond Earrings
                </p>

                <p className="mt-4 md:w-80 lg:w-2/3 xl:w-3/4 text-center md:text-left  text-base leading-normal text-gray-700 ">
                  Designer Jewellery Necklaces-Bracelets-Earings
                </p>

                <Link to="/properties" onClick={() => window.scrollTo(0, 0)}>
                  <button className="mt-6 shrink-0 w-full md:w-auto  lg:mt-8 py-2 md:py-3 px-10 flex justify-center duration-700  items-center text-base transition hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-800 font-medium text-white bg-indigo-500">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
