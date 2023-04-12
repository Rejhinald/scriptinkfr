import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "../Components/ButtonWrapper";
import ButtonWrapper1 from "../Components/ButtonWrapper1";
import ButtonWrapper2 from "../Components/ButtonWrapper2";
import Card from "react-bootstrap/Card";

function PlanScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div style={{ margin: "5% 15%" }}>
      <br />
      <div className="container">
        <div className="text-center w-75 my-4 mx-auto">
          <h1>Plans</h1>
          <p className="fs-5 text-muted">Choose your plan.</p>
          <br></br>
          <br></br>
        </div>
        <main>
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col">
              <div className="card text-center shadow">
                <div className="card-header">
                  <br></br><br/>
                  <h4 className="fw-normal">Tier 1</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    <br></br><br/>1 PHP
                    <small className="text-muted fw-light">/month</small>
                  </h1>
                  <ul className="list-unstyled py-3">
                    <li>Enjoy limited stories from your favorite Authors.</li>
                    <li>For as low as 1 PHP per month.</li>
                    <li>Read more. Pay less.</li>
                    <li>Cancel your plan anytime.</li>
                  </ul>
                  {userInfo ? (
                    !userInfo.isSubscriber ? (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AUgpEmZhBp5JIEIFTUcY2fCqZGncGEduE2tq8suRS39oXl768r0V30K8JwyfmFvjSLGr8kMFSZTJQ2R5",
                          components: "buttons",
                          intent: "subscription",
                          vault: true,
                        }}
                      >
                        <ButtonWrapper type="subscription" />
                      </PayPalScriptProvider>
                    ) : (
                      <div />
                    )
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card text-center shadow">
                <div className="card-header">
                  <br />
                  <br></br>
                  <h4 className="fw-normal">Tier 2</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    <br></br>
                    <br />
                    PHP 150<small className="text-muted fw-light">/month</small>
                  </h1>
                  <ul className="list-unstyled py-3">
                    <li>Unlock more stories than ever before!</li>
                    <li>Billed 150 PHP per month.</li>
                    <li>Show your love and support through likes!</li>
                    <li>Cancel your plan anytime.</li>
                  </ul>
                  {userInfo ? (
                    !userInfo.isSubscriber ? (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AUgpEmZhBp5JIEIFTUcY2fCqZGncGEduE2tq8suRS39oXl768r0V30K8JwyfmFvjSLGr8kMFSZTJQ2R5",
                          components: "buttons",
                          intent: "subscription",
                          vault: true,
                        }}
                      >
                        <ButtonWrapper1 type="subscription" />
                      </PayPalScriptProvider>
                    ) : (
                      <div />
                    )
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card text-center shadow">
                <div className="card-header">
                  <br /><br/>
                  <h4 className="fw-normal">Tier 3</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    <br /><br/>
                    PHP 200<small className="text-muted fw-light">/month</small>
                  </h1>
                  <ul className="list-unstyled py-3">
                    <li>Unlimited stories. Anytime. Anywhere.</li>
                    <li>Billed 200 PHP per month.</li>
                    <li>
                      how your love and support through likes and comments!
                    </li>
                    <li>Cancel your plan anytime.</li>
                  </ul>
                  {userInfo ? (
                    !userInfo.isSubscriber ? (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AUgpEmZhBp5JIEIFTUcY2fCqZGncGEduE2tq8suRS39oXl768r0V30K8JwyfmFvjSLGr8kMFSZTJQ2R5",
                          components: "buttons",
                          intent: "subscription",
                          vault: true,
                        }}
                      >
                        <ButtonWrapper2 type="subscription" />
                      </PayPalScriptProvider>
                    ) : (
                      <div />
                    )
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default PlanScreen;
