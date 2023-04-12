import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Genre from "../Components/Genre";
import { useDispatch, useSelector } from "react-redux";
import { listGenres } from "../Actions/genreActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";

function GenresScreen() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.genreList);
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userInfo.isSubscriber) {
        navigate("/plans");
      } else {
        dispatch(listGenres());
      }
    }
  }, [dispatch, navigate, userInfo]);

  const { error, loading, genres } = genreList;

  return (
    <div style={{ margin: "2% 15%" }}>
      <br />
      <Container fluid>
        <div class="text-center" variant="light">
          <br></br>
          <h1>Genres</h1>
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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {genres
              .filter((genre) => {
                return (
                  search === "" ||
                  genre.name.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((genre) => (
                <Col
                  className="row g-1"
                  key={genre._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Genre genre={genre} />
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default GenresScreen;
