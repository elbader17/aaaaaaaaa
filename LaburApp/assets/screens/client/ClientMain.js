// ../screens/client/ClientMain.js

import * as React from 'react';
import { View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';


export default class ClientMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,
        };
    }

    /*goToCLientServices = () => this.props.navigation.navigate('ClientServices', {
        userid: this.state.userid
    })*/

    goToLogin = () => this.props.navigation.navigate('AuthLogin')

    render() {
        return (
            <View style={styleGeneral.container}>
                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 140, marginLeft: '25%', marginTop: '5%'}} source={require('../../images/service.jpg')} />
                    <Card.Actions>
                        <Button mode="contained" style={styleGeneral.btn} onPress={ this.goToCLientServices }> Servicios </Button>
                    </Card.Actions>
                </Card>

                <View>
                    <TouchableOpacity onPress={this.goToLogin} style={styleLogOut.logOutButton}>
                        <Image style={styleLogOut.imagelogOutButton} source={require('../../images/logOut.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styleLogOut = StyleSheet.create({
    logOutButton: {
        position: 'relative',
        top: getStatusBarHeight(),
        left: 135,
        top: 233,
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


