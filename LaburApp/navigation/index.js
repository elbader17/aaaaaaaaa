// ../navigation/index.js

import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import WelcomeNavigation from './WelcomeNavigation'
import LoginNavigation from './LoginNavigation'
import SignUpNavigation from './SignupNavigation'
import ProviderNavigation from './ProviderNavigation'
import ClientNavigation from './ClientNavigation'
import AdminNavigation from './AdminNavigation'
import UserNavigation from './UserNavigation'

const SwitchNavigator = createSwitchNavigator(
    {
        Welcome: WelcomeNavigation,
        AuthLogin: LoginNavigation,
        AuthSignup: SignUpNavigation,
        ProviderNavigation: ProviderNavigation,
        ClientNavigation: ClientNavigation,
        AdminNavigation: AdminNavigation,
        UserNavigation: UserNavigation
    },
    {
        initialRouteName: 'Welcome'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer