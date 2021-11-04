import React, {Context, createContext, useContext, useEffect, useReducer, useState} from 'react';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_SESSION_KEY = 'SET_SESSION_KEY';
export const SET_TAB = 'SET_TAB';
export const SET_OBSERVED = 'SET_OBSERVED';
export const SET_OBSERVED_LIST = 'SET_OBSERVED_LIST';
export const SET_DISABLE_OBSERVED = 'SET_DISABLE_OBSERVED';

const INITIAL_STATE = {
    userName: '', 
    id: 0, 
    tabIdx: 0, 
    sessionKey: '', 
    observedId: 0, 
    observedNm: '', 
    email: '', 
    startPage: '', 
    disableObserved: false,
    observedList: []
};

const INITIAL_ACTION = {
    action: ''
}


const stateReducer = (state, action) => {

    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.user
            };

        case SET_SETTINGS:
            return {
                ...state,
                email: action.email,
                startPage: action.startPage
            };

        case SET_SESSION_KEY:
            return {
                ...state,
                sessionKey: action.key,
                userName: action.user,
                email: action.email,
                startPage: action.startPage,
                id: action.userId,
                disableObserved: action.disableObserved
            };
        
        case SET_TAB:
            return {
                ...state,
                tabIdx: action.tab
            };
        
        case SET_OBSERVED:
            return {
                ...state,
                observedId: action.observed,
                observedNm: action.name
            };
        
        case SET_OBSERVED_LIST:
            return {
                ...state,
                observedList: action.observedList
            };

        case SET_DISABLE_OBSERVED:
            return {
                ...state,
                disableObserved: action.disableObserved
            };   

        default:
            return state;
    }

}

const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('myabcdata-store');
        if ( serializedState === null ) {
            return INITIAL_STATE;
        }

        return JSON.parse(serializedState);
    }
    catch ( ex ) {
        return INITIAL_STATE;
    }
}

const initialState = loadState();

export const UserContext = createContext();



const UserProvider = (props) => {

    const [userState, dispatch] = useReducer(stateReducer, initialState, INITIAL_ACTION);
    
    useEffect(() => {
        const serializedState = JSON.stringify(userState);
        sessionStorage.setItem('myabcdata-store', serializedState);
    }, [userState]);

    return (
        <div>
            <UserContext.Provider value={{ userState, dispatch }}>
                {props.children}
            </UserContext.Provider>
        </div>
    )
}

export default UserProvider;