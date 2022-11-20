import { useEffect, useState } from "react";

const useOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://nameless-refuge-09989.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [orders]);
  return [orders, setOrders];
};

export default useOrder;
