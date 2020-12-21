import React from "react";
import {View, StyleSheet, Text, Animated} from "react-native";

export default class ExperienceBar extends React.Component<any, any>{
    constructor(props:any) {
        super(props);

        this.state = {
            max:this.props.max,
            cur:this.props.current,
            animFill:new Animated.Value(0)
        }
    }

    anim = ()=>{
        let percent = this.props.current/this.props.max
        let calc = 144 * percent
        Animated.timing(this.state.animFill,{
            toValue:calc,
            useNativeDriver:false,
        }).start()

    }

    render() {
        this.anim()
        return (
            <View style={styles.base}>
                <Animated.View style={[styles.fill,{width:this.state.animFill}]}>

                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base:{
        borderWidth:3,
        position:"relative",
        height:10,
        width:150,
    },
    fill:{
        height:"100%",
        backgroundColor:"#e3c703",

    }
})
