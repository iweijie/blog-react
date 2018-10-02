import axios from "util/axios"
import config from "config"
import { message } from "antd"
export const appendArticleList = "appendArticleList"
export const replaceArticleList = "replaceArticleList"
export const cleararticleList = "cleararticleList"
export const articleDetials = "articleDetials"
export const articlesubmit = "articlesubmit"
export const pushReview = "pushReview"

// 清空文章列表
const clearArticleListAction = () => ({
    type: cleararticleList
})
// 文章列表(替换)
const replaceArticleListAction = value => ({
    type: replaceArticleList,
    payload: value
})
// 文章列表(追加)
const appendArticleListAction = value => ({
    type: appendArticleList,
    payload: value
})
// 默认追加模式
const getArticleListAsync = (params,pattern) => (dispatch) => {
    return axios.get(`${config.basicsUrl}/api/article/list`, {params})
        .then(data => {
            if (data.state == 1) {
                pattern ? dispatch(replaceArticleListAction(data)) : dispatch(appendArticleListAction(data));
                return data
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 文章详情
const articleDetailsAction = value => ({
    type: articleDetials,
    payload: value
})
const getArticleDetails = (params) => (dispatch) => {
    return axios.get(`${config.basicsUrl}/api/article/get`, {
        params
    })
        .then(data => {
            if (data.state == 1) {
                const resdata = data.result;
                dispatch(articleDetailsAction(resdata))
                return resdata
            }
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

// 文章 新增与修改
const articlesubmitAction = value => ({
    type: articleDetials,
    payload: value
})
const syncArticlesubmit = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/article/add`, params)
        .then(data => {
            if (data.state == 1) {
                message.success(data.msg)
            }
            return data.state
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 添加留言
const syncArticleLeave = (value) => {
    return {
        type: pushReview,
        payload: value
    }
}
const syncArticleLeavesubmit = (params) => (dispatch) => {
    return axios.post(`${config.basicsUrl}/api/article/review/add`, params)
        .then(data => {
            if (data.state == 1) {
                message.success(data.msg)
                dispatch(syncArticleLeave(data.result))
            }
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}
// 更新查看次数
const asyncArticlTime = (params) => () => {
    return axios.post(`${config.basicsUrl}/api/article/time`, params)
        .then(data => {
            return data
        }).catch(e => {
            console.log(e);
            message.error(e.messgae)
        })
}

export default {
    clearArticleListAction,
    appendArticleListAction,
    replaceArticleListAction,
    getArticleListAsync,
    articleDetailsAction,
    getArticleDetails,
    articlesubmitAction,
    syncArticlesubmit,
    syncArticleLeavesubmit,
    asyncArticlTime,
    syncArticleLeave
}