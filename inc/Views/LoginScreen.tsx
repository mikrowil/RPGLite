
import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
// @ts-ignore
import * as Google from 'expo-google-app-auth';
import {auth} from "../ConfigFirebase";
import firebase from "firebase";

export default class LoginScreen extends React.Component<any,any>{
    constructor(props:any) {
        super(props);

    }

    isUserEqual= (googleUser:any, firebaseUser:any)=> {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignI = (googleUser:any) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = auth.onAuthStateChanged((firebaseUser:any) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken);

                // Sign in with credential from the Google user.
                auth.signInWithCredential(credential).catch((error:any) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    const credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    signInWithGoogleAsync= async ()=> {
        try {
            const result = await Google.logInAsync({
                androidClientId: "515331412092-o4inr7ttkmppvc24e3uh2il0kcgbi4r3.apps.googleusercontent.com",
                iosClientId: "515331412092-8f3iui1a77npml6ais7rj1oetg6ievk0.apps.googleusercontent.com",

                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignI(result)
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={"Sign in with Google"}
                        onPress={() => this.signInWithGoogleAsync()}/>
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
