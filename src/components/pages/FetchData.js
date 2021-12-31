import React, { useState, useRef } from "react";

const FetchData = (props) => {
  const [firebase, setFirebase] = useState([]);

  const fetchDataHandler = async () => {
    const response = await fetch(
      "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      console.log("Congratulations Kike, you did it, you fetch the data!");
    } else {
      console.log("Something went wrong Kike with fetch, try again!");
    }

    try {
      const data = await response.json();
      const userValues = Object.values(data);
      const keyValues = Object.keys(data);

      console.log("data: " + data);
      console.log("values: " + data);
      console.log("keys: " + data);

      for (let firstArray of userValues) {
        console.log(firstArray);
        for (let secondArray of firstArray) {
          console.log(secondArray);
          console.log(secondArray.username);
          if (secondArray.username === "emma") {
            const render = secondArray.transactions.map((x) =>
              console.log(Object.values(x)[0][2])
            );
            break;
          }
        }
      }
    } catch (error) {
      console.log("catch executed!!");
      console.log(error);
    }
  };

  // RENDERING
  return (
    <React.Fragment>
      <h2>Fetch</h2>
      <button onClick={fetchDataHandler}>Fetch data</button>
    </React.Fragment>
  );
};

export default FetchData;
