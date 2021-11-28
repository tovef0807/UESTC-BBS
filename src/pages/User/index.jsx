import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userLogin } from "@/api/user";
import { useNavigate } from 'react-router-dom';
import "./index.less";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  onFinish = (values) => {
    userLogin(values).then((res) => {

      const { secret, token, ...userInfo } = res;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("accessSecret", secret);
      this.setState({
        userInfo,
      });
    });
  };
  render() {
    return (
      <div id="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/login">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/login">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
