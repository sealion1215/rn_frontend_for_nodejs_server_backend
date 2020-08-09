import { SERVER_BASE_URL } from '../config';
import { IAppState, IGetClinicRecordParam, ILoginForm } from '../interfaces';

export const login = (requestBody: ILoginForm, callback: (any) => (any)) => {
    console.log('api client login', JSON.stringify(requestBody));
    return fetch(`${SERVER_BASE_URL}/accounts/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(checkResponseStatus).then(callback);
};

export const register = (requestBody: ILoginForm, callback: (any) => (any)) => {
    return fetch(`${SERVER_BASE_URL}/accounts/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(checkResponseStatus).then(callback);
};

export const getRecord = (requestBody: IGetClinicRecordParam & IAppState, callback: (any) => (any)) => {
    const { jwtToken, clinicName, mode, dateTime } = requestBody;
    console.log('getRecord requestBody', requestBody);
    return fetch(`${SERVER_BASE_URL}/records/getRecords`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({clinicName, mode, dateTime})
    }).then(checkResponseStatus).then(callback);
}

const checkResponseStatus = (response: Response) => {
    if (response.status >= 400) {
        throw response;
    }
    return response.json();
}