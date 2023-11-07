import React, { useState, useEffect, useRef } from "react";
import Clock from "./Clock";
import { Link } from "react-router-dom";
import newscss from "./News.module.css";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const apiKey = "1831e522e1964f8fbd474d403fa0a795";

  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch news data when the component mounts or when the category changes
    fetchNewsData();
  }, [category]);

  const fetchNewsData = () => {
    // Fetch data from the News API
    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Append the new articles to the existing data
        setNewsData((prevData) => [...prevData, ...data.articles]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCategory(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      window.innerHeight + window.scrollY >=
        containerRef.current.offsetTop + containerRef.current.offsetHeight
    ) {
      // When the user scrolls to the bottom of the container, fetch more data
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch more data when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchNewsData();
    }
  }, [page, apiKey, category]);

  return (
    <div className={newscss["news-container"]} ref={containerRef}>
      <Clock />
      <h2>
        SmartDesk- <span className="danger">Feed</span>
      </h2>
      <div className={newscss.news}>
        <div className={newscss["news-nav"]}>
          <input
            type="text"
            name="category"
            placeholder="Search News"
            onKeyDown={enterKeyPressed}
          />
        </div>
        <div className={newscss["card-container"]}>
          {newsData.map((article, index) => (
            <div className={newscss["news-card"]} key={index}>
              <img src={article.urlToImage} alt="" />
              <h3>{article.title}</h3>
              <button>
                <Link to={article.url}>Read More</Link>
              </button>
              {/* You can render other article information here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
