import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updateAccount } from "../Actions/accountActions";

function UpdateUserProfileScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState(userInfo.first_name);
  const [last_name, setLastname] = useState(userInfo.last_name);
  const [plan_id, setPlanid] = useState(userInfo.plan_id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!userInfo) {
    navigate("/login");
  }
  const [email, setEmail] = useState(userInfo.email);

  const UpdateUserInfo = async () => {
    let formField = new FormData();

    formField.append("email", email);
    formField.append("password", password);
    formField.append("first_name", first_name);
    formField.append("last_name", last_name);
    formField.append("plan_id", plan_id);

    dispatch(updateAccount(formField)).then((response) => {
      navigate(-1);
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      UpdateUserInfo();
    }
  };

  return (
    <div>
      <br />
      <div class="text-center">
        <h1>Update Profile</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="row justify-content-center mt-5">
            <div class="col-sm-6 col-12">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={userInfo.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group onSubmit={handleSubmit} className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <br />
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <br />
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      placeholder={userInfo.first_name}
                      value={first_name}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo.last_name}
                      value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Plan ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo.plan_id}
                      value={plan_id}
                      onChange={(e) => setPlanid(e.target.value)}
                      readOnly
                    />
                  </Form.Group>
                </Form.Group>
                <div class="text-center">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="primary"
                  >
                    Submit
                  </Button>
                  <br />
                  <br />
                  <h4>{error && <div>{error}</div>}</h4>
                </div>
                <br />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserProfileScreen;
