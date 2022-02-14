import React, { useRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

import classes from "./Sell.module.css";

const InputStockOptions = (props) => {
  return <option value={props.value}>{props.value}</option>;
};

const Sell = () => {
  const shareSymbolRef = useRef();
  const shareQuantityRef = useRef();
  const [shares, setShares] = useState(null);
  const {
    isFbLoading,
    isStLoading,
    errorFb,
    errorSt,
    sendRequest,
    fetchStockData,
  } = useFetch();
  const { userName, isLogging } = useContext(AuthContext);
  useEffect(() => {
    const getStocks = (data) => {
      let sharesArray = [];
      for (let keys in data) {
        if (data[keys]["username"] === userName) {
          for (let x in data[keys]["stocks"][0]) {
            sharesArray.push(x);
          }
        }
      }
      setShares(sharesArray);
    };
    sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      },
      getStocks
    );
  }, [sendRequest, userName]);
  const sellStockDataHandler = async () => {
    const newTransacted = { trans: ["", "", 0, 0, "1970-01-01"] };
    const { price, symbol, name } = await fetchStockData({
      symbol: shareSymbolRef.current.value,
    });
    const sharesNumber = parseInt(shareQuantityRef.current.value);

    const sellStocksProcess = (data) => {
      let sharesArray = [];
      for (let keys in data) {
        if (data[keys]["username"] === userName) {
          newTransacted["trans"][0] = symbol;
          newTransacted["trans"][1] = name;
          newTransacted["trans"][2] = parseInt(sharesNumber) * -1;
          newTransacted["trans"][3] = price;
          newTransacted["trans"][4] = new Date(Date.now()).toISOString();
          data[keys]["transactions"].push(newTransacted);
          data[keys]["cash"] +=
            newTransacted["trans"][2] * newTransacted["trans"][3];
          console.log(data[keys]);
          console.log(newTransacted);
          for (let stock in data[keys]["stocks"][0]) {
            console.log(stock, symbol, typeof symbol);
            console.log(data[keys]["stocks"][0][stock]);
            if (stock === symbol) {
              console.log("ok");
              if (data[keys]["stocks"][0][stock] >= sharesNumber) {
                data[keys]["stocks"][0][stock] -= sharesNumber;
                console.log("data");
                console.log(data[keys]);
                break;
              }
            }
          }
          sendRequest({
            url: `https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users/${keys}.json`,
            method: "PUT",
            body: data[keys],
          });
          break;
        }
      }
      setShares(sharesArray);
    };
    sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      },
      sellStocksProcess
    );
  };

  return (
    <React.Fragment>
      <h1>Sell page</h1>
      <div style={{ height: "20px" }}></div>
      <select
        className={classes.inputSymbol}
        placeholder="Symbol"
        type="text"
        id="shareSymbol"
        ref={shareSymbolRef}
      >
        {shares === null && (
          <>
            <option value="TSLA">TSLA</option>
            <option value="ABNB">ABNB</option>
            <option value="AAL">AAL</option>
          </>
        )}
        {shares !== null &&
          shares.map((value, index) => {
            return <InputStockOptions value={value} key={index} />;
          })}
      </select>
      <input
        className={classes.inputShares}
        placeholder="Shares"
        type="number"
        id="shareQuantity"
        ref={shareQuantityRef}
        min="1"
        max="15"
      ></input>
      <button className={classes.button} onClick={sellStockDataHandler}>
        Sell
      </button>
    </React.Fragment>
  );
};

export default Sell;
