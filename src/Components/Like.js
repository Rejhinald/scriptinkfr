import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserDetails } from "../Actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

function LikeButton({ product_id }) {
  const [likes, setLikes] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const userLikes = JSON.parse(
      localStorage.getItem(`user${userInfo.email}Likes`)
    );
    if (userLikes && userLikes.includes(product_id)) {
      setHasLiked(true);
    }
  }, [userInfo, product_id]);

  function handleLike() {
    if (hasLiked) {
      return;
    }
    axios
      .put(`https://scriptinkbk.pythonanywhere.com/api/products/${product_id}/like/`)
      .then((response) => {
        setLikes(response.data.likes);
        setHasLiked(true);
        const userLikes =
          JSON.parse(localStorage.getItem(`user${userInfo.email}Likes`)) || [];
        localStorage.setItem(
          `user${userInfo.email}Likes`,
          JSON.stringify([...userLikes, product_id])
        );
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUnlike() {
    if (!hasLiked) {
      return;
    }
    axios
      .put(`https://scriptinkbk.pythonanywhere.com/api/products/${product_id}/unlike/`)
      .then((response) => {
        setLikes(response.data.likes);
        setHasLiked(false);
        const userLikes =
          JSON.parse(localStorage.getItem(`user${userInfo.email}Likes`)) || [];
        localStorage.setItem(
          `user${userInfo.email}Likes`,
          JSON.stringify(userLikes.filter((id) => id !== product_id))
        );
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
    {userInfo && userInfo.plan_id !== "P-8U773388PW8654051MQQ5TNQ" && (
      hasLiked ? (
        <button
          onClick={handleUnlike}
          type="button"
          class="btn btn-secondary btn-transparent"
        >
          <i className="fa fa-heart text-danger"></i>
        </button>
      ) : (
        <button
          onClick={handleLike}
          type="button"
          class="btn btn-secondary btn-transparent"
        >
          <i className="far fa-heart"></i>
        </button>
      )
    )}
  </div>
  );
}

export default LikeButton;
