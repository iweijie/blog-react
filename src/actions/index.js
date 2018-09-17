/**
*作者: weijie
*功能描述: action 集合
*时间: 2018/4/16 10:50
*/
import common from "./common"
import articleAction from "./article"
import configAction from "./config"
import home from "./home"


const actions = {
    ...common,
    ...articleAction,
    ...configAction,
    ...home
}

export default actions




