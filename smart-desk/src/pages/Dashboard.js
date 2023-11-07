import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RightSide from "../components/RightSide";
import Weather from "../components/Weather";
import Todo from "../components/Todo";
import News from "../components/News";
import CreateNotes from "../components/CreateNotes";
import dasboardcss from "./Dashboard.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isWeatherVisible = location.pathname === "/dashboard";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("clicked");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle the dark mode class on the body
    if (isDarkMode) {
      document.body.classList.remove("dark-theme-variables");
    } else {
      document.body.classList.add("dark-theme-variables");
    }
  };
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    console.log("Token:", token); // Log the token
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <div className={dasboardcss.mainContainer}>
        <div className={dasboardcss["dashboard-container"]}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isWeatherVisible && <Weather />}
          <Routes>
            <Route path="/dashboard" element={<Weather />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/news" element={<News />} />
            <Route path="/createnotes" element={<CreateNotes />} />
          </Routes>
          <RightSide
            toggleSidebar={toggleSidebar}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
