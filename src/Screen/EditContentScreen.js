// import axios from 'axios'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  editProduct,
  listProductDetails,
} from "../Actions/productActions";
import { Link, useParams } from "react-router-dom";
import { listGenres } from "../Actions/genreActions";
import { listTiers } from "../Actions/tierActions";
import "../bootstrap.min.css";

function EditProductScreen() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goBack() {
    navigate(-1);
  }

  const AddProductInfo = async () => {
    let formField = new FormData();

    formField.append("name", name ? name : product.name);
    formField.append(
      "short_description",
      short_description ? short_description : product.short_description
    );
    formField.append(
      "description",
      description ? description : product.description
    );
    formField.append("genre", genre ?? product.genre._id);
    formField.append("tier", tier ?? product.tier._id);

    if (image !== null) {
      formField.append("image", image);
    }

    dispatch(editProduct(id, formField)).then((response) => {
      navigate(-1);
    });
  };

  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;
  useEffect(() => {
    dispatch(listGenres());
    setGenre(genres);
  }, []);

  const tierList = useSelector((state) => state.tierList);
  const { tiers } = tierList;
  useEffect(() => {
    dispatch(listTiers());
    setTier(tiers);
  }, []);

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [short_description, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [tier, setTier] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(listProductDetails(id)).then((response) => {
      const product = response.data;
      setName(product.name);
      setShortDescription(product.short_description);
      setDescription(product.description);
      setGenre(product.genre._id);
      setTier(product.tier._id);
    });
  }, [dispatch, id]);

  return (
    <div>
      <br />
      <div class="text-center" variant="light">
        <h1>Edit Content Info</h1>
      </div>
      <Container>
        <button className="btn btn-light my-3" onClick={goBack}>
          Go Back
        </button>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              className="form-control"
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="short_description"
              name="short_description"
              className="form-control"
              defaultValue={product.short_description}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              name="description"
              className="form-control"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              placeholder="Please Select"
              defaultValue={product.tier ? product.tier.id : null}


              onChange={(e) => setGenre(parseInt(e.target.value))}
            >
              <option value="">-- Please select --</option>
              {genres.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tier</Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              placeholder="Please Select"
              defaultValue={product.tier ? product.tier.id : null}
              onChange={(e) => setTier(parseInt(e.target.value))}
            >
              <option value="">-- Please select --</option>
              {tiers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tier}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="btn btn-primary" onClick={AddProductInfo}>
            Edit Content
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditProductScreen;
