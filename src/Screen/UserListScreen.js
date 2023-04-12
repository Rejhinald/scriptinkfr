import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../Actions/accountActions";
import axios from "axios";
import CancelSubscriptionAdmin from "../Components/CancelSubscriptionAdmin";

const UserListScreen = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const clientId =
      "AUgpEmZhBp5JIEIFTUcY2fCqZGncGEduE2tq8suRS39oXl768r0V30K8JwyfmFvjSLGr8kMFSZTJQ2R5";
    const clientSecret =
      "EHy-pakVBl3geNd_BbPwTgyBURTPlWZLPj1Hki65JhgTpuuLV-mSuKlyGMVkuCn5E-WbOLc_coY1RXrb";
    // dispatch(getUserDetails("profile"));
    if (!accessToken) {
      const getToken = async () => {
        try {
          const response = await axios({
            method: "post",
            url: "https://api.sandbox.paypal.com/v1/oauth2/token",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            data: "grant_type=client_credentials",
          });

          console.log(response.data);
          setAccessToken(response.data.access_token);
        } catch (error) {
          console.error(error);
        }
      };

      getToken();

      const intervalId = setInterval(() => {
        getToken();
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [accessToken]);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }
  return (
    <div style={{ margin: "2% 15%" }}>
      <div className="text-center">
        <br />
        <h3>User List</h3>
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
              <Link to="/signup" className="btn btn-primary">
                Add User
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subscription Status</th>
            <th>Subscription ID</th>
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
            {users
              .filter((user) => {
                return (
                  search === "" ||
                  user.email.toLowerCase().includes(search.toLowerCase()) ||
                  user.first_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.last_name.toLowerCase().includes(search.toLowerCase()) ||
                  user.subscription_id
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (user.isSubscriber && search.toLowerCase() === "active") ||
                  (!user.isSubscriber && search.toLowerCase() === "inactive") ||
                  (user.plan_id === "P-8U773388PW8654051MQQ5TNQ" &&
                    search.toLowerCase() === "tier 1") ||
                  (user.plan_id === "P-00529703HN3318227MQQ5VSI" &&
                    search.toLowerCase() === "tier 2") ||
                  (user.plan_id === "P-28D816824R709661FMQQ5WMQ" &&
                    search.toLowerCase() === "tier 3") ||
                  user.plan_id.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((users) => {
                return (
                  <tr key={users._id}>
                    <td>{users.first_name}</td>

                    <td>{users.last_name}</td>
                    <td>{users.email}</td>
                    <td>{users.isSubscriber ? "Active" : "Inactive"}</td>
                    <td>{users.subscription_id}</td>
                    <td>
                      {users.plan_id === "P-8U773388PW8654051MQQ5TNQ"
                        ? "Tier 1"
                        : users.plan_id === "P-00529703HN3318227MQQ5VSI"
                        ? "Tier 2"
                        : users.plan_id === "P-28D816824R709661FMQQ5WMQ"
                        ? "Tier 3"
                        : "Unknown Tier"}
                    </td>

                    <td>
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="d-grid gap-1">
                          <CancelSubscriptionAdmin
                            subscriptionId={users.subscription_id}
                            accessToken={accessToken}
                            id={users._id}
                          />
                          <LinkContainer
                            style={{ width: "3.72rem" }}
                            to={`/updateuserinfo/${users._id}`}
                          >
                            <Button variant="light" className="btn-sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                        </div>
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

export default UserListScreen;
