/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { PureComponent } from 'react';
import homerecommend from "json/homerecommend"
import {
    Icon,
    Carousel
} from "antd"
import history from "util/history"

class App extends PureComponent {
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
    startLoop = (time = 4000) => {
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
                <div key={str} className={"home-recommend"}
                    onMouseLeave={this.MouseLeaveHandle}
                    onMouseEnter={() => this.MouseEnterHandle(str)}>
                    <Carousel
                        dots={false}
                        ref={str}
                        vertical>
                        {
                            v.list.map((val, key) => (
                                <div key={key} className="whisper">
                                    <Icon type="smile" theme="outlined" />
                                    {val.discription}
                                </div>
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
