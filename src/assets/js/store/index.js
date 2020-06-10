import { createStore } from 'redux'
import { connect } from 'react-redux'
import type from  './types'

import actions from './actions'

const initialState = {};

let reducer = (state, actions) => {
    switch (actions.type) {
        case type.SET_FORM_DATA:
            return {
                ...state,
                ...actions
            }
    }

    return state;
};


export const store = createStore(reducer, initialState);


const mapStateToProps = (state) => {
    return {
        state
    }
};

const mapDispatchToProps = {
    ...actions,
};

export const connectRedux = (component) => {
    return connect(mapStateToProps, mapDispatchToProps)(component);
};
