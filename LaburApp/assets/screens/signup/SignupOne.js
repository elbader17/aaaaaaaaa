// ../screens/signup/SignupOne.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, Divider, HelperText, Title, Text} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import InputPasswordToggle from 'react-native-toggle-password-visibility-expo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';

export default class SignupOne extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputEmail: '',
            msgEmail: '',

            msgAvailable: '',
            availableEmail: false,

            inputPass: '',
            msgPass: '',

            inputConfirmPass: '',
            msgConfirmPass: '',
        };
    }

    checkExistEmail = () => {
        fetch('http://localhost:3030/user/findEmail/', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.inputEmail
            }),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            if (data === true) {
                this.setState({
                    availableEmail: false,
                    msgAvailable: 'El email igresado ya se encuentra registrado'
                })
                return false
            } else {
                this.setState({
                    availableEmail: true,
                    msgAvailable: ''
                })
                return true
            }
        })
    }

    checkEmail = () => {
        var cond = false
        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = this.state.inputEmail
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
        let passw = this.state.inputPass
        let confPassw = this.state.inputConfirmPass
        if (passw === '') {
            cond = false
            this.setState({
                msgPass: 'La contraseña no puede estár vacía.'
            })
        } else {
            if (passw.length < 8) {
                cond = false
                this.setState({
                    msgPass: 'La contraseña debe contener minimo de 8 caracteres.'
                })
            } else {
                if (passw.length > 16) {
                    cond = false
                    this.setState({
                        msgPass: 'La constraseña debe contener máximo 16 caracteres.'
                    })
                } else {
                    if (passw !== confPassw) {
                        cond = false
                        this.setState({
                            msgConfirmPass: 'Las contraseñas no coinciden.'
                        })
                    } else {
                        cond = true
                        this.setState({
                            msgPass: '',
                            msgConfirmPass: ''
                        })
                    }
                }
            }
        }
        return cond
    }

    checkGoToNext = () => {
        if (this.checkEmail()) {
            if (this.checkPass()) {
                if (this.state.availableEmail === true) {
                    this.goToSignupTwo();
                }
            }
        }
    }

    goToWelcome = () => this.props.navigation.navigate('Welcome') /* Action for go to view Welcome */
    goToSignupTwo = () => this.props.navigation.navigate('SignupTwo', {
        email: this.state.inputEmail,
        password: this.state.inputPass
    }) /* Action for go to the next view (Signup Two) */

    render() {
        return (
            <View style={styleGeneral.container}> 

                <View style={styleHeader.header}>
                    <View style={styleHeader.iconCloseContainer}>
                        <Icon 
                            name='close'
                            color='#444444'
                            size={35}
                            onPress={this.goToWelcome}
                        />
                    </View>
                </View>

                <View style={styleSubHeader.subHeaderContainer}>
                    <View style={styleSubHeader.titleContainer}>
                        <Title>REGÍSTRATE</Title>
                    </View>

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>

                    <View style={styleSubHeader.progressContainer}>
                        <View style={styleSubHeader.progressBarOne}></View>
                        <View style={styleSubHeader.progressBarTwo}></View>
                        <View style={styleSubHeader.progressBarThree}></View>
                        <View style={styleSubHeader.progressBarFour}></View>
                    </View>
                    
                    <View style={styleSubHeader.subTitleContainer}>
                        <Text>Información de la cuenta</Text>
                    </View>

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>
                </View>

                <View style={styleBody.body}>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            mode='outlined'
                            value={this.state.inputEmail}
                            label= 'Email'
                            onChangeText={ (text) =>  { this.setState({ inputEmail: text, msgEmail: '', msgAvailable: '', availableEmail: false}) } }
                            onBlur={ () => { this.checkExistEmail() } }
                        />
                        <HelperText type="error">{this.state.msgEmail}{this.state.msgAvailable}</HelperText>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <InputPasswordToggle
                            mode='outlined'
                            label='Contraseña *'
                            value={this.state.inputPass}
                            onChangeText={ (text) =>  { this.setState({ inputPass: text, msgPass: '' }) } }
                        />
                        <HelperText type="error">{this.state.msgPass}</HelperText>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <InputPasswordToggle
                            mode='outlined'
                            label= 'Confirmar Contraseña *'
                            value={this.state.inputConfirmPass}
                            onChangeText={ (text) => { this.setState({ inputConfirmPass: text, msgConfirmPass: '' }) } }
                        />
                        <HelperText type="error">{this.state.msgConfirmPass}</HelperText>
                    </View>

                </View>

                <View style={styleFooter.footer}>
                    <View style={styleFooter.buttonsContainer}>
                        <Button mode='outlined' style={styleFooter.buttonBack} title='Anterior' onPress={this.goToWelcome}> Anterior </Button>
                        <Button mode='contained' style={styleFooter.buttonNext} title='Siguiente' onPress={this.checkGoToNext}> Siguiente </Button>
                    </View>
                </View>

            </View>
        )
    }
}


const styleHeader = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    iconCloseContainer: {
        width: 35,
        height: 35,
        marginLeft: '5%',
    },
});

const styleSubHeader = StyleSheet.create({
    subHeaderContainer: {
        width: '100%',
        flex: 1.5,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    titleContainer: {
        width: '90%',
    },
    progressContainer: {
        width: '90%',
        height: 3,
        flexDirection: 'row',
        marginBottom: 15
    },
    progressBarOne: {
        width: '22%',
        height: '100%',
        backgroundColor: '#6200EE',
    },
    progressBarTwo: {
        width: '22%',
        height: '100%',
        backgroundColor: '#C4C4C4',
        marginLeft: '4%',
        marginRight: '2%'
    },
    progressBarThree: {
        width: '22%',
        height: '100%',
        backgroundColor: '#C4C4C4',
        marginLeft: '2%',
        marginRight: '4%'
    },
    progressBarFour: {
        width: '22%',
        height: '100%',
        backgroundColor: '#C4C4C4',
    },
    subTitleContainer: {
        width: '90%',
        marginBottom: 15
    },
});

const styleBody = StyleSheet.create({
    body: {
        flex: 6,
        width: '90%',
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: 30
    },
    inputFormContainer: {
        marginBottom: 15
    },
    inputForm: {
        height: 30
    },
});

const styleFooter = StyleSheet.create({
    footer: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    buttonsContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: '90%',
        flexDirection: 'row',
    },
    buttonBack: {
        width: '49%',
        borderRadius: 15,
        borderColor: '#6200ee',
    },
    buttonNext: {
        width: '49%',
        borderRadius: 15,
        marginLeft: '2%'
    },
});

const styleGeneral = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        width: '100%',
        height: '100%',
    },
    dividerContainer: {
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: '90%',
        height: 1,
        marginBottom: 15
    }
});