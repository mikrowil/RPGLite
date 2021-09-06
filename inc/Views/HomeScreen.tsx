import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hd, widthPercentageToDP as wd} from 'react-native-responsive-screen'
// @ts-ignore
import backgroundImage from '../../assets/images/background_homeScreen.jpg'
// @ts-ignore
import backgroundTitle from '../../assets/images/background_homeScreen_title.jpg'
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Audio} from 'expo-av/build';
import MusicUtilities from "../Utilities/MusicUtilities";


const Stack = createStackNavigator()


interface IProps {
    //Left because i dont know the data type
    navigation: any,
    isFocused: boolean,
}

interface IState {
    music: Audio.Sound
}

interface IMainMenuProps {
    goToFightScreen: Function,
    goToStoreScreen: Function,
    switchToSettings: Function,

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

const MainMenu = (props: any) => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()


    if (isFocused) {
        return (
            <View style={styles.body}>
                <TouchableOpacity onPress={() => props.goToFightScreen()} style={styles.button_main}>
                    <Text style={styles.button_main_text}>Fight Sheep</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.goToStoreScreen()} style={styles.button_main}>
                    <Text style={styles.button_main_text}>My Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SettingMenu")} style={styles.button_main}>
                    <Text style={styles.button_main_text}>Settings</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View>

            </View>
        )

    }
}

const SettingMenu = (props: any) => {
    const navigation = useNavigation()

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.button_main}>
                <Text style={styles.button_main_text}>Turn Off Sound</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button_main}>
                <Text style={styles.button_main_text}>Turn Off Music</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MainMenu")} style={styles.button_main}>
                <Text style={styles.button_main_text}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}


class HomeScreen extends React.Component<IProps, IState> {

    mUtils: MusicUtilities

    constructor(props: any) {
        super(props);

        this.state = {
            music: new Audio.Sound()
        }

        this.mUtils = new MusicUtilities()

    }


    componentDidMount() {

    }


    async stopMusic() {
        await this.state.music.unloadAsync()

    }

    goToFightScreen = () => {
        this.props.navigation.navigate("Fight")


    }

    goToStoreScreen = () => {
        this.props.navigation.navigate("Store")


    }

    switchToSettings = () => {

    }

    render() {

        const {isFocused} = this.props

        if (isFocused) {
            this.mUtils.checkMusic().then()
        } else {
            this.stopMusic().then()
        }


        return (

            <ImageBackground source={backgroundImage} style={styles.background}>

                <View style={styles.header}>
                    <Text style={styles.header_text}>RPG SIM V:na</Text>
                </View>


                <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: "rgb(242, 242, 242,0.0)"}}}
                                 headerMode={"none"}>
                    <Stack.Screen options={{animationEnabled: true}} name={"MainMenu"} children={() => <MainMenu
                        goToFightScreen={this.goToFightScreen} goToStoreScreen={this.goToStoreScreen}
                        switchToSettings={this.switchToSettings}/>}/>
                    <Stack.Screen
                        options={{animationEnabled: true, cardStyle: {backgroundColor: "rgb(242, 242, 242,0.0)"}}}
                        name={"SettingMenu"} children={() => <SettingMenu/>}/>
                </Stack.Navigator>


                <View>

                </View>


            </ImageBackground>

        );
    }
}


export default function (props: any) {
    const isFocused = useIsFocused()
    return <HomeScreen {...props} isFocused={isFocused}/>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",

    },
    background: {
        width: wd("100%"),
        height: hd("100%"),

        position: "absolute",
        zIndex: 0,
    },
    header: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#e4934c",
        backgroundColor: "#7c142c",
        width: wd("100%"),
        height: hd("10"),
        marginTop: 120,
    },
    header_text: {
        marginTop: "auto",
        marginBottom: "auto",
        textAlign: "center",
        color: "#ffffff",
        fontFamily: "AncientText",

        fontSize: 50,

        textShadowRadius: 1,
        textShadowColor: "#000000"
    },
    body: {
        width: wd("100%"),
        height: hd("52%"),

    },
    button_main: {

        padding: 5,
        paddingTop: 50,


        marginLeft: "auto",
        marginRight: "auto",


    },
    button_main_text: {
        fontSize: 36,
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",

        color: "#ffffff",
        fontFamily: "AncientText",

        textShadowRadius: 1,
        textShadowColor: "#000000"

    }

})
