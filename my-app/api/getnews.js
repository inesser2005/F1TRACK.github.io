// api/getNews.js
export default async function handler(req, res) {
  const apiKey = "2c40429d2bce443ebff536d44fe8864f";
  const url = `https://newsapi.org/v2/everything?q=F1&pageSize=12{apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao carregar notícias" });
  }
}
