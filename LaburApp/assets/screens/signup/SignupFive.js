// ../screens/signup/SignupFour.js

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';

export default class SignupFive extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            msgOne: this.props.navigation.state.params.msgOne,
            msgTwo: this.props.navigation.state.params.msgTwo,
            color: this.props.navigation.state.params.color,
        }
    }

    goToLogin = () => this.props.navigation.navigate('Login') /* Action for go to view Welcome */

    render() {
        return (
            <Background>
                <Image source={require('../../images/success.png')} style={styles.image} />
                <Header>¡Registro exitoso!</Header>
                <Button mode='outlined' style={styles.buttonLogin} title=' Iniciar Sesión' onPress={this.goToLogin}>
                    Iniciar Sesión
                </Button>

            </Background>
        )
    }
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    butonLogin: {
        width: '100%',
    },
    buttonSignUp: {
        borderRadius: 15
    },
    buttonLogin: {
        borderRadius: 15,
        borderColor: '#6200ee'
    },
    image: {
        width: 230,
        height: 230,
        marginBottom: 7,
    },
});