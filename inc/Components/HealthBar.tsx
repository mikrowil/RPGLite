import React from "react";
import {View, StyleSheet, Text} from "react-native";

export default class HealthBar extends React.Component<any, any>{
    constructor(props:any) {
        super(props);

        this.state = {
            percent:100,
            max:this.props.max,
            cur:this.props.current,
        }
    }


    render() {
        let percent = this.props.current/this.props.max * 100
        return (
            <View style={styles.base}>
                <View style={[styles.fill,{width:`${percent}%`}]}>

                </View>
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
    }
})
