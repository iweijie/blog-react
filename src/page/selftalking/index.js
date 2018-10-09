
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Topnav from "../comom/topNav"
import {
    Timeline,
    Icon 
} from "antd"
import "./css.scss"


class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { height } = this.props.browserInfo;
        let { homeBgList } = this.props;
        let src = homeBgList && homeBgList.length && homeBgList[1].fullUrl || ""
        const content = (
            <div className="selftalking" >
                <Topnav isFixed />
                <div className="selftalking-wrap" style={{ minHeight: height - 56 + "px", background: `url(${src})` }}>
                    <div className="content">

                        <Timeline mode="alternate">
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
                            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        </Timeline>,
                    </div>
                </div>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel,
        browserInfo: store.browserInfo,
        homeBgList: store.homeBgList,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)