
import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Classification from "./components/classification"
import "../comom.css"
import { 
    Button ,
    Table
} from 'antd';

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){

    }
    
    componentWillUnmount(){
        window.observer.remove()
    }
    render() {
        var { articleClassifyConfigActionSync } = this.props
        
        const content = (
            <div className="config">
                <Classification {...this.props}></Classification>
            </div>
        )

        return (
            content
        );
    }
}
const mapStateToProps = (store,ownProps)=>{
	return {
        menuInfos:store.menuInfos
	}
}

export default connect(mapStateToProps,dispatchAction)(App)
