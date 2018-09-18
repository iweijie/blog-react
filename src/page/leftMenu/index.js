import React from "react"
import {connect} from 'react-redux';
import LeftMenu from "./component"

import dispatchAction from "util/dispatchAction"

class LeftMenuContainer extends React.Component {

    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        var {userInfo,syncMenuAction,syncuserInfoCheckAction} = this.props;
        var {isLogin} = userInfo;
        // window.observer.once("login",(islogin)=>{
        //     syncMenuAction(islogin)
        // })
        if(!isLogin){
            syncuserInfoCheckAction()
            .then(result=>{
                result = result || {}
                if(result._id){
                    syncMenuAction(true)
                }else {
                    syncMenuAction(false)
                }
            })
        }else {
            syncMenuAction()
        }
    }
    render() {
        return (<LeftMenu {...this.props}/>);
    }
}
const mapStateToProps = (store)=>{
	return {
		menuInfos:store.menuInfos,
        userInfo:store.userInfoModel,
        menutoggleModel:store.menutoggleModel
	}
}
export default connect(mapStateToProps,dispatchAction)(LeftMenuContainer)