
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Topnav from "../comom/topNav"
import { Switch, Route ,Redirect } from 'react-router-dom'
import {
    AsyncArticle
} from "./components"
import {
    Icon
} from "antd"


class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let match = this.props.match;
        const content = (
            <div ref="set" className="set">
                <Topnav isFixed />
                <Switch>
                    <Route key="AsyncArticle" exact path={`${match.url}/article`} component={AsyncArticle} />
                    <Redirect to={`${match.url}/article`} />
                </Switch>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        userInfo: store.userInfoModel
    }
}

export default connect(mapStateToProps, dispatchAction)(App)