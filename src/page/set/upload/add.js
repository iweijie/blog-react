import React, { Component } from 'react';
import { timestampFromat } from "util/baseTool"
import {
    Button,
    Input,
    Row,
    Col,
    Radio,
    Form,
    Modal
} from "antd"
const FormItem = Form.Item
const RadioGroup = Radio.Group;


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false
    }
    controlModel = (flag = true) => {
        this.setState({
            visible: flag
        })
    }
    componentWillUnmount() {
    }
    handleOk = () => {
        const { validateFields } = this.props.form;
        let { userInfo } = this.props;
        if (!userInfo.isLogin) return;
        validateFields((err, value) => {
            if (err) {
                return
            }
            console.log(value)
        })
    }
    handleCancel = () => {
        this.controlModel(false)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { userInfo } = this.props;
        let { userId, userName } = userInfo;
        return (
            <div className="set-upload--add-wrap">
                <div className="set-upload-add">
                    <Button icon="plus" type="primary" onClick={() => this.controlModel(true)}>Add</Button>
                </div>
                <Modal
                    width={500}
                    className="set-upload-modal"
                    title={"文件上传"}
                    destroyOnClose
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Row type="flex" justify="space-between">
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">选择文件：</label>
                                <FormItem>
                                    <span className="set-upload-btn">
                                        <Button type="primary" icon="plus">添加文件</Button>
                                        <input type="file" title=""/>
                                    </span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            {getFieldDecorator('creator', {
                                initialValue: userName
                            })(
                                <Input hidden />
                            )}
                            {getFieldDecorator('creatorId', {
                                initialValue: userId
                            })(
                                <Input hidden />
                            )}
                            <Col span={24} style={{ position: "relative" }}>
                                <label className="select-label">类型：</label>
                                <FormItem>
                                    {getFieldDecorator('limit', {
                                        initialValue: 0,
                                        rules: [{ required: true, message: 'Please select type!' }]
                                    })(
                                        <RadioGroup >
                                            <Radio value={0}>公开</Radio>
                                            <Radio value={1}>登入可见</Radio>
                                            <Radio value={2}>私有</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(App)