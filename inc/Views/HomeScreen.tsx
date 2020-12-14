import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'


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
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>RPG SIM V:na</Text>
                </View>
                <TouchableOpacity onPress={() => this.goToFightScreen()} style={styles.button_main}>
                    <Text style={styles.button_main_text}>Fight Sheep</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",

    },
    header:{
        backgroundColor:"#20ffe3",
        width:wd("100%"),
        height:hd("10"),
        marginTop:45,
    },
    header_text:{
        marginTop:"auto",
        marginBottom:"auto",
        textAlign:"center",
        fontSize:40,
    },
    button_main:{

        marginTop:"auto",
        marginBottom:"auto",
        marginLeft:"auto",
        marginRight:"auto",

        width:100,
        height:100,

        backgroundColor:"#da3cf8",

        borderRadius:90,
    },
    button_main_text:{
        fontSize:20,
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",

    }

})
