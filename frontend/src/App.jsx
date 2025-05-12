
import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./components/ArticleCard";
import BookmarkPage from "./components/BookmarkPage";

function App() {
  const [articles, setArticles] = useState([]);
  const [view, setView] = useState("home");

  useEffect(() => {
    axios.get("https://tech-journal-xzoo.onrender.com/tech-articles").then((res) => {
      setArticles(res.data);
    });
  }, []);

  const bookmarkArticle = (article) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    bookmarks.push(article);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tech Journal</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setView(view === "home" ? "bookmarks" : "home")}
        >
          {view === "home" ? "View Bookmarks" : "Back"}
        </button>
      </div>
      {view === "home" ? (
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onBookmark={bookmarkArticle}
          />
        ))
      ) : (
        <BookmarkPage />
      )}
    </div>
  );
}

export default App;
