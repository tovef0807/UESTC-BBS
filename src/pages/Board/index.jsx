import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Space, Table, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { topiclist } from "@/api/forum";
import { Link } from "react-router-dom";
import "./index.less";

const { Column, ColumnGroup } = Table;
const colors = [
    "#fa8c16",
    "#1890ff",
    "#a0d911",
    "#13c2c2",
    "#f5222d",
    "#722ed1",
    "#fa541c",
    "#faad14",
    "#eb2f96",
];
const columns = [
    {
        title: "TOPIC",
        dataIndex: "title",
        key: "title",
        render: (title, record) => {
            return <Link to={`/post/${record.topic_id}`}>{title}</Link>;
        },
    },
    {
        title: "分类",
        key: "category",
        dataIndex: "category",
        render: (category) => {
            return <Tag color="blue">{category}</Tag>;
        },
    },
    {
        title: "USERS",
        key: "age",
        dataIndex: "age",
    },
    {
        title: "REPLIES",
        key: "replies",
        dataIndex: "replies",
    },
    {
        title: "VIES",
        key: "hits",
        dataIndex: "hits",
    },
];

export default function Board() {
    const { boardId } = useParams();
    const [topics, setTopics] = useState([]);
    const [forumInfo, setForumInfo] = useState({});
    const [pagination, setPagination] = useState({});
    const [categorys, setCategorys] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchBoardList();
    }, []);

    const fetchBoardList = (page = 1, pageSize = 20) => {
        setLoading(true)
        topiclist({
            boardId,
            page,
            pageSize,
            topOrder: 1,
        }).then((res) => {
            setForumInfo(res.forumInfo);
            const { list, page, total_num, classificationType_list } = res;
            let topics = list.map((item) => {
                item.key = item.topic_id;
                let reg = /^\[(.*?)\]/g;
                let category = item.title.match(reg);
                if (category && category[0]) {
                    item.category = category[0].replace(/\[|\]/g, '')
                }
                item.title = item.title.replace(reg, '');
                return item;
            });
            setTopics(topics);
            setPagination({
                current: page,
                total: total_num,
                pageSize,
            });
            const categorys = classificationType_list.map((c) => {
                return (
                    <Tag
                        className="board-tag"
                        color={colors[Math.floor(Math.random() * 9)]}
                        key={c.classificationType_id}
                        onClick={onClickTag(c.classificationType_id)}
                    >
                        {c.classificationType_name}
                    </Tag>
                );
            });
            setCategorys(categorys);
        }).finally(() => {
            setLoading(false)
        });
    }

    const onClickTag = (id) => { };
    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;
        fetchBoardList(current, pageSize);
    }
    return (
        <main id="board-container">
            <div className="board-header">
                <div className="board-header-card">{forumInfo.title}</div>
            </div>
            <Row>
                <Col span={4}>
                    <Space>
                        <Button type="text">LATEST</Button>
                        <Button type="text">POPULAR</Button>
                    </Space>
                </Col>
                <Col span={4} offset={16} style={{ textAlign: "right" }}>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        New Topic
                    </Button>
                </Col>
            </Row>
            {categorys}
            <Table
                columns={columns}
                rowKey={record => record.topic_id}
                dataSource={topics}
                pagination={pagination}
                size="large"
                style={{ marginTop: "18px" }}
                onChange={handleTableChange}
                loading={loading}
            />
        </main>
    );
}
