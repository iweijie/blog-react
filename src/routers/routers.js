/* eslint-disable */
import React from 'react'
import Bundle from '../bundle/bundle'
import Verification from "page/comom/Verification"

/**
 * 首页
 */
const AsyncHome = (props) => (
    <Bundle load={() => import('../page/home/App')}>
        {(Home) => <Verification key="1"><Home {...props} /></Verification>}
    </Bundle>
)
/**
 *  文章列表
 */
// const AsyncArticleList = (props) => (
//     <Bundle load={() => import('../page/articleList/index')}>
//         {(ArticleList) => <Verification key="2"><ArticleList {...props} /></Verification>}
//     </Bundle>
// )

/**
 *  新增文章
 */
// const AsyncAddArticle = (props) => (
//     <Bundle load={() => import('../page/addArticle/index')}>
//         {(AddArticle) => <Verification key="3"><AddArticle {...props} /></Verification>}
//     </Bundle>
// )
/**
 *  查看文章详情
 */
const AsyncArticleDetail = (props) => (
    <Bundle load={() => import('../page/articleDetail')}>
        {(ArticleDetail) => <Verification key="4"><ArticleDetail {...props} /></Verification>}
    </Bundle>
)

/**
 *  上传界面
 */
// const AsyncUploadCom = (props) => (
//     <Bundle load={() => import('../page/upload/App')}>
//         {(UploadCom) => <Verification><UploadCom {...props} /></Verification>}
//     </Bundle>
// )
/**
 *  登入
 */
const AsyncLogin = (props) => (
    <Bundle load={() => import('../page/login')}>
        {(Login) => <Verification><Login {...props} /></Verification>}
    </Bundle>
)
/**
 * 碎碎念
 */
const AsyncSelftalking = (props) => (
    <Bundle load={() => import('../page/selftalking')}>
        {(Selftalking) => <Verification><Selftalking {...props} /></Verification>}
    </Bundle>
)
/**
 * 设置界面
 */
const AsyncSet = (props) => (
    <Bundle load={() => import('../page/set')}>
        {/* {(Setting) => <Setting {...props} />} */}
        {(Setting) => <Verification><Setting {...props} /></Verification>}
    </Bundle>
)
/**
 *  404
 */
const AsyncNoFound = (props) => (
    <Bundle load={() => import('../page/404/404')}>
        {(NoFound) => <NoFound {...props} />}
    </Bundle>
)


export const routes = [
    {
        path: '/',
        exact: true,
        component: AsyncHome
    },
    {
        path: '/tags/:id',
        exact: true,
        component: AsyncHome
    },
    {
        path: '/selftalking',
        exact: true,
        component: AsyncSelftalking
    },
    {
        path: '/article/detail/:id',
        component: AsyncArticleDetail,
        exact: true,
    },
    {
        path: '/login',
        component: AsyncLogin,
        exact: true,
    },
    {
        path: '/set',
        component: AsyncSet,
    },
    {
        path: '/404',
        component: AsyncNoFound,
        exact: true,
    },
    {
        path: '*',
        component: AsyncNoFound
    }

]