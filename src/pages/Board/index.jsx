import React, { useState, useEffect } from "react";
import {
    useParams,
} from "react-router-dom";
import { Row, Col, Button, Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { topiclist } from "@/api/forum";
import "./index.less";

const columns = [
    {
        title: 'TOPIC',
        dataIndex: 'title',
    },
    {
        title: 'USERS',
        dataIndex: 'age',
    },
    {
        title: 'REPLIES',
        dataIndex: 'replies',
    },
    {
        title: 'VIES',
        dataIndex: 'hits',
    }
];

export default function Board() {
    const { boardId } = useParams()
    const [topics, setTopics] = useState([]);
    const [forumInfo, setForumInfo] = useState({});
    const [pagination, setPagination] = useState({})
    useEffect(() => {
        topiclist({
            boardId,
            page: 1,
            pageSize: 50,
            topOrder: 1,
        }).then((res) => {
            setForumInfo(res.forumInfo)
            const { list, page, total_num } = res;
            let topics = list.map(item => {
                item.key = item.topic_id;
                return item;
            })
            setTopics(topics);
            setPagination({
                current: page,
                total: total_num,
                pageSize: 50
            })
        });
    }, [])


    return (
        <main id="board-container">
            <div className="board-header">
                <div className="board-header-card">
                    {forumInfo.title}
                </div>
            </div>
            <Row>
                <Col span={4}>
                    <Space>
                        <Button type="text">LATEST</Button>
                        <Button type="text">POPULAR</Button>
                    </Space>
                </Col>
                <Col span={4} offset={16} style={{ textAlign: 'right' }}>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        New Topic
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={topics} pagination={pagination} size="large" style={{ marginTop: '18px' }} />
        </main>
    );
}
