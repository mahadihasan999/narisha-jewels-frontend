import { useEffect, useState } from "react";
const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://nameless-refuge-09989.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [products]);
  return [products, setProducts];
};

export default useProducts;
