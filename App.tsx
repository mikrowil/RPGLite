import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View,ActivityIndicator} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import VictoryScreen from "./inc/Views/VictoryScreen";
import FightScreen from './inc/Views/FightScreen'
import {heightPercentageToDP as hd, widthPercentageToDP as wd} from "react-native-responsive-screen";
import LoadingScreenMain from "./inc/Views/LoadingScreenMain";
// @ts-ignore
import HomeScreen from "./inc/Views/HomeScreen";
import StoreScreen from "./inc/Views/StoreScreen";
import {loadAsync} from "expo-font";
import LoginScreen from "./inc/Views/LoginScreen";

interface IProps {

}

interface IState {
    fontsLoaded:boolean,
}



export default class App extends React.Component<IProps,IState>{
    constructor(props : IProps) {
        super(props);

        this.state = {
            fontsLoaded:false
        }
    }

    loadFonts(){
        loadAsync({
            AncientText:require('./assets/fonts/Pixeboy-z8XGD.ttf')
        }).then().finally(() =>{
            this.setState({fontsLoaded:true})
        })
    }

  render() {
    if(this.state.fontsLoaded){
        return (
            <View style={styles.container}>
                <AppContainer/>
            </View>
        );
    }else {
        this.loadFonts()
        return (
            <View>
                <ActivityIndicator size = "large"/>
            </View>
        );
    }
  }
}

const Nav = createSwitchNavigator({
    LoadingMain:LoadingScreenMain,
    Login:LoginScreen,
    Home:HomeScreen,
    Fight:FightScreen,
    Store:StoreScreen,
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
