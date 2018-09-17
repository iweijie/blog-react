
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import config from "config"
import { Link } from 'react-router-dom'
import homeBg from "images/homeBg.jpg"
import dispatchAction from "util/dispatchAction"
// import Datepicker from "./components/DatePicker"
// import {Icon} from "antd"
import "./css.css"

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){

    }
    changeDate = (time)=>{
        console.log(time)
    }
    componentWillUnmount(){
        
    }
    setBgStyle = (dom)=>{
        if(!dom) return;
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var widht = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(height/1080 > widht/1920){
            dom.style.height = "100%"
        }else {
            dom.style.width = "100%"
        }
    }
    render() {
        // var src = homeBg[0] || ""
        const content = (
            <div className="home">
                <img ref={this.setBgStyle} className="bg" src={homeBg} alt=""/>
                <div className="enter">
                    <Link to={"/article/list/javascript"}>点此进入</Link>
                </div>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store)=>{
	return {
		menuInfos:store.menuInfos,
        userInfo:store.userInfoModel,
        // homeBg:store.homeBgModel
	}
}

export default connect(mapStateToProps,dispatchAction)(App)

// <Datepicker changeDate={this.changeDate}/>
