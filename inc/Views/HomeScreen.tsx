import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'


interface IProps {
}

interface IState {

}


export default class HomeScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {

        }

    }


    render() {

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>RPG SIM V:na</Text>
                </View>
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
        backgroundColor:"#ff8787",
    }

})
