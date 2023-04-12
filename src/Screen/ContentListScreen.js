import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listProducts, deleteProduct } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";


const ContentListScreen = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [setProducts] = useState([]);
  const { error, loading, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you?")) {
      dispatch(deleteProduct(id)).then((response) => {
        window.location.reload();
      });
    }
  };
  
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!userInfo.isAdmin) {
      navigate("/", { state: { message: "You're not permitted to view this page" } });
    }
  }, [userInfo, navigate]);
  
  return (
    <div style={{ margin: "2% 15%" }}>
      <div className="text-center">
        <br />
        <br></br>
        <h3>Content Lists</h3>
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
        <div class="container">
          <div class="row">
            <div class="row justify-content-center mt-10">
              <Link to="/content/add" className="btn btn-primary">
                Write Content
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="container">
        <div class="row">
          <div class="row justify-content-center mt-10">
            <Link to="/genre/add" className="btn btn-primary">
              Add Genre
            </Link>
          </div>
        </div>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cover</th>
            <th>Short Description</th>
            <th>Genre</th>
            <th>Tier</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <tbody>
            {products
              .filter((product) => {
                return (
                  search === "" ||
                  product.name.toLowerCase().includes(search.toLowerCase()) ||
                  product.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  product.genre.toLowerCase().includes(search.toLowerCase()) ||
                  product.tier.toString().toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((product) => {
                return (
                  <tr key="">
                    <td>{product.name}</td>
                    <td>
                      <img
                        className="rounded"
                        src={product.image}
                        width="200"
                        height="200"
                      />
                    </td>
                    <td>{product.short_description}</td>

                    <td>{product.genre}</td>
                    <td>{product.tier}</td>
                    <td>
                      <div class="d-grid gap-1">
                        <Button
                          variant="danger"
                          className="btn-md"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        {/* <Button variant='primary' className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button> */}
                        <LinkContainer to={`/content/edit/${product._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default ContentListScreen;
