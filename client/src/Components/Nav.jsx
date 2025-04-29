import { Link, useNavigate } from "react-router-dom";

export default function Nav({ open }) {
  const navigate = useNavigate();
  let json;

  const handleDashboard = async () => {
    console.log("Dashboard button clicked");
    console.log("Auth token:", localStorage.authToken ? "Present" : "Missing");
    
    if (!localStorage.authToken) {
      console.error("No authentication token found");
      alert("Please log in to access the dashboard");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3004/dashboard/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.authToken}`,
        },
        body: JSON.stringify({ Token: localStorage.authToken }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      json = await response.json();
      console.log("Dashboard response:", json);
      
      if (!json.success) {
        throw new Error(json.message || "Failed to get user data");
      }
      
      navigate("/dashboard", { state: { id: json.id } });
    } catch (error) {
      console.error("Dashboard error:", error);
      alert("Error accessing dashboard: " + error.message);
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    console.log("loggedout");
  };

  return (
    <div className="fixed w-screen z-30">
      <div>
        <ul className="flex justify-between bg-[#131722] h-[70px] text-white w-[100%] p-5">
          <div>
            <li className="text-[15px] sm:text-[18px] md:text-2xl font-bold  text-white  ">
              <Link to="/">CryptoFolio</Link>
            </li>
          </div>
          <div className="text-[20px] font-bold  text-white ">
            {!localStorage.getItem("authToken") ? (
              <div className=" flex">
                <li className="mx-2 text-[15px] sm:text-[18px] md:text-xl">
                  <button
                    onClick={() => {
                      open[0](true);
                    }}
                  >
                    SignIn
                  </button>
                </li>
                <li className="mx-2 text-[15px] sm:text-[18px] md:text-xl">
                  <button
                    onClick={() => {
                      open[1](true);
                    }}
                  >
                    SignUp
                  </button>
                </li>
              </div>
            ) : (
              <div className=" flex text-[15px] sm:text-[18px] md:text-xl">
                <li className="mx-2">
                  <button onClick={handleDashboard}>Dashboard</button>
                </li>
                <li className="mx-2">
                  <button onClick={handlelogout}>SignOut</button>
                </li>
              </div>
            )}
          </div>
        </ul>
      </div>
      {/* {open && <LoginModal closemod={Open}/>} */}
    </div>
  );
}
