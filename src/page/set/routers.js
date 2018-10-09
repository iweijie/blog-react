import React from 'react'
import Bundle from '../../bundle/bundle'

/**
 * 新增 or 修改 文章
 */
export const AsyncArticle = (props) => (
    <Bundle load={() => import('./addArticle')}>
        {(Article) => <Article {...props} />}
    </Bundle>
)
/**
 * 标签列表
 */
export const AsyncTags = (props) => (
    <Bundle load={() => import('./tags/index')}>
        {(Article) => <Article {...props} />}
    </Bundle>
)