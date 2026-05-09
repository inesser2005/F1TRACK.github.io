
import React, { useEffect, useState, memo } from "react"; import Badge from "react-bootstrap/Badge"; // Importação em falta corrigidaimport NewsSkeleton from "./NewsSkeleton";import "../../F1theme.css";

const fallbackImage = "./assets/fallback-news.jpg";
const optimizedUrl = imageUrl
  ? `https://weserv.nl{encodeURIComponent(imageUrl)}&w=400&h=200&fit=cover`
  : fallbackImage;

return (
  <div className="mb-3 overflow-hidden d-flex align-items-center justify-content-center bg-black"
    style={{ height: "200px" }}>
    <img
      src={optimizedUrl}
      alt={title}
      loading="lazy"
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
  const apiKey="893bc4952945215de7045d402a364150";

  useEffect(() => {
    let isMounted = true;

    // CHAMADA PARA A TUA API NA VERCEL
    fetch(`https://gnews.io/api/v4/search?q=example&lang=en&max=10&apikey=${apiKey}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na ponte da API");
        return response.json();
      })
      .then((data) => {
        if (isMounted && data.articles) {
          setArticles(data.articles);
          setLoading(false);
        } else {
          // Se chegar aqui sem artigos, forçamos o fim do loading para mostrar erro
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="container-fluid px-4 min-vh-100 py-4">
        <div className="f1-telemetry-tip mb-5">
          <span className="f1-badge-tip">News - Loading...</span>
        </div>
        <div className="f1-dashboard-grid">
          {Array(12).fill(0).map((_, i) => <NewsSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 min-vh-100 py-4">
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="f1-telemetry-tip mb-5">
          <span className="f1-badge-tip">&nbsp; &nbsp;News - Teams, Drivers and Regulations &nbsp; &nbsp; </span>
        </div>
      </div>

      <div className="f1-dashboard-grid">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div className="f1-card" key={index}>
              <div className="f1-card-body">
                {/* NewsImage agora está definido e funciona */}
                <NewsImage imageUrl={article.urlToImage || article.image} title={article.title} />

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
          ))
        ) : (
          /* MENSAGEM DE ERRO CASO A API NÃO DEVOLVA NADA */
          <div className="text-center w-100 py-5 text-white">
            <h3>No News Available</h3>
            <p className="opacity-50">Please try again later or check your API key.</p>
          </div>
        )}
      </div>
    </div>
  );
}
