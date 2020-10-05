// ../navigation/ProviderNavigation.js

import { createStackNavigator } from 'react-navigation-stack'

import ProviderMainView from '../assets/screens/provider/ProviderMain';
import ProviderServicesView from '../assets/screens/provider/ProviderServices';
import ProviderCovidView from '../assets/screens/provider/ProviderCovid';

// ProviderNavigation.js
const ProviderNavigation = createStackNavigator(
    {
        ProviderMain: { screen: ProviderMainView },
        ProviderServices: { screen: ProviderServicesView },
        ProviderCovid: { screen: ProviderCovidView }
    },
    {
        initialRouteName: 'ProviderMain',
        headerMode: 'none'
    }
)

export default ProviderNavigation