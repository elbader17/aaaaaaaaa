// ../screens/signup/SignupTwo.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, Divider, HelperText, Title, Text} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';

export default class SignupTwo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputDni: '',
            msgDni: '',

            msgAvailable: '',
            availableDni: false,

            inputFirstName: '',
            msgFirstName: '',

            inputLastName: '',
            msgLastName: '',

        };
    }

    checkExistDni = () => {
        fetch('http://localhost:3030/user/findDni/', {
            method: 'POST',
            body: JSON.stringify({
                dni: this.state.inputDni
            }),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            if (data === true) {
                this.setState({
                    availableDni: false,
                    msgAvailable: 'El DNI igresado ya se encuentra registrado'
                })
                return false
            } else {
                this.setState({
                    availableDni: true,
                    msgAvailable: ''
                })
                return true
            }
        })
    }

    checkDni = () => {
        var cond = false
        let dni = this.state.inputDni
        if (dni === '') {
            cond = false
            this.setState({
                msgDni: 'El DNI no puede estar vacío'
            })
        } else {
            if (dni.length != 8) {
                cond = false
                this.setState({
                    msgDni: 'El DNI debe contener 8 números'
                })
            } else {
                if (isNaN(dni)) {
                    cond = false
                    this.setState({
                        msgDni: 'El DNI solo debe contener números'
                    })
                } else {
                    cond = true
                    this.setState({
                        msgDni: ''
                    })
                }
            }
        }
        return cond
    }

    checkFirstName = () => {
        var cond = false
        let firstName = this.setState.inputFirstName
        let firstNameRegex = new RegExp("^[a-zA-Z ]+$");
        if (firstName === '') {
            cond = false
            this.setState({
                msgFirstName: 'El nombre no puede estar vacío'
            })
        } else {
            if (!firstNameRegex.test(firstName)) {
                cond = false
                this.setState({
                    msgFirstName: 'El nombre no puede contener números'
                })
            } else {
                cond = true
                this.setState({
                    msgFirstName: ''
                })
            }
        }
        return cond
    }

    checkLastName = () => {
        var cond = false
        let lastName = this.state.inputLastName
        let lastNameRegex = new RegExp("^[a-zA-Z ]+$");
        if (lastName === '') {
            cond = false
            this.setState({
                msgLastName: 'El apellido no puede estar vacío'
            })
        } else {
            if (!lastNameRegex.test(lastName)) {
                cond = false
                this.setState({
                    msgLastName: 'El apellido no puede contener números'
                })
            } else {
                cond = true
                this.setState({
                    msgLastName: ''
                })
            }
        }
        return cond
    }

    checkGoToNext = () => {
        if (this.checkDni()) {
            if (this.checkFirstName()) {
                if (this.checkLastName()) {
                    if (this.state.availableDni === true) {
                        this.goToSignupThree();
                    }
                }
            }
        }
    }

    goToWelcome = () => this.props.navigation.navigate('Welcome') /* Action for go to view Welcome */
    goToSignupOne = () => this.props.navigation.navigate('SignupOne') /* Action for go to the previous view (Signup One) */
    goToSignupThree = () => this.props.navigation.navigate('SignupThree', {
        dni: this.state.inputDni,
        name: this.state.inputFirstName,
        lastName: this.state.inputLastName,
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password
    }) /* Action for go to the next view (Signup Three) */

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
                        <Text>Información personal</Text>
                    </View>

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>
                </View>

                <View style={styleBody.body}>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            value={this.state.inputFirstName}
                            onChangeText={ (text) => {this.setState({ inputFirstName: text, msgFirstName: '', availableDni: false, msgAvailable: '' })} }
                        />
                        <HelperText type="error">{this.state.msgFirstName}</HelperText>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            mode='outlined'
                            label="Apellido"
                            value={this.state.inputLastName}
                            onChangeText={ (text) => {this.setState({ inputLastName: text, msgLastName: ''})} }
                        />
                        <HelperText type="error">{this.state.msgLastName}</HelperText>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            mode='outlined'
                            label="DNI"
                            value={this.state.inputDni}
                            onChangeText={ (text) => {this.setState({ inputDni: text, msgDni: '', msgAvailable: ''})} }
                            onBlur={ () => { this.checkExistDni() } }
                        />
                        <HelperText type="error">{this.state.msgDni}{this.state.msgAvailable}</HelperText>
                    </View>

                </View>

                <View style={styleFooter.footer}>
                    <View style={styleFooter.buttonsContainer}>
                        <Button mode='outlined' style={styleFooter.buttonBack} title='Anterior' onPress={this.goToSignupOne}> Anterior </Button>
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
        backgroundColor: '#6200EE',
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
        height: 30,
    },
});

const styleFooter = StyleSheet.create({
    footer: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        zIndex: 0
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