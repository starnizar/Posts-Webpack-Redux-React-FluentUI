import {
    ADD_POST,
    DELETE_POST,
    FETCH_POSTS,
    TOGGLE_DIALOG,
    TOGGLE_MODAL,
    TOGGLE_LOADER,
    SHOW_CALLOUT, HIDE_CALLOUT
} from "./types";

export function fetchPosts() {
    return async dispatch => {
        dispatch(toggleLoader())
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const answer = await response.json()
        dispatch({type: FETCH_POSTS, payload: answer})
        setTimeout(() => dispatch(toggleLoader()), 1000)
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        payload: post
    }
}

export function deletePosts(posts) {
    return {
        type: DELETE_POST,
        payload: posts
    }
}

export function toggleDialog() {
    return {
        type: TOGGLE_DIALOG
    }
}

export function toggleLoader() {
    return {
        type: TOGGLE_LOADER
    }
}
export function toggleModal() {
    return {
        type: TOGGLE_MODAL
    }
}

export function showCallout(message) {
    return dispatch => {
        dispatch({type: SHOW_CALLOUT, payload: message})
        setTimeout(() => dispatch(hideCallout()), 3000)
    }
}

export function hideCallout() {
    return {
        type: HIDE_CALLOUT
    }
}