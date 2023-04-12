import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CancelSubscription from "../Components/CancelSubscription";
import axios from "axios";

import { getUserDetails } from "../Actions/accountActions";

function UserProfileScreen() {
  const [subscription, setSubscription] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getUserDetails(userInfo._id));
  }, [userInfo, navigate, dispatch]);

  const { error, loading, user } = userDetails;
  const subscriptionId = user ? user.subscription_id : null;
  const [planName, setPlanName] = useState(null);
  const [nextPaymentDue, setNextPaymentDue] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const clientId =
      "AUgpEmZhBp5JIEIFTUcY2fCqZGncGEduE2tq8suRS39oXl768r0V30K8JwyfmFvjSLGr8kMFSZTJQ2R5";
    const clientSecret =
      "EHy-pakVBl3geNd_BbPwTgyBURTPlWZLPj1Hki65JhgTpuuLV-mSuKlyGMVkuCn5E-WbOLc_coY1RXrb";

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

    axios({
      method: "GET",
      url: `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setSubscription(response.data);
        return response.data.plan_id;
      })
      .then((planId) => {
        return axios({
          method: "GET",
          url: `https://api.sandbox.paypal.com/v1/billing/plans/${planId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => {
        setPlanName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken, subscriptionId, userInfo]);
  useEffect(() => {
    if (subscription) {
      const nextBillingTime = new Date(
        subscription.billing_info.next_billing_time
      );
      setNextPaymentDue(nextBillingTime.toLocaleDateString());
    }
  }, [subscription, subscriptionId, userInfo]);

  if (!subscription || !planName || !nextPaymentDue) {
    return (
      <div style={{ margin: "15% 15%", textAlign: "center" }}>
        <h3 style={{ margin: "auto" }}>Loading subscription details...</h3>
      </div>
    );
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ fontSize: 50, fontWeight: "bold", marginTop: 50 }}>
        Account Overview
      </h1>
      <Card
        style={{
          width: "80rem",
          marginTop: 50,
          border: "none",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Body style={{ backgroundColor: "#f8f9fa", padding: 20 }}>
          <Card.Title
            style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}
          >
            Profile
          </Card.Title>
          <Card.Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Name: {userInfo.first_name} {userInfo.last_name}
          </Card.Text>
          <Card.Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Email: {userInfo.email}
          </Card.Text>
          <Card.Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Password:{" "}
          </Card.Text>
          <Button
            as={Link}
            to="/updateuserprofile"
            variant="primary"
            className="rounded"
            style={{ marginTop: 20 }}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
      <Card
        style={{
          width: "80rem",
          marginTop: 50,
          border: "none",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Body style={{ backgroundColor: "#f8f9fa", padding: 20 }}>
          <Card.Title
            style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}
          >
            Subscription Details
          </Card.Title>
          <Card.Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Current Plan: {planName}
          </Card.Text>
          <Card.Text style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: "bold" }}>Status: </span>
            <span
              style={{
                fontWeight: "bold",
                color: subscription.status === "ACTIVE" ? "green" : "red",
              }}
            >
              {subscription.status}
            </span>
          </Card.Text>
          <Card.Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Next Payment Due: {nextPaymentDue}
          </Card.Text>
          <CancelSubscription
            subscriptionId={subscriptionId}
            accessToken={accessToken}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfileScreen;
