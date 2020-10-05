// ../navigation/LoginNavigation.js

import { createStackNavigator } from 'react-navigation-stack'
import Login from '../assets/screens/Login'
import ForgotPassword from '../assets/screens/ForgotPassword'

// LoginNavigation.js
const LoginNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        ForgotPassword: { screen: ForgotPassword }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default LoginNavigation