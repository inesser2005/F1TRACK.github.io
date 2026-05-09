export default function NewsAPI() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // O BLOCO ABAIXO SUBSTITUI O TEU ANTIGO USEEFFECT
  useEffect(() => {
    let isMounted = true;
    
    // Chamamos a rota interna da Vercel para evitar o bloqueio da NewsAPI
    fetch('/api/getNews') 
      .then((response) => {
        if (!response.ok) throw new Error("Erro na ponte da API");
        return response.json();
      })
      .then((data) => {
        if (isMounted && data.articles) {
          setArticles(data.articles);
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
          <span className="f1-badge-tip">News - Teams, Drivers and Regulations </span>
        </div>
      </div>

      <div className="f1-dashboard-grid">
        {articles.map((article, index) => (
          <div className="f1-card" key={index}>
            <div className="f1-card-body">
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
        ))}
      </div>
    </div>
  );
}
