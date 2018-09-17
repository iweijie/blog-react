
import React, {Component} from 'react';
import {
    Button ,
    Table,
    Modal,
    Form, 
    Input, 
    Row,
    Col,
    Radio,
    message
} from "antd"
import history from "util/history"
const FormItem = Form.Item
const RadioGroup = Radio.Group;
class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible:false,
        removeVisible:false,
        params:{}
    }
    // 添加菜单配置
    add = ()=>{
        this.setState({
            visible:true,
        })
    }
    // 取消事件
    cancel = ()=>{
        this.props.form.resetFields()
        this.setState({
            visible:false,
        })
    }
    // 提交事件
    ok = ()=>{
        var {getFieldsValue } = this.props.form;
        var {syncMannerConfigAction,syncMannerAction} = this.props
        var {type} = this.state.params
        var data = getFieldsValue()
        syncMannerConfigAction(data)
        .then(result=>{
            this.cancel()
            syncMannerAction()
        })
    }
    // 重置菜单数据 
    resetMenu = (result)=>{
        if(!result) return 
        var {menuInfos,syncMenuAction,userInfo} = this.props;
        var isLogin = userInfo.isLogin
        syncMenuAction(isLogin)
    }
    componentDidMount(){
        window.observer.on("addModal",this.add)
    }
    render() {

        var {getFieldDecorator} = this.props.form
        return (
                <Modal
                className="modal"
                title={name}
                visible={this.state.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
                >
                    <Form className="menu-config">
                        <Row type="flex" justify="space-between">
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">名称：</label>
                                <FormItem>
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Please input title!' }],
                                    })(
                                        <Input placeholder="名称" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">展示类型：
                                <p className="select-description">
                                   (用于设置当前路径需要以哪种方式展示)
                                </p>
                                </label>
                                <FormItem>
                                    {getFieldDecorator('manner', {
                                        rules: [{ required: true, message: 'Please input manner!' }],
                                    })(
                                        <Input placeholder="展示类型" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{position:"relative"}}>
                                <label className="select-label">描述：</label>
                                <FormItem>
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Please input description!' }],
                                    })(
                                        <Input placeholder="描述" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row> 
                    </Form>
                </Modal>
        );
    }
}

export default Form.create()(App)
