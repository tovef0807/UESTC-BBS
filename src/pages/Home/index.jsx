import React, { useState, useEffect } from "react";
import { Divider, Col, Row } from "antd";
import { forumlist } from "@/api/forum";
import BoardCard from "../../layouts/components/BoardCard";

import "./index.less";

export default function Board() {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        forumlist().then((res) => {
            const { list } = res;
            let boards = generateBoard(list);
            setBoards(boards);
        });
    });
    const generateBoard = (list) => {
        let boards = list.map((category) => {
            return (
                <div key={category.board_category_id}>
                    <Divider orientation="left">{category.board_category_name}</Divider>
                    <Row gutter={36}>
                        {category.board_list.map((board) => {
                            return (
                                <Col
                                    span={6}
                                    key={category.board_category_id + "-" + board.board_id}
                                >
                                    <BoardCard board={board} />
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            );
        });
        return boards;
    };
    return (
        <div id="home-container">
            {boards}
        </div>
    );
}
