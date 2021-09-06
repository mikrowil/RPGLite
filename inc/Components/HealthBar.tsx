import React from "react";
import {View, StyleSheet, Text, Animated} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";

export default class HealthBar extends React.Component<any, any>{
    constructor(props:any) {
        super(props);

        this.state = {
            animFill:new Animated.Value(0),
            max:this.props.max,
            cur:this.props.current,
        }
    }

    anim = ()=>{
        let percent = this.props.current/this.props.max
        let calc = 344 * percent
        Animated.timing(this.state.animFill,{
            toValue:calc,
            useNativeDriver:false,
        }).start()

    }

    render() {
        this.anim()
        return (
            <View style={styles.base}>

                <Animated.View style={[styles.fill,{width:this.state.animFill}]}/>


                <Text style={styles.text}>{this.props.current} / {this.state.max}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base:{
        borderWidth:3,
        backgroundColor:"#cd0000",
        position:"relative",
        height:20,
        width:350,
    },
    fill:{
        height:"100%",
        backgroundColor:"#14d02a",

    },
    text:{

        fontFamily:"AncientText",
        color:"white",

        textShadowRadius:1,
        textShadowColor:"#000000",

       position:"relative",
        bottom:10,
        left:5,

    }
})
