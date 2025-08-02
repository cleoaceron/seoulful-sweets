import React, { useState } from "react";
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

// import images
import seoulfulCircleLogo from "../../assets/images/seoulful-logo-circle.png";
import seoulfulLogo from "../../assets/images/white-logo-ssweets.png";
import "./styles.css";

const Footer = (props) => {
  return (
    <React.Fragment>
      <div className="footerStore">
        <Container className="footer-wrapper">
          <Row>
            <Col lg={6} xxl={7} md={5} sm={12} className="leftFooter">
              <Link to="/home">
                <img
                  src={seoulfulLogo}
                  width={120}
                  height={120}
                  style={{
                    marginBottom: 15,
                  }}
                />
              </Link>
              {/* <p>96 Kamuning Road Quezon City inquiry@wearemerch.ph</p> */}
            </Col>
            <Col lg={6} xxl={5} md={7} sm={12} className="rightFooter">
              <ul className="footer-links">
                <li>
                  <Link to="/home" className="dropdown-item">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://bit.ly/3D4mPPq"
                    target="_blank"
                    className="dropdown-item"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="dropdown-item">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="dropdown-item">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/terms-condition" className="dropdown-item">
                    Terms And Condition
                  </Link>
                </li>
              </ul>
              <p
                style={{
                  marginLeft: 15,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <span>Follow us on{"  "}</span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link
                    to="https://www.facebook.com/share/16n9q7HeM2/?mibextid=wwXIfr"
                    className="dropdown-item"
                  >
                    <i
                      className="fab fa-facebook-f"
                      style={{ height: 15, width: 15, marginRight: 5 }}
                    ></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/seoulfulsweetsph/profilecard"
                    className="dropdown-item"
                  >
                    <i
                      className="fab fa-instagram"
                      style={{ height: 15, width: 15 }}
                    ></i>
                  </Link>
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Footer;
