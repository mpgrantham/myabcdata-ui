import { SET_SESSION_KEY, SET_SETTINGS, SET_USER_NAME } from '../reducers/userReducer';

export const setSession = (userSession) => {

    return {
        type: SET_SESSION_KEY,
        user: userSession.username,
        key: userSession.sessionKey,
        userId: userSession.id,
        email: userSession.email,
        startPage: userSession.startPage
    }
}

export const setSettings = (email, startPage) => {
    return {
        type: SET_SETTINGS,
        email: email,
        startPage: startPage
    }
}

export const setUsername = (username) => {
    return {
        type: SET_USER_NAME,
        user: username
    }
}