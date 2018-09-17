/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {message} from "antd"
import dispatchAction from "util/dispatchAction"
import Listitem from "./components/listitem"
import "./css.css"

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        more:true
    }
    page = 1
    pageSize = 10
    componentWillMount(){
        var {match} = this.props;
        var id = match.params.id;
        if(!id) return
        this.getList({id,page:this.page,pageSize:this.pageSize})
    }
    componentWillReceiveProps(next){
        var oldMatch = this.props.match
        var nowMatch = next.match;
        if(oldMatch.url != nowMatch.url){
            var id = nowMatch.params.id;
            this.getList({id,page:this.page,pageSize:this.pageSize})
        }
    }
    moreHandle = ()=>{
        var {list,match} = this.props;
        var id = match.params.id;
        var {pageSize} = this;
        var page =(list[id] && list[id].page )  || 1;
        page += 1
        this.getList({id,page:page,pageSize:pageSize},true)

    }
    getList = (params,isMore)=>{
        var {list} = this.props;
        var data =list[params.id]
        if(data && data.page >=params.page ) return ;
        this.props.syncGetArticleList(params)
        .then(len=>{
            if(!len && isMore){
                message.warning("以无更多内容加载")
            }
        })
    }
    render() {
        var {list,match,userInfo,asyncArticlTime} = this.props;
        var id = match.params.id;
        var more = list[id] && list[id].more;
        var datalist =list[id] && list[id].list ;
        if(!datalist) return <div className="empty-list">当前无可查看项，请选择其他内容查看</div>
        const content = (
            <div className="article-list">
                {
                    datalist.map((v,k)=><Listitem userInfo={userInfo} key={k} data={v} asyncArticlTime={asyncArticlTime}/>)
                }
                {
                    more?
                    <div  className="more">
                        <span  onClick={this.moreHandle}>点击加载更多...</span>
                    </div>
                    :null
                }
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store)=>{
	return {
        list:store.articleListModel,
		userInfo:store.userInfoModel
	}
}

export default connect(mapStateToProps,dispatchAction)(App)
