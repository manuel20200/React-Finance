import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import useFetch from "../../hooks/useFetch";

import classes from "./Buy.module.css";

const Buy = () => {
  const shareSymbol = useRef();
  const shareQuantity = useRef();
  const [pageState, setPageState] = useState(null);
  const { userName, isLogging } = useContext(AuthContext);
  const {
    isFbLoading,
    isStLoading,
    errorFb,
    errorSt,
    sendRequest,
    fetchStockData,
  } = useFetch();

  const fetchStockDataHandler = async () => {
    const newTransacted = { trans: ["", "", 0, 0, "1970-01-01"] };
    const { symbol, name, price } = await fetchStockData({
      symbol: shareSymbol.current.value,
    });

    newTransacted["trans"][0] = symbol;
    newTransacted["trans"][1] = name;
    newTransacted["trans"][2] = parseInt(shareQuantity.current.value);
    newTransacted["trans"][3] = price;
    newTransacted["trans"][4] = new Date(Date.now()).toISOString();
    console.log(newTransacted);
    buyAction(newTransacted);
  };

  //par = { trans: ["", 0, 0, "1970-01-01"] };
  const buyAction = async (param) => {
    let keyArray = null;
    const par = param;
    const priceToPay = par["trans"][2] * par["trans"][3];

    const transformationFn = (data) => {
      let shareNotFound = false;
      console.log("priceToPay");
      console.log(priceToPay);
      for (let keys in data) {
        if (data[keys].username === userName) {
          if (data[keys].cash < priceToPay) {
            return setPageState("NoCash");
          }
          keyArray = keys;
          // Update actual transaction for the actual user
          data[keys].transactions.push(par);
          // Update actual stocks for the actual user
          for (let share in data[keys].stocks[0]) {
            if (
              share.toUpperCase() === shareSymbol.current.value.toUpperCase()
            ) {
              data[keys].stocks[0][share] += parseInt(
                shareQuantity.current.value
              );
              shareNotFound = true;
            }
          }
          data[keys].cash -= priceToPay;
          console.log(data);
        }
      }
      if (!shareNotFound) {
        let shareUpper = shareSymbol.current.value.toUpperCase();
        data[keyArray].stocks[0][shareUpper] = parseInt(
          shareQuantity.current.value
        );
        shareNotFound = false;
      }
      console.log("before putbuyaction");
      console.log(data[keyArray]);
      console.log(keyArray);
      putBuyAction(data[keyArray], keyArray);
    };
    // Send GET request to actual users
    sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      },
      transformationFn
    );
  };

  const putBuyAction = async (putData, key) => {
    sendRequest({
      url: `https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users/${key}.json`,
      method: "PUT",
      body: putData,
    });
  };

  if (pageState === "NoCash") {
    return <h1>Not enough cash!</h1>;
  }

  return (
    <React.Fragment>
      <h1>Buy page</h1>
      <div style={{ height: "20px" }}></div>
      <input
        className={classes.inputSymbol}
        placeholder="Symbol"
        type="text"
        id="shareSymbol"
        ref={shareSymbol}
      ></input>
      <input
        className={classes.inputShares}
        placeholder="Shares"
        type="number"
        id="shareQuantity"
        ref={shareQuantity}
        min="1"
        max="15"
      ></input>
      <button className={classes.button} onClick={fetchStockDataHandler}>
        Buy
      </button>
    </React.Fragment>
  );
};

export default Buy;
