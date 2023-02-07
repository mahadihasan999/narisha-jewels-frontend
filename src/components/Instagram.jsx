import React from "react";

export default function Instagram() {
  return (
    <div className="bg-gray-200 my-5">
      <div className=" mx-auto container flex justify-center items-center   md:py-12  xl:px-20 sm:px-6 px-4 ">
        <div className=" xl:w-auto md:flex hidden flex-col space-y-6 xl:space-y-0 xl:flex-row justify-center items-center">
          <div className="flex  justify-between w-full   items-center space-x-6 xl:space-x-8 ">
            <div className="flex justify-center items-center">
              <img
                className="h-[570px]"
                src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454189/Screenshot_3_tykash.png"
                alt="shoes and clothes"
              />
            </div>
            <div className="flex flex-col justify-between  xl:mt-0  items-center space-y-6  xl:space-y-8">
              <div className="flex flex-col xl:flex-row justify-between h-full xl:justify-center items-center space-y-8 xl:space-y-0 xl:space-x-8">
                <div className="md:w-72 mx-1 md:h-64 lg:mt-4 xl:mt-0  flex flex-col justify-center items-center text-center">
                  <p className=" text-3xl xl:text-4xl font-semibold  leading-7 xl:leading-9 text-center text-gray-800">
                    Our Instagram
                  </p>
                  <p className=" text-base leading-6 mt-3 text-center text-gray-600">
                    Follow us on instagram and tag us to get featured on our
                    timeline
                  </p>
                  <a
                    href="javascript:void(0)"
                    className="focus:outline-none mt-4 focus:underline text-base leading-4 hover:underline text-center text-gray-800"
                  >
                    @narisha_jewels
                  </a>
                </div>
                <div className=" ">
                  <img
                    className="hidden xl:block"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454185/Screenshot_4_ysmbes.png"
                    alt="jewellery"
                  />
                  <img
                    className="xl:hidden"
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454191/Screenshot_2_zrhdcw.png"
                    alt="shoes and clothes"
                  />
                </div>
              </div>
              <div className="hidden xl:flex flex-row justify-center  items-center space-x-6 xl:space-x-8">
                <div className>
                  <img
                    className
                    src="https://i.ibb.co/FD9ZHbF/camilla-carvalho-Y9dc-Qp-OIMHQ-unsplash-1.png"
                    alt="jewellery"
                  />
                </div>
                <div className>
                  <img
                    className
                    src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454187/Screenshot_5_sqzo9u.png"
                    alt="watch"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" xl:hidden flex flex-row justify-between   space-x-6 xl:space-x-8">
            <div className>
              <img
                className
                src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454185/Screenshot_4_ysmbes.png"
                alt="jewellery"
              />
            </div>
            <div className>
              <img
                className
                src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454187/Screenshot_5_sqzo9u.png"
                alt="watch"
              />
            </div>
          </div>
        </div>
        {/* mobile responsive */}
        <div className="md:hidden flex justify-center items-center flex-col">
          <div className="w-80  flex flex-col justify-center items-center text-center">
            <p className=" text-3xl lg:text-4xl font-semibold  leading-7 lg:leading-9 text-center text-gray-800">
              Our Instagram
            </p>
            <p className=" text-base leading-6 mt-3 text-center text-gray-600">
              Follow us on instagram and tag us to get featured on our timeline
            </p>
            <a
              href="javascript:void(0)"
              className="focus:outline-none mt-4 focus:underline text-base leading-4 hover:underline text-center text-gray-800"
            >
              @narisha_jewels
            </a>
          </div>
          <div className="mt-8 flex flex-col justify-center space-y-4">
            <img
              src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454559/4_smm7e3.png"
              alt="shoes and clothes"
            />
            <img
              src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454555/1_hw2jrt.png"
              alt="shoes and clothes"
            />
            <img
              src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454554/3_ky4g09.png"
              alt="jewellery"
            />
            <img
              src="https://res.cloudinary.com/dhucdoev3/image/upload/v1675454546/2_urflan.png"
              alt="watch"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
