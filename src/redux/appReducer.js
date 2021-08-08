import {TOGGLE_DIALOG, TOGGLE_MODAL, TOGGLE_LOADER} from "./types";

const initialState = {
    dialog: true,
    loader: false,
    modal: false
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return {...state, dialog: !state.dialog}
        case TOGGLE_LOADER:
            return {...state, loader: !state.loader}
        case TOGGLE_MODAL:
            return {...state, modal: !state.modal}
        default: return state
    }
}