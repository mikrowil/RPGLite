import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import VictoryScreen from "./inc/Views/VictoryScreen";
import FightScreen from './inc/Views/FightScreen'
import {heightPercentageToDP as hd, widthPercentageToDP as wd} from "react-native-responsive-screen";
import HomeScreen from "./inc/Views/HomeScreen";


export default class App extends React.Component{
  render() {
    return (
        <View style={styles.container}>
            <AppContainer/>
        </View>
    );
  }
}

const Nav = createSwitchNavigator({
    Home:HomeScreen,
    Fight:FightScreen,
    Victory:VictoryScreen,
})

const AppContainer = createAppContainer(Nav)

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
    },

    header:{
        width:wd("100%"),
        height:hd("10%"),
        backgroundColor:"red",
    },
})
