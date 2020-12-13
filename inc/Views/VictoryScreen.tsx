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


export default class VictoryScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {

        }

    }


    render() {

        return(
            <View>
                <Text>Monster Defeated</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({


})
