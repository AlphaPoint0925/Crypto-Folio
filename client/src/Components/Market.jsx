import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import cryptoData from "../mockData/cryptoData";
import { TypeAnimation } from 'react-type-animation';

export default function Market() {
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

  const getFilteredItem = (query, item) => {
    if (!query) {
      return item;
    }
    return item.filter((val) => {
      return val.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  const [Query, setQuery] = useState("");
  const filtered = getFilteredItem(Query, info);

  if (loading) {
    return <div className="text-white pt-[100px]">Loading cryptocurrency data...</div>;
  }

  if (error) {
    return (
      <div className="text-white pt-[100px]">
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <TypeAnimation
              sequence={[
                'Welcome to the Crypto Market',
                1000,
                'Explore the latest cryptocurrencies',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-gray-600">Discover and track cryptocurrency prices in real-time</p>
        </div>
        <div className="pt-[100px] bg-[#171b26] ">
          <div className="w-[100px] grad_bg blur-[220px]  right-[10px] h-[100px] absolute border-2 rounded-full"></div>

          <div className="  p-7 w-[70%] sticky top-[70px] bg-[#1b202d] mx-auto text-center ">
            <div className="">
              <input
                id="searchInput"
                type="text"
                placeholder="Search crypto here"
                className="w-[90%] rounded-md p-2 font-semibold"
                // value={Query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-[70%] mx-auto min-h-screen bg-[#1b202d] p-6 items-center">
            <div className="">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto ">
                {filtered.map((value, key) => {
                  return (
                    <div key={value.id || key}>
                      <Link
                        to={{
                          pathname: "/coin",
                          hash: `${value.name}`,
                        }}
                        state={{ value }}
                      >
                        {/* <Link
                        to={{
                          pathname: "/coin",
                          hash: `${value.name}`,
                        }}
                        state={{ name: `${value.name}`, Symbol: `${value.symbol}` }}
                      > */}
                        <div className="bg-[#1b202d] rounded-md shadow-md p-5 shadow-[#000000be]  m-3 w-[180px] border-t-2 border-[#00000050]">
                          <div className=" mx-auto w-[100px] h-[100px] ">
                            <img src={value.image} alt=""></img>
                          </div>
                          <div className="p-1 text-center text-white font-medium">
                            <h3>Name- {value.name}</h3>
                            <p>Value- {value.current_price}</p>
                            <h3>Up- {value.high_24h}</h3>
                            <h3>Down- {value.low_24h}</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
