
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Carousel from "./components/carousel"
import Topnav from "../topNav/index"
import { throttle } from "util/baseTool"
// import Datepicker from "./components/DatePicker"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.props.getHomeBgImageActionASync()
    }
    changeDate = (time) => {
        console.log(time)
    }
    componentDidMount() {
        window.addEventListener("scroll",throttle(this.scrollHandle,50))
    }
    componentWillUnmount() {
    }
    scrollHandle = ()=>{
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        this.props.homeScrollTopAction(top)
    }
    setBgStyle = (dom) => {
        if (!dom) return;
        let { height, widht } = this.state
        if (height / 1080 > widht / 1920) {
            dom.style.height = "100%"
        } else {
            dom.style.width = "100%"
        }
    }
    render() {
        let { homeBgList,browserInfo,homeScrollToTop } = this.props;
        let isFixed = browserInfo.height - homeScrollToTop <= 56 ;
        const content = (
            <div ref="home" className="home">
                <Carousel list={homeBgList} browserInfo={browserInfo}></Carousel>
                <Topnav isFixed={isFixed}/>
                <div style={{height:"5000px"}}></div>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        menuInfos: store.menuInfos,
        userInfo: store.userInfoModel,
        homeBgList: store.homeBgList,
        browserInfo : store.browserInfo,
        homeScrollToTop: store.homeScrollToTop,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// <Datepicker changeDate={this.changeDate}/>
