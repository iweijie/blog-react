import React, { PureComponent } from 'react';
import whisperJson from "json/whisper"
import {
    Icon,
    Carousel
} from "antd"
import history from "util/history"

class Whisper extends PureComponent {
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
        this.carouselList = [];
        var str = "whisper";
        this.carouselList.push(str)
        return (<div key={str} className={"home-whisper"}>
            <span><Icon type="star" theme="filled" />碎碎念</span>
            <div className={"home-whisper-content"}
                onMouseLeave={this.MouseLeaveHandle}
                onMouseEnter={() => this.MouseEnterHandle(str)}>
                <Carousel
                    dots={false}
                    ref={str}
                    vertical>
                    {
                        whisperJson.map((val, key) => (
                            <div key={key} className={"whisper"}>
                                {val.discription}
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>)
    }
}

export default Whisper
