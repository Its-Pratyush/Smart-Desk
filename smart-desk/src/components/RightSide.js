import { useEffect, useState } from "react";
import Calender from "./Calender";
import PendingTodos from "./PendingTodos";
import rightsidecss from "./Rightside.module.css";

const RightSide = ({ toggleSidebar, toggleTheme, isDarkMode }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch the user's name when the component mounts
  //   fetchUserName();
  // }, []);

  const fetchUserName = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/getUserName",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { name } = data;
        setUserName(name);
        console.log(userName);
      } else {
        setError("Error fetching user name");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user name:", error);
      setError("Error fetching user name");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the user's name when the component mounts
    fetchUserName();
  }, []);

  return (
    <>
      <div className={rightsidecss.right}>
        <div className={rightsidecss.top}>
          <button id="menu-btn" onClick={toggleSidebar}>
            <span className="material-icons-sharp">menu</span>
          </button>
          <div className={rightsidecss["theme-toggler"]}>
            <span
              className={`material-icons-sharp ${
                isDarkMode ? "" : rightsidecss["active"]
              }`}
              onClick={toggleTheme}
            >
              light_mode
            </span>

            <span
              className={`material-icons-sharp ${
                isDarkMode ? rightsidecss["active"] : ""
              }`}
              onClick={toggleTheme}
            >
              dark_mode
            </span>
          </div>
          <div className={rightsidecss.profile}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className={rightsidecss.info}>
                <h2>
                  Hey <b className="danger">{userName}</b>
                </h2>
                <small className="text-muted"></small>
              </div>
            )}
          </div>
        </div>
        <div className={rightsidecss["calender-remaining-todos"]}>
          <div className={rightsidecss["todo-sec"]}>
            <PendingTodos />
          </div>
          <div className={rightsidecss["calender-sec"]}>
            <Calender />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
