// import {articleType} from "actions/article"
import {articleList,articleDetials,cleararticleList,pushReview} from "actions/article"

function articleListModel(state = {
    result:[],
    totle:0
}, action) {
    switch (action.type) {
        case articleList:
            return action.payload
        case cleararticleList:
            return {
                result:[],
                totle:0
            }
        default:
            return state;
    }
}
function articleDetialsModel(state ={}, action) {
    switch (action.type) {
        case articleDetials:
            return action.payload ;
        case pushReview:
            state.review.push(action.payload)
            return  {
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