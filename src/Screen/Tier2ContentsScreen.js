import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Carousel, Form, Card } from "react-bootstrap";
import "../bootstrap.min.css";

function Tier2ContentsScreen() {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [tierproduct, setTierProducts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else if (
    userInfo.plan_id !== "P-00529703HN3318227MQQ5VSI" &&
    userInfo.plan_id !== "P-28D816824R709661FMQQ5WMQ"
  ) {
    navigate("/plans");
  }

  useEffect(() => {
    async function fetchTierProducts() {
      const { data } = await axios.get(`https://scriptinkbk.pythonanywhere.com/api/tierproducts/2`);
      setTierProducts(data);
    }
    fetchTierProducts();
  }, []);

  return (
    <div style={{ margin: "2% 15%" }}>
      <br />
      <div class="text-center" variant="light">
        <h1>Tier 2 Contents</h1>
        <br></br>
        <Form>
          <Row>
            <Col md={3} />
            <Col md={6}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
            </Col>
          </Row>
        </Form>
        <br />
      </div>
      <br />
      <Container fluid>
        <Row>
          {tierproduct
            .filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search) ||
                    product.short_description.toLowerCase().includes(search) ||
                    product.genre_name.toLowerCase().includes(search);
            })
            .map((product) => (
              <Col md={3} key={product._id}>
                <Card className="mb-4" style={{ height: "420px" }}>
                  <Link to={`/content/${product._id}`} style={{ textDecoration: "none" }}>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>Title: {product.name}</Card.Title>
                      <Card.Text>Genre: {product.genre_name}</Card.Text>
                      <Card.Text>{product.short_description}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Tier2ContentsScreen;
