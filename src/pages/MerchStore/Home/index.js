import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";
import { Container, Row, Col } from "reactstrap";

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
          <Row className="mb-5">
            <Col className="feature-products-container mt-4">
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
                style={{ width: "100%" }}
              >
                {(() => {
                  const hasMore = products.length > 6;
                  const list = hasMore ? products.slice(0, 6) : products;

                  return (
                    list.length > 0 &&
                    list.map((item, index) => {
                      const showViewMore = hasMore && index === 5; // 6th tile

                      return (
                        <div
                          key={index}
                          className="listing-tem"
                          style={{ width: "100%" }}
                        >
                          {showViewMore ? (
                            <a
                              href="/catalog"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: 260,
                                borderRadius: 12,
                                textDecoration: "none", // remove default underline
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: "#cd3957",
                                  fontSize: 14,
                                  borderBottom: "2px dotted #cd3957", // broken underline
                                  paddingBottom: 4,
                                }}
                              >
                                View More ({products.length - 6}+)
                              </span>
                            </a>
                          ) : (
                            <>
                              <div
                                className="product-thumbnail-listing2"
                                style={{ backgroundColor: "#ddd1c0" }}
                              >
                                <a href={`/product/${item["Product ID"]}`}>
                                  {item?.Images && item.Images.length > 0 ? (
                                    <img
                                      src={item.Images[0].url}
                                      alt={item["Product Name"]}
                                      className="catalog-image"
                                      height={200}
                                      width={200}
                                    />
                                  ) : (
                                    <div style={{ height: 200, width: 200 }} />
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
                                        boxShadow:
                                          "0 4px 12px rgba(0,0,0,0.12)",
                                      }}
                                    >
                                      <i
                                        className="bx bx-plus"
                                        style={{ fontSize: 24, color: "#FFF" }}
                                      />
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
                                    ₱{" "}
                                    {item?.Price
                                      ? parseInt(item.Price).toLocaleString(
                                          "en-US"
                                        )
                                      : "0.00"}{" "}
                                    PHP
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  );
                })()}
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
