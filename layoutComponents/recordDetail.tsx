import React from 'react';
import { Text, View } from 'react-native';
import { INavigation, IClinicRecord } from '../interfaces';
import styles from '../styles';

const recordDetailComponent = (recordDetail: IClinicRecord) => {
    if(!recordDetail) {
        return null;
    }
    return (
        <View>
            <Text>Clinic Name: </Text><br/>
            <Text>{`ID: ${recordDetail._id}`}</Text><br/>
            <Text>{`Clinic Name: ${recordDetail.clinicName}`}</Text><br/>
            <Text>{`Doctor Name: ${recordDetail.doctorName}`}</Text><br/>
            <Text>{`Patient Name: ${recordDetail.patientName}`}</Text><br/>
            <Text>{`Diagnosis: ${recordDetail.diagnosis}`}</Text><br/>
            <Text>Medication: </Text><br/>
            {recordDetail.medication.map((item, index) => (
                <Text key={index}>{item}</Text>
            ))}
            <br/>
            <Text>{`Consultation Fee: $ ${recordDetail.consultationFee}`}</Text><br/>
            <Text>{`Need follow up: ${recordDetail.needFollowUp}`}</Text><br/>
        </View>
    );
}

export const RecordDetailScreen = (props: INavigation) => {
    const { recordDetail } = props.route.params;
    console.log('recordDetail', recordDetail);
    return (
        <View style={styles.container}>
            <Text>Record Detail</Text>
            {recordDetailComponent(recordDetail)}
        </View>
    ); 
}