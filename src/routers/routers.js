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
const AsyncArticleList = (props) => (
    <Bundle load={() => import('../page/articleList/index')}>
        {(ArticleList) => <Verification key="2"><ArticleList {...props} /></Verification>}
    </Bundle>
)

/**
 *  新增文章
 */
const AsyncAddArticle = (props) => (
    <Bundle load={() => import('../page/addArticle/index')}>
        {(AddArticle) => <Verification key="3"><AddArticle {...props} /></Verification>}
    </Bundle>
)
/**
 *  查看文章详情
 */
const AsyncArticleDetail = (props) => (
    <Bundle load={() => import('../page/articleDetail/index')}>
        {(ArticleDetail) => <Verification key="4"><ArticleDetail {...props} /></Verification>}
    </Bundle>
)
/**
 *  文章配置界面
 */
// const AsyncArticleConfig = (props) => (
//     <Bundle load={() => import('../page/configPage/articleconfig/App')}>
//         {(ArticleConfig) => <Verification key="5"><ArticleConfig {...props} /></Verification>}
//     </Bundle>
// )

/**
 *  菜单配置界面
 */
const AsyncMenuConfig = (props) => (
    <Bundle load={() => import('../page/configPage/menuConfig/App')}>
        {(MenuConfig) => <Verification><MenuConfig {...props} /></Verification>}
    </Bundle>
)
/**
 *  生活类  生活费
 */
const AsyncLiveExpenses = (props) => (
    <Bundle load={() => import('../page/live/expenses/index')}>
        {(LiveExpenses) => <Verification><LiveExpenses {...props} /></Verification>}
    </Bundle>
)
/**
 *  展示类型新增项界面
 */
// const AsyncMannerConfig = (props) => (
//     <Bundle load={() => import('../page/configPage/mannerConfig/App')}>
//         {(MannerConfig) => <Verification><MannerConfig {...props} /></Verification>}
//     </Bundle>
// )

/**
 *  记录类界面
 */
// const AsyncRecord = (props) => (
//     <Bundle load={() => import('../page/record/index')}>
//         {(Record) => <Verification><Record {...props} /></Verification>}
//     </Bundle>
// )
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
        path: '/article/list/:id',
        component: AsyncArticleList,
        exact: true,
    },
    {
        path: '/article/detail/:id',
        component: AsyncArticleDetail,
        exact: true,
    },
    // {
    //     path: '/config/articleConfig',
    //     component: AsyncArticleConfig,
    //     exact: true,
    // },
    {
        path: '/add/article',
        component: AsyncAddArticle,
        exact: true,
    },
    {
        path: '/edit/article/:id',
        component: AsyncAddArticle,
        exact: true,
    },
    // {
    //     path: '/record/:id',
    //     component: AsyncRecord,
    //     exact: true,
    // },
    // {
    //     path: '/config/manner',
    //     component: AsyncMannerConfig,
    //     exact: true,
    // },
    {
        path: '/config/menu',
        component: AsyncMenuConfig,
        exact: true,
    },
    {
        path: '/live/expenses',
        component: AsyncLiveExpenses,
        exact: true,
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