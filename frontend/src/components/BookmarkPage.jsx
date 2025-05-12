
import React, { useEffect, useState } from "react";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(stored);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookmarked Articles</h2>
      {bookmarks.map((b, i) => (
        <div key={i} className="border p-4 rounded mb-4">
          <h3 className="text-xl font-semibold">{b.title}</h3>
          <p className="text-gray-700">{b.description}</p>
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookmarkPage;
