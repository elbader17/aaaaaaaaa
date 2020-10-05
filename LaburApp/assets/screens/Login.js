import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import { HelperText } from 'react-native-paper'
import Logo from '../components/Logo';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import InputPasswordToggle from 'react-native-toggle-password-visibility-expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

export default class Login extends React.Component {
    state = {
        email: '',
        msgEmail: '',

        password: '',
        msgPassword: '',
    }

    checkEmail = () => {
        var cond = false
        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = this.state.email
        if (email === '') {
            cond = false
            this.setState({
                msgEmail: 'El email no puede estár vacío.'
            })
        } else {
            if (!emailRegex.test(email)) {
                cond = false
                this.setState( {
                    msgEmail: 'El formato del email no es valido'
                })
            } else {
                cond = true
                this.setState({
                    msgEmail: ''
                })
            }
        }
        return cond
    }

    checkPass = () => {
        var cond = false
        var passw = this.state.password
        if (passw === '') {
            cond = false
            this.setState({
                msgPassword: 'La contraseña no puede estar vacía'
            })
        } else {
            cond = true
            this.setState({
                msgPassword: ''
            })
        }
        return cond
    }

    checkLogin = () => {
        fetch('http://localhost:3030/login/', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            console.log(data.message)
            if (data.access === false) {
                this.setState({
                    msgPassword: data.description
                })
                return false
            } else {
                if ( data.permits === 1) {
                    this.props.navigation.navigate('AdminMain', {
                        userid: data.id,
                    })
                } else {
                    if ( data.permits === 2) {
                        this.props.navigation.navigate('UserMain', {
                            userid: data.id,
                        })
                    } 
                }
                return true
            }
        })
    }

    goToMain = () => {
        console.log('Llegue 1')
        if (this.checkEmail()) {
            console.log('Llegue 2')
            if (this.checkPass()) {
                console.log('Llegue 3')
                this.checkLogin();
            }
        }
    }


    goToWelcome = () => this.props.navigation.navigate('Welcome');
    goToSignup = () => this.props.navigation.navigate('AuthSignup');
    goForgotPassword = () => this.props.navigation.navigate('ForgotPassword');

    render() {
        const { email, password } = this.state

        return (
            <Background>
                <TouchableOpacity onPress={this.goToWelcome} style={styles.backButton}>
                    <Image style={styles.imageBackButton} source={require('../images/arrow_back.png')} />
                </TouchableOpacity>
            <Logo />
            <Header>¡Bienvenido!</Header>
            <TextInput
                label="Email"
                name='email'
                value={email}
                autoCapitalize="none"
                onChangeText={ (text) => { this.setState({ email: text, msgEmail: '', msgPassword: ''}) }}
            />
            <HelperText type="error">{this.state.msgEmail}</HelperText>
            <InputPasswordToggle
                label="Contraseña"
                returnKeyType="done"
                value={password.value}
                onChangeText={ (text) => { this.setState({ password: text, msgPassword: '' }) }}
                error={!!password.error}
                errorText={password.error}
            />
            <HelperText type="error">{this.state.msgPassword}</HelperText>
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={this.goForgotPassword}>
                <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={this.goToMain} style={styles.butonLogin}>
                Iniciar Sesión
            </Button>
            <View style={styles.row}>
                <Text style={styles.label}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={this.goToSignup}>
                <Text style={styles.link}>Regístrarme</Text>
                </TouchableOpacity>
            </View>
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
});


