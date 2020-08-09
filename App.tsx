import React, { useReducer } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './layoutComponents/home';
import { LoginScreen } from './layoutComponents/login';
import { RegistrationScreen } from './layoutComponents/registration';
import { ClinicRecordScreen } from './layoutComponents/clinicRecords';
import { RecordDetailScreen } from './layoutComponents/recordDetail';
import { appContext, appInitialState, appReducer } from './appContext';

const stack = createStackNavigator();

const App = () => {
    const { Provider } = appContext;
    const [appState, appDispatch] = useReducer(appReducer, appInitialState);
    const { Navigator, Screen } = stack;
    return (
        <appContext.Provider
            value={{ 
                jwtToken: appState.jwtToken,
                clinicName: appState.clinicName,
                loggedIn: appState.loggedIn,
                dispatch: appDispatch 
            }}
        >
            <NavigationContainer>
                <Navigator>
                    <Screen
                        name='Home'
                        component={HomeScreen}
                    />
                    <Screen
                        name='Login'
                        component={LoginScreen}
                    />
                    <Screen
                        name='Registration'
                        component={RegistrationScreen}
                    />
                    <Screen
                        name='Clinic Record'
                        component={ClinicRecordScreen}
                    />
                    <Screen
                        name='Record Detail'
                        component={RecordDetailScreen}
                    />
                </Navigator>
            </NavigationContainer>
        </appContext.Provider>
    );
}
export default App;
