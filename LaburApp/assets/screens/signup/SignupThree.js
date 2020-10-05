// ../screens/signup/SignupThree.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity, Divider, HelperText, Title, Text} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';
import DropDownPicker from 'react-native-dropdown-picker';

export default class SignupThree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemsProvince: this.province(),
            inputProvince: 0,
            inputProvinceName: '',
            msgProvince: '',

            itemsCity: [{}],
            inputCity: 0,
            inputCityName: '',
            msgCity: '',

            inputAddress: '',
            msgAddress: '',

            inputPhone: '',
            msgPhone: '',

        };
    }

    province = () => {
        var array = new Array();
        var object = new Object();
        fetch('http://localhost:3030/provinces', {
            method: 'GET',
            body: JSON.stringify(),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {                   
            for (let x = 0; x < data.length; x ++) {
                object = {
                    label: data[x].prov_name,
                    value: data[x].prov_id
                }
                array.push(object)
            }
        })
        .catch((error) => {
            console.log(`Error : ( ' + ${error.message} + ' )`)
            return false;
        })
        return (array)
    }

    city = (idP) => {
        var array = new Array();
        var object = new Object();
        fetch('http://localhost:3030/cities/', {
            method: 'POST',
            body: JSON.stringify({
                id: idP
            }),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {                   
            for (let x = 0; x < data.length; x ++) {
                object = {
                    label: data[x].city_name,
                    value: data[x].city_id
                }
                array.push(object)
            }
        })
        .catch((error) => {
            console.log(`Error : ( ' + ${error} + ' )`)
            console.log(`Error : ( ' + ${error.message} + ' )`)
            return false;
        })
        return (array)
    }

    checkProvince = () => {
        var cond = false
        let num = this.state.inputProvince
        if (num === 0 || num === null) {
            cond = false
            this.setState({
                msgProvince: 'Seleccione una provincia.'
            })
        } else {
            cond = true
            this.setState({
                msgProvince: ''
            })
        }
        return cond
    }

    checkCity = () => {
        var cond = false
        let num = this.state.inputCity
        if ((num === 0) || (num === null)) {
            cond = false
            this.setState({
                msgCity: 'Seleccione una localidad'
            })
        } else {
            cond = true
            this.setState({
                msgCity: ''
            })
        }
        return cond
    }

    checkAddress = () => {
        var cond = false
        let address = this.state.inputAddress
        if (address === '') {
            cond = false
            this.setState({
                msgAddress: 'La dirección no puede estár vacía'
            })
        } else {
            cond = true
            this.setState({
                msgAddress: ''
            })
        }
        return cond
    }

    checkPhone = () => {
        var cond = false
        let number = this.state.inputPhone
        if (number === '') {
            cond = false
            this.setState({
                msgPhone: 'El número telefonico no puede estar vacío'
            })
        } else {
            if (isNaN(number)) {
                cond = false
                this.setState({
                    msgPhone: 'El número telefonico solo debe contener números'
                })
            } else {
                if (number.length != 9) {
                    cond = false
                    this.setState({
                        msgPhone: 'El número telefonico debe contener 9 números'
                    })
                } else {
                    cond = true
                    this.setState({
                        msgPhone: ''
                    })
                }
            }
        }
        return cond
    }

    checkGoToNext = () => {
        if (this.checkAddress()) {
            if (this.checkProvince()) {
                if (this.checkCity()) {
                    if (this.checkPhone()) {
                        this.goToSignupFour();
                    }
                }
            }
        }
    }

    goToWelcome = () => this.props.navigation.navigate('Welcome') /* Action for go to view Welcome */
    goToSignupTwo = () => this.props.navigation.navigate('SignupTwo') /* Action for go to the previous view (Signup Two) */
    goToSignupFour = () => this.props.navigation.navigate('SignupFour', {
        dni: this.props.navigation.state.params.dni,
        name: this.props.navigation.state.params.name,
        lastName: this.props.navigation.state.params.lastName,
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password,
        provinceName: this.state.inputProvinceName,
        province: this.state.inputProvince,
        cityName: this.state.inputCityName,
        city: this.state.inputCity,
        address: this.state.inputAddress,
        phonenumber: this.state.inputPhone
    }) /* Action for go to the next view (Signup Four) */

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
                        <Text>Información de contacto</Text>
                    </View>

                    <View style={styleGeneral.dividerContainer}>
                        <Divider style={styleGeneral.divider}/>
                    </View>
                </View>

                <View style={styleBody.body}>

                    <View style={styleBody.inputFormDoubleContainer}>
                        <View style={styleBody.dropDownPickerContainer}>
                            <Text> Provincia * </Text>
                            <DropDownPicker
                                items={this.state.itemsProvince}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                placeholder='...'
                                placeholderStyle={{ color: '#C4C4C4' }}
                                defaultValue={this.state.inputProvince}
                                searchable={true}
                                searchablePlaceholder="Buscar.."
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: '#C4C4C4' }}></Text>}
                                dropDownMaxHeight={300}
                                containerStyle={styleBody.dropDownPicker}
                                onChangeItem={ (item) => { this.setState({ inputProvince: item.value, inputProvinceName: item.label, inputCity: null, msgProvince: '', itemsCity: this.city(item.value)}) }}
                            />
                            <HelperText type="error">{this.state.msgProvince}</HelperText>
                        </View>

                        <View style={styleBody.dropDownPickerContainer}>
                            <Text> Ciudad * </Text>
                            <DropDownPicker
                                items={this.state.itemsCity}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                placeholder='...'
                                placeholderStyle={{ color: '#C4C4C4' }}
                                defaultValue={this.state.inputCity}
                                searchable={true}
                                searchablePlaceholder="Buscar.."
                                searchablePlaceholderTextColor="gray"
                                searchableError={() => <Text style={{ color: '#C4C4C4' }}></Text>}
                                dropDownMaxHeight={300}
                                containerStyle={styleBody.dropDownPicker}
                                onChangeItem={ (item) => { this.setState({ inputCity: item.value, inputCityName: item.label, msgCity: ''}) }}
                            />
                            <HelperText type="error">{this.state.msgCity}</HelperText>
                        </View>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            label="Domicilio"
                            mode='outlined'
                            value={this.state.inputAddress}
                            onChangeText={ (text) => { this.setState({ inputAddress: text, msgAddress: ''}) }}
                        />
                        <HelperText type="error">{this.state.msgAddress}</HelperText>
                    </View>

                    <View style={styleBody.inputFormContainer}>
                        <TextInput
                            label="Número Telefónico"
                            mode='outlined'
                            value={this.state.inputPhone}
                            onChangeText={ (text) => { this.setState({ inputPhone: text, msgPhone: ''}) }}
                        />
                        <HelperText type="error">{this.state.msgPhone}</HelperText>
                    </View>

                </View>

                <View style={styleFooter.footer}>
                    <View style={styleFooter.buttonsContainer}>
                        <Button mode='outlined' style={styleFooter.buttonBack} title='Anterior' onPress={this.goToSignupTwo}> Anterior </Button>
                        <Button mode='contained' style={styleFooter.buttonNext} title='Siguiente' onPress={this.checkGoToNext}> Siguiente </Button>
                    </View>
                </View>
            
            </View>
        )
    }
};

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
        backgroundColor: '#6200EE',
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
        marginBottom: 15,
    },
    inputFormDoubleContainer: {
        marginBottom: 15,
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        zIndex: 1024
    },
    dropDownPickerContainer: {
        width: '50%',
        marginBottom: 15
    },  
    dropDownPicker: {
        height: 30,
        backgroundColor: theme.colors.surface,
        width: '100%',
        marginVertical: 12,
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