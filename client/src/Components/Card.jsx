import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cryptoData from "../mockData/cryptoData";

export default function Card() {
  const [info, setinfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    setLoading(true);
    setTimeout(() => {
      try {
        setinfo(cryptoData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading mock data:", error);
        setError("Failed to load cryptocurrency data.");
        setLoading(false);
      }
    }, 500); // Simulate network delay
  }, []);

  if (loading) {
    return <div className="text-white">Loading cryptocurrency data...</div>;
  }

  if (error) {
    return (
      <div className="text-white">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  console.log(info);

  if (info.length === 0) {
    return <div>loading</div>;
  } else {
    return (
      <div className="bg-[#1d2230]   mx-auto  text-white p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2  ">
          <div className="font-bold text-[20px] text-center mx-auto sm:text-left xl:text-[29px] w-[80%] text-white p-4">
            Explore top Crypto's Like Bitcoin Ethereum and Dogecoin
            <p className=" text-[#c0c0c0]  pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto  sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
              buying and selling cryptocurrencies on a cryptocurrency exchange
              or trading platform in order to make a profit from the price
              fluctuations of cryptocurrencies.
            </p>
            <p className=" text-[#d2d1d1]  pt-5 hidden sm:inline-flex font-normal text-[15px] mx-auto  sm:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]">
              It's important to keep in mind that crypto trading requires
              discipline and a long-term strategy, as well as the ability to
              manage risk effectively. It's also recommended to start with a
              small investment and gradually increase your exposure as you gain
              experience and knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
            {info.map((value, key) => {
              if (key < 6) {
                return (
                  <div key={value.id || key}>
                    <Link
                      to={{
                        pathname: "/coin",
                        hash: `${value.name}`,
                      }}
                      state={{ value }}
                    >
                      <div className="rounded-md shadow-md p-5 shadow-[#00000066]  m-3 w-[180px] border-t-2 border-[#0000001c]">
                        <div className=" mx-auto w-[100px] h-[100px] ">
                          <img src={value.image} alt=""></img>
                        </div>
                        <div className="p-1 text-center font-medium">
                          <h3>Name- {value.name}</h3>
                          <p>Value- {value.current_price}</p>
                          <h3>Up- {value.high_24h}</h3>
                          <h3>Down- {value.low_24h}</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}
