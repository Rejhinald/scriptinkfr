import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Carousel, Form, Card } from "react-bootstrap";
import { listGenreMovies } from "../Actions/genreActions";
import "../bootstrap.min.css";

function GenreContentsScreen() {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [genre, setGenre] = useState({});
  const [genreproduct, setGenreProducts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isSubscriber) {
      navigate("/plans");
    }
  }

  useEffect(() => {
    async function fetchGenreData() {
      const { data } = await axios.get(
        `https://scriptinkbk.pythonanywhere.com/api/genres/${id}`
      );
      setGenre(data);
    }
    async function fetchGenreProducts() {
      const { data } = await axios.get(
        `https://scriptinkbk.pythonanywhere.com/api/genreproducts/${id}`
      );
      setGenreProducts(data);
    }
    fetchGenreData();
    fetchGenreProducts();
  }, []);

  return (
    <div style={{ margin: "2% 15%" }}>
      <br />
      <div class="text-center" variant="light">
        <h1>{genre.name}</h1>
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
          {genreproduct
            .filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search) ||
                    product.short_description.toLowerCase().includes(search) ||
                    product.tier
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase());
            })
            .map((product) => (
              <Col md={3} key={product._id}>
                <Card className="mb-4" style={{ height: "420px" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body style={{ overflow: "hidden" }}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Tier: {product.tier}</Card.Text>
                    <Card.Text>
                      Short Description: {product.short_description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default GenreContentsScreen;
