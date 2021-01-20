import React from "react";
import {View, StyleSheet, Text, Animated} from "react-native";

interface IProps{
    current:number,
    max:number,
    width:number,
}

interface IState{
    animFill:any,
    max:number,
    cur:number
}

export default class HealthBarPlayer extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);

        this.state = {
            animFill:new Animated.Value(0),
            max:this.props.max,
            cur:this.props.current,
        }
    }

    anim = ()=>{
        let percent = this.props.current/this.props.max
        let calc = (this.props.width - 6) * percent
        Animated.timing(this.state.animFill,{
            toValue:calc,
            useNativeDriver:false,
        }).start()

    }

    render() {
        this.anim()
        return (
            <View style={[styles.base,{width:this.props.width}]}>

                <Animated.View style={[styles.fill,{width:this.state.animFill}]}>

                </Animated.View>
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

    },
    fill:{
        height:"100%",
        backgroundColor:"#14d02a",

    }
})
