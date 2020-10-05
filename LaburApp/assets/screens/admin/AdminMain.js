// ../screens/admin/AdminMain.js

import * as React from 'react';
import { View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card, Button} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';


export default class AdminMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    goToAdminServices = () => this.props.navigation.navigate('AdminServices');
    goToAdminUsers = () => this.props.navigation.navigate('AdminUsers');
    goToAdminCovid = () => this.props.navigation.navigate('AdminCovid');
    goToLogin = () => this.props.navigation.navigate('AuthLogin')


    render() {
        return (
            <View style={styleGeneral.container}>

                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 140, marginLeft: '25%', marginTop: '5%'}} source={require('../../images/service.jpg')} />
                    <Card.Actions>
                        <Button mode="contained" style={styleGeneral.btn} onPress={ this.goToAdminServices }> Servicios </Button>
                    </Card.Actions>
                </Card>
                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 140, marginLeft: '25%', marginTop: '5%'}} source={require('../../images/user.png')} />
                    <Card.Actions>
                        <Button mode="contained" style={styleGeneral.btn} onPress={ this.goToAdminUsers }> Usuarios </Button>
                    </Card.Actions>
                </Card>
                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 160, marginLeft: '25%', marginTop: '5%', borderRadius: 80, borderTopStartRadius: 80, borderTopEndRadius: 80}}  source={require('../../images/covid-19.jpg')} />
                    <Card.Actions>
                        <Button  mode="contained" style={styleGeneral.btn} onPress={ this.goToAdminCovid }> COVID-19 </Button>
                    </Card.Actions>
                </Card>
            <View>
                <TouchableOpacity onPress={this.goToLogin} style={styleHeader.logOutButton}>
                    <Image style={styleHeader.imagelogOutButton} source={require('../../images/logOut.png')} />
                </TouchableOpacity>
            </View>

            </View>
        )
    }
}


const styleHeader = StyleSheet.create({
    logOutButton: {
        position: 'relative',
        top: getStatusBarHeight(),
        left: 135,
        marginLeft:'5%',
    },
    imagelogOutButton: {
        width: 33,
        height: 33,
    },
});

const styleGeneral = StyleSheet.create({
    container: {
        width: "90%",
        height: "20%",
        flex: 1,
        justifyContent: 'center',
        margin: "5%",
    },
    card:{
        margin: "3%",
        justifyContent: 'center',
    },
    btn: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        width: '100%',
        marginVertical: 10,
        color: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
    },
});


