import { useState, useCallback } from "react";

const useFetch = () => {
  const [isFbLoading, setIsFbLoading] = useState(false);
  const [isStLoading, setIsStFbLoading] = useState(false);
  const [errorFb, setErrorFb] = useState(null);
  const [errorSt, setErrorSt] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      console.log("firebase fetch starting...!");
      setIsFbLoading(true);
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      console.log("response");
      console.log(response);
      if (response !== null) {
        console.log("firebase fetched!");
        const data = await response.json();
        console.log("response: ");
        console.log(data);
        const stocksArray = applyData(data);
        return stocksArray;
      }
    } catch (e) {
      setErrorFb(e);
      console.log("e: " + e);
      return { error: e };
    }
    setIsFbLoading(false);
  }, []);

  const fetchStockData = useCallback(async (requestConfig) => {
    try {
      console.log("cloud stock fetch starting...!");
      setIsStFbLoading(true);
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${requestConfig.symbol}/quote?token=pk_6faf679bd9844618805d3c29b3365b80`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("cloud stock fetched!");
        return {
          symbol: data.symbol,
          name: data.companyName,
          price: data.latestPrice,
        };
      }
    } catch (e) {
      setErrorSt(e);
    }
    setIsStFbLoading(false);
  }, []);

  return {
    isFbLoading,
    isStLoading,
    errorFb,
    errorSt,
    sendRequest,
    fetchStockData,
  };
};

export default useFetch;
