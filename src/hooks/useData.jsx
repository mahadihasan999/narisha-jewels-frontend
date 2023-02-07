import React from "react";
function useData(key, initialValue) {
  const [allData, setAllData] = React.useState(() => {
    const apiUrl = "https://server-narisha.malihatabassum.com/products";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAllData(data.products));
  });

  return [allData, setAllData];
}

export default useData;
