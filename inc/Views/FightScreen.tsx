import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'

let monster = new Monster(0,1,3,"Sheep",5,0,100,100,false)
let player = new Player(0,1,0,0,"player",10,10,100,100,false)

interface IProps {
}

interface IState {
    monster:Monster,
    player:Player,
}


export default class FightScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:monster,
            player:player,
        }

    }

    playerAttack = (dmg:number) => {

        if(this.state.monster.isDead){
            this.reset()
            return
        }

        let updateMonster = this.state.monster

        dmg = this.calculateDmg(dmg,"player")

        updateMonster.health = updateMonster.health - dmg;
        if(updateMonster.health <= 0 ){
            updateMonster.health = 0
            updateMonster.isDead = true
        }

        this.setState({monster:updateMonster})

        //Monster Attack Function here
        if(!updateMonster.isDead){
            this.monsterAttack()
        }else {
            let updatedPlayer = this.state.player
            updatedPlayer.gainExp(this.state.monster.getExp())
            this.setState({player:updatedPlayer})
        }

        //Calculate status

    }

    monsterAttack = () =>{
        let updatePlayer = this.state.player;
        let dmg = 10

        dmg = this.calculateDmg(dmg,"monster")

        updatePlayer.health = updatePlayer.health - dmg;

        this.setState({player:updatePlayer})
    }

    calculateDmg(dmg:number,who:String){
        let calculatedDmg = 0;
        if(who === "player"){
            let diff = this.state.player.attack - this.state.monster.defense
            calculatedDmg = dmg + diff;
        }else {
            let diff = this.state.monster.attack - this.state.player.defense
            calculatedDmg = dmg + diff;
        }

        return calculatedDmg
    }

    reset= () => {
        let updatedMonster = this.state.monster
        updatedMonster.isDead = false;
        updatedMonster.health = this.state.monster.maxHealth

        this.setState({monster: updatedMonster})
        let updatedPlayer = this.state.player
        updatedPlayer.health = this.state.player.maxHealth
        this.setState({player:updatedPlayer})
    }


    render() {

            return (
                <View style={styles.container}>
                    <View style={styles.enemyDisplay}>
                        <Text style={styles.monster_name}>{this.state.monster.name} LVL: {this.state.monster.level}</Text>
                        <Text style={styles.monster_health}>{monster.health} / {monster.maxHealth}</Text>
                    </View>
                    <View style={styles.areaDisplay}>

                    </View>
                    <View style={styles.playerDisplay}>
                        <Text>LVL: {this.state.player.level}   Health: {this.state.player.health} / {this.state.player.maxHealth}</Text>
                        <Text>EXP: {this.state.player.exp} / {this.state.player.maxExp}</Text>
                        <TouchableOpacity onPress={() => this.playerAttack(10)} style={styles.attack_button}><Text>Attack</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.playerAttack(25)} style={styles.attack_button}><Text>Strong Attack</Text></TouchableOpacity>
                    </View>
                </View>

            );

    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },

    //display styles

    enemyDisplay:{
        width:wd("100%"),
        height:hd("20%"),
        backgroundColor:"red",
    },
    areaDisplay:{
        width:wd("100%"),
        height:hd("40%"),
        backgroundColor:"green",
    },
    playerDisplay:{
        width:wd("100%"),
        height:hd("40%"),
        backgroundColor:"#33bff6",
    },

    //monster styles

    monster_name:{
        textAlign:"center",
        fontSize:26,
        marginTop:"auto",
        marginBottom:"auto",
    },
    monster_health:{
        textAlign:"center",
        fontSize:22,
    },


    //Player styles
    attack_button:{
        margin:10,


        width:50,
        height:50,
        borderRadius:5,
        backgroundColor:"#ff6a6a",
    },

})
