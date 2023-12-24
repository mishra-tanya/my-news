import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const fetchData = async () => {
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=57921f4f70e84274a2cc8fa308a96355`;

    // Add category and search query parameters if provided
    if (selectedCategory !== "all") {
      apiUrl += `&category=${selectedCategory}`;
    }

    if (searchQuery) {
      apiUrl += `&q=${searchQuery}`;
    }

    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data.articles);
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedCategory]);

  const truncateDescription = (description, maxLines) => {
    if (description === null || description === undefined) {
      return '';
    }
    const lines = description.split('\n');
    
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '.';
    }
    return description;
  };


  return (
    <>
     <div className="filter-container">
          <input
            type="text"
            placeholder="Search News..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedCategory}
            style={{margin: "5px" }}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <div className="mainDiv">
        {mynews.map((ele) => {
          const truncatedDescription = truncateDescription(ele.description, 1);

          return (
            <div key={ele.title} className="card" style={{ width: "380px", height: "600px", margin: "15px" }}>
              <img
                src={ele.urlToImage == null ? "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg" : ele.urlToImage}
                className="image"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{ele.title}</h5>
                <p className="card-text">
                  {truncatedDescription}<a href={ele.url} target="_blank" rel="noopener noreferrer" className="">
                   Read More...
                </a>
                  {ele.description?.length > truncatedDescription.length && (
                    <span>
                      {' '}
                     
                    </span>
                  )}
                </p>
                <hr />
                
                <p className="card-text">
                  Source : <b>{ele.source['name']}</b>
                </p>
                <hr />
                <p className="card-text">
                  Date & Time : {ele.publishedAt}
                </p>
                
               

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default News;
