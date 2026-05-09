import React, { useEffect, useState, memo } from "react";
import Badge from "react-bootstrap/Badge";
import "../../F1theme.css"; 

const NewsImage = memo(({ imageUrl, title }) => {
  const fallbackImage = "./assets/fallback-news.jpg"; 

  return (
    <div className="mb-3 overflow-hidden d-flex align-items-center justify-content-center bg-black" 
         style={{ height: "200px" }}> 
      <img 
        src={imageUrl || fallbackImage} 
        alt={title}
        loading="eager" 
        className="img-fluid w-100 h-100"
        style={{ objectFit: "cover" }}
        onError={(e) => { 
            e.target.onerror = null;
            e.target.src = fallbackImage;
        }} 
      />
    </div>
  );
});

export default function NewsAPI() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "2c40429d2bce443ebff536d44fe8864f";

  useEffect(() => {
    let isMounted = true;
    fetch(`https://newsapi.org/v2/everything?q=F1&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted && data.articles) {
          setArticles(data.articles.slice(0, 12)); 
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="text-center p-5 text-white italic">WARMING NEWS FEED...</div>;

  return (
    /* REMOVED: bg-dark here to eliminate the grey background conflict */
    <div className="container-fluid px-4 min-vh-100 py-4">
     
       <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="f1-telemetry-tip mb-5">
          <span className="f1-badge-tip">News - Teams, Drivers and Regulations </span> 
        </div>
      </div>

      <div className="f1-dashboard-grid">
        {articles.map((article, index) => (
          <div className="f1-card" key={index}>
            <div className="f1-card-body">
              
              <NewsImage imageUrl={article.urlToImage} title={article.title} />

              <div className="mb-2">
                <Badge bg="danger" className="text-uppercase mb-2" style={{ fontSize: '0.65rem' }}>
                  News Update
                </Badge>
                <h5 className="fw-bold text-uppercase" style={{ lineHeight: '1.2', fontSize: '1rem' }}>
                  {article.title}
                </h5>
              </div>

              <div className="f1-card-footer">
                <p className="mb-4 opacity-75" style={{ fontSize: '0.85rem' }}>
                  {article.description ? article.description.slice(0, 100) + "..." : "No technical description available."}
                </p>
                <a href={article.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                  <button className="f1-btn w-100">Read the news!</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}