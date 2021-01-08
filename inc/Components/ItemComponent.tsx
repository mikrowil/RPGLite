import React from "react";
import {View, StyleSheet, Text, Animated} from "react-native";
import Item from "../Entities/Item";
import {widthPercentageToDP} from "react-native-responsive-screen";

interface IProps{
    item:Item
    key:number
}

interface IState{
    name:String,
    value:number

}

export default class ItemComponent extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);

        this.state = {
            name:props.item.name,
            value:props.item.value,
        }
    }


    render() {

        return (
            <View style={styles.item}>
                <View style={styles.name}><Text>{this.state.name}</Text></View>
                <View style={styles.value}><Text>{this.state.value}</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        borderWidth:1,
        borderColor:"#ff4040",

        width:"100%",

        display:"flex",
        flexDirection:"row",

        paddingTop:15,
        paddingBottom:15,
    },
    name:{
        borderWidth:1,
        borderColor:"#0f3075",
        paddingLeft:5,
        width:"80%"
    },
    value:{
        borderWidth:1,
        borderColor:"#6bd232",
        width:"20%",
    }
})
