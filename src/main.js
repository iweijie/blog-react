import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom'
import { routes } from './routers/routers'
import { throttle } from "util/baseTool"
import dispatchAction from "util/dispatchAction"
// import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';
// import Menu from "page/leftMenu"
// import Login from "page/login"
// import Topnav from "page/topNav"
import history from "util/history"
// import io from "util/socket"
import "util/observer"
import "util/love"

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    UNSAFE_componentWillMount(){
        this.props.syncuserInfoCheckAction()
        this.props.getHomeBgImageActionASync()
    }
    componentDidMount() {
        window.addEventListener("resize", throttle(() => {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                widht
            })
        }, 100))
    }
    back = () => {
        history.go(-1)
    }
    render() {
        const content = (<Router history={history}>
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i} {...route} />
                ))}
            </Switch>
        </Router>)

        return (
            content
        );
    }
}
const mapStateToProps = () => {
    return {}
}
export default connect(mapStateToProps,dispatchAction)(App)





