import {AUTH, LOGOUT} from '../actionTypes/actionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            localStorage.setItem('name', action?.data.result.name)
            localStorage.setItem('id', action?.data.result._id)
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state;
    }
}

export default authReducer;