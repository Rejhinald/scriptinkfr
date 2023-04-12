import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { listProducts, deleteProduct } from "../Actions/productActions";
import "../bootstrap.min.css";

const UserContentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myWorks, setMyWorks] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listProducts());
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (products) {
      const filteredWorks = products.filter(
        (product) =>
          product.author === `${userInfo.first_name} ${userInfo.last_name}`
      );
      setMyWorks(filteredWorks);
    }
  }, [products, userInfo]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id)).then((response) => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">My Works</h1>
      <div className="container">
        <div className="row">
          <div className="row justify-content-center mt-5">
            <Link to="/content/add" className="btn btn-primary">
              Write Content
            </Link>
          </div>
          <br />
        </div>
        <br />
        <br />
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : myWorks.length === 0 ? (
          <h2>No works found</h2>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {myWorks.map((product) => (
              <Col md={3} key={product._id}>
                <Card className="mb-4" style={{ height: "420px" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.short_description}
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/content/edit/${product._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserContentScreen;
