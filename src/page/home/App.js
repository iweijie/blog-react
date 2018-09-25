
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Carousel from "./components/carousel"
import Topnav from "../comom/topNav"
import ArticleList from "../comom/articleList/index"
import { throttle } from "util/baseTool"
// import Recommed from "./components/recommed"
// import Datepicker from "./components/DatePicker"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.props.getHomeBgImageActionASync()
        this.props.getArticleListAsync({
            id:"suibi",
            page:1,
            pageSize:10
        })
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
    render() {
        let { homeBgList,browserInfo,homeScrollToTop,articleList } = this.props;
        let isFixed = browserInfo.height - homeScrollToTop <= 56 ;
        const content = (
            <div ref="home" className="home">
                <Carousel list={homeBgList} browserInfo={browserInfo}></Carousel>
                <Topnav isFixed={isFixed}/>
                <div className="home-content">
                    <ArticleList list={articleList}/>
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
        homeBgList: store.homeBgList,
        browserInfo : store.browserInfo,
        homeScrollToTop: store.homeScrollToTop,
        articleList :store.articleListModel.result
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// <Datepicker changeDate={this.changeDate}/>
