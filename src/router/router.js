import Login from "@/pages/User/index.jsx";
import Home from "@/pages/Home/index.jsx";
import Board from "@/pages/Board/index.jsx";
import Post from "@/pages/Post/index.jsx";
const routes = [
  {
    path: "/login",
    element: <Login />,
    name: "登录",
    auth: false,
  },
  {
    path: "/home",
    element: <Home />,
    name: "主页",
    auth: false,
  },
  {
    path: "/board/:boardId",
    element: <Board />,
    name: "板块",
    auth: false,
  },
  {
    path: "/post/:topicId",
    element: <Post />,
    name: "帖子",
    auth: false,
  },
];

export default routes;
