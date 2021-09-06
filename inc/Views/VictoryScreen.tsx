import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'
import PlayerUtilities from "../Utilities/PlayerUtilities"


interface IProps {
    navigation:any,
    monster:Monster[],
    route:any,
    player:Player
}

interface IState {
    monster:Monster[],
    totalMonstersKilled:number,
    totalExp:number,
    player:Player
}



const Report = (props:IState) =>{
    return(
        <View style={styles.display_area}>
            <Text style={styles.report_text}>Report</Text>
            <View style={styles.monster_display}>
                <Text>Monsters Defeated</Text>
                {props.monster.map((monster,key) =>
                    <View style={styles.monster} key={key}>
                        <Text>Name: {monster.name}</Text>
                        <Text>Exp earned: {monster.expToGive}</Text>
                    </View>

                )}

                <Text>Total monsters killed: {props.totalMonstersKilled}</Text>

            </View>

            <View style={styles.exp}>
                <Text>Total exp gained: {props.totalExp}</Text>
            </View>
        </View>
    )
}


export default class VictoryScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:this.props.route.params.monster,
            player:this.props.route.params.player,
            totalExp:0,
            totalMonstersKilled:0,
        }

    }

    componentDidMount() {
        this.calculate()
        let U = new PlayerUtilities()

        U.savePlayer(this.state.player)

        let player:any

        U.loadPlayer().then((s)=>{

        })
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
        //Reference states
        let monster = this.state.monster
        let player = this.state.player
        let tMK = this.state.totalMonstersKilled
        let tExp = this.state.totalExp

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>Victory</Text>
                </View>
                <View style={styles.body}>

                    <Report player={player} monster={monster} totalMonstersKilled={tMK} totalExp={tExp}/>

                    <TouchableOpacity style={styles.back_button} onPress={this.goToHome}>
                        <Text style={styles.back_button_text}>Back to home</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{

    },
    header:{
        width:wd("100%"),
        height:hd("14%"),

        backgroundColor:"#c82f2f",
    },
    header_text:{
        marginTop:hd("7%"),
        marginBottom:"auto",
        textAlign:"center",
        color:"#ffffff",
        fontFamily:"AncientText",

        fontSize:50,

        textShadowRadius:3,
        textShadowColor:"#000000"
    },
    body:{
        width:wd("100%"),
        height:hd("86%"),

        backgroundColor:"#a01e1e",
    },
    display_area:{
        width:wd("90%"),
        height:hd("65%"),
        backgroundColor:"#e23829",
        borderRadius:10,

        marginLeft:"auto",

        marginRight:"auto",
        marginTop:5
    },
    report_text:{
        fontSize:42,
        fontFamily:"AncientText",
        textAlign:"center",
        textShadowRadius:3,
        textShadowColor:"#000000",
        color:"#ffffff",

        margin:15,
    },
    monster_display:{
        padding:3,
        margin:5,
        borderWidth:1,
        borderRadius:10
    },
    monster:{

    },
    exp:{

    },
    label:{

    },
    back_button:{
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:25,

        borderWidth:1,
        borderRadius:25,

        width:wd("60%"),
        height:hd("10%"),

        backgroundColor:"#e23829",
    },
    back_button_text:{

        marginTop:"auto",
        marginBottom:"auto",

        fontSize:30,
        fontFamily:"AncientText",
        textAlign:"center",
        textShadowRadius:3,
        textShadowColor:"#000000",
        color:"#ffffff",
    },

})
