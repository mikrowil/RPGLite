import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, SectionList, FlatList} from 'react-native'
import {widthPercentageToDP as wd, heightPercentageToDP as hd} from 'react-native-responsive-screen'
import Player from "../Entities/Player";
import Store from "../Entities/Store"
import {db,auth} from "../ConfigFirebase"
import Item from "../Entities/Item";

interface IProps {

}

interface IState {

}


let player = new Player(0,1,0,0,"player",1,1,100,100,false)

export default class StoreScreen extends React.Component<IProps,IState>{


    constructor(props:IProps) {
        super(props);

        this.state = {

        }

    }
    componentDidMount() {
        this.createTestInventory()
    }

    createTestInventory(){
        db.ref("users/"+auth.currentUser?.uid).set(player)
    }

    render() {

        return(
            <View style={styles.container}>
                <View style={styles.header}>

                </View>
                <View style={styles.main_view}>
                    <View>

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
    },
    main_view:{

        width:wd("100%"),
        height:hd("80%"),
        backgroundColor:"#65faff",
    }

})
