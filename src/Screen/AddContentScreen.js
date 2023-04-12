import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Actions/productActions";
import { Link } from "react-router-dom";
import { listGenres } from "../Actions/genreActions";
import { listTiers } from "../Actions/tierActions";

function AddContentScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [short_description, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [tier, setTier] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goBack() {
    navigate(-1);
  }

  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;

  const tierList = useSelector((state) => state.tierList);
  const { tiers } = tierList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listGenres());
    dispatch(listTiers());
  }, [dispatch]);

  useEffect(() => {
    if (genres && genres.length > 0) {
      setGenre(genres[0]._id);
    }
  }, [genres]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const AddProductInfo = async () => {
    let formField = new FormData();

    formField.append("name", name);
    formField.append("short_description", short_description);
    formField.append("description", description);
    formField.append("genre", genre);
    formField.append("tier", tier);

    // Add author (user email) to form data
    formField.append("author", userInfo.email);

    if (image !== null) {
      formField.append("image", image);
    }

    dispatch(addProduct(formField)).then((response) => {
      navigate(-1);
    });
  };
  return (
    <div>
      <br />
      <div class="text-center" variant="light">
        <h1>Add Content</h1>
      </div>
      <Container>
        <button className="btn btn-primary my-3" onClick={goBack}>
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
              value={name}
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
              value={short_description}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              placeholder="Please Select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
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
              value={tier}
              onChange={(e) => setTier(e.target.value)}
            >
              <option value="">-- Please select --</option>
              {tiers.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.tier}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="btn btn-primary" onClick={AddProductInfo}>
            Post
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddContentScreen;
