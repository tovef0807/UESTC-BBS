import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import routes from "../router/router";
import BaseHeader from "./BaseHeader.jsx";
import "./layout.less";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;
const breadcrumbNameMap = {
  '/home': '',
  '/board/174': '就业创业',
  '/post': '帖子',
};

const pages = routes.map((menu) => {
  return <Route path={menu.path} element={menu.element} key={menu.path} />;
});

// const MyBreadcrumb = () => {
//   const { pathname } = useLocation();
//   console.log(breadcrumbNameMap[pathname], pathname);
//   const extraBreadcrumbItems = () => {
//     return (
//       <Breadcrumb.Item key={pathname}>
//         <Link to={pathname}>{breadcrumbNameMap[pathname]}</Link>
//       </Breadcrumb.Item>
//     );
//   };
//   const breadcrumbItems = [
//     <Breadcrumb.Item key="home">
//       <Link to="/home"><HomeOutlined /></Link>
//     </Breadcrumb.Item>,
//   ].concat(extraBreadcrumbItems);
//   return <Breadcrumb style={{ margin: "16px 0" }}>
//     {breadcrumbItems}
//   </Breadcrumb>
// }
export default function MainLayouts() {

  return (
    <Router>
      <Layout style={{ background: "#fff" }} id="main-layout">
        <BaseHeader />
        <Content
          className="main-layout-content"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          {/* <MyBreadcrumb /> */}
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
