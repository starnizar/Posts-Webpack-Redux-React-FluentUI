import {ADD_POST, DELETE_POST, FETCH_POSTS} from "./types";

const initialState = {
    posts: []
}

export function postsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS: // удаленные и созданные посты пушатся в начало для наглядности
            if (state.posts.length) {
                const filteredPosts = action.payload.filter(post => !state.posts.find(item => item.id === post.id))
                if (filteredPosts.length) {
                    return {...state, posts: [...filteredPosts, ...state.posts]}
                }
                return state
            }
            return {...state, posts: [...state.posts, ...action.payload]}
        case ADD_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        case DELETE_POST:
            console.log()
            return {...state, posts: state.posts.filter(post => !action.payload.some(item => post.id === item.id))}
        default:
            return state
    }
}