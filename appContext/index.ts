import { createContext } from 'react';
import { IAction, IAppState, IContextProps } from '../interfaces';
import { getRecord, login, register } from '../apiClient';

export const appInitialState = {
    loggedIn: false,
    jwtToken: '',
    clinicName: ''
};

// export const appContext = createContext({} as IContextProps);

export const appReducer = async (state: IAppState, action: IAction) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('appReducer LOGIN');
            try {
                await login(action.payload, (result) => {
                    console.log(result);
                    state.loggedIn = true;
                    state.jwtToken = result.token;
                    state.clinicName = result.result.clinicName;
                });
                console.log('login state', state);
            } catch(error) {
                console.error('Login failed');
            } finally {
                return state;
            }
        
        case 'LOGOUT':
            console.log('appReducer LOGOUT');
            state.loggedIn = false;
            state.jwtToken = '';
            state.clinicName = 'action.payload.clinicName';
            return state;
        case 'REGISTER':
            console.log('appReducer REGISTER');
            await register(action.payload, (result) => {

            });
            return state;
        case 'GET_RECORD':
            const { dateTime, mode, jwtToken, clinicName, loggedIn, callback } = action.payload;
            console.log('GET_RECORD payload', action.payload);
            console.log('GET_RECORD state', state);
            const requestBody = { 
                dateTime,
                mode,
                jwtToken,
                clinicName,
                loggedIn
            };
            
            // const requestBody = { 
            //     dateTime,
            //     mode,
            //     jwtToken: state.jwtToken,
            //     clinicName: state.clinicName,
            //     loggedIn: state.loggedIn
            // };
            console.log('GET_RECORD requestBody', requestBody);
            try {
                await getRecord(requestBody, callback);
            } catch(error) {
                console.error('Get record failed');
            } finally {
                return state;
            }
            
        default:
            console.log('appReducer default');
            return state;
    }
}

export const appContext = createContext({
    loggedIn: false,
    jwtToken: 'ssss',
    clinicName: '12345'
});