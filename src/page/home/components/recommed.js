/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { Component } from 'react';
import homerecommend from "json/homerecommend"
import {
    Row,
    Col,
    Carousel,
    Divider,
} from "antd"
import history from "util/history"

class App extends Component {
    constructor(props) {
        super(props);
    }
    carouselList = []
    selectedCarousel = ""
    timerId = null;
    nextCarousel = () => {
        if (!this.carouselList || !this.carouselList.length) return
        this.carouselList.forEach(v => {
            this.refs[v].next()
        })
    }

    MouseEnterHandle = (str) => {
        var site = this.carouselList.indexOf(str)
        if (site !== -1) {
            this.selectedCarousel = str
            this.carouselList.splice(site, 1)
        }
    }
    MouseLeaveHandle = () => {
        if (!this.selectedCarousel) return;
        this.carouselList.push(this.selectedCarousel)
        this.selectedCarousel = ""
    }
    startLoop = (time = 3000) => {
        this.timerId = setInterval(() => {
            this.nextCarousel()
        }, time)
    }
    clearLoop = () => {
        clearInterval(this.timerId)
    }
    goTo = (path) => {
        history.push(path)
    }
    componentDidMount() {
        this.startLoop(4000)
    }
    componentWillUnmount() {
        this.clearLoop()
    }
    render() {
        this.carouselList = []
        var recommend = homerecommend.map((v, k) => {
            var str = "carousel" + k
            this.carouselList.push(str)
            return (
                <div key={str} className={k === 0 ? "home-recommend margin-ms-top" : "home-recommend"}
                    onMouseLeave={this.MouseLeaveHandle}
                    onMouseEnter={() => this.MouseEnterHandle(str)}>
                    <div className="recommend-nav-title">{v.title}</div>
                    <Carousel className="carousel-nav" ref={str} vertical>
                        {
                            v.list.map((val, key) => (
                                <Row className="carousel-item" onClick={() => this.goTo(val.path)} key={key} style={{ width: "100%" }} justify="space-between" type="flex">
                                    <Col className="recommend-item recommend-item-title" span={6}>{val.title}</Col>
                                    <Col className="recommend-item" span={12}>{val.discription}</Col>
                                    <Col className="recommend-item" span={6}>{
                                        val.tag.map((value, i) => <span key={i} className="recommend-item-tag">{value}</span>)
                                    }</Col>
                                </Row>
                            ))
                        }
                    </Carousel>
                </div>
            )
        })

        return (
            recommend
        );
    }
}

export default App
