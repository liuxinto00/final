import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Row, Pagination } from "antd";
import PostCard from "../../components/PostCard/PostCard";
import "./houseListPage.css";
import { getImageUrl, imageSize } from "../imageProcessing";
import "antd/dist/antd.css";
import { Layout } from "antd";
import NavBar from "../../components/navBar";

const { Header, Content } = Layout;

const HouseListPage = (props) => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(-1);

  const handleChange = (newPosts, newTotalPages, newCurrentPage) => {
    setCurrentPage(newCurrentPage);
    setPosts(newPosts);
    setTotalPages(newTotalPages);
  };

  const handleSort = (event) => {
    if (event.target.value === "lowest") {
      // lowest price first
      console.log("lowest");
      posts.sort((a, b) => {
        return a.price - b.price;
      });
      setPosts([...posts]);
    } else if (event.target.value === "highest") {
      // highest price first
      console.log("highest");
      posts.sort((a, b) => {
        return b.price - a.price;
      });
      setPosts([...posts]);
    }
  };

  const fetchHousings = async () => {
    try {
      console.log(`fetch url: ${"/posts" + location.search}`);
      const resp = await fetch("/posts" + location.search);
      const respJson = await resp.json();
      console.log(respJson);
      const params = new URLSearchParams(location.search);
      handleChange(
        respJson.apartments,
        parseInt(respJson.pages),
        parseInt(params.get("page"))
      );
      console.log(
        `url(${getImageUrl(
          respJson.apartments[0].images[0],
          imageSize.MEDIUM
        )})`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const pageUrl = (pageNum) => {
    if (pageNum < 1) {
      pageNum = 1;
    }

    if (pageNum > totalPages) {
      pageNum = totalPages;
    }

    const params = new URLSearchParams(location.search);
    params.set("page", pageNum);

    return params.toString();
  };

  useEffect(() => {
    fetchHousings();
  }, []);
//might want to work ont the layout here so it looks a bit more proessional. THe orange writing makes it a bit off.
  return (
    <Layout>
      <Header style={{ background: "#fcaf58" }}>
        <NavBar user={props.user} />
      </Header>

      <Content>
        <Row>
          <div style={{ padding: "10px", margin: "0 0 0 20px" }}>
            <span style={{ margin: "0 10px 0 0" }}>Sort by:</span>
            <select onChange={handleSort} className="dropdown-main">
              <option value="lowest">Lowest price</option>
              <option value="highest">Highest price</option>
            </select>
          </div>
          <br />
        </Row>
        <Row>
          {posts.map((post, idx) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Row>
        <Row justify="center">
          <Pagination>
            <Pagination.First href={`/posts?${pageUrl(1)}`} />
            <Pagination.Prev href={`/posts?${pageUrl(currentPage - 1)}`} />
            <Pagination.Item active href={`/posts?${pageUrl(currentPage)}`}>
              {currentPage}
            </Pagination.Item>
            <Pagination.Next href={`/posts?${pageUrl(currentPage + 1)}`} />
            <Pagination.Last href={`/posts?${pageUrl(totalPages)}`} />
          </Pagination>
        </Row>
      </Content>
    </Layout>
  );
};

export default HouseListPage;
