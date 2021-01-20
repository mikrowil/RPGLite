import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View,ActivityIndicator} from 'react-native'
import VictoryScreen from "./inc/Views/VictoryScreen";
import FightScreen from './inc/Views/FightScreen'
import {heightPercentageToDP as hd, widthPercentageToDP as wd} from "react-native-responsive-screen";
import LoadingScreenMain from "./inc/Views/LoadingScreenMain";
// @ts-ignore
import HomeScreen from "./inc/Views/HomeScreen";
import StoreScreen from "./inc/Views/StoreScreen";
import {loadAsync} from "expo-font";
import LoginScreen from "./inc/Views/LoginScreen";
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"



interface IProps {

}

interface IState {
    fontsLoaded:boolean,
}

const Stack = createStackNavigator()

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

                <NavigationContainer>
                    <Stack.Navigator headerMode={"none"}>
                        <Stack.Screen name={"LoadingScreenMain"} component={LoadingScreenMain}/>
                        <Stack.Screen name={"Login"}component={LoginScreen}/>
                        <Stack.Screen name={"Home"}component={HomeScreen}/>
                        <Stack.Screen name={"Fight"}component={FightScreen}/>
                        <Stack.Screen name={"Victory"}component={VictoryScreen}/>
                        <Stack.Screen name={"Store"}component={StoreScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>


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
