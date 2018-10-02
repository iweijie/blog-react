/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { PureComponent } from 'react';
import recommendJson from "json/recommend"
import { Link } from 'react-router-dom'
import {
    Icon
} from "antd"

class Recommend extends PureComponent {
    render() {
        let recommend = (
            <div className="home-recommend unification-title">
                <p><Icon type="fire" theme="filled" /> 群魔乱舞</p>
                <ul>
                    {
                        recommendJson.map((v, k) => {
                            return <li key={v._id}>
                                <span>{k + 1}</span>
                                <Link to={"/"}>{v.title}</Link>
                            </li>

                        })
                    }
                </ul>
            </div>
        )
        return (
            recommend
        );
    }
}

export default Recommend
