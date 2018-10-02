import {
    appendArticleList,
    replaceArticleList,
    articleDetials,
    cleararticleList,
    pushReview
} from "actions/article"
function articleListModel(state = {
    result: [],
    total: 0
}, action) {
    switch (action.type) {
        case appendArticleList:
            return {
                result: [...state.result,...action.payload.result],
                total: action.payload.total
            }
        case replaceArticleList:
            return action.payload
        case cleararticleList:
            return {
                result: [],
                total: 0
            }
        default:
            return state;
    }
}
function articleDetialsModel(state = {}, action) {
    switch (action.type) {
        case articleDetials:
            return action.payload;
        case pushReview:
            state.review.push(action.payload)
            return {
                ...state
            };
        default:
            return state;
    }
}

export default {
    articleListModel,
    articleDetialsModel
}