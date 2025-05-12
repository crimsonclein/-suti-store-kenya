// src/Components/AllComments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          "https://crimsonclein.pythonanywhere.com/api/get_comments"
        );
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments:", err.message);
      }
    };

    fetchComments();
  }, []);

  const filtered = comments.filter((comment) =>
    comment.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>All Comments</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search comments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length > 0 ? (
        <ul className="list-group">
          {filtered.map((comment) => (
            <li className="list-group-item" key={comment.id}>
              <strong>{comment.product_name || "Unknown Suit"}:</strong>{" "}
              {comment.content}
              <br />
              <small className="text-muted">By: {comment.user || "Guest"}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};

export default AllComments;
