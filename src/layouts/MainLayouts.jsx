import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import routes from "../router/router";
import BaseHeader from "./BaseHeader.jsx";
import "./layout.less";

const { Content, Footer } = Layout;

const pages = routes.map((menu) => {
  return <Route path={menu.path} element={menu.element} key={menu.path} />;
});

export default function MainLayouts() {
  return (
    <Router>
      <Layout style={{ background: "#fff" }} id="main-layout">
        <BaseHeader />
        <Content
          className="main-layout-content"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/home">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Board</Breadcrumb.Item>
            <Breadcrumb.Item>Post</Breadcrumb.Item>
          </Breadcrumb>
          <div className="content">
            <Routes>{pages}</Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          电子科技大学 校园论坛@By TOVEF 2021
        </Footer>
      </Layout>
    </Router>
  );
}
