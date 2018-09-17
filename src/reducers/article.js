// import {articleType} from "actions/article"
import {articleList,articleDetials,cleararticleList,pushReview} from "actions/article"

function articleListModel(state = {}, action) {
    switch (action.type) {
        case articleList:
            var {type,list,page,more} = action.payload
            var data = state[type]
            if(data){
                if(list && list.length){
                    state[type].list.push(...list)
                    state[type].page = page
                    state[type].more = more
                }else {
                    state[type].more = more
                }
            }else {
                state[type] = {
                    list,page,more
                }
            }
            return { ...state } ;
        case cleararticleList:
            return {}
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