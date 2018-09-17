import React from "react"
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import { Link } from 'react-router-dom'
import "./css.css"
import {
    Icon
} from "antd"
import weijie from "images/name.png"

class TopNav extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
    }
    clickHandle = () => {
        this.props.menutoggleAction(true)
    }
    render() {
        return (
            <div className="top">
                <div className="top-btn" onClick={this.clickHandle}>
                    <Icon type="bars" />
                </div>
                <div className="top-name">
                    <Link to="/"><img src={weijie} alt="" /></Link>
                </div>
            </div>
        );
    }
}
const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps, dispatchAction)(TopNav)