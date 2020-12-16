import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import "./homePage.css";
import { SearchOutlined } from "@ant-design/icons";
import NavBar from "../../components/navBar";
import { Layout } from "antd";

const { Header, Content } = Layout;

const HomePage = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  //I need to learn how to use this local storage thing. I've seen n it and it seems liek a good idea
  if (username !== null && username !== undefined) {
    localStorage.setItem("username", username);
  }
  const [roomNum, setRoomNum] = useState("1");
  const [minPrice, setMinPrice] = useState("---");
  const [maxPrice, setMaxPrice] = useState("---");
  const [neighbor, setNeighbor] = useState("");
  // const roomNumRef = useRef();
  // const minPriceRef = useRef();
  // const maxPriceRef = useRef();
  const history = useHistory();

  const handleSearch = () => {
    let minIntPrice;
    let maxIntPrice;

    if (minPrice === "") {
      minIntPrice = 0;
    } else {
      minIntPrice = parseInt(minPrice.substring(1));
    }

    if (maxPrice === "") {
      maxIntPrice = 10000000;
    } else {
      maxIntPrice = parseInt(maxPrice.substring(1));
    }

    const url = `/posts?neighborhood=${encodeURIComponent(
      neighbor
    )}&rooms=${encodeURIComponent(roomNum)}&minPrice=${encodeURIComponent(
      minIntPrice
    )}&maxPrice=${encodeURIComponent(maxIntPrice)}&page=${encodeURIComponent(
      1
    )}`;

    history.push(url);
  };
//very creative layout. Takes you through kind of a story.
  return (
    <Layout>
      <Header style={{ background: "#fcaf58" }}>
        <NavBar user={props.user} />
      </Header>
      <div className="back">
        <Content>
          <Container fluid className="homepage-container">
            <Container>
              <Row>
                <Col xs={{ span: 6, offset: 2 }} className="p-0">
                  <div className="welcome">Dear {props.user}, </div>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 6, offset: 2 }} className="p-0">
                  <h1 className="subwelcome">
                    Moving is a start of a new journey.
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 6, offset: 2 }} className="p-0">
                  <h1 className="subwelcome">
                    Today, let me help you find your new place.{" "}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={{ span: 6, offset: 2 }}
                  className="search-form-container p-2 search-form-container"
                >
                  <Form>
                    <Form.Row>
                      <Col xs={{ span: 12 }}>
                        <Form.Group controlId="address">
                          <label
                            for="inputAddress"
                            style={{
                              fontFamily:
                                "Brush Script MT, Brush Script Std, cursive",
                              fontSize: "30px",
                            }}
                          >
                            Neighborhood
                            <Form.Control
                              type="neighbor"
                              placeholder="San Francisco"
                              onChange={(evt) => setNeighbor(evt.target.value)}
                            />
                          </label>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col xs={{ span: 6 }}>
                        <Form.Group controlId="room">
                          <Form.Label
                            style={{
                              fontFamily:
                                "Brush Script MT, Brush Script Std, cursive",
                              fontSize: "30px",
                            }}
                          >
                            Bedroom number:
                          </Form.Label>
                          <Form.Control
                            as="select"
                            size="sm"
                            custom
                            onChange={(evt) => setRoomNum(evt.target.value)}
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId="price-from-group">
                          <Form.Label
                            style={{
                              fontFamily:
                                "Brush Script MT, Brush Script Std, cursive",
                              fontSize: "30px",
                            }}
                          >
                            From :
                          </Form.Label>
                          <Form.Control
                            as="select"
                            size="sm"
                            custom
                            onChange={(evt) => setMinPrice(evt.target.value)}
                          >
                            <option>$0</option>
                            <option>$1000</option>
                            <option>$1500</option>
                            <option>$2000</option>
                            <option>$2500</option>
                            <option>$2500</option>
                            <option>$3000</option>
                            <option>$3500</option>
                            <option>$4000</option>
                            <option>$4500</option>
                            <option>$5000</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="price-to-group">
                          <Form.Label
                            style={{
                              fontFamily:
                                "Brush Script MT, Brush Script Std, cursive",
                              fontSize: "30px",
                            }}
                          >
                            To :
                          </Form.Label>
//I think you can set the inputs to numbers instead of strings so that later you don't have to parse it.
                          <Form.Control
                            as="select"
                            size="sm"
                            custom
                            onChange={(evt) => setMaxPrice(evt.target.value)}
                          >
                            <option>$1000</option>
                            <option>$1500</option>
                            <option>$2000</option>
                            <option>$2500</option>
                            <option>$2500</option>
                            <option>$3000</option>
                            <option>$3500</option>
                            <option>$4000</option>
                            <option>$4500</option>
                            <option>$5000</option>
                            <option>$5500</option>
                            <option>$6000</option>
                            <option>---</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    <Row>
                      <Col xs={{ offset: 10 }}>
                        <Tooltip title="search">
                          <Button
                            shape="circle"
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <Row>
                <Col xs={{ span: 6, offset: 7 }} className="p-0">
                  <h1 className="subwelcome">Best,</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 6, offset: 5 }} className="p-0">
                  <h1 className="subwelcome">Your friend, Xintong</h1>
                </Col>
              </Row>
            </Container>
          </Container>
        </Content>
      </div>
    </Layout>
  );
};

export default HomePage;
