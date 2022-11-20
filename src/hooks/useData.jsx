import React from "react";
function useData(key, initialValue) {
  const [allData, setAllData] = React.useState(() => {
    const apiUrl = "https://nameless-refuge-09989.herokuapp.com/products";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAllData(data));
  });

  return [allData, setAllData];
}

export default useData;
