import React, {Component} from 'react';
import {
  Icon
} from "antd"
import {timestampFromat,setLocation,getLocation} from "util/baseTool"

import history from "util/history"


class Listitem extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    onClick=(id,time)=>{
        if(!id) return
        this.updateTime(id,time)
        history.push("/article/detail/" + id)
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
    editHandle = (id)=>{
        if(!id) return
        history.push("/edit/article/" + id)
    }
    delHandle = ()=>{
        
    }
    render() {
        var {data,userInfo} = this.props
        var {userId,isLogin} = userInfo
        if(!data) return null
        return (
            <div className="article-list-item">
                <h3 onClick={()=>this.onClick(data._id,data.time)} className="article-list-item-title underline">{data.title}</h3>
                <p className="article-list-item-descrption">{data.description}</p>
                {
                    isLogin && userId == data.autor._id ?
                    <div className="article-list-item-handle">
                        <Icon onClick={()=>this.editHandle(data._id)} className="margin-ss-right" type="edit" />
                        <Icon onClick={this.delHandle} type="delete" />
                    </div>
                    :null
                }
                
                <div className="article-list-item-author">
                    <span className="margin-ms-right"><Icon className="padding-xm-right" type="user" />{data.autor&&data.autor.name}</span>
                    <span className="margin-ms-right"><Icon className="padding-xm-right" type="calendar" />{timestampFromat(data.createTime)}</span>
                    <span className="article-list-item-tag margin-ms-right">
                        <Icon type="tag-o" className="padding-xm-right" />
                        {data.classify}
                    </span>
                    <span><Icon className="padding-xm-right" type="eye-o" />{data.time}</span>
                </div>
            </div>
        )
    }
}

export default Listitem
