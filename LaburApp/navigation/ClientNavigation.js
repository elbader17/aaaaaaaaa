// ../navigation/ClientNavigation.js

import { createStackNavigator } from 'react-navigation-stack'

import ClientMainView from '../assets/screens/client/ClientMain';

// ClientNavigation.js
const ClientNavigation = createStackNavigator(
    {
        ClientMain: { screen: ClientMainView }
    },
    {
        initialRouteName: 'ClientMain',
        headerMode: 'none'
    }
)

export default ClientNavigation