import { Dispatch } from "react";

export interface IAction {
    type: string,
    payload: any
}

export interface IAppState {
    loggedIn: boolean,
    jwtToken?: string,
    clinicName?: string
}   

export interface IContextProps {
    appState: IAppState,
    appDispatch: Dispatch<IAction>;
}

export interface INavigation {
    route?: {
        params: any
    }
    navigation?: any
}

export interface ILoginForm {
    email: string,
    password: string
}

export interface IRegistrationForm extends ILoginForm {
    clinicName: string,
    phoneNumber: string,
    address: string
}

export interface ISimpleClinicRecord {
    _id: string,
    clinicName: string, 
    doctorName: string,
    patientName: string,
    dateTime: Date
}

export interface IClinicRecord extends ISimpleClinicRecord {
    diagnosis: string,
    medication: string[],
    consultationFee: number,
    needFollowUp: boolean
}

export interface IGetClinicRecordParam {
    dateTime?: Date,
    mode?: GetRecordMode
}

export enum GetRecordMode {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY'
}