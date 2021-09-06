import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';

export default class Test extends Component {

    constructor(props:any) {
        super(props);
        this.state = {

        };
    }


    handlePress(target:any, owner:any) {
        // @ts-ignore
        if (this.props.onPress) {
            let name;
            let id;
            let index = -1;
            if (target.search("::") > -1) {
                const varCount = target.split("::").length;
                if (varCount === 2) {
                    name = target.split("::")[0];
                    id = target.split("::")[1];
                } else if (varCount === 3) {
                    name = target.split("::")[0];
                    index = parseInt(target.split("::")[1]);
                    id = target.split("::")[2];
                }
            } else {
                name = target;
            }
            // @ts-ignore
            this.props.onPress({ type: 'button', name: name, index: index, id: id, owner: owner });
        }
    }

    handleChangeTextinput(name:any, value:any) {
        let id = "";
        let index = -1;
        if (name.search('::') > -1) {
            const varCount = name.split("::").length;
            if (varCount === 2) {
                name = name.split("::")[0];
                id = name.split("::")[1];
            } else if (varCount === 3) {
                name = name.split("::")[0];
                index = name.split("::")[1];
                id = name.split("::")[2];
            }
        } else {
            name = name;
        }
        let state = this.state;
        // @ts-ignore
        state[name.split('::').join('')] = value;
        this.setState(state, () => {
            // @ts-ignore
            if (this.props.onChange) {
                // @ts-ignore
                this.props.onChange({ type: 'textinput', name: name, value: value, index: index, id: id });
            }
        });
    }

    render() {

        return (
            <View data-layer="53c8dcd1-3c33-4447-ba89-9e14ca991e74" style={styles.iphoneXXs11Pro1}>
        <ReactImage data-layer="ff104a92-8782-4367-aeff-d924c402e6ca" source={require('../assets/rectangle1.png')} style={styles.iphoneXXs11Pro1_rectangle1} />
        <View data-layer="a5c14eff-b060-4c4e-a607-70840d8cb909" style={styles.iphoneXXs11Pro1_component11}>
        <Svg data-layer="70d2336f-3b3b-4442-9a9d-3f5ae0550818" style={styles.iphoneXXs11Pro1_component11_polygon1} preserveAspectRatio="none" viewBox="-0.75 -0.75 326.4999694824219 80.5" fill="transparent"><Defs><Pattern id="img-polygon1" patternContentUnits="userSpaceOnUse" width="100%" height="100%"><SvgImage xlinkHref={require('../assets/polygon1.png')} x="0" y="0" width="325.00px" height="79.00px" /></Pattern></Defs><SvgPath d="M 162.4999847412109 0 L 324.9999694824219 79 L 0 79 Z" fill="url(#img-polygon1)" /></Svg>
            <Svg data-layer="cde7e0a0-e4db-424b-8522-3ab9960ad1cd" style={styles.iphoneXXs11Pro1_component11_polygon2} preserveAspectRatio="none" viewBox="-0.75 -0.75 326.5 294.5" fill="transparent"><Defs><Pattern id="img-polygon2" patternContentUnits="userSpaceOnUse" width="100%" height="100%"><SvgImage xlinkHref={require('../assets/polygon2.png')} x="0" y="0" width="325.00px" height="293.00px" /></Pattern></Defs><SvgPath d="M 162.5 0 L 325 293 L 0 293 Z" fill="url(#img-polygon2)" /></Svg>
            <Svg data-layer="4c1ae674-ab7b-4562-a80e-898493902e6b" style={styles.iphoneXXs11Pro1_component11_polygon3} preserveAspectRatio="none" viewBox="-0.75 -0.75 219.5 303.5000305175781" fill="transparent"><Defs><Pattern id="img-polygon3" patternContentUnits="userSpaceOnUse" width="100%" height="100%"><SvgImage xlinkHref={require('../assets/polygon3.png')} x="0" y="0" width="218.00px" height="302.00px" /></Pattern></Defs><SvgPath d="M 109 0 L 218 302.0000305175781 L 0 302.0000305175781 Z" fill="url(#img-polygon3)" /></Svg>
            </View>
            <Text data-layer="526d0a6a-66e1-4c57-8736-99087479c7d3" style={styles.iphoneXXs11Pro1_rpgSim}>RPG Sim</Text>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    "iphoneXXs11Pro1": {
        "opacity": 1,
        "position": "relative",
        "backgroundColor": "rgba(255, 255, 255, 1)",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 375,
        "height": 812,
        "left": 0,
        "top": 0
    },
    "iphoneXXs11Pro1_rectangle1": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0,
        "borderBottomLeftRadius": 0,
        "borderBottomRightRadius": 0,
        "width": 375,
        "height": 812,
        "left": 0,
        "top": 0
    },
    "iphoneXXs11Pro1_component11": {
        "opacity": 0.8100000023841858,
        "position": "absolute",
        "backgroundColor": "transparent",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 325,
        "height": 381,
        "left": 25,
        "top": 57
    },
    "iphoneXXs11Pro1_component11_polygon1": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 325,
        "height": 79,
        "left": 0,
        "top": 0,


    },
    "iphoneXXs11Pro1_component11_polygon2": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": "auto",
        "height": 293,
        "left": 0,
        "top": 79,
        "right": 0,
        transform:[{rotate:"180deg"}]
    },
    "iphoneXXs11Pro1_component11_polygon3": {
        "opacity": 1,
        "position": "absolute",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 218,
        "height": 302,
        "left": 54,
        "bottom": 0,
        transform:[{rotate:"180deg"}]
    },
    "iphoneXXs11Pro1_rpgSim": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(203, 50, 239, 1)",
        "fontSize": 88,
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontFamily": "AncientText",
        "textAlign": "center",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": 347.07,
        "height": 99.16,
        "left": 13.97,
        "top": 148.34,
        transform:[{rotate:"180deg"}]
    }
});
