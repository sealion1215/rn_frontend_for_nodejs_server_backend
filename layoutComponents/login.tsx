import React, { useContext } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { appContext } from '../appContext';
import styles from '../styles';
import { Form, Formik } from 'formik';
import { ILoginForm } from 'interfaces';

const formComponent = () => {
    const contextValues = useContext(appContext);
    return (
        <Formik
            initialValues={{
                email: 'abc@123.com',
                password: 'password'
            }}
            onSubmit={(formikProps: ILoginForm) => {
                console.log("formikProps", formikProps);
                contextValues.dispatch({ 
                    type: 'LOGIN', 
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
                    <Button
                        title={'Login'}
                        onPress={()=>formikProps.handleSubmit()}
                    />
                </Form>
            )}
        </Formik>
    );
}

export const LoginScreen = () => (
    <View style={styles.container}>
        <Text>Login Screen</Text>
        {formComponent()}
    </View>
); 