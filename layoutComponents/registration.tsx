import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { appContext } from '../appContext';
import { IRegistrationForm } from '../interfaces';
import styles from '../styles';
import { Form, Formik } from 'formik';

const formComponent = () => {
    const contextValues = useContext(appContext);
    return (
        <Formik
            initialValues={{
                email: 'abc@456.com',
                password: 'password2',
                phoneNumber: '87654321',
                clinicName: 'clinic11',
                address: 'address2'
            }}
            onSubmit={(formikProps)=>{
                contextValues.dispatch({ 
                    // type: 'REGISTRATION',
                    type: 'GET_RECORD',
                    payload: formikProps
                });
            }}
            validate={()=>{}}
        >
            {(formikProps) => (
                <Form>
                    <TextInput
                        value={formikProps.values.email}
                        onChangeText={formikProps.handleChange('email')}
                    />
                    <br/>
                    <TextInput
                        value={formikProps.values.password}
                        onChangeText={formikProps.handleChange('password')}
                    />
                    <br/>
                    <TextInput
                        value={formikProps.values.phoneNumber}
                        onChangeText={formikProps.handleChange('phoneNumber')}
                    />
                    <br/>
                    <TextInput
                        value={formikProps.values.clinicName}
                        onChangeText={formikProps.handleChange('clinicName')}
                    />
                    <br/>
                    <TextInput
                        value={formikProps.values.address}
                        onChangeText={formikProps.handleChange('address')}
                    />
                    <br/>
                    <Button
                        title={'Register'}
                        onPress={()=>{
                            formikProps.handleSubmit();
                            console.log("after handleSubmit");
                        }}
                    />
                </Form>
            )}
        </Formik>
    );
}

export const RegistrationScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Registration Screen</Text>
            {formComponent()}
        </View>
    ); 
}