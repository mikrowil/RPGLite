import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'
// @ts-ignore
import backgroundImage from '../../assets/images/background_homeScreen.jpg'
// @ts-ignore
import backgroundTitle from '../../assets/images/background_homeScreen_title.jpg'
import {useFonts} from "expo-font";
import {Font} from "expo/build/removed.web";


interface IProps {
    //Left undefined because i dont know the data type
    navigation:undefined
}

interface IState {

}




export default class HomeScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {

        }

    }



    goToFightScreen = () => {
        //Can be ignored because props.navigation will always be the correct type
        // @ts-ignore
        this.props.navigation.navigate("Fight")
    }

    render() {

        return(

                <ImageBackground source={backgroundImage} style={styles.background}>

                    <View style={styles.header}>
                        <Text style={styles.header_text}>RPG SIM V:na</Text>
                    </View>

                    <View style={styles.body}>
                        <TouchableOpacity onPress={() => this.goToFightScreen()} style={styles.button_main}>
                            <Text style={styles.button_main_text}>Fight Sheep</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.goToFightScreen()} style={styles.button_main}>
                            <Text style={styles.button_main_text}>My Shop</Text>
                        </TouchableOpacity>
                    </View>
                    <View>

                    </View>


                </ImageBackground>

        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",

    },
    background:{
        width:wd("100%"),
        height:hd("100%"),

        position:"absolute",
        zIndex:0,
    },
    header:{
        borderWidth:2,
        borderRadius:15,
        borderColor:"#e4934c",
        backgroundColor:"#7c142c",
        width:wd("100%"),
        height:hd("10"),
        marginTop:120,
    },
    header_text:{
        marginTop:"auto",
        marginBottom:"auto",
        textAlign:"center",
        color:"#ffffff",
        fontFamily:"AncientText",

        fontSize:50,
    },
    body:{
        width:wd("100%"),
        height:hd("52%"),

    },
    button_main:{

        borderColor:"#e4934c",
        borderRadius:90,
        borderWidth:2,

        padding:5,

        marginTop:"auto",
        marginBottom:"auto",
        marginLeft:"auto",
        marginRight:"auto",

        width:100,
        height:100,

        backgroundColor:"#7c142c",
    },
    button_main_text:{
        fontSize:24,
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",

        color:"#ffffff",
        fontFamily:"AncientText",

    }

})
