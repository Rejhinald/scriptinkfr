import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../Actions/productActions";
import { getUserDetails } from "../Actions/accountActions";
import LikeButton from "../Components/Like";
import CommentList from "../Components/Comments";

function ContentScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const navigate = useNavigate();

  const productTier = product?.tier || 1; // define the initial state of productTier based on the product object

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails(userInfo.id)).then(() => {
        dispatch(listProductDetails(id));
      });
    }
  }, [dispatch, id, userInfo]);

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    function checkPlanAndProductTier() {
      if (!userInfo) {
        navigate("/login");
      } else if (!userInfo.isSubscriber) {
        navigate("/plans");
      } else {
        const planId = userInfo.plan_id;
        console.log("planId:", planId);
        console.log("productTier:", productTier);
        if (planId === "P-8U773388PW8654051MQQ5TNQ" && productTier !== 1) {
          navigate("/plans");
        } else if (
          planId === "P-00529703HN3318227MQQ5VSI" &&
          productTier !== 1 &&
          productTier !== 2
        ) {
          navigate("/plans");
        } else if (
          planId === "P-28D816824R709661FMQQ5WMQ" &&
          (productTier < 1 || productTier > 3)
        ) {
          navigate("/plans");
        }
      }
    }

    checkPlanAndProductTier();
  }, [userInfo, navigate, productTier]);

  return (
    <div
      style={{
        textAlign: "left",
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "10%",
        marginTop: "20px",
        fontSize: "16px",
      }}
    >
      <button className="btn btn-light my-3" onClick={goBack}>
        Go Back
      </button>
      <Row>
        <Col md={3}>
          <Image
            style={{ width: "300px", height: "300px" }}
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>

        <Col md={7}>
          <ListGroup
            variant="flush"
            style={{ maxHeight: "700px", overflowY: "scroll" }}
          >
            <ListGroup.Item style={{ wordWrap: "break-word" }}>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item style={{ wordWrap: "break-word" }}>
              Genre: {product.genre_name}
            </ListGroup.Item>
            <ListGroup.Item style={{ wordWrap: "break-word" }}>
              Author: {product.author}
            </ListGroup.Item>
            <ListGroup.Item style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "15px" }}>Likes:</span>
              <LikeButton product_id={product._id} style={{ marginLeft: '-10px' }} />
              <span style={{ marginLeft: "-10px", marginRight: "-10px" }}>{product.likes}</span>
            </ListGroup.Item>
            <ListGroup.Item style={{ wordWrap: "break-word" }}>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={2}>
        <CommentList product_id={product._id} />
        </Col>
      </Row>
    </div>
  );
}

export default ContentScreen;
