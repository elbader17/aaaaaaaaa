// ../screens/provider/ProviderCovid.js


import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView, CheckBox} from 'react-native';
import { Divider, Title, Paragraph} from 'react-native-paper'
/*import Background from '../../components/Background';*/
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';


export default class ProviderCovid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedNormal: true,
            checkedCustom: true,
        };
    }

    goToAdminMain = () => this.props.navigation.navigate('AdminMain')

    render() {
        return (
            
            <View style={styleGeneral.container}> 
                <View>
                    <TouchableOpacity onPress={this.goToAdminMain} style={styleHeader.backButton}>
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
                </View>

            </ScrollView>

                <View style={styleGeneral.dividerContainer}>
                    <Divider style={styleGeneral.divider}/>
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



