import React, { Dispatch, useContext, useState, SetStateAction } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Table, Row } from 'react-native-table-component';
import { appContext } from '../appContext';
import { GetRecordMode, INavigation, IClinicRecord } from '../interfaces';
import styles from '../styles';

interface IClinicRecordScreenState {
    clinicRecord?: IClinicRecord[],
    tableContent: Object[][],
    mode?: GetRecordMode,
    dateTime?: Date,
    showDatePicker?: boolean
};

const sampleClinicRecord = [
    {
        medication: [
            'medication1'
        ],
        '_id': '5f2695db9e24bbd9508ffb2b',
        'clinicName': 'clinic1',
        'doctorName': 'doctor1',
        'patientName': 'patient1',
        'diagnosis': 'diagnosis1',
        'consultationFee': 1234,
        'needFollowUp': true,
        'dateTime': new Date('2020-08-01T16:00:00.000Z')
    },
    {
        'medication': [
            'medication1',
            'medication2'
        ],
        '_id': '5f26961b9e24bbd9508ffb2c',
        'clinicName': 'clinic1',
        'doctorName': 'doctor2',
        'patientName': 'patient2',
        'diagnosis': 'diagnosis2',
        'consultationFee': 1000,
        'needFollowUp': false,
        'dateTime': new Date('2020-07-09T16:00:00.000Z')
    },
    {
        'medication': [
            'medication3'
        ],
        '_id': '5f2696629e24bbd9508ffb2d',
        'clinicName': 'clinic1',
        'doctorName': 'doctor2',
        'patientName': 'patient3',
        'diagnosis': 'diagnosis3',
        'consultationFee': 950,
        'needFollowUp': false,
        'dateTime': new Date('2020-07-06T16:00:00.000Z')
    }
];

const tableHeader = ['_id', 'doctorName', 'patientName', 'dateTime'];

const fillTableContent = (clinicRecord: IClinicRecord[]) => {
    let tableContent = [];
    clinicRecord.map(clinicRecord => {
        let rowData = [];
        rowData.push(clinicRecord._id);
        rowData.push(clinicRecord.doctorName);
        rowData.push(clinicRecord.patientName);
        rowData.push(clinicRecord.dateTime.toLocaleString());
        tableContent.push(rowData);
    });
    return tableContent;
}

const tableComponent = (navigation: any, state: IClinicRecordScreenState, setState: Dispatch<SetStateAction<IClinicRecordScreenState>>) => {
    const { clinicRecord, tableContent } = state;
    return (
        <ScrollView horizontal={true}>
            <Table borderStyle={styles.tableBorder}>
                <Row data={tableHeader}/>
                {tableContent.map((rowData, index) => (
                    <Row 
                        data={rowData}
                        key={index}
                        onClick={() => {
                            navigation.navigate('Record Detail', { recordDetail: clinicRecord[index] });
                        }}
                    />
                ))}
            </Table>
        </ScrollView>
    );
}

export const ClinicRecordScreen = (props: INavigation) => {
    const { navigation } = props;
    const tableContent = fillTableContent(sampleClinicRecord);
    const [state, setState] = useState({
        clinicRecord: sampleClinicRecord,
        tableContent: tableContent,
        mode: GetRecordMode.MONTHLY,
        dateTime: new Date(),
        showDatePicker: false
    });
    const contextValues = useContext(appContext);
    
    return (
        <View style={styles.container}>
            <Text>Clinic Record Screen</Text>
            {tableComponent(navigation, state, setState)}
            <Button
                title='Select Date'
                onPress={() => {
                    setState({
                        clinicRecord: state.clinicRecord,
                        tableContent: state.tableContent,
                        mode: state.mode,
                        dateTime: state.dateTime,
                        showDatePicker: true
                    });
                    console.log('select date', state);
                }}
            />
            <DateTimePicker
                value={state.dateTime}
                mode={'date'}
                onChange={(event, date) => {
                    setState({
                        clinicRecord: state.clinicRecord,
                        tableContent,
                        mode: state.mode,
                        dateTime: new Date(date),
                        showDatePicker: false
                    });
                }}
            />
            <DropDownPicker
                items={[
                    {label: 'Monthly', value: GetRecordMode.MONTHLY},
                    {label: 'Weekly', value: GetRecordMode.WEEKLY},
                    {label: 'Daily', value: GetRecordMode.DAILY}
                ]}
                defaultValue={state.mode}
                onChangeItem={item => setState({
                    clinicRecord: state.clinicRecord,
                    tableContent: state.tableContent,
                    mode: item.value,
                    dateTime: state.dateTime,
                    showDatePicker: state.showDatePicker
                })}
            />
            <Button
                title='Get Record'
                onPress={() => {
                    console.log('onPress contextValues', contextValues);
                    contextValues.dispatch({ 
                        type: 'GET_RECORD',
                        payload: {
                            dateTime: state.dateTime,
                            mode: state.mode,
                            jwtToken: contextValues.jwtToken,
                            clinicName: contextValues.clinicName,
                            loggedIn: contextValues.loggedIn,
                            callback: (result) => {
                                console.log(result);
                                setState({
                                    clinicRecord: result,
                                    tableContent: fillTableContent(result),
                                    mode: state.mode,
                                    dateTime: state.dateTime,
                                    showDatePicker: state.showDatePicker
                                });
                            }
                        }
                    });
                }}
            />
        </View>
    ); 
}