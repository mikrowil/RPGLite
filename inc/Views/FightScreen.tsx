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
import HealthBarPlayer from "../Components/HealthBarPlayer";
// @ts-ignore
import healthPotion from "../../assets/images/health_potion_01.png"



interface IProps {
    navigation:any,
}

interface IState {
    monster:Monster,
    player:Player,
    strongAttack: [boolean,number,any],


}
export default class FightScreen extends React.Component<IProps,IState>{

    private inBattle:boolean

    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:new Monster(0,1,3,"Sheep",1,0,100,100,false),
            player:new Player(0,1,0,0,"player",1,1,100,100,false),
            strongAttack:[false, 0,styles.button_text],

        }

        this.inBattle = false
    }

    battle = (dmg:number,name:string) =>{

        if(this.inBattle){
            return
        }

        this.inBattle = true

        this.playerAttack(dmg,name)

        let monster = this.state.monster

        this.delay(1000).finally(()=>{
            //Monster Attack Function here
            if(!monster.isDead){
                this.monsterAttack()
            }else {
                let updatedPlayer = this.state.player
                updatedPlayer.gainExp(this.state.monster.getExp())
                let monsterToSend = new Array(this.state.monster)



                this.props.navigation.navigate('Victory',{monster:monsterToSend})
            }

            this.delay(1000).finally(()=>{
                this.inBattle = false
            })
        })


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





        //Calculate status

    }

    private delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        let calculatedDmg;
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
                    <ImageBackground source={background} style={styles.areaDisplay}>
                    <View style={styles.enemyDisplay}>
                        <Text style={styles.monster_name}>{this.state.monster.name} LVL: {this.state.monster.level}</Text>
                        <View style={styles.health_bar}>
                            <HealthBar max = {this.state.monster.maxHealth}
                                       current = {this.state.monster.health}/>
                        </View>
                    </View>

                        

                    <View  style={styles.enemy_container}>
                        <Image style={styles.enemy_img} source={enemy}/>
                    </View>

                    <View style={styles.playerDisplay} >
                        <View>
                            <Text>LVL: {this.state.player.level} {this.state.player.health}</Text>
                            <HealthBarPlayer width={wd("45%")} current={this.state.player.health} max={this.state.player.maxHealth}/>

                            <View>
                                <TouchableOpacity onPress={() => this.battle(10,"reg")} style={styles.attack_button}><Text style={styles.button_text}>Attack</Text></TouchableOpacity>
                                <TouchableOpacity disabled={this.state.strongAttack[0]} onPress={() => this.battle(25,"str")} style={styles.attack_button}><Text style={this.state.strongAttack[2]}>Strong Attack</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.useHealthPotion()}><Image source={healthPotion}/></TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={() => this.goBack()} style={styles.back_button}><Text style={styles.button_text}>Go Back</Text></TouchableOpacity>
                        </View>
                    </View>
                    </ImageBackground>
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
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    areaDisplay:{
        width:wd("100%"),
        height:hd("100%"),
        backgroundColor:"green",
    },
    playerDisplay:{
        width:wd("100%"),
        height:hd("40%"),

        backgroundColor: 'rgba(0,0,0,0.2)'
    },


    //monster styles

    monster_name:{
        textAlign:"center",
        fontSize:36,
        marginTop:"auto",
        marginBottom:"auto",

        color:"#ffffff",
        textShadowRadius:1,
        textShadowColor:"#000000",
        fontFamily:"AncientText"
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


        width:100,
        height:50,
        borderWidth:2,
        backgroundColor:"#b7b7b7",
        borderRadius:10,

    },
    back_button:{
        width:50,
        height:20,

        marginLeft:"auto",
        marginRight:25,

        borderWidth:2,

    },
    button_text:{
        fontFamily:"AncientText",
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",
        color:"#fff",
        textShadowRadius:1,
        textShadowColor:"#000000",
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
