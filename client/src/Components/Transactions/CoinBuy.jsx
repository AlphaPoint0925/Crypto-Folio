import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CoinBuy() {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("hello");
  // console.log(state.data);

  const [data, setdata] = useState();
  const [currprise, setcurrprise] = useState();

  useEffect(() => {
    setdata(state.data);
  }, [data]);

  const [id, setid] = useState();
  const getid = async () => {
    try {
      console.log("Fetching user ID...");
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(
        "http://localhost:3004/dashboard/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Token: token }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("User ID response:", json);
      setid(json.id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };
  // useEffect(async () => {
  //   getid();
  // }, []);

  useEffect(() => {
    setcurrprise(
      ((`${state.data.current_price}` / 100) * 70).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      })
    );

    console.log(currprise);
    console.log(data);
  }, []);

  //-----------------transactions--------------------//

  const login = localStorage.getItem("authToken");
  console.log(login);

  const [allTransaction, setallTransaction] = useState([]);
  useEffect(() => {
    if (login) {
      getallTransaction();
      getid();
    } else {
    }
  }, []);
  const getallTransaction = async () => {
    try {
      console.log("Fetching transactions...");
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:3004/wallet/getwalletTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ login: token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transactions response:", data);
      setallTransaction(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  console.log(allTransaction);

  const [currBalance, setcurrBalance] = useState();

  const getamount = async () => {
    try {
      console.log("Fetching wallet amount...");
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:3004/wallet/getwalletAmount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ login: token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Wallet amount response:", data);
      setcurrBalance(data);
    } catch (error) {
      console.error("Error fetching wallet amount:", error);
    }
  };
  console.log(currBalance);

  const getusertransaction_byQuantity = async () => {
    if (Number(Quantity) <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    
    try {
      console.log("Processing buy transaction by quantity...");
      await getamount();

      let object = {
        img: state.data.image,
        CoinId: state.data.id,
        CoinName: state.data.name,
        Quantity: Quantity,
        Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
        Date: new Date(),
        Prise: (`${state.data.current_price}` / 100) * 70,
        type: "Buy",
      };

      allTransaction.push(object);
      console.log("Transaction object:", object);
      console.log("Current balance:", currBalance);

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to make a transaction");
        return;
      }

      const response = await axios.post(
        "http://localhost:3004/wallet/buyTransaction",
        {
          Quantity: Quantity,
          Amount: (`${state.data.current_price}` / 100) * 70 * Quantity,
          login: token,
          CoinName: data.name,
          Transaction: allTransaction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log("Transaction response:", response.data);
      if (response.data === "NO") {
        alert("Not enough balance");
      } else if (response.data === "YES") {
        fun();
      }
    } catch (error) {
      console.error("Error processing transaction:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert("An error occurred while processing your transaction");
    }
  };
  const fun = () => {
    window.history.go(-1);
  };

  const getusertransaction_byAmount = async () => {
    if (Number(Amount_for_amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      console.log("Processing buy transaction by amount...");
      await getamount();

      console.log("Amount calculation:", (`${state.data.current_price}` / 100) * 70 * Quantity);
      console.log("Current balance:", currBalance);

      let object = {
        img: state.data.image,
        CoinId: state.data.id,
        CoinName: state.data.name,
        Quantity: Amount_for_amount / ((`${state.data.current_price}` / 100) * 70),
        Amount: Amount_for_amount,
        Date: new Date(),
        Prise: (`${state.data.current_price}` / 100) * 70,
        type: "Buy",
      };

      allTransaction.push(object);

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to make a transaction");
        return;
      }

      const response = await axios.post(
        "http://localhost:3004/wallet/buyTransaction",
        {
          Quantity: Amount_for_amount / ((`${state.data.current_price}` / 100) * 70),
          Amount: Amount_for_amount,
          login: token,
          CoinName: data.name,
          Transaction: allTransaction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log("Transaction response:", response.data);
      if (response.data === "NO") {
        alert("Not enough balance");
      } else if (response.data === "YES") {
        fun();
      }
    } catch (error) {
      console.error("Error processing transaction:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert("An error occurred while processing your transaction");
    }
  };

  //-----------------transactions--------------------//

  //----------------input value by quantity--------------//

  const [Quantity, setQuantity] = useState("");
  const [Amount, setAmount] = useState("");

  useEffect(() => {
    if (Quantity.length === 0) {
      setAmount("");
    }
  }, [Quantity, Amount]);

  const onchangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    setAmount(
      ((`${state.data.current_price}` / 100) * 70 * Quantity).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }
      )
    );
  }, [Quantity]);

  //----------------input value by quantity --------------//

  //----------------input value by amount--------------//

  const [Quantity_for_amount, setQuantity_for_amount] = useState("");
  const [Amount_for_amount, setAmount_for_amount] = useState("");

  useEffect(() => {
    if (Amount_for_amount.length === 0) {
      setAmount_for_amount("");
    }
  }, [Quantity, Amount]);

  const onchangeAmount = (e) => {
    setAmount_for_amount(e.target.value);
  };

  useEffect(() => {
    setQuantity_for_amount(
      Amount_for_amount / ((`${state.data.current_price}` / 100) * 70)
    );
  }, [Amount_for_amount]);

  //----------------input value amount --------------//

  return (
    <div className="m-5 ">
      {/* <div className="w-[300px] z-10 grad_bg blur-[220px]  right-[90px] h-[300px] absolute border-2 rounded-full"></div> */}

      <div className=" z-30 w-[80%] mx-auto p-5 bg-[#1d2230] rounded-md">
        <div className="font-bold text-white text-center text-[20px] md:text-[22px] mb-12">
          Confirm Payment
        </div>
        <div className=" m-5 grid grid-cols-1 md:grid-cols-2  ">
          <div className="p-3 mx-auto bg-[#171b26] rounded-lg text-white pt-6 md:mr-4 mb-4 md:w-[80%]">
            <div className="font-semibold text-white text-center text-[18px] md:text-[20px] mb-4">
              {data?.name}
            </div>
            <div className=" w-[100px] h-[100px] mx-auto ">
              <img src={data?.image} alt=""></img>
            </div>
            <div className="font-semibold text-white text-center text-[16px] md:text-[18px] m-4">
              Current Prise: {currprise}
            </div>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 md:space-x-3 ">
            <div className="p-3 mb-4 mx-auto bg-[#171b26] rounded-lg text-white pt-6">
              <div className="text-center font-medium mb-5 text-[17px]">
                Buy by Qantity
              </div>
              <div className="grid grid-cols-1  m-3">
                <label for="" className="font-medium ">
                  Quantity
                </label>
                <input
                  type="text"
                  id=""
                  name=""
                  value={Quantity}
                  onChange={onchangeQuantity}
                  className="text-black p-[1px] m-2 text-center"
                  placeholder="enter quantity "
                />
              </div>
              <div className="grid grid-cols-1  m-3">
                <div className="font-medium ">Amount: </div>
                <div className="">{Amount}</div>
              </div>
              <button
                onClick={getusertransaction_byQuantity}
                className="bg-[#209fe4]  w-[100%]
               p-1 mt-6  rounded-md font-semibold text-[12px] md:text-[15px] mb-4"
              >
                Buy
              </button>
            </div>

            <div className="p-3 mb-4 mx-auto bg-[#171b26] rounded-lg text-white pt-6">
              <div className="text-center font-medium text-[17px]">
                Buy by Amount
              </div>
              <div className="grid grid-cols-1  m-3">
                <label for="" className="font-medium ">
                  Amount
                </label>
                <input
                  type="Number"
                  id=""
                  name=""
                  value={Amount_for_amount}
                  onChange={onchangeAmount}
                  className="text-black p-[1px] m-2 text-center"
                  placeholder="enter amount "
                />
              </div>
              <div className="grid grid-cols-1 m-3 md:mt-5">
                <div className="font-medium ">Quantity: </div>
                <div className="text-[13px] md:text-[17px]">
                  {Quantity_for_amount}
                </div>
              </div>
              <button
                onClick={getusertransaction_byAmount}
                className="bg-[#209fe4]  w-[100%]
               p-1 mt-1  rounded-md font-semibold text-[12px] md:text-[15px]"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
