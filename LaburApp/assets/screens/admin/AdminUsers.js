// ../screens/admin/AdminUsers.js

import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, ScrollView} from 'react-native';
import { Text, Button, HelperText, Divider} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';

export default class AdminUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    goToAdminMain = () => this.props.navigation.navigate('AdminMain')

    render() {
        return (
            <View style={styleGeneral.container}> 
            <View>
                <TouchableOpacity onPress={this.goToAdminMain} style={styleHeader.backButton}>
                    <Image style={styleHeader.imageBackButton} source={require('../../images/arrow_back.png')} />
                </TouchableOpacity>
                <Text style={styleHeader.header} >Tipos de usuarios</Text>
                <Divider style={styleGeneral.firstTitle}/>
            </View>

        <View style={styleBody.body}>
        <ScrollView>

            <Divider style={styleGeneral.dividerTitle}/>

            <Text style={styleHeader.header2} >Nuevo tipo de usuario</Text>
            <Divider style={styleGeneral.dividerTitle}/> 
            <TextInput
                mode='outlined'
                value={this.state.inputNewService}
                label= 'Nombre'
                /*onChangeText={ (text) =>  { this.setState({ inputNewService: text, msgNewService: '' }) } } */
            />
            <HelperText type="error">{this.state.msgNewService}</HelperText>
            <Button style={{borderColor: theme.colors.primary}}  mode="outlined" /* onPress={ () => { ) } }*/>Agregar</Button>

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


