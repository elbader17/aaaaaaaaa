// ../navigation/AppNavigation.js
import { createStackNavigator } from 'react-navigation-stack'
import Welcome from '../assets/screens/Welcome'

const AppNavigation = createStackNavigator(
    {
        Welcome: { screen: Welcome },
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none'
    }
)

export default AppNavigation