import React from "react";
import { Layout } from "antd";

import "./layout.less";
const { Header } = Layout;

export default class BaseHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }
    render() {
        return (
            <Header
                className="header"
            >

            </Header>
        );
    }
}
