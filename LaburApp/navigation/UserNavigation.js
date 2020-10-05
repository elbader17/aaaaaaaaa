// ../navigation/UserNavigation.js

import { createStackNavigator } from 'react-navigation-stack'

import UserMainView from '../assets/screens/user/UserMain';

// UserNavigation.js
const UserNavigation = createStackNavigator(
    {
        UserMain: { screen: UserMainView }
    },
    {
        initialRouteName: 'UserMain',
        headerMode: 'none'
    }
)

export default UserNavigation