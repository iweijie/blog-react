import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    message,
    Button,
} from "antd"
import dispatchAction from "util/dispatchAction"
import history from "util/history"
import Configmodel from "./components/configModel"
import Addingentries from "./components/addingentries"
import moment from "moment"
import echarts from "util/echarts"
import "./css.css"

class Record extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible:false,
        visible_addingentries:false,
        startTime:moment().subtract(3, "months").unix() * 1000,
        endTime:moment().unix()* 1000
    }
    echarts = null;
    UNSAFE_componentWillMount(){
        this.init(this.props)
        window.observer.on("configModelHide",()=>{
            this.setState({
                visible:false
            })
        })
        window.observer.on("addingentriesHide",()=>{
            this.setState({
                visible_addingentries:false
            })
        })
    }
    init =(props)=>{
        var {getRecordConfigActionSync,getRecordListActionSync,match} = props
        var {startTime,endTime} = this.state
        var id = match.params.id
        if(!id) history.replace("/404")
        getRecordConfigActionSync({id})
        .then(result =>{
            if(result.state){
                getRecordListActionSync({id,startTime,endTime})
                .then(result=>{
                    if(result.state && this.echarts){
                        var option = this.getOption(result.result)
                        this.echarts.setOption(option);
                    }
                })
            }else {
                message.warning("请先设置配置文件")
                this.setState({visible:true})
            }

        })
    }
    componentDidMount(){
        var echartsInstance = this.refs.echarts;
        this.echarts = echarts.init(echartsInstance);
    }
    setConfiguration = ()=>{
        this.setState({
            visible:true
        })
    }
    addingentries = ()=>{
        this.setState({
            visible_addingentries:true
        })
    }
    UNSAFE_componentWillReceiveProps(next){
        var {match,clearRecordAction} = this.props
        var id = match.params.id
        var newmatch = next.match
        var newId = newmatch.params.id
        if(id !== newId){
            clearRecordAction()
            this.init(next)
        }
    }
    componentWillUnmount(){
        window.observer.remove()
    }
    getOption = (data)=>{
        var {recordconf} = this.props
        var {units,name} = recordconf
        var option = {
            title: {
                text: name,
                left: 'center',
                top:20
            },
            grid :{
                top:100
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                top:50,
                data:data.legend
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.xAxis,
                    name: '时间',
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}' + units
                    }
                },
            ],
            series: []
        };
        for(var k in data.data){
            option.series.push({
                name:data.data[k].name,
                type:'bar',
                data:data.data[k].data
            })
        }
        return option
    }
    render() {
        const content = (
            <div className="record">
                <ul className="configuration-btn">
                    <li><Button onClick={this.addingentries}>添加记录</Button></li>
                    <li className="margin-sm-top "><Button onClick={this.setConfiguration}>设置配置</Button></li>
                </ul>
                <Configmodel visible={this.state.visible} {...this.props}/>
                <Addingentries visible={this.state.visible_addingentries} {...this.props}/>
                <div className="ecarts-wrap">
                    <div className="echarts" ref="echarts" id="ecarts"></div>
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
        userInfo:store.userInfoModel,
        recordconf:store.recordconfModel,
        recordList:store.recordListModel
	}
}

export default connect(mapStateToProps,dispatchAction)(Record)

