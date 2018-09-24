import React from "react"
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import { Link } from 'react-router-dom'
import "./css.scss"
import {
    Icon
} from "antd"

class TopNav extends React.Component {

    constructor(props) {
        super(props);
    }
    json = [
        {
            name: "首页",
            url: "/",
            icon: "home"
        },
        {
            name: "分类",
            url: "/classify",
            icon: "bars"
        },
        {
            name: "关于",
            url: "/about ",
            icon: "user"
        },
    ]
    render() {
        let {isFixed} = this.props ;
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
                                <Link to={v.url}> <Icon type={v.icon} theme="outlined" style={{marginRight:"5px"}}/>{v.name}</Link>
                            </li>
                        })
                    }
                </ul>
            </nav>
        );
    }
}
const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps, dispatchAction)(TopNav)