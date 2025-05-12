
import React from "react";

const ArticleCard = ({ article, onBookmark }) => {
  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-gray-700">{article.description}</p>
      <a href={article.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        Read More
      </a>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onBookmark(article)}
      >
        Bookmark
      </button>
    </div>
  );
};

export default ArticleCard;
