// ../screens/provider/ProviderCovid.js

import React from 'react'
import { TouchableOpacity, StyleSheet, View, Image, ScrollView, CheckBox} from 'react-native';
import { Divider, Title, Paragraph, HelperText, Text, Snackbar} from 'react-native-paper'
/*import Background from '../../components/Background';*/
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';


export default class ProviderCovid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.navigation.state.params.userid,
            checked: false,
            msgCovid: '',
            visible: false
        };
    }

    certificate = () => {
        if (this.state.checked === false) {
            this.setState({
                msgCovid: 'Debe aceptar los terminos y condiciones.'
            })
        } else {
            let DatosJSON = {
                id : this.state.userid
            }
            // Se le manda el id del usuario
            // Devuelve un JSON, donde tiene un campo action, si es verdadero se cambio la solicitud covid, si es false no se cambio y message es una descripcion
            fetch('http://localhost:3030/requestCovid', {
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
                        this.setState({
                            visible: true
                        })
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
                    <Text style={styleHeader.header} >Info. Covid-19</Text>
                    <Divider/>
                </View>

            <View style={styleBody.body}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Title style={styleBody.title}> El Covid - 19 en Argentina.</Title>

                <Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and

                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and


                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and
                    </Paragraph>

                    <View style={styleImage.imageGraffContainer}>
                        <Image style={styleImage.imageGraff} source={require('../../images/graff.jpg')} />
                    </View>
                    
                    <Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and

                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and


                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and
                    
                </Paragraph>

                <View style={styleGeneral.dividerContainer}>
                    <Divider style={styleGeneral.divider}/>

                    <Snackbar 
                        style={{ marginTop: 'center', marginLeft: 'center', zIndex: 1000 }}
                        visible={this.state.visible}
                        onDismiss={ () => {this.setState({ visible: false }) }}
                        action={{
                            label: 'OK',
                            onPress: () => { console.log('Pressed OK') }
                        }}>
                        Felicitaciones ! Se a certificado en COVID-19
                    </Snackbar>

                </View>
                <View style={{ flexDirection: 'column'}}>

                    <View style={{ flexDirection: 'row' , marginBottom:'4%'}}>
                        <CheckBox
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked, msgCovid: '' })}
                        />
                        <Text style={{marginTop: 1}}> Acepto los terminos y condiciones </Text>
                    </View>
                    <HelperText type="error">{this.state.msgCovid}</HelperText>
                </View>
            </ScrollView>

                <View style={styleGeneral.dividerContainer}>
                    <Divider style={styleGeneral.divider}/>
                </View>
            </View>

            <View style={styleFooter.footer}>
                <View style={styleFooter.buttonsContainer}>
                    <Button mode='contained' style={styleFooter.certificar} title='Certificar' onPress={this.certificate}> Certificar </Button>
                </View>
            </View>
        
        
            </View>

        )
    }
}


const styleHeader = StyleSheet.create({
    header: {
        fontSize: 26,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: '20%',
        marginLeft:'5%',
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

const styleImage = StyleSheet.create({
    imageGraffContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    imageGraff: {
        width: '100%',
        height: 220,
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
    title: {
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
