import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom'
import { routes } from './routers/routers'
import Menu from "page/leftMenu"
import Login from "page/login"
import Topnav from "page/topNav"
import history from "util/history"
// import io from "util/socket"
import "util/observer"
import "util/love"
import "./style/css.css"

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    state = {
    }
    componentDidMount() {
    }
    back = () => {
        history.go(-1)
    }
    gotop = () => {
        var main = document.querySelector(".main")
        main.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    render() {
        const content = (<Router history={history}>
            <div>
                <Menu />
                <Topnav />
                <div className="right">
                    <div className="main">
                        <Switch>
                            {routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                    </div>
                </div>
                <Login />
                <div className="overlays">
                    <div onClick={this.gotop} className="shortcut">UP</div>
                    <div onClick={this.back} className="shortcut margin-ss-top">back</div>
                </div>
            </div>
        </Router>)

        return (
            content
        );
    }
}
export default connect()(App)





