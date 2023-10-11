// 891200083438-1tg7d847v64r2ad9uvant3o61pcr31o2.apps.googleusercontent.com

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '891200083438-rf0pakgee2sesj6jqr98e3epang97tt4.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            scopes: ['profile', 'email'],
        });

        isSignedIn();
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
        } catch (error) {
            console.log('Message: ', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available.');
            } else {
                console.log('Some other error');
            }
        }
    };

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            getCurrentUserInfo();
        }
    };

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUser(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet');
            } else {
                console.log('Something went wrong');
            }
        }
    };

    const SignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, margin: 50 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {user ? (
                    <TouchableOpacity onPress={SignOut}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                ) : (
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Login;
