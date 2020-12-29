import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native'
import Monster from "../Entities/Monster";
import Player from "../Entities/Player";
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'
// @ts-ignore
import HealthBar from "../Components/HealthBar";
// @ts-ignore
import background from '../../assets/images/background_fightScreen_forest_1.jpg'
// @ts-ignore
import enemy from '../../assets/images/enemy_sheep_01.png'
// @ts-ignore
import ExperienceBar from "../Components/ExperienceBar";
// @ts-ignore
import healthPotion from "../../assets/images/health_potion_01.png"

let monster = new Monster(0,1,3,"Sheep",1,0,100,100,false)
let player = new Player(0,1,0,0,"player",1,1,100,100,false)

interface IProps {
    navigation:any,
}

interface IState {
    monster:Monster,
    player:Player,
    strongAttack: [boolean,number,any]

}


export default class FightScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:monster,
            player:player,
            strongAttack:[false, 0,styles.button_text],

        }
    }

    playerAttack = (dmg:number,name:string) => {

        if(this.state.monster.isDead){
            this.reset()
            return
        }

        if(name==="str" && this.state.strongAttack[0]){
            return;
        }

        let ham = this.state.strongAttack;
        if(this.state.strongAttack[0]){


            ham[1]++;

            if(ham[1] >= 3){
                ham[0] = false;
                ham[1] = 0;
                ham[2] = styles.button_text;


            }

            this.setState({strongAttack:ham});


        }else {
            if(name === "str"){
                ham[0] = true;
                ham[2] = styles.button_cool_down
            }
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
    useHealthPotion = () =>{
         let updatePlayer = this.state.player
        updatePlayer.health = updatePlayer.maxHealth
        this.setState({player:updatePlayer})

        this.monsterAttack()
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

    goBack(){
        this.props.navigation.navigate('Home')
    }

    reset= () => {
        let updatedMonster = this.state.monster
        updatedMonster.isDead = false;
        updatedMonster.health = this.state.monster.maxHealth

        this.setState({monster: updatedMonster})
        let updatedPlayer = this.state.player
        updatedPlayer.health = this.state.player.maxHealth
        this.setState({player:updatedPlayer})

        this.setState({strongAttack:[false,0,styles.button_text]})
    }


    render() {


        return (
                <View style={styles.container}>
                    <View style={styles.enemyDisplay}>
                        <Text style={styles.monster_name}>{this.state.monster.name} LVL: {this.state.monster.level}</Text>
                        <View style={styles.health_bar}>
                            <HealthBar max = {this.state.monster.maxHealth}
                                       current = {this.state.monster.health}/>
                        </View>
                    </View>

                    <ImageBackground source={background} style={styles.areaDisplay}>
                    <View style={styles.enemy_container}>
                        <Image style={styles.enemy_img} source={enemy}/>
                    </View>
                    </ImageBackground>
                    <View style={styles.playerDisplay}>
                        <Text>LVL: {this.state.player.level}   Health: {this.state.player.health} / {this.state.player.maxHealth}</Text>
                        <ExperienceBar max = {this.state.player.maxExp}
                        current = {this.state.player.exp}/>
                        <View>
                            <TouchableOpacity onPress={() => this.playerAttack(10,"reg")} style={styles.attack_button}><Text style={styles.button_text}>Attack</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.playerAttack(25,"str")} style={styles.attack_button}><Text style={this.state.strongAttack[2]}>Strong Attack</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.useHealthPotion()}><Image source={healthPotion}/></TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={() => this.goBack()} style={styles.back_button}><Text style={styles.button_text}>Go Back</Text></TouchableOpacity>
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
    health_bar:{
        marginRight:"auto",
        marginLeft:"auto",
        marginBottom:5,
    },
    enemy_container:{
        width:150,
        height:150,
        marginTop:"auto",
        marginBottom:"auto",
        marginRight:"auto",
        marginLeft:"auto",

    },
    enemy_img:{
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode:"stretch",
    },


    //Player styles
    attack_button:{
        margin:10,


        width:50,
        height:50,
        borderWidth:2,
        backgroundColor:"#7c142c",
        borderRadius:90,
        borderColor:"#e4934c",
    },
    back_button:{
        width:100,
        height:100,

        marginLeft:"auto",
        marginRight:25,

        borderWidth:2,
        backgroundColor:"#7c142c",
        borderRadius:90,
        borderColor:"#e4934c",
    },
    button_text:{
        fontFamily:"AncientText",
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",
        color:"#fff",
    },
    button_cool_down:{
        fontFamily:"AncientText",
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",
        color:"#5a5858",
    },
    button_group:{
        width:wd("100%"),


        flexDirection:"row",
    }

})
