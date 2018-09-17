
import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
import {timestampFromat} from "util/baseTool"

import Messageboard from "./messageBoard"
import Aside from "./aside"
import history from "util/history"
import marked from "marked"
import {
    Icon,
} from "antd"
import {setLocation,getLocation} from "util/baseTool"
import highlight from "util/highlight/highlight.pack"
import "util/highlight/styles/arta.css"
import "./css.css"

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        html:{__html: ""},
        nav:null
    }
    componentWillMount(){
        var {getArticleDetails,match} = this.props;
        var id = match.params.id;
        if(!id){
            return history.push("/404")
        }
        getArticleDetails({id})
        .then(result=>{
            if(result){
                var {time,_id} = result
                this.updateTime(_id,time)
            }
        })
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function(code) {
              return highlight.highlightAuto(code).value;
            },
            pedantic: false,
            headerPrefix:"mk-wj",
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        });
    }
    match = (html)=> {
        var arr = [];
        var uid = 0;
        var prefix = "md-wj-"
        var newStr = html.replace(/<h[1-6]{1} id="(\S*?)">(.*?)<\/h[1-6]{1}>/g, function (str, matchId,matchName) {
            uid++;
            var id = prefix + uid;
            var num = Number(str.match(/<h([1-6]{1}).*?>/)[1])
            arr.push({ level: num, id,name:matchName })
            return str.replace(matchId,id)
        })
        return {
            html:newStr,
            nav:this.formatRight(arr)
        }
    }
    formatRight = (arr)=>{
        for(var i = 0 ;i <arr.length ; i++){
            if(i+1 >= arr.length) continue;
            var data = arr[i];
            var next = arr[i+1];
            if(data.level === next.level) continue;
            if(next.level > data.level){
                if(!data.child){
                    data.child  = []
                }
                if(data.child.length && next.level > data.child[data.child.length -1].level){
                    
                    if(!data.child[data.child.length -1].child){
                        data.child[data.child.length -1].child  = []
                    }
                    data.child[data.child.length -1].child.push(next)
                }else {
                    data.child.push(next)
                }
                arr.splice(i+1,1)
                i--;
            }
        }
        return arr
    }
    updateTime = (id,time)=>{
        var {asyncArticlTime} = this.props
        if(!localStorage){
            asyncArticlTime({id,time})
        } 
        var  timeId = "timeId"
        var ids =  getLocation(timeId)
        if(!ids){
            ids = {}
        }
        var now = +new Date()
        if(!ids[id] || (ids[id] + 60*60*1000)<= now ){
            ids[id] = now
            setLocation(timeId,ids)
            asyncArticlTime({id,time})
        }
    }
    setATagBlank = (temp)=>{
        var a;
        while (a = temp.match(/<a href=.*?>.*?<\/a>/)) {
            if (a) {
                var str = a[0]
                var arr = str.split(" ")
                arr.splice(1, 0, "target=_blank")
                var newstr = arr.join(" ")
                temp = temp.replace(str, newstr)
            }
        }
        return temp
    }
    getContent = (temp)=>{
        var template = marked(temp)
        template = this.setATagBlank(template)
        return this.match(template) ;
    }
    componentWillUnmount(){
        this.props.articleDetailsAction({})
    }
    componentWillReceiveProps(next){
        if(next.detial !=this.props.detial){
            var data = next.detial
            var obj = this.getContent(data.content)
            this.setState({
                html:{__html: obj.html},
                nav:obj.nav
            })
        }
    }
    render() {
        var data = this.props.detial;
        var {html,nav} = this.state
        if(!data._id) return null;
        return (
            <div className="article-detail">
                <div className="article-title">
                    <h1 className="display-none">{data.title}</h1>
                    <div className="item-title">
                        <span className="underline">{data.title}</span>
                    </div>
                    <div className="item-author">
                        <span className="margin-ms-right"><Icon className="padding-xm-right" type="user" />{data.autor&&data.autor.name}</span>
                        <span className="margin-ms-right"><Icon className="padding-xm-right" type="calendar" />{timestampFromat(data.createTime)}</span>
                        <span className="item-tag">
                            <Icon type="tag-o" className="padding-xm-right" />
                            {data.classify}
                        </span>
                    </div>
                    <p className="item-descrption">{data.description}</p>
                </div>
                <div className="article-detail-content" dangerouslySetInnerHTML={html}></div>
                <Aside nav={nav}/>
                <Messageboard {...this.props}></Messageboard>
            </div>
        );
    }
}
const mapStateToProps = (store)=>{
	return {
        detial:store.articleDetialsModel,
        userInfo:store.userInfoModel,
	}
}
export default connect(mapStateToProps,dispatchAction)(App)
