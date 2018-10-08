/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, {Component} from 'react';
import observer from "util/observer"
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio
} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input
const RadioGroup = Radio.Group;

class SelectDate extends Component {
    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
    }
    componentDidMount(){
        observer.on("addArticleSelect",this.getValue)
    }
    getValue = ()=>{
        var {getFieldsValue} = this.props.form
        return getFieldsValue()
    }
    render() {
        var {getFieldDecorator} = this.props.form
        var {defualtvalue} = this.props
        var {title,classify,description,ispublic} = defualtvalue
        var {linearArr} =this.props.menuInfos
        var reg = /^\/article\/list\/[A-z0-9]+$/
        linearArr = linearArr.filter(v=>reg.test(v.url))
        var options = linearArr.map(v=><Option key={v._id} value={v.classify}>{v.title}</Option>)
        return (
            <Form className="form-select">
                <Row type="flex" justify="space-between">
                    <Col span={24} style={{paddingLeft:"40px",position:"relative"}}>
                        <label className="select-label">标题：</label>
                        <FormItem>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input title!' }],
                                initialValue: title,
                            })(
                                <Input placeholder="标题" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} style={{paddingLeft:"40px",position:"relative"}}>
                        <label className="select-label">分类：</label>
                        <FormItem>
                            {getFieldDecorator('classify', {
                                rules: [{ required: true, message: 'Please input title!' }],
                                initialValue: classify,
                            })(
                                <Select  placeholder="分类">
                                    {options}
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={24} style={{paddingLeft:"40px",position:"relative"}}>
                        <label className="select-label">描述：</label>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input description!' }],
                                initialValue: description,
                            })(
                                <TextArea rows={2} placeholder="描述" />
                            )}
                        </FormItem>
                    </Col>

                    <Col md={11}  span={24} style={{paddingLeft:"80px",position:"relative"}}>
                        <label className="select-label">是否公开：</label>
                        <FormItem>
                            {getFieldDecorator('ispublic',{
                                initialValue: ispublic !== undefined ? ispublic : true,
                            })(
                                <RadioGroup >
                                    <Radio value>公开</Radio>
                                    <Radio value={false}>私有</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(SelectDate)
