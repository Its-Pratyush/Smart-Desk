import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sidebarcss from "./Sidebar.module.css";
function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.alert("user logged out successfully");
    navigate("/");
  };

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside
      className={`${sidebarcss.sidebar} ${isOpen ? sidebarcss.showMenu : ""}`}
    >
      <div className={sidebarcss.top}>
        <div className={sidebarcss.logo}>
          <img src="images/logo.png" alt="" />
          <h2>
            Smart<span className="danger">Desk</span>
          </h2>
        </div>
        <div
          className={sidebarcss.close}
          id="close-btn"
          onClick={toggleSidebar}
        >
          <span className="material-icons-sharp"> close </span>
        </div>
      </div>

      <div className={sidebarcss.sidebar}>
        <Link
          to="dashboard"
          className={activeLink === "dashboard" ? sidebarcss.active : ""}
          onClick={() => handleLinkClick("dashboard")}
        >
          <span className="material-icons-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </Link>
        <Link
          to="todo"
          className={activeLink === "todo" ? sidebarcss.active : ""}
          onClick={() => handleLinkClick("todo")}
        >
          <span className="material-icons-sharp">format_list_bulleted</span>
          <h3>Todo</h3>
        </Link>
        <Link
          to="createnotes"
          className={activeLink === "notes" ? sidebarcss.active : ""}
          onClick={() => handleLinkClick("notes")}
        >
          <span className="material-icons-sharp">text_snippet</span>
          <h3>Create Notes</h3>
        </Link>
        <Link
          to="news"
          className={activeLink === "news" ? sidebarcss.active : ""}
          onClick={() => handleLinkClick("news")}
        >
          <span className="material-icons-sharp">newspaper</span>
          <h3>Feed</h3>
        </Link>

        <Link to="/" className={sidebarcss.active} onClick={handleLogout}>
          <span className="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
