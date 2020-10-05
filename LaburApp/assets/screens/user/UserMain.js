// ../screens/user/UserMain.js

import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button, Text, Title, HelperText } from 'react-native-paper';
import { theme } from '../../core/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export default class UserMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,
        };
    }

    goToProviderMain = () => this.props.navigation.navigate('ProviderMain', {
        userid: this.state.userid
    });
    goToClientMain = () => this.props.navigation.navigate('MainClient', {
        userid: this.state.userid
    });

    goToLogin = () => this.props.navigation.navigate('AuthLogin')

    render() {
        return (
            <View style={styleGeneral.container}>
                <View style={{left: 40}}>
                    <Title style={{color: theme.colors.secondary}}> ¿Cómo desea usar la app? </Title>
                </View>

                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 140, marginLeft: '25%', marginTop: '5%'}} source={require('../../images/user.png')} />
                    <Card.Actions>
                        <Button mode="contained" style={styleGeneral.btn} onPress={ this.goToClientMain }> CLIENTE </Button>
                    </Card.Actions>
                </Card>

                <View style={{left: 100, top: -10}}>
                    <HelperText style={{fontSize: 14, color: theme.colors.secondary}}> Contratar servicios </HelperText>
                </View>

                <Card style={styleGeneral.card} >
                    <Card.Cover style={{width: "50%", height: 160, marginLeft: '25%', marginTop: '5%', borderRadius: 80, borderTopStartRadius: 80, borderTopEndRadius: 80}}  source={require('../../images/service.jpg')} />
                    <Card.Actions>
                        <Button  mode="contained" style={styleGeneral.btn} onPress={this.goToProviderMain}> PRESTADOR </Button>
                    </Card.Actions>
                </Card>

                <View style={{left: 100, top: -10}}>
                    <HelperText style={{fontSize: 14, color: theme.colors.secondary}}> Prestar Servicios </HelperText>
                </View>

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
        top: 55,
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


