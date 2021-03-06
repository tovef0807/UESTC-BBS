import React, { useState, useEffect, createElement } from "react";
import { useParams } from "react-router-dom";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {
    Row,
    Col,
    List,
    Tooltip,
    Space,
    Comment,
    Avatar,
    Image,
    BackTop,
    notification,
    Divider,
    Drawer,
    Button,
    Checkbox
} from "antd";
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    ShareAltOutlined,
    TagsFilled,
    HeartFilled,
    RobotFilled,
} from "@ant-design/icons";
import { postlist, postNew } from "@/api/forum";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import CButton from "@/components/Button";
import "./index.less";
import htmr from 'htmr';

const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media', 'text-align']
export default function Post() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState({
        content: [{}],
        title: "",
        zanList: [],
    });
    const [replyList, setReplyList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(0);
    const [action, setAction] = useState(null);
    const [replyVisible, setReplyVisible] = useState(false);
    const [notity, setNotity] = useState(false)
    const [replyText, setReplyText] = useState('')
    useEffect(() => {
        loadMoreData();
    }, []);
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        postlist({
            topicId,
            page,
            pageSize: 50,
        }).then((res) => {
            if (res.topic) {
                setTopic(res.topic);
            }
            const resList = res.list.map((l) => {
                l.actions = [
                    <Tooltip key="comment-basic-like" title="Like">
                        <span>
                            {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
                            <span className="comment-action"></span>
                        </span>
                    </Tooltip>,
                    <Tooltip key="comment-basic-dislike" title="Dislike">
                        <span>
                            {React.createElement(
                                action === "disliked" ? DislikeFilled : DislikeOutlined
                            )}
                            <span className="comment-action"></span>
                        </span>
                    </Tooltip>,
                    <span key="comment-basic-reply-to">Reply to</span>,
                ];
                return l;
            });
            setReplyList([...replyList, ...resList]);
            setHasMore(res.has_next === 1);
            setLoading(false);
            setPage(res.page + 1);
            // notification.info({
            //     message: '????????????',
            //     description:
            //         'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            //     placement: 'bottomRight',
            //     duration: null
            // });
        });
    };
    const onClose = () => {
        setReplyVisible(false);
    }
    const onClickReply = () => {
        setReplyVisible(true)
    }
    const onCheckNotity = (e) => {
        setNotity(e.target.checked)
    }
    const onReply = () => {

    }
    const handleReplyChange = (text) => {
        console.log(text.toHTML());
        setReplyText(text)
    }
    const formatContent = (content) => {
        if (!content) return ''

        const reg = /\[mobcent_phiz=.*?\]/g;
        content = content.replace(reg, (match) => {
            let img = match.replace('[mobcent_phiz=', '')
            img = img.replace(']', '')
            return `<img src=${img} alt='' style="vertical-align:bottom;margin: 0 2px"/>`
        });
        return htmr(`<div >${content}</div>`)
    }
    return (
        <main id="post-container">
            <Row style={{ height: "100%" }}>
                <Col span={8} style={{ height: "100%" }}>
                    <div className="topic">
                        <div className="topic-title">{topic.title}</div>
                        <div className="topic-content">
                            <div className="topic-content-avatar">
                                <Avatar size="large" src={<Image src={topic.icon} />} />
                                <span className="nickname">{topic.user_nick_name}</span>
                            </div>
                            <div className="topic-content-context">
                                {topic.content[0].infor}
                            </div>
                            <div className="topic-actions">
                                <CButton tips="??????" icon={<HeartFilled />}>{topic.zanList.length}</CButton>
                                <CButton tips="??????" icon={<ShareAltOutlined />}></CButton>
                                <CButton tips="??????" icon={<TagsFilled />}></CButton>
                                <CButton tips="????????????" icon={<RobotFilled />} onClick={onClickReply}>??????</CButton>
                            </div>
                        </div>
                        <div className="topic-footer">
                            <Row className="status">
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">??????</span>
                                        <span>{topic.replies}</span>
                                    </Space>
                                </Col>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">??????</span>
                                        <span>{topic.hits}</span>
                                    </Space>
                                </Col>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">??????</span>
                                        <span>{topic.zanList.length}</span>
                                    </Space>
                                </Col>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <span className="status-title">????????????</span>
                                        <span>{topic.hits}</span>
                                    </Space>
                                </Col>
                            </Row>
                            <Avatar.Group className="users">
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                                <Avatar style={{ backgroundColor: "#1890ff" }} />
                            </Avatar.Group>
                        </div>
                    </div>
                </Col>
                <Col
                    span={16}
                    style={{ padding: "0 24px", height: "100%", overflow: "auto" }}
                    id="listContainer"
                >
                    <InfiniteScroll
                        dataLength={replyList.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        endMessage={<Divider plain>?????????????????????~emo ????</Divider>}
                        scrollableTarget="listContainer"
                    >
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={replyList}
                            renderItem={(item) => (
                                <li>
                                    <Comment
                                        actions={item.actions}
                                        author={item.reply_name}
                                        avatar={item.icon}
                                        content={formatContent(item.reply_content[0].infor)}
                                        datetime={
                                            <Tooltip
                                                title={moment(+item.posts_date).format(
                                                    "YYYY-MM-DD HH:mm:ss"
                                                )}
                                            >
                                                <span>{moment(+item.posts_date).fromNow()}</span>
                                            </Tooltip>
                                        }
                                    />
                                </li>
                            )}
                        />
                    </InfiniteScroll>
                    <BackTop target={() => document.getElementById("listContainer")} />
                </Col>
            </Row>
            <Drawer
                title={topic.title}
                placement="right"
                size='large'
                onClose={onClose}
                visible={replyVisible}
            >
                <BraftEditor
                    style={{ height: '600px', border: '1px solid #f0f0f0' }}
                    controls={controls}
                    placeholder="?????????????????????"
                    value={replyText}
                    onChange={handleReplyChange}
                />
                <div style={{ marginTop: "12px" }}><Checkbox onChange={onCheckNotity}>???????????????????????????</Checkbox></div>
                <div className="reply-btns">
                    <Space>
                        <Button size='large'>??????</Button>
                        <Button size='large' type="primary" onClick={onReply}>??????</Button>
                    </Space>
                </div>
            </Drawer>
        </main>
    );
}
