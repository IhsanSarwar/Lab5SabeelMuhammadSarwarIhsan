import { useEffect, useState } from "react";
import "./App.css";

import Title from "./components/Title";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles.jsx";

const API_KEY = "MzF474tgMsTOlMpb5FPmneofRkgcTZIBw0r0kcTEWtaiJqSS";

const filterLabels = {
  viewed: "Most Viewed",
  shared: "Most Shared",
  emailed: "Most Emailed",
};

const periodLabels = {
  1: "Day",
  7: "Week",
  30: "Month",
};

function App() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("viewed");
  const [period, setPeriod] = useState("1");

  const [articleCountInput, setArticleCountInput] = useState("6");
  const [articleLimit, setArticleLimit] = useState(6);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const [loading, setLoading] = useState(false);

  const titleText = `${filterLabels[filter]} - ${periodLabels[period]}`;

  function createPlaceholderArticle(index, message) {
    return {
      id: `placeholder-${index}`,
      title: "Article not available",
      abstract: message || "This article could not be loaded.",
      byline: "",
      url: "#",
      media: [],
    };
  }

  function buildUrl() {
    if (filter === "shared") {
      return `https://api.nytimes.com/svc/mostpopular/v2/shared/${period}/facebook.json?api-key=${API_KEY}`;
    }

    return `https://api.nytimes.com/svc/mostpopular/v2/${filter}/${period}.json?api-key=${API_KEY}`;
  }

  async function getArticles() {
    setLoading(true);

    try {
      const response = await fetch(buildUrl());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.fault?.faultstring || "Could not fetch articles.");
      }

      const results = data.results || [];

      const safeArticles = Array.from({ length: articleLimit }, (_, index) => {
        const article = results[index];

        if (!article || !article.title) {
          return createPlaceholderArticle(
            index,
            "This article was missing from the API response."
          );
        }

        return article;
      });

      setArticles(safeArticles);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching articles:", error);

      const errorArticles = Array.from({ length: articleLimit }, (_, index) =>
        createPlaceholderArticle(index, error.message)
      );

      setArticles(errorArticles);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, [filter, period, articleLimit]);

  function handleArticleCountChange(event) {
    const value = event.target.value;
    setArticleCountInput(value);

    const numberValue = Number(value);

    if (numberValue > 15) {
      alert("number is higher than 15");
      return;
    }

    if (numberValue >= 1 && numberValue <= 15) {
      setArticleLimit(numberValue);
      setCurrentPage(1);
    }
  }

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = articles.slice(firstArticleIndex, lastArticleIndex);

  const totalPages = Math.min(Math.ceil(articles.length / articlesPerPage), 3);

  return (
    <div className="app">
      <Sidebar
        filter={filter}
        period={period}
        articleCountInput={articleCountInput}
        onFilterChange={setFilter}
        onPeriodChange={setPeriod}
        onArticleCountChange={handleArticleCountChange}
      />

      <main className="main-content">
        <Title text={titleText} />

        <Articles articles={currentArticles} loading={loading} />

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? "active-page" : ""}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
