import React, { useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";

import classes from "./Quote.module.css";

const Quote = () => {
  const [stockData, setStockData] = useState(null);
  const [notFound, setNotFound] = useState(0);
  const { isStLoading, errorSt, fetchStockData } = useFetch();
  const shareName = useRef();

  const quoteHandler = async () => {
    const response = await fetchStockData({
      symbol: shareName.current.value,
    });
    setStockData(response);
    console.log(stockData);
  };

  return (
    <React.Fragment>
      <div style={{ height: "90px" }}></div>
      <input
        className={classes.inputQuote}
        placeholder="share symbol"
        type="text"
        id="sharename"
        ref={shareName}
      ></input>
      <button className={classes.button} onClick={quoteHandler}>
        Quote
      </button>
      {stockData != null && notFound === 0 && (
        <h3>
          The price of action {stockData.name} with simbol {stockData.symbol} is
          US${stockData.price}.
        </h3>
      )}
      {notFound === 1 && <h3>Share was not found!</h3>}
    </React.Fragment>
  );
};

export default Quote;
