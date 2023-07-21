import * as api from '../api';
import { AUTH } from "../actionTypes/actionTypes"

export const signIn = (FormData, history) => async (dispatch) => {
    try {
    const {data} = await api.signIn(FormData);
    dispatch({type: AUTH, data})
   
    history.push('/')
    } catch (error) {
        console.log(error.message)
    }
} 

export const signUp = (FormData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(FormData);
        dispatch({type: AUTH, data})

        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
} 
