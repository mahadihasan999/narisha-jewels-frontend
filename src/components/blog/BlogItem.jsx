import React, { useState } from "react";

import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const summary = props.summary;
  const title = props.title;
  const image = props.image;
  const date = props.date;
  const key = props._id;

  return (
    <div>
      <Link to={`/blogs/${key}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="bg-gray-100/50 border-2 p-3 rounded pointer shadow cursor-pointer">
          <div className="flex md:flex-col lg:flex-row gap-2 flex-col">
            <div className="md:flex-shrink-0">
              <img
                className="rounded-lg md:w-full md:h-44 lg:w-72 "
                src={image}
                alt=""
              />
            </div>
            <div className="mt-4 md:mt-0 ">
              <div className="tracking-wide text-sm text-green-600 font-bold flex justify-between items-center">
                <h1>By Admin</h1>
                <h1 className=""> {date?.slice(2, 10)}</h1>
              </div>
              <p
                href="#"
                className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
              >
                {title}
              </p>

              <p className="mt-2 text-gray-600  ">
                {summary?.slice(0, 65)}....
                <button className="text-blue-600 font-semibold pointer">
                  Read More
                </button>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
