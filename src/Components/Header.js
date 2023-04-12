import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../bootstrap.min.css";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            ScriptInk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                to="/"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fa fa-home" aria-hidden="true"></i> Home
              </Link>
              <Link
                to="/faq"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fas fa-question-circle" aria-hidden="true"></i> FAQ
              </Link>
              <Link
                to="/genre"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fa fa-list-ul" aria-hidden="true"></i> Genre
              </Link>
              {userInfo ? (
                <Link
                  to="/content/user"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa fa-list-ul" aria-hidden="true"></i> My Content
                </Link>
              ) : (
                <div />
              )}
              {userInfo ? (
                <DropdownButton
                  variant="black"
                  title={
                    <>
                      <i class="fa fa-book" aria-hidden="true"></i>
                      <span style={{ marginLeft: "5px" }}>Read Now</span>
                    </>
                  }
                  id="content-dropdown"
                  style={{ color: "#FFF" }}
                >
                  <Dropdown.Item href="/contents/tier/1">Tier 1</Dropdown.Item>
                  <Dropdown.Item href="/contents/tier/2">Tier 2</Dropdown.Item>
                  <Dropdown.Item href="/contents/tier/3">Tier 3</Dropdown.Item>
                </DropdownButton>
              ) : (
                <div />
              )}

              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/contents"
                    type="button"
                    class="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i class="fa fa-list-ul" aria-hidden="true"></i> All
                    Contents
                  </Link>
                )
              ) : (
                <div />
              )}
              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/userlist"
                    type="button"
                    class="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i class="fa fa-list-ul" aria-hidden="true"></i> User List
                  </Link>
                )
              ) : (
                <div />
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Link
                to="/plans"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fas fa-ticket-alt"></i> Plans
              </Link>
              {userInfo ? (
                <Link
                  to="/userprofile"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> {userInfo.first_name} {""}
                  {userInfo.last_name}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa-solid fa-user-plus"></i> Sign up
                </Link>
              )}
              {userInfo ? (
                <Link
                  to="/logout"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
