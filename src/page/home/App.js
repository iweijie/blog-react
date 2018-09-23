
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Carousel from "./components/carousel"
// import Datepicker from "./components/DatePicker"
import "./css.scss"

class App extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        this.props.getHomeBgImageActionASync()
    }
    changeDate = (time) => {
        console.log(time)
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    setBgStyle = (dom) => {
        if (!dom) return;
        let { height, widht } = this.state
        if (height / 1080 > widht / 1920) {
            dom.style.height = "100%"
        } else {
            dom.style.width = "100%"
        }
    }
    render() {
        let { homeBgList } = this.props;
        let arr= [1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        const content = (
            <div className="home">
                <Carousel list={homeBgList}></Carousel>
                <ul>
                    {
                        arr.map((v,k)=>{
                            return <li key={k}>{k}</li>
                        })
                    }
                </ul>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store) => {
    return {
        menuInfos: store.menuInfos,
        userInfo: store.userInfoModel,
        homeBgList: store.homeBgList
    }
}

export default connect(mapStateToProps, dispatchAction)(App)

// <Datepicker changeDate={this.changeDate}/>
