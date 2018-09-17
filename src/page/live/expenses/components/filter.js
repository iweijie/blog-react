/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { Component } from 'react';
import {
    Form,
    Button,
    Select,
    DatePicker
} from 'antd';
const { RangePicker } = DatePicker;
const FormItem = Form.Item

class SelectDate extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.observer.on("addArticleSelect", this.getValue)
    }
    getValue = () => {
        var { getFieldsValue } = this.props.form
        console.log(getFieldsValue())
        // return getFieldsValue()
    }
    showAddModal = () => {
        this.setState({
            add: true
        })
    }
    render() {
        var { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form className="filter">
                    <FormItem style={{
                        marginRight: 20,
                        float: "left",
                        minWidth: 200
                    }}>
                        {getFieldDecorator('time')(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem style={{
                        marginRight: 20,
                        float: "left",
                        minWidth: 200
                    }}>
                        {getFieldDecorator('classify')(
                            <Select placeholder="对应菜单">
                                {}
                            </Select>
                        )}
                    </FormItem>
                    <div style={{
                        float: "left",
                        marginTop: 4
                    }}>
                        <Button className="mr10" onClick={this.getValue}>筛选数据</Button>
                        <Button className="mr10" onClick={this.showAddModal}>添加数据</Button>
                        <Button>设置配置</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SelectDate)
