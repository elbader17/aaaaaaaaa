// ../screens/signup/SignupFour.js

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity, Divider, HelperText, Title, Text} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';

export default class SignupFour extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            name: this.props.navigation.state.params.name,
            lastname: this.props.navigation.state.params.lastName,
            dni: this.props.navigation.state.params.dni,
            birthdate: this.props.navigation.state.params.birthdate,
            phonenumber: this.props.navigation.state.params.phonenumber,
            address: this.props.navigation.state.params.address,
            city: this.props.navigation.state.params.city,

            message: '',
            status: '',

            messageOne: '',
            messageTwo: '',
            color: ''
        }
    }

    sendData = () => {
        let data = new Object();
        data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname,
            dni: this.state.dni,
            birthdate: this.state.birthdate,
            phonenumber: this.state.phonenumber,
            address: this.state.address,
            city: this.state.city
        }
        fetch('http://localhost:3030/user/create', {
            method: 'POST',
            body: JSON.stringify(data),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then(data => {   
                console.log('Status Fetch: ', data.status)
                if(data.status === 'e') {
                    this.setState({
                        messageOne: 'A ocurrido un error :(',
                        messageTwo: 'Intentelo nuevamente !',
                        color: '#B82601'
                    })
                    this.goToSignupFive()
                } else {
                    this.setState({
                        messageOne: 'Usuario creado correctamente :)',
                        messageTwo: 'Bienvenido !',
                        color: '#1C9B08'
                    })
                    this.goToSignupFive()
                }
            })
            .catch((error) => {
                console.log(`Error : ( ' + ${error.message} + ' )`)
            })
    }

    goToFinish = () => {
        this.sendData()
    }

    goToWelcome = () => this.props.navigation.navigate('Welcome') /* Action for go to view Welcome */
    goToSignupThree = () => this.props.navigation.navigate('SignupThree') /* Action for go to the previous view (Signup Three) */
    goToSignupFive = () => this.props.navigation.navigate('SignupFive', {
        msgOne: this.state.messageOne,
        msgTwo: this.state.messageTwo,
        color: this.state.color
    }) /* Action for go to the next view (Signup Five) */

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
                        <Text>Revisión de la información</Text>
                    </View>

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>
                </View>

                <View style={styleBody.body}>
                <ScrollView>
                    <Header> Datos de usuario</Header>
                        <TextInput
                            value={this.props.navigation.state.params.email}
                            label= 'Email'
                            disabled= {true}
                        />

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>

                    <Header> Informacion personal</Header>

                    <TextInput
                            value={this.props.navigation.state.params.name}
                            label= 'Nombre'
                            disabled= {true}
                        />

                    <TextInput
                            value={this.props.navigation.state.params.lastName}
                            label= 'Apellido'
                            disabled= {true}
                        />

                    <TextInput
                            value={this.props.navigation.state.params.dni}
                            label= 'DNI'
                            disabled= {true}
                        />


                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>

                    <Header> Informacion de contacto</Header>

                    <TextInput
                            value={this.props.navigation.state.params.address}
                            label= 'Direccion'
                            disabled= {true}
                        />

                    <TextInput
                            value={this.props.navigation.state.params.phonenumber}
                            label= 'Numero telefonico'
                            disabled= {true}
                        />

                    <TextInput
                            value={this.props.navigation.state.params.provinceName}
                            label= 'Provincia'
                            disabled= {true}
                        />

                    <TextInput
                            mode='outlined'
                            value={this.props.navigation.state.params.cityName}
                            label= 'Ciudad'
                            disabled= {true}
                        />

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>
                    </ScrollView>
                </View>

                <View style={styleFooter.footer}>
                    <View style={styleFooter.buttonsContainer}>
                        <Button mode='outlined' style={styleFooter.buttonBack} title='Anterior' onPress={this.goToSignupThree}> Anterior </Button>
                        <Button mode='contained' style={styleFooter.buttonNext} title='Siguiente' onPress={this.goToFinish}> Finalizar </Button>
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
        flex: 1,
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
        backgroundColor: '#6200EE',
        marginLeft: '2%',
        marginRight: '4%'
    },
    progressBarFour: {
        width: '22%',
        height: '100%',
        backgroundColor: '#6200EE',
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
    textTitle: {
        fontSize: 16
    },
    textData: {
        fontSize: 32,
        color: '#6200EE'
    }
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