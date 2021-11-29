import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Tooltip, Space, Comment, Avatar, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { postlist } from "@/api/forum";
import "./index.less";
import moment from 'moment';

export default function Post() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState({
        content: [{}],
        title: '',
        zanList: []
    });
    const [replyList, setReplyList] = useState([{
        posts_date: 0,
        reply_content: [{
            infor: ''
        }]
    }]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        postlist({
            topicId,
            page: 1,
            pageSize: 50,
        }).then((res) => {
            setTopic(res.topic);
            setReplyList(res.list);
            setTotal(res.page);
            setPage(res.total_num);
        });
    }, []);


    return (
        <main id="post-container">
            <Row style={{ height: '100%' }}>
                <Col span={8}>
                    <div className="topic">
                        <div className="topic-title">{topic.title}</div>
                        <div className="topic-content">
                            <div className="topic-content-avatar">
                                <Avatar
                                    size="large"
                                    src={<Image src={topic.icon} />}
                                />
                                <span className="nickname">{topic.user_nick_name}</span>
                            </div>
                            <div className="topic-content-context">
                                {topic.content[0].infor}
                            </div>
                        </div>
                        <div className="topic-footer">
                            <Row className="status">
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">回复</span>
                                        <span>{topic.replies}</span>
                                    </Space>
                                </Col>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">查看</span>
                                        <span>{topic.hits}</span>
                                    </Space>
                                </Col>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">点赞</span>
                                        <span>{topic.zanList.length}</span>
                                    </Space>
                                </Col>
                                <Col span={6}><Space direction="vertical">
                                    <span className="status-title">最近回复</span>
                                    <span>{topic.hits}</span>
                                </Space></Col>
                            </Row>
                            <Avatar.Group className="users">
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                <Avatar style={{ backgroundColor: '#1890ff' }} />
                            </Avatar.Group>
                        </div>
                    </div>
                </Col>
                <Col span={16} style={{ padding: '0 24px', height: '100%', overflow: 'auto' }}>
                    <List
                        className="comment-list"
                        itemLayout="horizontal"
                        dataSource={replyList}
                        renderItem={item => (
                            <li>
                                <Comment
                                    actions={item.actions}
                                    author={item.reply_name}
                                    avatar={item.icon}
                                    content={item.reply_content[0].infor}
                                    datetime={
                                        <Tooltip title={moment(+item.posts_date).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(+item.posts_date).fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                            </li>
                        )}
                    />
                </Col>
            </Row>
        </main>
    );
}
