
import React, { Component } from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Select
} from "antd"
const Option = Select.Option;

const FormItem = Form.Item
class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false
    }
    add = () => {
        this.setState({
            visible: true
        })
    }
    cancel = () => {
        this.setState({
            visible: false
        })
    }
    ok = () => {
        var { getFieldsValue } = this.props.form;
        var data = getFieldsValue()
        this.props.articleClassifyConfigActionSync(data)
    }
    componentDidMount() {
        window.observer.on("modal", this.add)
    }
    render() {
        var { menuInfos } = this.props
        var linearArr = menuInfos.linearArr
        var options = linearArr.map(v => <Option key={v._id} value={v._id}>{v.title}</Option>)
        return (
            <Modal
                title="添加文章分类"
                visible={this.state.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
            >
                <Form>
                    <Row type="flex" justify="space-between">
                        <Col span={24} style={{ position: "relative" }}>
                            <label className="select-label">分类名称：</label>
                            <FormItem>
                                {this.props.form.getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input name!' }],
                                })(
                                    <Input placeholder="分类名称" />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={24} style={{ position: "relative" }}>
                            <label className="select-label">对应菜单：</label>
                            <FormItem>
                                {this.props.form.getFieldDecorator('menuSelect', {
                                    rules: [{ required: true, message: 'Please input menuSelect!' }],
                                })(
                                    <Select placeholder="对应菜单">
                                        {options}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24} style={{ position: "relative" }}>
                            <label className="select-label">关键词：</label>
                            <FormItem>
                                {this.props.form.getFieldDecorator('keyword', {
                                    rules: [{ required: true, message: 'Please input keyword!' }],
                                })(
                                    <Input placeholder="关键词" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24} style={{ position: "relative" }}>
                            <label className="select-label">描述：</label>
                            <FormItem>
                                {this.props.form.getFieldDecorator('description', {
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
