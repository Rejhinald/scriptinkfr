import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CommentList({ product_id }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false); // state for add comment loader
  const [isDeleting, setIsDeleting] = useState(false); // state for delete comment loader
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (product_id) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      axios
        .get(
          `https://scriptinkbk.pythonanywhere.com/products/${product_id}/comments/`,
          config
        )
        .then((response) => {
          setComments(response.data);
        });
    }
  }, [product_id, userInfo.access]);

  function handleDelete(comment_id) {
    setIsDeleting(true); // set loader to true
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    axios
      .delete(
        `https://scriptinkbk.pythonanywhere.com/products/${product_id}/comments/${comment_id}/delete/`,
        config
      )
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== comment_id));
      })
      .finally(() => {
        setIsDeleting(false); // set loader back to false after request is completed
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    axios
      .post(
        `https://scriptinkbk.pythonanywhere.com/products/${product_id}/comments/add/`,
        {
          text: newComment,
          product: product_id,
          author_email: userInfo.email,
        },
        config
      )
      .then((response) => {
        const comment = {
          ...response.data,
          author: `${userInfo.first_name} ${userInfo.last_name}`,
        };
        setComments([...comments, comment]);
        setNewComment("");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{comment.text}</p>
            <p className="card-text">
              <small className="text-muted" style={{ paddingRight: "15px" }}>
                By: {comment.author}
              </small>
              {
                <button
                  className="btn btn-sm btn-danger ml-3 ml-5"
                  onClick={() => handleDelete(comment.id)}
                  style={{
                    display: `${
                      comment.author_email === userInfo.email
                        ? "inline-block"
                        : "none"
                    }`,
                  }}
                >
                  {isDeleting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              }
            </p>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        {userInfo.plan_id === "P-28D816824R709661FMQQ5WMQ" && (
          <div className="form-group">
            <textarea
              className="form-control mb-3"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add Comment"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CommentList;
