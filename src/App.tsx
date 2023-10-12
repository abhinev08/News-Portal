import React, { useState, useEffect } from "react";
import "./App.css";
import Union from "../src/assets/Union.png";

function App() {
  const [data, setData] = useState([]);

  const apiKey = "a7f52ce8b11242b3aa32bec357483a32";

  const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-10-11&to=2023-10-11&sortBy=popularity&apiKey=${apiKey}&language=en`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="container-fluid" style={{ background: "#FDFDFD" }}>
      <nav className="navbar fixed-top">
        <div className="container-fluid ms-4 mt-4">
          <a className="navbar-brand" href="#">
            <span className="news">News</span>
            <span className="portal">Portal</span>
          </a>
          <img
            className="search-image"
            src={Union}
            alt="search-image"
            style={{ marginLeft: "80%" }}
          ></img>
          <button className="navbar-toggler me-4">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div className="container" style={{ marginTop: "120px" }}>
        <div className="hero-section">
          <h2 className="hero-heading">Hot Topics</h2>
          <div className="row mt-4">
            {data.slice(0, 1).map((item: any, index) => (
              <div className="col-md-8 col-12" key={index}>
                <div className="card hero" style={{ border: "transparent" }}>
                  {item.urlToImage && (
                    <div
                      className="image-overlay"
                      style={{
                        backgroundImage: `url(${item.urlToImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        padding: "5px 10px",
                      }}
                    >
                      <div className="overlay-text">
                        <h5 className="card-title text-white">{item.title}</h5>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="published-at mb-2">
                            {new Date(item.publishedAt).toLocaleString()}
                          </p>
                          <p className="author mb-2">{item.author}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {data.slice(0, 1).map((item: any, index) => (
              <div className="col-md-4 col-12 mt-4" key={index}>
                <div className="card" style={{ border: "transparent" }}>
                  <div className="card-body hot-topic">
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section mt-4">
          <h4 className="section-heading">Latest News</h4>
          <div className="row mt-4">
            {data.slice(2).map((item: any, index) => (
              <div className="col-md-3 col-12 mb-5" key={index}>
                <div className="card" style={{ border: "transparent" }}>
                  {item.urlToImage && (
                    <img
                      className="card-img-top"
                      src={item.urlToImage}
                      alt={item.title}
                      style={{ height: "200px", width: "100%" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <div className="mt-5">
                      <p className="published-at">
                        {new Date(item.publishedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
