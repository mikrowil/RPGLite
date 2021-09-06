import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, SectionList, FlatList, ScrollView} from 'react-native'
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'
import Player from "../Entities/Player";
import Store from "../Entities/Store"
import {db,auth} from "../ConfigFirebase"
import Item from "../Entities/Item";
import Inventory from "../Entities/Inventory";
import ItemComponent from "../Components/ItemComponent";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

interface IProps {

}

interface IState {
    player:Player,
    store:Store,
}

const Tab = createBottomTabNavigator()

const ItemView = (props:any) =>{
    return(

            <Tab.Navigator>
                <Tab.Screen name = {"Store"} children ={()=><BuyView store={props.store} />} />
                <Tab.Screen name = {"Inventory"} children = {()=><SellView player={props.player} />}/>
            </Tab.Navigator>

    )
}



const BuyView = (props:any) =>{
    return(
        <View style={styles.scroll_holder}>
            <ScrollView>
                {props.store.getItems().map((item:Item, key:number)=>
                    <ItemComponent item={item} key={key}/>
                    )}
            </ScrollView>
        </View>
    )
}

const SellView = (props:any) =>{
    return(
        <View style={styles.scroll_holder}>
            <ScrollView>
                {props.player.inventory.getInventory().map((item:Item,key:number)=>
                    <ItemComponent key={key} item={item}/>
                )}
            </ScrollView>
        </View>
    )
}

let player = new Player(0,1,0,0,"player",1,1,100,100,false)


let i = new Item(2,"wooden club",10)
let store = new Store()
store.addItem(i)

export default class StoreScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {
            player:player,
            store:store,
        }

    }
    componentDidMount() {
        //this.createTestInventory()
    }

    createStoreInventory(){

    }

    createTestInventory(){
        let inventory = new Inventory()
        let item = new Item(1,"wooden sword",1)
        for (let i = 0;i<10;i++){
            inventory.addItem(item)
        }

        let nPlayer = player
        nPlayer.setInventory(inventory)
        this.setState({player:nPlayer})

        db.ref("users/"+auth.currentUser?.uid).set(nPlayer)
    }

    render() {

        return(
            <View style={styles.container}>
                <View style={styles.header}>

                </View>
                <View style={styles.main_view}>
                    <View style={styles.scroll_holder}>

                        <ItemView player={this.state.player} store={this.state.store}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        width:wd("100%"),
        height:hd("100%"),
    },
    header:{
        width:wd("100%"),
        height:hd("20%"),
        backgroundColor:"#429da9",
        display:"flex",
        flexDirection:"row",
    },
    main_view:{

        width:wd("100%"),
        height:hd("80%"),
        backgroundColor:"#65faff",
    },
    scroll_holder:{
        marginLeft:"auto",
        marginRight:"auto",
        width:wd("90%"),
        height:hd("70%"),
        backgroundColor:"#fff"
    },
    button_main:{

        borderColor:"#e4934c",
        borderRadius:90,
        borderWidth:2,

        padding:5,

        marginTop:"auto",
        marginBottom:"auto",
        marginLeft:"auto",
        marginRight:"auto",

        width:100,
        height:100,

        backgroundColor:"#7c142c",
    },
    button_main_text:{
        fontSize:24,
        textAlign:"center",
        marginTop:"auto",
        marginBottom:"auto",

        color:"#ffffff",
        fontFamily:"AncientText",

    },

})
