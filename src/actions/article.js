import axios from "util/axios"
import config from "config"
import { message } from "antd"
export const articleList = "articleList"
export const cleararticleList = "cleararticleList"
export const articleDetials = "articleDetials"
export const articlesubmit = "articlesubmit"
export const pushReview = "pushReview"

// 清空文章列表
const clearArticleListAction = () => ({
    type: cleararticleList
})
// 文章列表
const articleListAction = value => ({
    type: articleList,
    payload: value
})
const syncGetArticleList = (params) => (dispatch) => {
    var { id, page, pageSize } = params
    return axios.post(`${config.basicsUrl}/api/article/list`, params)
        .then(data => {
            if (data.state == 1) {
                const resdata = data.result;
                var len = resdata.length
                if (len) {
                    dispatch(articleListAction({
                        type: id,
                        page,
                        list: resdata,
                        more: len == pageSize
                    }))
                } else {
                    dispatch(articleListAction({
                        type: id,
                        more: false
                    }))
                }
                return len && len == pageSize
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
    articleListAction,
    syncGetArticleList,
    articleDetailsAction,
    getArticleDetails,
    articlesubmitAction,
    syncArticlesubmit,
    syncArticleLeavesubmit,
    asyncArticlTime,
    syncArticleLeave
}