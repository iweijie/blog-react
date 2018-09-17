import React, { Component } from 'react';
import {
    Button,
    Table,
} from "antd"
import Modal from "./modal"

class App extends Component {
    constructor(props) {
        super(props);
    }
    dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }];

    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '对应菜单',
        dataIndex: 'menu',
        key: 'age',
    }, {
        title: '关键词',
        dataIndex: 'keyword',
        key: 'address',
    }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: '操作',
        key: 'handle',
        render: () => {
            return <span>123</span>
        }
    }];
    componentDidMount() {
    }
    add = () => {
        window.observer.emit("modal")
    }
    render() {
        return (
            <div className="configTable">
                <div className="configtitle">
                    文章分类设置
                    <Button onClick={this.add}>新增</Button>
                </div>
                <Table
                    bordered
                    pagination={false}
                    dataSource={this.dataSource}
                    columns={this.columns} />
                <Modal {...this.props} />
            </div>
        );
    }
}


export default App
