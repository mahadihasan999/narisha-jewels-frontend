import { useEffect, useState } from "react";
const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://server-narisha.malihatabassum.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [products]);
  return [products, setProducts];
};

export default useProducts;
