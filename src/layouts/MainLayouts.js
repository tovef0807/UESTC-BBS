import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import routes from "../router/router";

const { Header, Content, Footer } = Layout;
const menus = routes.map((menu) => {
  return (
    <Link to={menu.path} key={menu.path}>
      {menu.name}
    </Link>
  );
});

const pages = routes.map((menu) => {
  return <Route path={menu.path} element={menu.element} key={menu.path} />;
});

export class MainLayouts extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">{menus}</Menu.Item>
            </Menu>
          </Header>
          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, height: "100%" }}
            >
              <Routes>{pages}</Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    );
  }
}
