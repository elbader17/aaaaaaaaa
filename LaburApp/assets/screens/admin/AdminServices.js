// ../screens/admin/AdminServices.js

import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ScrollView} from 'react-native';
import { Text, Card, Button, HelperText, Divider, Title, Paragraph } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';


export default class AdminServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsServices: [],
            itemsServicesReq: [],

            inputNewService: '',
            msgNewService: '',
            msgNewServiceReq: ''
        }
        this.listServices()
        this.listServicesReq()
    }

    checkAdd = (servName) => {
        if (servName === '') {
            this.setState({
                msgNewService: 'El campo nombre no puede estar vacío.'
            })
        } else {
            this.addService(servName)
        }
    }

    addService = (servName) => {
        let DatosJSON = {
            nameService: servName
        }
        // Devuelve un JSON con dos campos campos. "message" que es una descripcion y otro "action"
        // Si el servicio fue eliminado, "action" vale true, si no fue eliminado vale false
        fetch('http://localhost:3030/service/add', {
            method: 'POST',
            body: JSON.stringify(DatosJSON),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            if ((data.action) === true){
                this.listServices()
                this.setState({
                    inputNewService: ''
                })
            } else {
                this.setState({msgNewService:data.message})
            }
        });
    }

    listServicesReq = () => {
        var array = new Array();
        fetch('http://localhost:3030/service/listUser', {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then(data => {
                data.forEach(element => {
                    console.log("Id del servicio:");
                    console.log(element.servicereq_id);
                    console.log("nombre del servicio:");
                    console.log(element.servicereq_name);
                    array.push(element)
                });
                this.setState({ itemsServicesReq: array })
            });
    }

    listServices = () => {
        var array = new Array();
        fetch('http://localhost:3030/service/list', {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            data.forEach(element => {
            // Muestro todos los elementos (servicios)
                array.push(element)
            });
            this.setState({ itemsServices: array })
        });
    }

    deleteServiceReq = (servId) => {
        let DatosJSON = {
            id : servId
        }
        // Devuelve un JSON, donde tiene un campo action, si es verdadero se borro, si es false no se borro y message es una descripcion
        fetch('http://localhost:3030/service/deleteUser', {
            method: 'POST',
            body: JSON.stringify(DatosJSON),
            cache: 'no-cache',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            this.listServicesReq()
            this.listServices()
        });
    }

    deleteService = (servId) => {
        let DatosJSON = {
            id: servId
        }
        // Devuelve un JSON con dos campos campos. "message" que es una descripcion y otro "action"
        // Si el servicio fue eliminado, "action" vale true, si no fue eliminado vale false
        fetch('http://localhost:3030/service/delete', {
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
            this.listServices()
        });
    }

    goToAdminMain = () => this.props.navigation.navigate('AdminMain')

    render() {
        return (
<View style={styleGeneral.container}> 
                <View>
                    <TouchableOpacity onPress={this.goToAdminMain} style={styleHeader.backButton}>
                        <Image style={styleHeader.imageBackButton} source={require('../../images/arrow_back.png')} />
                    </TouchableOpacity>
                    <Text style={styleHeader.header} >Lista de servicios</Text>
                    <Divider style={styleGeneral.firstTitle}/>
                </View>

            <View style={styleBody.body}>
            <ScrollView>
                { this.state.itemsServices.map((item) => (
                    <View>
                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
                            <View style={{ width: '75%', flexDirection: 'row', marginTop: '2%'}}>
                                <Text style={{alignSelf: 'flex-start', fontSize: 18}}>{item.service_name}</Text>
                            </View>
                            <View style={{ width: '25%', flexDirection: 'row'}}>
                                <TouchableOpacity style={{ width: '100%' }}>
                                    <Text style={{color: theme.colors.error }} onPress={ () => { this.deleteService(item.service_id) } }>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Divider style={styleGeneral.divider}/>
                        </View>
                    </View>
                ))}

                <Text style={styleHeader.header2} >Solicitud de servicios</Text>
                <Divider style={styleGeneral.dividerTitle}/>
                { this.state.itemsServicesReq.map((item) => (
                    <View>
                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
                            <View style={{ width: '60%', flexDirection: 'row', marginTop: '2%'}}>
                                <Text style={{alignSelf: 'flex-start', fontSize: 18}}>{item.servicereq_name}</Text>
                            </View>
                            <View style={{ width: '40%', flexDirection: 'row' }}>
                                <TouchableOpacity style={{ width: '50%'}}>
                                    <Text style={{ color: theme.colors.primary }} onPress={ () => { this.deleteServiceReq(item.servicereq_id), this.addService(item.servicereq_name) } }>Agregar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '50%'}}>
                                    <Text  style={{color: theme.colors.error }} onPress={ () => { this.deleteServiceReq(item.servicereq_id) } }>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Divider style={styleGeneral.divider}/>
                        </View>
                    </View>
                ))}
                
                <Text style={styleHeader.header2} >Nuevo servicio</Text>
                <Divider style={styleGeneral.dividerTitle}/> 
                <TextInput
                    mode='outlined'
                    value={this.state.inputNewService}
                    label= 'Nombre'
                    onChangeText={ (text) =>  { this.setState({ inputNewService: text, msgNewService: '' }) } }
                />
                <HelperText type="error">{this.state.msgNewService}</HelperText>
                <Button style={{borderColor: theme.colors.primary}}  mode="outlined" onPress={ () => { this.checkAdd(this.state.inputNewService) } }>Agregar</Button>

                <View style={styleGeneral.dividerContainer}>
                    <Divider style={styleGeneral.dividerTitle}/>
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
        height: 1,
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
        marginBottom: '3%'
    }
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
        marginBottom: '5%'
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




