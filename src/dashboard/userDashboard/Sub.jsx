import React from "react";

const Sub = (item) => {
  let totalQuantity = 0;
  let total = 0;

  console.log(item);
  item?.items?.map(function (product) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  });

  const shipping = total > 0 ? 60 : 0;
  const grandTotal = total + shipping;
  console.log(grandTotal);
  return (
    <div>
      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
        <div className="flex justify-between  w-full">
          <p className="text-base leading-4 text-gray-800">Quantity</p>
          <p className="text-base leading-4 text-gray-600">{totalQuantity}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base leading-4 text-gray-800">Subtotal</p>
          <p className="text-base leading-4 text-gray-600">{grandTotal}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base leading-4 text-gray-800">Shipping Charge</p>
          <p className="text-base leading-4 text-gray-600">{shipping}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full pt-2">
        <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
        <p className="text-base font-semibold leading-4 text-gray-600">
          {grandTotal}
        </p>
      </div>
    </div>
  );
};

export default Sub;
