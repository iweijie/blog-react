import axios from "util/axios"
import config from "config"
import {message} from "antd"

export const homeBgImage = "HomeBgImage"
// 首页背景图
const getHomeBgImageAction = value => ({
    type: homeBgImage,
    payload: value
})
const getHomeBgImageActionSync = ()=>(dispatch)=>{
    return axios.post(`${config.basicsUrl}/api/request`)
        .then(data => {
            if(data.state){
                dispatch(getHomeBgImageAction(data.result))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

export default  {
    getHomeBgImageAction,
    getHomeBgImageActionSync,
}