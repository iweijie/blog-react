
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Topnav from "../comom/topNav"
import LeftNav from "./leftNav"
import { Switch, Route, Redirect } from 'react-router-dom'
import {
    AsyncArticle,
    AsyncTags
} from "./routers"
import "./css.scss"


class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { height } = this.props.browserInfo
        let url = "/set";
        const content = (
            <div ref="set" className="set">
                <Topnav isFixed />
                <div className="set-wrap">
                    <div className="set-left">
                        <LeftNav />
                    </div>
                    <div className="set-right" style={{ minHeight: height - 56 - 40 + "px" }}>
                        <Switch>
                            <Route key="test" exact path={`${url}/test`} render={() => <div>123</div>} />
                            <Route key="AsyncArticleAdd" exact path={`${url}/article/add`} component={AsyncArticle} />
                            <Route key="AsyncArticleEdit" exact path={`${url}/article/edit/:id`} component={AsyncArticle} />
                            <Route key="Asynctags" exact path={`${url}/tags`} component={AsyncTags} />
                        </Switch>
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
        browserInfo: store.browserInfo
    }
}

export default connect(mapStateToProps, dispatchAction)(App)