/**
*作者: weijie
*功能描述: 异步加载组件
*参数说明:
*时间: 2018/4/16 10:47
*/
import { Component } from 'react'

export default class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }
    // check = (props)=>{
    //     var {menuInfos} = props;
    //     if(!menuInfos) return 
    //     var pathList = menuInfos.menuPath;
    //     if(!pathList.length) return true
    //     var location = history.location
    //     var url = location.pathname;
    //     if(!pathList.includes(url)){
    //         history.replace("/404")
    //         return false
    //     }
    //     return true
    // }

    UNSAFE_componentWillMount() {
        // this.check(this.props)
        this.load(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.load.toString() !== this.props.load.toString()) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });

        props.load().then((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}