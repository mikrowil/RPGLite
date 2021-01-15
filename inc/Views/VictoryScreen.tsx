import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'


interface IProps {
    navigation:any
}

interface IState {

}


export default class VictoryScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {

        }

    }

    goToHome=()=>{
        this.props.navigation.navigate('Home')
    }

    render() {

        return(
            <View>
                <Text>Monster Defeated</Text>
                <TouchableOpacity onPress={this.goToHome}><Text>Back to home</Text></TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({


})
