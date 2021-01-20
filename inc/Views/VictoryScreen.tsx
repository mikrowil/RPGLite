import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'



interface IProps {
    navigation:any,
    monster:Monster[],
    route:any
}

interface IState {
    monster:Monster[],
    totalMonstersKilled:number,
    totalExp:number
}


export default class VictoryScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:this.props.route.params.monster,
            totalExp:0,
            totalMonstersKilled:0,
        }

    }

    componentDidMount() {
        this.calculate()
    }

    goToHome=()=>{
        this.props.navigation.navigate('Home')
    }

    calculate=()=>{
        //Variables to hold final results
        let tMonsters = this.state.monster.length
        let tExp = 0

        //Logic for calculation
        for (let i = 0;i < tMonsters;i++){
            tExp += this.state.monster[i].expToGive
        }



        //Setting data in states
        this.setState({totalMonstersKilled:tMonsters})
        this.setState({totalExp:tExp})
    }

    render() {

        return(
            <View>
                <View style={styles.header}>
                    <Text style={styles.header_text}>Victory</Text>
                </View>
                <View style={styles.body}>
                    <View>
                        <Text>Monsters Defeated</Text>
                        {this.state.monster.map((monster,key) =>
                            <View><Text>Name: {monster.name}</Text>
                                <Text>Exp earned: {monster.expToGive}</Text>
                            </View>

                        )}

                        <Text>Total monsters killed: {this.state.totalMonstersKilled}</Text>

                    </View>

                    <View>
                        <Text>Total exp gained: {this.state.totalExp}</Text>
                    </View>

                    <TouchableOpacity onPress={this.goToHome}><Text>Back to home</Text></TouchableOpacity>
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    header:{
        width:wd("100%"),
        height:hd("20%"),

        backgroundColor:"#35e6ec",
    },
    header_text:{
        marginTop:"auto",
        marginBottom:"auto",
        textAlign:"center",
        color:"#ffffff",
        fontFamily:"AncientText",

        fontSize:50,

        textShadowRadius:1,
        textShadowColor:"#000000"
    },
    body:{
        width:wd("100%"),
        height:hd("80%"),

        backgroundColor:"#1f9cbf",
    }

})
