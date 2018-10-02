
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
import {
    Icon
} from "antd"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }
    page = 1
    pageSize = 10
    UNSAFE_componentWillMount() {
        let {page,pageSize} = this
        let {homeBgList,articleList,total} = this.props;
        if(!homeBgList || !homeBgList.length){
            this.props.getHomeBgImageActionASync()
        }
        if(!total || !articleList || !articleList.length){
            this.props.getArticleListAsync({
                page,pageSize
            })
        }else {
            this.page = Math.ceil(articleList.length/pageSize)
        }
    }
    changeDate = (time) => {
        console.log(time)
    }
    pagination = (total)=>{
        let {page,pageSize} = this;
        let max = Math.ceil(total/pageSize);
        if(max <= page) return ;
        this.props.getArticleListAsync({
            page: ++this.page ,pageSize
        })
    }
    componentDidMount() {
        window.addEventListener("scroll",this.scroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.scroll)
    }
    scrollHandle = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        this.props.homeScrollTopAction(top)
    }
    scroll = throttle(this.scrollHandle, 100);
    render() {
        let { homeBgList, browserInfo, homeScrollToTop, articleList, total } = this.props;
        let {page,pageSize} = this
        let isFixed = browserInfo.height - homeScrollToTop <= 56;
        const content = (
            <div ref="home" className="home">
                <Bg list={homeBgList} browserInfo={browserInfo}></Bg>
                <Topnav isFixed={isFixed} />
                <div style={{ backgroundColor: "#f1f1f1" }}>
                    <div className="home-content">
                        <div className="home-content-left">
                            <Whisper></Whisper>
                            <ArticleList list={articleList} />
                            {
                                total && total > (page*pageSize) ?
                                <p className="pagination" onClick={()=>this.pagination(total)}>
                                    或许有更多
                                </p>
                                :
                                <p className="pagination disabled">
                                    这是我的底线
                                </p>
                            }
                        </div>
                        <div className="home-content-right">
                            <Recommend></Recommend>
                            <div className="unification-title mb20">
                                <p><Icon type="credit-card" theme="filled" /> 备忘录</p>
                                <Calendar changeDate={this.changeDate} />
                            </div>

                            <div className="unification-title ">
                                <p><Icon type="read" theme="filled" /> 标签</p>
                                <Tags></Tags>
                            </div>
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
