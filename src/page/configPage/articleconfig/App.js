
import React, {Component} from 'react';
import {connect} from 'react-redux';
import dispatchAction from "util/dispatchAction"
import Classification from "./components/classification"
import "../comom.css"

class App extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount(){

    }
    
    componentWillUnmount(){
        window.observer.remove()
    }
    render() {
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
const mapStateToProps = (store)=>{
	return {
        menuInfos:store.menuInfos
	}
}

export default connect(mapStateToProps,dispatchAction)(App)
