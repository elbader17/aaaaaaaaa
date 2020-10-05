// ../navigation/SignupNavigation.js

import { createStackNavigator } from 'react-navigation-stack'

import SignupOneView from '../assets/screens/signup/SignupOne'
import SignupTwoView from '../assets/screens/signup/SignupTwo'
import SignupThreeView from '../assets/screens/signup/SignupThree'
import SignupFourView from '../assets/screens/signup/SignupFour'
import SignupFiveView from '../assets/screens/signup/SignupFive'

// SignupNavigation.js
const SignupNavigation = createStackNavigator(
    {
        SignupOne: { screen: SignupOneView },
        SignupTwo: { screen: SignupTwoView },
        SignupThree: { screen: SignupThreeView },
        SignupFour: { screen: SignupFourView },
        SignupFive: { screen: SignupFiveView }
    },
    {
        initialRouteName: 'SignupOne',
        headerMode: 'none'
    }
)

export default SignupNavigation