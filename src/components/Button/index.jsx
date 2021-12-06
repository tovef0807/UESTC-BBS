import React from "react";
import { Tooltip } from "antd";
import './index.less'

export default function CButton(props) {
    const { children, icon, tips, placement, onClick } = props;

    return tips ? (
        <Tooltip title={tips} placement={placement || 'bottomLeft'}>
            <div className="radius-btn" onClick={onClick}>
                <span>{icon}</span>
                <span className="text">{children}</span>
            </div>
        </Tooltip>
    ) : (
        <div className="radius-btn" onClick={onClick}>
            <div style={{ marginRight: "8px" }}>{icon}</div>
            <span className="text">{children}</span>
        </div>
    );
}
