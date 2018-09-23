import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom'
import { routes } from './routers/routers'
// import Menu from "page/leftMenu"
// import Login from "page/login"
// import Topnav from "page/topNav"
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
        // document.addEventListener("selectstart",(event)=>{
        //     console.log("test")
        //     event.returnValue=false;
        //     return false
        // })
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
            <div className="main">
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>)

        return (
            content
        );
    }
}
export default connect()(App)

{/* <Menu />   <Topnav />*/ }





