import React from "react";

const AddData = (props) => {
  const putState = {
    username: "anna",
    password: "maria",
    cash: 10000,
    stocks: [
      {
        TSLA: 4,
      },
    ],
    transactions: [
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
    ],
  };

  const initialState1 = {
    username: "emma",
    password: "emma",
    cash: 10000,
    stocks: [
      {
        TSLA: 4,
        FB: 4,
      },
    ],
    transactions: [
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
    ],
  };
  const initialState2 = {
    username: "kike",
    password: "kike",
    cash: 10000,
    stocks: [
      {
        TSLA: 4,
        FB: 4,
      },
    ],
    transactions: [
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
    ],
  };
  const initialState3 = {
    username: "sarah",
    password: "sarah",
    cash: 10000,
    stocks: [
      {
        TSLA: 4,
        FB: 4,
      },
    ],
    transactions: [
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
    ],
  };
  const initialState4 = {
    username: "ruth",
    password: "ruth",
    cash: 10000,
    stocks: [
      {
        TSLA: 4,
        FB: 4,
      },
    ],
    transactions: [
      { FB: ["FB", 8, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
      { TSLA: ["TSLA", 2, 23.45, "2019-13-12"] },
    ],
  };

  const postData = async () => {
    const response = await fetch(
      "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(putState),
      }
    );
    if (response.ok) {
      console.log("Congratulations Kike, you did it!");
    } else {
      console.log("Something went wrong Kike, try again!");
    }
  };

  const putData = async () => {
    const response = await fetch(
      "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users/-MrKtTx61T-UANMlTOQR/1.json",
      {
        method: "PUT",
        body: JSON.stringify(putState),
      }
    );
    if (response.ok) {
      console.log("Congratulations Kike, you did it!");
    } else {
      console.log("Something went wrong Kike, try again!");
    }
  };

  return (
    <React.Fragment>
      <p>Go ahead!</p>
      <button onClick={postData}>Push data</button>
      <button onClick={putData}>Put data</button>
    </React.Fragment>
  );
};

export default AddData;
