import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

import classes from "./Index.module.css";

const cfgFbObj = {
  url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
};

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.symbol}</td>
      <td>{props.name}</td>
      <td>{props.shares}</td>
      <td>${props.price}</td>
      <td>${props.total}</td>
    </tr>
  );
};

const Index = () => {
  const [stockState, setStockState] = useState([]);
  const [totalUserValue, setTotalUserValue] = useState({
    cash: 0,
    sharesValue: 0,
    total: 0,
  });
  const { userName, isLogging } = useContext(AuthContext);
  const { isLoading, error, sendRequest, fetchStockData } = useFetch();
  let totalSharesValues = 0;

  const fetchDataDbFbTransformation = (data) => {
    const stocksArray = [];
    for (let key in data) {
      if (data[key]["username"] === userName) {
        setTotalUserValue((prev) => {
          return { ...prev, cash: data[key]["cash"] };
        });
        for (let stocks in data[key]["stocks"][0]) {
          const value = data[key]["stocks"][0][stocks];
          stocksArray.push({
            symbol: stocks,
            name: null,
            shares: value,
            price: 0,
            total: 0,
          });
        }
        console.log(stocksArray);
        return stocksArray;
      }
    }
  };
  /* useEffect(() => {
    sendRequest(cfgFbObj, fetchDataTransformation);
    console.log("useEffect running!");
  }, []); */
  const fetchDataHandler = async () => {
    // Fetch user data from Firebase
    const stocksArray = await sendRequest(
      cfgFbObj,
      fetchDataDbFbTransformation
    );
    console.log(stocksArray);
    let i = 0;
    for (let x of stocksArray) {
      const { symbol, name, price } = await fetchStockData(x);
      console.log(symbol, name, price);
      console.log(stocksArray[i]);
      stocksArray[i]["symbol"] = symbol;
      stocksArray[i]["name"] = name;
      stocksArray[i]["price"] = price;
      stocksArray[i]["total"] =
        stocksArray[i]["shares"] * stocksArray[i]["price"];
      totalSharesValues += stocksArray[i]["total"];
      console.log(totalSharesValues);
      i++;
    }
    setStockState(stocksArray);
    setTotalUserValue((prev) => {
      return {
        ...prev,
        sharesValue: totalSharesValues,
        total: prev.cash + totalSharesValues,
      };
    });
    console.log("x.symbol: ");
    console.log(totalUserValue.cash);
    console.log(totalUserValue.sharesValue);
    console.log(totalUserValue.total);
  };
  return (
    <React.Fragment>
      {!isLogging && <h1>Please Login First!</h1>}
      {isLogging && (
        <>
          <h1>Welcome {userName}</h1>
          <button className={classes.button} onClick={fetchDataHandler}>
            View
          </button>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {stockState === null && (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              )}
              {stockState !== null &&
                stockState.map((x, index) => (
                  <TableRow
                    key={index}
                    symbol={x.symbol}
                    name={x.name}
                    shares={x.shares}
                    price={x.price}
                    total={x.total}
                  />
                ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>CASH</td>
                <td>${totalUserValue.cash}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${totalUserValue.total}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </React.Fragment>
  );
};

export default Index;
