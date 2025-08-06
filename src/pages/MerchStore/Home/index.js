import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";
import { Button, Container, Row, Col } from "reactstrap";
import deliveryBan from "../../../assets/images/delivery-ban.png";
import securePayment from "../../../assets/images/secure-payment.png";

const Home = ({ app, authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "Seoulful Sweets | Home";
  const { products } = app;

  const [bannerAds, setBannerAds] = React.useState(null);
  const [heroBannerAds, setHeroBannerAds] = React.useState(null);

  React.useEffect(() => {
    app.campaignData.length > 0 && bannerAdsHandler();
  }, [app]);

  React.useEffect(() => {
    console.log("app.products", app.products);
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    await props.actionCreator({
      type: types.GET_CAMPAIGN,
    });
  };

  const bannerAdsHandler = () => {
    setBannerAds(
      app.campaignData
        .filter(
          (item) =>
            item?.CampainCategory && item.CampainCategory === "banner ads"
        )
        .map((banner) => banner)[0] || []
    );

    setHeroBannerAds(
      app.campaignData
        .filter(
          (item) =>
            item?.CampainCategory && item.CampainCategory === "hero banner"
        )
        .map((banner) => banner)[0] || []
    );
  };

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-custom-content"
        style={{
          margin: 0,
          backgroundColor: "#ddd1c0",
        }}
      >
        <Container
          style={{
            padding: 0,
          }}
        >
          <Row>
            <Col className="feature-products-container mt-4">
              {/* <h5>Featured Products</h5>
              <div className="feature-products">
                {app.products.length > 0 &&
                  app.products.map((item, index) => (
                    <div key={index} className="feature-product-item">
                      {item?.Images ? (
                        <img
                          className="feature-image"
                          src={item.Images[0].url}
                        />
                      ) : (
                        <p className="text-muted">No Image</p>
                      )}
                      <Button
                        type="button"
                        style={{
                          backgroundColor: "#cd3957",
                          borderColor: "#cd3957",
                          marginLeft: 10,
                          marginRight: 10,
                          borderRadius: 8,
                          paddingTop: 12,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        color="primary"
                        onClick={() => {
                          navigate(`/product/${item["Product ID"]}`);
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                          }}
                        >
                          {item["Product Name"]}{" "}
                        </span>
                        <span>
                          <i
                            className="dripicons-plus"
                            style={{
                              fontWeight: 700,
                              fontSize: 16,
                            }}
                          ></i>
                        </span>
                      </Button>
                    </div>
                  ))}
              </div> */}
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "2.25em",
                  color: "#cd3957",
                  textTransform: "uppercase",
                  lineHeight: 1.1111111,
                }}
              >
                Our Drinks
              </h1>
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-8"
                style={{
                  width: "100%",
                }}
              >
                {products.map((item, index) => (
                  <div
                    key={index}
                    className="listing-tem"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      className="product-thumbnail-listing2"
                      style={{ backgroundColor: "#ddd1c0" }}
                    >
                      <a href={`/product/${item["Product ID"]}`}>
                        {item.Images.length > 0 && (
                          <img
                            src={item.Images[0].url}
                            alt={item["Product Name"]}
                            className="catalog-image"
                            height={200}
                            width={200}
                          />
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-light waves-effect waves-light adjust-product-button px-2"
                            style={{
                              backgroundColor: "#cd3957",
                              borderColor: "#cd3957",
                            }}
                          >
                            <i
                              className="bx bx-plus"
                              style={{
                                fontSize: 24,
                                color: "#FFF",
                              }}
                            ></i>
                          </button>
                        </div>
                      </a>
                    </div>

                    <div
                      className="product-name product-list-name mb-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <a
                        href={`/product/${item["Product ID"]}`}
                        className="font-bold hover:underline h5"
                      >
                        <span className="product-name ">
                          {item["Product Name"]}
                        </span>
                      </a>
                    </div>
                    <div
                      className="product-price-listing"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <span className="sale-price font-semibold">
                          ₱ {parseInt(item.Price).toLocaleString("en-US")} PHP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xxl={4} xl={4} md={4} className="mb-4">
              {heroBannerAds && heroBannerAds?.Image && (
                <img
                  src={heroBannerAds.Image[0]?.url || ""}
                  className="banner-ads"
                  alt="Hero Banner"
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, authentication }) => ({ app, authentication });

export default connect(mapStateToProps, { actionCreator })(Home);
