
import React, { Component } from 'react';
import { throttle } from "util/baseTool"
import { Motion, spring } from 'react-motion';
class Carousel extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        widht: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        opcity: false,
        index: -1
    }
    UNSAFE_componentWillMount() {
    }
    componentDidMount() {
        this.isloadding = true ;
        window.addEventListener("resize", throttle(() => {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.setState({
                height,
                widht
            })
        }, 100))
    }
    componentWillReceiveProps(next) {
        if (next.list !== this.props.list) {
            this.imageDom = [];
            this.loadImage(next.list)
            this.circulation()  
        }
    }
    // 启动
    test = true
    // 存放 image
    imageDom = [];
    // 当前图片是否加载完
    isloadding = false;
    // carousel dom引用
    carousel = null;
    setImage = (index,list) => {
        if(!this.isloadding) return ;
        this.isloadding = false;
        let carouselDom ;
        if (this.carousel) {
            carouselDom = this.carousel;
        } else {
            this.carousel = carouselDom = document.querySelector("#carousel")
        }
        if (index + 1 >= list.length || this.imageDom.length === list.length) {
            this.isloadding = true;
            return
        }
        let img = new Image();
        let _this = this;
        img.onerror = img.onload = () => {
            _this.isloadding = true
            _this.imageDom.push(img)
            if (index === 0) {
                carouselDom.appendChild(img)
                _this.setState({
                    opcity:true
                })
            }
        }
        img.src = list[index].fullUrl;
    }
    loadImage = (list) => {
        list =  list || this.props.list;
        if (!list.length) return;
        let { index } = this.state, carouselDom,next;
        if (this.carousel) {
            carouselDom = this.carousel;
        } else {
            this.carousel = carouselDom = document.querySelector("#carousel")
        }
        if (index + 1 >= list.length) {
            next = 0
        } else {
            next =index + 1
        }
        if (this.imageDom[next]) {
            if(this.imageDom[index]){
                carouselDom.removeChild(this.imageDom[index])
            }
            carouselDom.appendChild(this.imageDom[next])
            this.setState({
                index:next,
                opacity: true
            }, this.setImage(next,list))
        } else {
            this.setImage(next,list)
        }

    }
    circulation = ()=>{
        let fn = throttle(this.loadImage, 2000),
            _this = this;
        let callback = ()=>{
            if(_this.isloadding){
                fn()
            }
            if(_this.test){
                requestAnimationFrame(callback)
            }else {
                callback = null;
            }
        }
        requestAnimationFrame(callback)
    };
    componentWillUnmount() {
    }
    render() {
        let { height } = this.state;
        return (

            <div className="home-bg" style={{ height: (height - 56) + "px" }}>
                <Motion style={{ opcity: spring(this.state.opcity ? 1 : 0) }}>
                    {
                        ({ opcity }) => (
                            <div id="carousel" className="home-bg-img" style={{ opacity: opcity }}>
                            </div>
                        )
                    }
                </Motion>
                <div className="say">
                    <div className="title">WEIJIE</div>
                    <div className="oath">from small beginning come great things</div>
                </div>
            </div>
        );
    }
}

export default Carousel
// background: `url(${src}) no-repeat center center`

{/* <img src={src} alt="" /> */}