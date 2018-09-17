import React, {Component} from 'react';
import {
    Button,
    Table,
    Icon
} from "antd"
import history from "util/history"
import {setKey} from "util/baseTool"
import Modal from "./modal"

class App extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            width:100,
        }, {
            title: '分类',
            dataIndex: 'manner',
            key: 'manner',
            width:100,
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            width:200,
        }
    ];
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    /**
     * 新增配置
     */
    add=()=>{
        window.observer.emit("addModal")
    }
    /**
     * 修改配置
     */
    // amend = (params) =>{
    //     var {menuInfos} = this.props
    //     var data = menuInfos.menuList;
    //     window.observer.emit("amendModal",{params,data})
    // }
    /**
     * 删除配置
     */
    // remove = (_id) =>{
    //     window.observer.emit("removeModal",_id)
    // }
    render() {
        var mannerModel = this.props.mannerModel ;
        if(!mannerModel || !mannerModel.length) return null
        mannerModel = setKey(mannerModel)
        return (
            <div className="configTable">
                <div className="configtitle">
                    菜单设置
                    <Button onClick={this.add}>新增</Button>
                </div>
                <Table 
                bordered
                dataSource={mannerModel} 
                pagination={false}
                columns={this.columns} />
                <Modal {...this.props}/>
            </div>
        );
    }
}

export default App
