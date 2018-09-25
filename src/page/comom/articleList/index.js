/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { PureComponent } from 'react';
import { Icon } from "antd"
import { timestampFromat } from "util/baseTool"
import "./css.scss"

class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        var { list } = this.props;
        list = list || []
        console.log(list)
        const content = (
            <div className="article-list">
                {
                    list.map((data) => {
                        return <div className="article-list-item" key={data._id}>
                            <div className="article-list-item-img">
                                <img src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-602455.jpg" alt="" />
                            </div>
                            <h3 className="article-list-item-title underline">{data.title}</h3>
                            <p className="article-list-item-descrption">{data.description}</p>
                            <div className="article-list-item-author">
                                <span className="margin-ms-right">
                                    <Icon className="padding-xm-right" type="user" />
                                    {data.autor && data.autor.name}
                                </span>
                                <span className="margin-ms-right">
                                    <Icon className="padding-xm-right" type="calendar" />
                                    {timestampFromat(data.createTime)}
                                </span>
                                <span className="article-list-item-tag margin-ms-right">
                                    <Icon type="tag-o" className="padding-xm-right" />
                                    {data.classify}
                                </span>
                                <span><Icon className="padding-xm-right" type="eye-o" />{data.time}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        )

        return (
            content
        );
    }
}

export default App
// onClick={() => this.onClick(data._id, data.time)}
