import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

export default class Login extends React.Component {
    state = {
        email: ''
    }

    goToSignIn = () => this.props.navigation.navigate('Login');

    render() {
        const { email} = this.state

        return (
                <Background>
                    <TouchableOpacity onPress={this.goToSignIn} style={styles.backButton}>
                        <Image style={styles.imageBackButton} source={require('../images/arrow_back.png')} />
                    </TouchableOpacity>

                    <Logo />
                    <Header>Restablecer clave</Header>
                    <TextInput
                        label="Email"
                        name='email'
                        value={email}
                        autoCapitalize="none"
                    />
                    <Button mode="contained" style={styles.button}>
                        Restablecer contraseña
                    </Button>
                    <TouchableOpacity style={styles.back} onPress={this.goToSignIn}>
                        <Text style={styles.label}>← Volver al inicio de sesión</Text>
                    </TouchableOpacity>
                </Background>
            )
        }
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
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
});
