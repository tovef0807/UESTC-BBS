import React from "react";
import { Space, Row, Col } from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";
import "./BoardCard.less";


export default class BoardCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }
    render() {
        const { board } = this.props;
        return (
            <main className="board-card">
                <Link to={`/board/${board.board_id}`} className="head-btn">{board.board_name}</Link>
                <div className="border-card-content">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space direction="vertical">
                                <span>今日发帖</span>
                                <span className="board-num">{board.td_posts_num}</span>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical">
                                <span>最近活跃</span>
                                <span className="board-num">{moment(parseInt(board.last_posts_date)).fromNow(true) + ' ago'}</span>
                            </Space>
                        </Col>
                    </Row>
                </div>
                <div className="border-card-footer ">
                    <Space direction="vertical">
                        <span>总发帖</span>
                        <span className="board-num">{board.topic_total_num}</span>
                    </Space>
                </div>
            </main>
        );
    }
}
