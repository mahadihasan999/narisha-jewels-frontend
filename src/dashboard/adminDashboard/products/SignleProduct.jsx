import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({
  _id,
  index,
  title,
  image,
  price,
  category,
  description,
  dateInserted,
  dateModifeid,
  date,
  key,
  lastUpdated,
  handleDeleteProduct,
}) => {
  return (
    <tr className="h-24 border-indigo-400  border">
      <td className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-left  border-indigo-400 border-l px-2">
        {category}
      </td>
      <td className="">
        <img src={image} alt={image} className="h-20 w-full" />
      </td>
      <td className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 border-indigo-400 border-l px-2">
        {index + 1}
      </td>

      <td className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-left  border-indigo-400 border-l px-2">
        {title}
      </td>
      <td className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-left  border-indigo-400 border-l px-2">
        {price} Tk.
      </td>
      <td className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-left  border-indigo-400 border-l px-2">
        {description}
      </td>
      <td
        key={index}
        className="text-sm px-2 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-left border-indigo-400 border-l px-2"
      >
        {lastUpdated?.length ? (
          <div className="flex  flex-col border border-cyan-400 ">
            <p>{lastUpdated?.slice(0, 10)}</p>
            <p className="text-gray-300 text-sm">
              {lastUpdated?.slice(10, 16)}
            </p>
          </div>
        ) : (
          <h1>Not modified</h1>
        )}
      </td>

      <td className="border-indigo-400 border-l ">
        <div className="flex flex-col items-center gap-1 mx-2">
          <Link to={`/dashboard/product-update/${_id}`}>
            <h1 className="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon cursor-pointer icon-tabler icon-tabler-edit"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1={16} y1={5} x2={19} y2={8} />
              </svg>
            </h1>
          </Link>

          <h1
            onClick={() => handleDeleteProduct(_id)}
            className="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
            href="javascript: void(0)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon cursor-pointer icon-tabler icon-tabler-trash"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={7} x2={20} y2={7} />
              <line x1={10} y1={11} x2={10} y2={17} />
              <line x1={14} y1={11} x2={14} y2={17} />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </h1>
        </div>
      </td>
    </tr>
  );
};

export default SingleProduct;
