
import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';

import {auth} from "../ConfigFirebase";


export default class LoadingScreen extends React.Component<any,any>{
    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user: any) =>{
            if(user){
                this.props.navigation.navigate('Home')
            }else {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size = "large"/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
