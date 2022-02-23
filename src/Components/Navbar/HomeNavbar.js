import "./HomeNavbar.css";

import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../Assets/logo5.PNG";

export default function HomeNavbar(props) {
  const { stravaUserData, lastFmUserData } = props;

  return (
    <>
      <Navbar className="color-nav" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="200"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {stravaUserData ? (
              <Navbar.Text>
                Strava:{" "}
                <a href="#login">
                  {stravaUserData.firstname} {stravaUserData.lastname}{" "}
                </a>
              </Navbar.Text>
            ) : (
              "Connect Strava"
            )}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {lastFmUserData ? (
              <Navbar.Text>
                LastFm: <a href="#login">{lastFmUserData.name}</a>
              </Navbar.Text>
            ) : (
              "Connect LastFm"
            )}
          </Navbar.Collapse>
        </Container>{" "}
      </Navbar>
    </>
  );
}
