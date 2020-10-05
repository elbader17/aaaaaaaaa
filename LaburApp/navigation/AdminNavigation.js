// ../navigation/AdminNavigation.js

import { createStackNavigator } from 'react-navigation-stack'

import AdminMainView from '../assets/screens/admin/AdminMain';
import AdminUsersView from '../assets/screens/admin/AdminUsers'
import AdminServicesView from '../assets/screens/admin/AdminServices'
import AdminCovidView from '../assets/screens/admin/AdminCovid'

// AdminNavigation.js
const AdminNavigation = createStackNavigator(
    {
        AdminMain: { screen: AdminMainView },
        AdminUsers: { screen: AdminUsersView },
        AdminServices: { screen: AdminServicesView },
        AdminCovid: { screen: AdminCovidView}
    },
    {
        initialRouteName: 'AdminMain',
        headerMode: 'none'
    }
)

export default AdminNavigation