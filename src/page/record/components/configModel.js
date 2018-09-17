import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
import {
    Form,
    Modal,
    Input,
    Icon,
    Checkbox,
    Button,
    message,
    Table,
    Row,
    Col,
    Select,
    Radio
} from "antd"
var FormItem = Form.Item 
const RadioGroup = Radio.Group;


class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
      
    columns = ()=>{
        var {getFieldDecorator} = this.props.form
        return [{
            title: '名称',
            dataIndex: 'title',
            align:"center",
            key: 'title',
            render:(col,row,index)=>{
                return (
                    <FormItem>
                        {getFieldDecorator('title'+index, {
                            initialValue:col,
                            rules: [{ required: true}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                )
            }
          }, {
            title: '字段',
            dataIndex: 'field',
            align:"center",
            key: 'field',
            render:(col,row,index)=>{
                return (
                    <FormItem>
                        {getFieldDecorator('field'+index, {
                            initialValue:col,
                            rules: [{ required: true}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                )
            }
          },
        //    {
        //     title: '操作',
        //     dataIndex: 'handle',
        //     align:"center",
        //     key: 'handle',
        //     render:(col,row,index)=>{
        //         return (
        //                 <span onClick={()=>this.deletConfigHandle(row._id)} className="handle-btn">删除</span>
        //         )
        //     }
        //   }
        ]
    };
    state = {
        visible:true,
        addData:[],
        Uid:0,
    }
    addClickHandle = ()=>{
        var {addData,Uid} = this.state;
        addData.push({title:"",field:"",_id:Uid})
        Uid++
        this.setState({addData,Uid})
    }
    // deletConfigHandle =(id)=>{
    //     var {match,delRecordConfigActionSync} = this.props
    //     var _id = match.params.id
    //     var params = {
    //         _id,childId:id

    //     }
        // delRecordConfigActionSync(params)
        // console.log(params)
    // }
    handleOk = (e)=>{
        this.props.form.validateFields((err,data)=> {
            if(!err){
                var {match} = this.props
                var id = match.params.id
                if(!id) return message.warning("木要乱测试")
                var {classify , name , units} = data ;
                var params = {
                    classify , name , units,
                    showField : []
                }
                var flag = 0 ;
                while(flag>=0){
                    if(data["title"+flag] !== undefined){
                        params.showField.push({title:data["title"+flag],field:data["field"+flag]})
                        flag ++ ;
                    }else {
                        flag = -1
                    }
                }
                params._id = id
                this.props.recordConfigActionSync(params)
                // .then(result=>{
                //     recordConfigAction
                // })
            }else {
                console.log(err)
                message.error("请检查配置是否填写完整")
            }
        })
    }
    handleCancel = () =>{
        window.observer.emit("configModelHide")
    }
    options = [
        {name:"柱状图",value:"bar"},
        {name:"折线图",value:"line"},
        {name:"饼状图",value:"pie"},
    ]
    render() {
        
        const { getFieldDecorator } = this.props.form; 
        var {visible,recordconf} = this.props
        var {classify,name,relevancy,showField,units,_id} = recordconf
        var data = [...showField,...this.state.addData]
        var options = this.options.map(v=><Radio key={v.value} value={v.value}>{v.name}</Radio>)
        var foot = (
            <div>
                <Button onClick={this.handleCancel}>取消</Button>
                <Button onClick={this.handleOk}>保存</Button>
            </div>
        )
        const content = (
            <div>
                <Modal
                    maskClosable={false}
                    className="record-configuration"
                    width={800}
                    style={{top:"20px"}}
                    title="设置配置项（当前配置仅适用于本页）"
                    visible={visible}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    footer={foot}>
                    <Form>
                        <Row type="flex" justify="space-between">
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">类型：
                                <p className="select-description">
                                    (展示类型，主要为柱状图，饼状图，折线图)
                                </p>
                                </label>
                                <FormItem>
                                    {getFieldDecorator('classify', {
                                        rules: [{ required: true, message: 'Please input classify!' }],
                                        initialValue:classify || "bar"
                                    })(
                                        <RadioGroup>
                                            {options}
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">名称：
                                <p className="select-description">
                                    (用于设置展示名称)
                                </p>
                                </label>
                                <FormItem>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input name!' }],
                                        initialValue:name || ""
                                    })(
                                        <Input placeholder="名称" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">单位：
                                <p className="select-description">
                                    (通用单位，用于显示，例如：像素（px），千克（kg）)
                                </p>
                                </label>
                                <FormItem>
                                    {getFieldDecorator('units', {
                                        rules: [{ required: true, message: 'Please input units!' }],
                                        initialValue:units || ""
                                    })(
                                        <Input placeholder="单位" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label margin-ss-bottom">显示项：
                                <p className="select-description">
                                    (用于添加需要显示项,如修改字段，原先的数据不会更改)
                                </p>
                                </label>
                                <Button onClick={this.addClickHandle} className="pull-right">新增</Button>
                                <Table 
                                className="record-configuration-table margin-sm-top"
                                bordered
                                rowKey="_id"
                                pagination={false}
                                columns={this.columns()} 
                                dataSource={data} />
                            </Col>
                        </Row> 
                    </Form>
                </Modal>
            </div>
        )

        return (
            content
        );
    }
}

export default Form.create()(App)



