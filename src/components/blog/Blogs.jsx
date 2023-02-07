import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import Skeleton from "./Skeleton";

const Blogs = () => {
  const [page, setPage] = useState(0);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  console.log(displayBlogs);
  const size = 6;
  useEffect(() => {
    fetch(
      `https://server-narisha.malihatabassum.com/blogs?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDisplayBlogs(data.blogs);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);
  const [loading, setLoading] = useState(false);
  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <section id="pagination" className="max-w-screen-xl mx-auto ">
      <div className="flex items-center flex-col">
        <h1 className="text-3xl sm:text-3xl xl:text-4xl font-semibold leading-6 ">
          From Our Blog
        </h1>
        <h1 className="text-gray-600 font-normal text-md pb-3 pt-2">
          There are latest blog posts
        </h1>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-x-8 md:gap-6 gap-4 py-2">
          {displayBlogs?.map((item) =>
            loading ? <Skeleton /> : <BlogItem key={item._id} {...item} />
          )}
        </div>
      </div>
      <a href="#pagination">
        <div className="pagination flex justify-center items-center gap-2">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={
                number === page
                  ? "selected bg-lime-500 px-2"
                  : "bg-lime-100 text-gray-700 px-2"
              }
              key={number}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </a>
    </section>
  );
};

export default Blogs;
