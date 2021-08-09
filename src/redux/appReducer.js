import {TOGGLE_DIALOG, TOGGLE_MODAL, TOGGLE_LOADER, SHOW_CALLOUT, HIDE_CALLOUT} from "./types";

const initialState = {
    dialog: true,
    loader: false,
    modal: false,
    callout: false,
    message:'Initial message'
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return {...state, dialog: !state.dialog}
        case TOGGLE_LOADER:
            return {...state, loader: !state.loader}
        case TOGGLE_MODAL:
            return {...state, modal: !state.modal}
        case SHOW_CALLOUT:
            return {...state, callout: true, message: action.payload}
        case HIDE_CALLOUT:
            return {...state, callout: false}
        default: return state
    }
}