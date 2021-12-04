import React, { useState } from "react";
import {
    Layout,
    Input,
    Avatar,
    Image,
    Button,
    Dropdown,
    Menu,
    Space,
} from "antd";
import {
    MenuOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./layout.less";
const { Header } = Layout;
const avatarUrl =
    "https://bbs.uestc.edu.cn/uc_server/avatar.php?uid=191750&size=middle";
export default function BaseHeader() {
    const [userName, setUserName] = useState('tovef');
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/1">
                    <Space>
                        <UserOutlined />
                        个人中心
                    </Space>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/2">
                    <Space>
                        <SettingOutlined />
                        个人设置
                    </Space>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/">
                    <Space>
                        <LogoutOutlined />
                        退出登录
                    </Space>
                </Link>
            </Menu.Item>
        </Menu>
    );
    const navigate = useNavigate();
    const navToHome = () => {
        navigate('/home')
    }
    return (
        <Header className="base-header">
            <div className="logo" onClick={navToHome}>清水河畔</div>
            <div className="serach-area">
                <Input placeholder="Borderless" bordered={false} />
            </div>
            <div className="user-info">
                <Space>
                    <Avatar src={<Image src={avatarUrl} style={{ width: 32 }} />} />
                    {userName}
                </Space>

                <Dropdown overlay={menu} placement="bottomRight">
                    <Button shape="circle" icon={<MenuOutlined />} />
                </Dropdown>
            </div>
        </Header>
    );
}
