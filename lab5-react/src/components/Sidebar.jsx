function Sidebar({
  filter,
  period,
  articleCountInput,
  onFilterChange,
  onPeriodChange,
  onArticleCountChange,
}) {
  return (
    <aside className="sidebar">
      <h2>Article Settings</h2>

      <label className="input-label" htmlFor="articleCount">
        Number of articles
      </label>

      <input
        id="articleCount"
        type="text"
        value={articleCountInput}
        onChange={onArticleCountChange}
        placeholder="Enter 1-15"
        className="article-input"
      />

      <div className="filter-section">
        <h3>Filter</h3>

        <label>
          <input
            type="radio"
            name="filter"
            value="viewed"
            checked={filter === "viewed"}
            onChange={(event) => onFilterChange(event.target.value)}
          />
          Most Viewed
        </label>

        <label>
          <input
            type="radio"
            name="filter"
            value="shared"
            checked={filter === "shared"}
            onChange={(event) => onFilterChange(event.target.value)}
          />
          Most Shared
        </label>

        <label>
          <input
            type="radio"
            name="filter"
            value="emailed"
            checked={filter === "emailed"}
            onChange={(event) => onFilterChange(event.target.value)}
          />
          Most Emailed
        </label>
      </div>

      <div className="filter-section">
        <h3>Time Period</h3>

        <label>
          <input
            type="radio"
            name="period"
            value="1"
            checked={period === "1"}
            onChange={(event) => onPeriodChange(event.target.value)}
          />
          Day
        </label>

        <label>
          <input
            type="radio"
            name="period"
            value="7"
            checked={period === "7"}
            onChange={(event) => onPeriodChange(event.target.value)}
          />
          Week
        </label>

        <label>
          <input
            type="radio"
            name="period"
            value="30"
            checked={period === "30"}
            onChange={(event) => onPeriodChange(event.target.value)}
          />
          Month
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;
