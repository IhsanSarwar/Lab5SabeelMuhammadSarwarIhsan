function Articles({ articles, loading }) {
  if (loading) {
    return <p className="loading">Loading articles...</p>;
  }

  const leftColumnArticles = articles.filter(
    (article, index) => index % 2 === 0
  );
  const rightColumnArticles = articles.filter(
    (article, index) => index % 2 !== 0
  );

  return (
    <section className="articles-container">
      <div className="article-column">
        {leftColumnArticles.map((article, index) => (
          <ArticleCard
            key={article.uri || article.url || article.id || index}
            article={article}
          />
        ))}
      </div>

      <div className="article-column">
        {rightColumnArticles.map((article, index) => (
          <ArticleCard
            key={article.uri || article.url || article.id || index}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({ article }) {
  const image =
    article.media &&
    article.media[0] &&
    article.media[0]["media-metadata"] &&
    article.media[0]["media-metadata"].length > 0
      ? article.media[0]["media-metadata"][
          article.media[0]["media-metadata"].length - 1
        ].url
      : null;

  return (
    <article className="article-card">
      {image ? (
        <img src={image} alt={article.title} />
      ) : (
        <div className="placeholder-image">No Image</div>
      )}

      <div className="article-info">
        <h2>{article.title || "Article not available"}</h2>

        <p>{article.abstract || "No article description available."}</p>

        {article.byline && <p className="byline">{article.byline}</p>}

        {article.url !== "#" && (
          <a href={article.url} target="_blank" rel="noreferrer">
            Read More
          </a>
        )}
      </div>
    </article>
  );
}

export default Articles;
