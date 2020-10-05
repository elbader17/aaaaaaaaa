// ../screens/Welcome.js

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Logo from '../components/Logo';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

export default class Welcome extends React.Component {

    goToLogin = () => this.props.navigation.navigate('AuthLogin')
    goToSignup = () => this.props.navigation.navigate('AuthSignup')

    render() {
        return (
            <Background>
                <Logo />
                <Button mode='outlined' style={styles.buttonLogin} title='Iniciar Sesión' onPress={this.goToLogin}>
                    Iniciar Sesión
                </Button>

                <Button mode='contained' style={styles.buttonSignUp} title='Registrarse' onPress={this.goToSignup}>
                    Registrarse
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
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    butonLogin: {
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 0,
    },
    imageBackButton: {
        width: 33,
        height: 33,
    },
    buttonSignUp: {
        borderRadius: 15
    },
    buttonLogin: {
        borderRadius: 15,
        borderColor: '#6200ee'
    }
});