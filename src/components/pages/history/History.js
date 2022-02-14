import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

import classes from "./History.module.css";

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.symbol}</td>
      <td>{props.name}</td>
      <td>{props.shares}</td>
      <td>${props.price}</td>
      <td>{props.date}</td>
    </tr>
  );
};

const History = () => {
  const [state, setState] = useState(null);
  const { sendRequest, isFbLoading, errorFb } = useFetch();
  const { userName, isLogging } = useContext(AuthContext);

  const fetchDataHandler = async () => {
    const fetchTransformation = (data) => {
      let auxArray = null;
      let newTransacted = null;
      for (let keysArray in data) {
        console.log(keysArray);
        if (data[keysArray]["username"] === userName) {
          auxArray = data[keysArray]["transactions"];
          break;
        }
      }
      newTransacted = auxArray
        .filter((item) => {
          return Object.keys(item)[0] !== "avoid";
        })
        .map((x, index) => {
          let value = null;
          try {
            value = Object.values(x);
          } catch (e) {
            console.log("error");
            console.log(e);
          }
          return {
            key: index,
            symbol: value[0][0],
            name: value[0][1],
            shares: value[0][2],
            price: value[0][3],
            date: value[0][4],
          };
        });
      setState(newTransacted);
    };
    sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      },
      fetchTransformation
    );
  };

  return (
    <React.Fragment>
      <h1>History page</h1>
      <button className={classes.button} onClick={fetchDataHandler}>
        Quote
      </button>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Transacted</th>
          </tr>
        </thead>
        <tbody>
          {state !== null &&
            state.map((x, index) => (
              <TableRow
                key={index}
                symbol={x.symbol}
                name={x.name}
                shares={x.shares}
                price={x.price}
                date={x.date}
              />
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default History;
