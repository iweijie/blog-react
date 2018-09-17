import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
import moment from "moment"
import {
    Form,
    Modal,
    Input,
    InputNumber,
    Icon,
    Button,
    message,
    Table,
    Row,
    Col,
    Select,
    DatePicker 
} from "antd"
var FormItem = Form.Item 
const Option = Select.Option;


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
      
    columns = ()=>{
        var {getFieldDecorator} = this.props.form
        var {showField,units} = this.props.recordconf
        showField = showField || []
        var options = showField.map(v=><Option key={v._id} value={v.field}>{v.title}</Option>)
        return [{
            title: '选项',
            dataIndex: 'selected',
            width:100,
            key: 'selected',
            align:"center",
            render:(col,row,index)=>{
                return (
                    <FormItem>
                        {getFieldDecorator('selected'+row.key, {
                            rules: [{ required: true}],
                        })(
                            <Select>
                                {options}
                            </Select>
                        )}
                    </FormItem>
                )
            }
          }, {
            title: '值',
            dataIndex: 'value',
            width:100,
            key: 'value',
            align:"center",
            render:(col,row,index)=>{
                return (
                    <FormItem>
                        {getFieldDecorator('value'+row.key, {
                            rules: [{ required: true}],
                        })(
                            <InputNumber min={0} className="addingentriesHide-input" style={{width:"80%"}}/>
                        )}
                        <span className="addingentries-units">{units}</span>
                    </FormItem>
                )
            }
          }, {
            title: '时间',
            dataIndex: 'time',
            width:150,
            key: 'time',
            align:"center",
            render:(col,row,index)=>{
                return (
                        <DatePicker
                        allowClear
                        onChange={(time)=>this.getTime(time,row.key)}
                        format="YYYY-MM-DD"
                        defaultValue={moment(this.now)}
                        />
                )
            }
          }, {
            title: '操作',
            dataIndex: 'handle',
            width:50,
            key: 'handle',
            align:"center",
            render:(col,row,index)=>{
                return (
                    <span onClick={()=>this.delHandle(row.key)} className="handle-btn">删除</span>
                )
            }
          }]
    };
    now = moment().unix() * 1000
    state = {
        addData:[{selected:"",value:"",time:this.now,key:1}],
        Uid:2,
    }
    initialize = ()=>{
        var addData = [{selected:"",value:"",time:this.now,key:1}],
            Uid = 2
    }
    delHandle =(key)=>{
        var {addData} = this.state;
        for(var i =0,l=addData.length;i<l;i++){
            if(key === addData[i].key){
                addData.splice(i,1)
                break;
            }
        }
        this.setState({addData})
    }
    getTime = (time,index)=>{
        var {addData} = this.state;
        for(var i =0,l=addData.length;i<l;i++){
            var key = addData[i].key
            if(key === index){
                addData[i].time = time.unix()* 1000
                break
            }
        }
    }
    addClickHandle = ()=>{
        var {addData,Uid} = this.state;
        addData.push({selected:"",value:"",time:this.now,key:Uid})
        Uid++
        this.setState({addData,Uid})
    }
    handleOk = (e)=>{
        var {recordconf,match} = this.props
        var id = match.params.id
        if(!recordconf._id || id != recordconf.relevancy) return message.warning("请先设置配置")
        this.props.form.validateFields((err,data)=> {
            if(err) throw err;
            var addData = this.state.addData;
            var selected = "selected",value = "value";
            for(var i =0,l=addData.length;i<l;i++){
                var key = addData[i].key
                addData[i][selected] = data[selected+key]
                addData[i][value] = data[value+key]
            }
            var parmas = {
                data : addData,
                id : id
            }
            this.props.setRecordListActionSync(parmas)
        })
    }
    handleCancel = () =>{
        this.initialize()
        window.observer.emit("addingentriesHide")
    }
    render() {
        const { getFieldDecorator } = this.props.form; 
        var {visible,recordconf} = this.props
        var {classify,name,relevancy,showField,units,_id} = recordconf
        var foot = (
            <div>
                <Button onClick={this.handleCancel}>取消</Button>
                <Button onClick={this.handleOk}>保存</Button>
            </div>
        )
        const content = (
                        <Modal
                            maskClosable={false}
                            className="addingentries"
                            width={800}
                            style={{top:"20px"}}
                            title="添加记录"
                            destroyOnClose={true}
                            visible={visible}
                            onCancel={this.handleCancel}
                            footer={foot}>
                            <Form>
                                <Row type="flex" justify="space-between">
                                    <Col span={24} style={{position:"relative"}}>
                                        <label className="select-label margin-ss-bottom">显示项：
                                        <p className="select-description">
                                            (用于添加需要显示项)
                                        </p>
                                        </label>
                                        <Button onClick={this.addClickHandle} className="pull-right">新增</Button>
                                        <Table 
                                        className="addingentries-table margin-sm-top"
                                        bordered
                                        rowKey="key"
                                        pagination={false}
                                        columns={this.columns()} 
                                        dataSource={this.state.addData} />
                                    </Col>
                                </Row> 
                            </Form>
                        </Modal>)

        return (
            content
        );
    }
}

export default Form.create()(App)



