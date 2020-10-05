// ../screens/provider/ProviderServices.js

import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ScrollView} from 'react-native';
import { Text, Button, HelperText, Divider, Snackbar} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import DropDownPicker from 'react-native-dropdown-picker';

export default class ProviderServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,

            itemsServicesUser: [],
            msgServiceUser: '',

            itemsService: [],
            itemsServiceFiltered: [],
            inputService: 0,
            inputServiceName: '',
            inputServiceDescription: '',
            msgNewService: '',


            newServiceRequest: '',
            msgNewServiceRequest: '',
            visible: false


        };
        this.listServicesUser()
        this.listServices()
    }

    listServicesUser = () => {
        var array = new Array()
        let DatosJSON = {
            id : this.state.userid
        }
        // Se le manda el id del usuario
        // Devuelve un arreglo con los nombres de los servicios
        fetch('http://localhost:3030/service/listAUser', {
            method: 'POST',
            body: JSON.stringify(DatosJSON),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            console.log("Servicios del usuario: ");
            data.forEach(element => {
                array.push(element)
            });
            this.setState({ itemsServicesUser: array })
        });
    }

    deleteServiceUser = (servId) => {
        let DatosJSON = {
            idUser : this.state.userid,
            idService : servId
        }

        fetch('http://localhost:3030/service/deleteOneFromUser', {
            method: 'POST',
            body: JSON.stringify(DatosJSON),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then(data => {
                if (data.action === true) {
                    this.listServicesUser()
                    this.listServices()
                } else {
                    this.setState({ msgServiceUser: 'Un error a ocurrido.' })
                }
                console.log(data.action);
                console.log(data.message);
            });
    }

    listServices = () => {
        var array = new Array();
        var object = new Object();
        fetch('http://localhost:3030/service/list', {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            data.forEach(element => {
                object = {
                    label: element.service_name,
                    value: element.service_id
                }
            // Muestro todos los elementos (servicios)
                array.push(object)
            });
            this.setState({ itemsService: array })
            this.filterServices()
        });
    }

    filterServices = () => {
        var servUser = this.state.itemsServicesUser
        var servGeneral = this.state.itemsService

        for (var x = 0; x < servUser.length; x ++) {
            for (var y = 0; y < servGeneral.length; y ++) {
                if (servUser[x].serviceuser_serviceid === servGeneral[y].value) {
                    servGeneral.splice(y, 1)
                }
            }
        }
        this.setState({ itemsServiceFiltered: servGeneral })
    }

    newService = () => {
        if (this.state.inputService === 0 || this.state.inputService === null){
            this.setState({ msgService: 'Elija un servicio a prestar.' })
        } else {
            let DatosJSON = {
                idUser : this.state.userid,
                idService : this.state.inputService,
                descriptionService: this.state.inputServiceDescription
            }
            fetch('http://localhost:3030/service/addToUser', {
                method: 'POST',
                body: JSON.stringify(DatosJSON),
                cache: 'no-cache',
                redirect: 'follow',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data.action);
                console.log(data.message);
                if (data.action === true) {
                    this.setState({ msgNewService: '', inputServiceDescription: '', inputServiceName: '', inputService: null })

                    this.listServicesUser()
                    this.listServices()
                }
            });
        }
    }

    addServiceReq = () => {
        if (this.state.newServiceRequest === '') {
            this.setState({ msgNewServiceRequest: 'El campo no puede estár vacío.' })
        } else {
            
            let DatosJSON = {
                nameService : this.state.newServiceRequest
            }
            // Devuelve un JSON, donde tiene un campo action, si es verdadero se mando para agregarse, si es false no se mando y message es una descripcion
            fetch('http://localhost:3030/service/addAUser', {
                method: 'POST',
                body: JSON.stringify(DatosJSON),
                cache: 'no-cache',
                redirect: 'follow',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.action === true) {
                    this.setState({ newServiceRequest: '', visible: true })
                } else {
                    this.setState({ newServiceRequest: 'A ocurrido un problema. Intentelo nuevamente más tarde.' })
                }
            });

        }
    }

    goToProviderMain = () => this.props.navigation.navigate('ProviderMain', {
        userid: this.state.userid
    })

    render() {
        return (
            <View style={styleGeneral.container}> 
                <View>
                    <TouchableOpacity onPress={this.goToProviderMain} style={styleHeader.backButton}>
                        <Image style={styleHeader.imageBackButton} source={require('../../images/arrow_back.png')} />
                    </TouchableOpacity>
                    <Text style={styleHeader.header} >Mis servicios</Text>
                    <Divider style={styleGeneral.firstTitle}/>
                </View>

            <View style={styleBody.body}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                    { this.state.itemsServicesUser.map( (item) => (

                        <View>
                            <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
                                <View style={{ width: '75%', flexDirection: 'column'}}>
                                    <Text style={{alignSelf: 'flex-start', fontSize: 18, color: theme.colors.primary}}>{item.Service_name}</Text>
                                    <Text style={{alignSelf: 'flex-start'}}>{item.serviceuser_description}</Text>
                                </View>
                                <View style={{ width: '25%'}}>
                                    <TouchableOpacity style={{ color: theme.colors.secondary }}>
                                        <Text style={{color: theme.colors.error}} onPress={ () => { this.deleteServiceUser(item.serviceuser_serviceid) } }>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Divider style={styleGeneral.divider}/>
                            </View>
                        </View>

                    )) }
                    <HelperText type="error">{this.state.msgServiceUser}</HelperText>
                    <Divider style={styleGeneral.firstTitle}/>
                <Text style={styleHeader.header2} >Agregar servicio</Text>
                <Divider style={styleGeneral.dividerTitle}/>
                    <View style={{zIndex:1024}}>
                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', zIndex: 2048}}>

                            <View style={styleGeneral.dropDownPickerContainer}>
                                <DropDownPicker
                                    items={this.state.itemsServiceFiltered}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    placeholder='...'
                                    placeholderStyle={{ color: '#C4C4C4' }}
                                    defaultValue={this.state.inputService}
                                    searchable={true}
                                    searchablePlaceholder="Buscar.."
                                    searchablePlaceholderTextColor="gray"
                                    searchableError={() => <Text>Servicio no encontrado</Text>}
                                    dropDownMaxHeight={300}
                                    containerStyle={styleGeneral.dropDownPicker}
                                    onChangeItem={ (item) => { this.setState({ inputService: item.value, inputServiceName: item.label, msgService: '' }) }}
                                />
                                <HelperText type="error">{this.state.msgService}</HelperText>
                            </View>

                        </View>
                        <View>
                            <TextInput
                                    mode='outlined'
                                    value={ this.state.inputServiceDescription }
                                    label= 'Descripcion'
                                    onChangeText={ (text) => { this.setState({ inputServiceDescription: text, msgNewService: '' }) }}
                                />
                            <HelperText type="error">{this.state.msgNewService}</HelperText>
                            <Button style={{borderColor: theme.colors.primary}}  mode="outlined" onPress={ () => { this.newService() } }>Agregar</Button>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginBottom: 15 }}>
                        <View>
                            <Text style={styleHeader.header2} >Solicitar servicio</Text>
                        </View>
                        <View>
                            <Text> No encuentro mi servicio</Text>
                            <Divider style={styleGeneral.dividerTitle}/>
                        </View>
                        <View>
                            <TextInput
                                    mode='outlined'
                                    value={this.state.newServiceRequest}
                                    label= 'Servicio Requerido'
                                    onChangeText={ (text) => { this.setState({ newServiceRequest: text, msgNewServiceRequest: '' }) } }
                            />
                            <HelperText type="error">{this.state.msgNewServiceRequest}</HelperText>
                            <Button style={{borderColor: theme.colors.primary, width: "100%"}}  mode="outlined" onPress={ () => { this.addServiceReq() } }>Solicitar</Button>
                            <Snackbar 
                                style={{ marginTop: 'center', marginLeft: 'center', zIndex: 2048, width: "100%" }}
                                visible={this.state.visible}
                                onDismiss={ () => {this.setState({ visible: false }) }}
                                action={{
                                    label: 'OK',
                                    onPress: () => {this.setState({ visible: false }) }
                                }}>
                            ¡ Servicio Solicitado ! 
                            </Snackbar>
                        </View>
                    </View>
                </ScrollView>
            </View>
        
            </View>
        )
    }
}


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
    firstTitle: {
        width: '100%',
        height: 2,
    },
    divider: {
        width: '100%',
        height: 1,
        marginBottom: '3%',
        marginTop: '3%'
    },
    dividerTitle: {
        width: '100%',
        height: 1,
    },
    dropDownPickerContainer: {
        width: '100%',
        zIndex: 1024
    },  
    dropDownPicker: {
        height: 30,
        backgroundColor: theme.colors.surface,
        width: '100%',
        marginTop: 15,
    },
});

const styleHeader = StyleSheet.create({
    header: {
        fontSize: 26,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: '20%',
        marginLeft:'5%',
        marginBottom: '5%'
    },
    header2: {
        fontSize: 26,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: '7%',
    },
    backButton: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 0,
        marginLeft:'5%',
    },
    imageBackButton: {
        width: 33,
        height: 33,
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
    title:{
        flex: 0.1,
        marginLeft: '8.5%',
        marginTop: '2%',
        marginBottom: '2%'
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
    certificar: {
        width: '49%',
        borderRadius: 15,
        marginLeft: '25%'
    },
});


