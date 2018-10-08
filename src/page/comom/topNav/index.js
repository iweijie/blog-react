import React from "react"
import { Link } from 'react-router-dom'
import "./css.scss"
import {
    Icon
} from "antd"

class TopNav extends React.PureComponent {

    constructor(props) {
        super(props);
    }
    json = [
        {
            name: "首页",
            url: "/",
            icon: "home"
        },
        // {
        //     name: "分类",
        //     url: "/classify",
        //     icon: "bars"
        // },
        {
            name: "设置",
            url: "/set",
            icon: "setting"
        },
        {
            name: "关于",
            url: "/about ",
            icon: "user"
        },
        {
            name: "登入",
            url: "/login",
            icon: "login"
        },
    ]
    render() {
        let { isFixed } = this.props;
        let className = isFixed ? "top-nav-fixed top-nav" : "top-nav"
        return (
            <nav>
                <ul className={className}>
                    {
                        isFixed ? <h2 className="name">weijie</h2> : null
                    }
                    {
                        this.json.map((v) => {
                            return <li key={v.url}>
                                <Link to={v.url}> <Icon type={v.icon} theme="outlined" style={{ marginRight: "5px" }} />{v.name}</Link>
                            </li>
                        })
                    }
                </ul>
            </nav>
        );
    }
}
export default TopNav