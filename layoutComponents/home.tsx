import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../styles';
import { INavigation } from '../interfaces';
import { StatusBar } from 'expo-status-bar';

export const HomeScreen = (props: INavigation) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Text>Hello World 15!</Text>
            <Button
                title='Log in'
                onPress={() => {
                    navigation.navigate('Login')
                }}
            />
            <Button
                title='Register'
                onPress={() => {
                    navigation.navigate('Registration')
                }}
            />
            <Button
                title='Clinic Record'
                onPress={() => {
                    navigation.navigate('Clinic Record')
                }}
            />
            <StatusBar style='auto' />
        </View>
    );
}