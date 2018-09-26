
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Bg from "./components/homeBg"
import Topnav from "../comom/topNav"
import Recommend from "./components/recommend"
import ArticleList from "../comom/articleList/index"
import { throttle } from "util/baseTool"
import Whisper from "./components/whisper"
import Calendar from "./components/calendar"
import Tags from "./components/tags"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.props.getHomeBgImageActionASync()
        this.props.getArticleListAsync({
            id: "suibi",
            page: 1,
            pageSize: 10
        })
    }
    changeDate = (time) => {
        console.log(time)
    }
    componentDidMount() {
        window.addEventListener("scroll", throttle(this.scrollHandle, 50))
    }
    componentWillUnmount() {
    }
    scrollHandle = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        this.props.homeScrollTopAction(top)
    }
    render() {
        let { homeBgList, browserInfo, homeScrollToTop, articleList,total } = this.props;
        console.log(total)
        let isFixed = browserInfo.height - homeScrollToTop <= 56;
        const content = (
            <div ref="home" className="home">
                <Bg list={homeBgList} browserInfo={browserInfo}></Bg>
                <Topnav isFixed={isFixed} />
                <div style={{backgroundColor:"#f1f1f1"}}>
                    <div className="home-content">
                        <div className="home-content-left">
                            <Whisper></Whisper>
                            <ArticleList list={articleList} />
                            <p className="pagination">
                                或许有更多
                            </p>
                        </div>
                        <div className="home-content-right">
                            <Recommend></Recommend>
                            <Calendar changeDate={this.changeDate}/>
                            <Tags></Tags>
                        </div>
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
        homeBgList: store.homeBgList,
        browserInfo: store.browserInfo,
        homeScrollToTop: store.homeScrollToTop,
        articleList: store.articleListModel.result,
        total: store.articleListModel.total,
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// <Carousel list={homeBgList}></Carousel>

// <Carousel list={homeBgList} browserInfo={browserInfo}></Carousel>
