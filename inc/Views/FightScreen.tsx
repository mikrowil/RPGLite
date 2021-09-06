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
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import { Audio } from 'expo-av';
import { useNavigation, useIsFocused } from '@react-navigation/native';


interface IProps {
    navigation:any,
    isFocused:boolean,
}

interface IState {
    monster:Monster,
    player:Player,
    strongAttack: [boolean,number,any],
    music:Audio.Sound
}

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242,0.0)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};


const Stack = createStackNavigator()

const Menu = (props:any) =>{
    return(

            <View style={styles.menu_display}>
                <Text>LVL: {props.player.level} {props.player.health}</Text>
                <HealthBarPlayer width={wd("45%")} current={props.player.health} max={props.player.maxHealth}/>

                <View>
                    <TouchableOpacity onPress={() => props.battle(10,"reg")} style={styles.attack_button}><Text style={styles.button_text}>Attack</Text></TouchableOpacity>
                    <TouchableOpacity disabled={props.strongAttack[0]} onPress={() => props.battle(25,"str")} style={styles.attack_button}><Text style={props.strongAttack[2]}>Strong Attack</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => props.useHealthPotion()}><Image source={healthPotion}/></TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => props.goBack()} style={styles.back_button}><Text style={styles.button_text}>Go Back</Text></TouchableOpacity>
            </View>

    )
}

class FightScreen extends React.Component<IProps,IState>{

    private inBattle:boolean

    constructor(props:IProps) {
        super(props);

        this.state = {
            monster:new Monster(0,1,3,"Sheep",1,0,100,100,false),
            player:new Player(0,1,0,0,"player",1,1,100,100,false),
            strongAttack:[false, 0,styles.button_text],
            music:new Audio.Sound()

        }

        this.inBattle = false
    }

    //Use to head straight to victory screen
    private skipBattle(){
        this.props.navigation.navigate('Victory',{monster:new Array(this.state.monster),player:this.state.player})
    }

    componentDidMount() {
        //this.skipBattle()
    }

    async checkMusic() {
        let status:boolean;

        await this.state.music.getStatusAsync().then((s) => {
            status = s.isLoaded
        }).finally(async () => {
            if(!status){
                await this.state.music.loadAsync(require("../../assets/audio/bensound-epic.mp3"))
                await this.playMusic()
            }else {
                await this.playMusic()
            }
        })
    }

    async playMusic(){

        await this.state.music.playAsync()
    }

    async stopMusic(){
        await this.state.music.unloadAsync()

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



                this.props.navigation.navigate('Victory',{monster:monsterToSend,player:updatedPlayer})
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

    goBack = ()=>{
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

        const {isFocused}=this.props

        if(isFocused){
            this.checkMusic().then()
        }else {
            this.stopMusic().then()
        }

        return (
                <View style={styles.container}>
                    <ImageBackground source={background} style={styles.back_image}>
                    <View style={styles.enemyDisplay}>
                        <Text style={styles.monster_name}>{this.state.monster.name} LVL: {this.state.monster.level}</Text>
                        <View style={styles.health_bar}>
                            <HealthBar max = {this.state.monster.maxHealth}
                                       current = {this.state.monster.health}/>
                        </View>
                    </View>

                    <View style={styles.areaDisplay}>

                    <View  style={styles.enemy_container}>
                        <Image style={styles.enemy_img} source={enemy}/>
                    </View>

                    </View>
                        <View style={styles.playerDisplay}>
                            <NavigationContainer theme={MyTheme} independent={true}>
                            <Stack.Navigator  headerMode={"none"}>
                                <Stack.Screen name={"Menu"} children={()=><Menu player={this.state.player}
                                                                               monster = {this.state.monster}
                                                                               strongAttack = {this.state.strongAttack}
                                                                               battle={this.battle}
                                                                               useHealthPotion={this.useHealthPotion}
                                                                               goBack={this.goBack}
                                />}/>
                            </Stack.Navigator>
                            </NavigationContainer>
                        </View>

                    </ImageBackground>
                </View>

            );

    }
}

export default function (props:any){
    const isFocused = useIsFocused()

    return <FightScreen {...props} isFocused={isFocused} navigation={props.navigation}/>
}


const styles = StyleSheet.create({
    container:{

    },
    back_image:{
        height:"100%",
        width:"100%",
    },
    //display styles

    enemyDisplay:{
        width:wd("100%"),
        height:hd("20%"),
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    areaDisplay:{
        width:wd("100%"),
        height:hd("44%"),

    },
    playerDisplay:{
        width:wd("100%"),
        height:hd("36%"),

        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    menu_display:{
        //backgroundColor: 'rgba(0,0,0,0.2)'
    },


    //monster styles

    monster_name:{
        textAlign:"center",
        fontSize:36,
        marginTop:"auto",
        marginBottom:"auto",

        color:"#ffffff",
        textShadowRadius:2,
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
        textShadowRadius:2,
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
