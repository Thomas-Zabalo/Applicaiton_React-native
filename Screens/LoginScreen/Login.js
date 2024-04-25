import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAuth } from '../../LocalStorage/AuthContext';

// import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
    const { login } = useAuth();
    const url = `https://zabalo.alwaysdata.net/sae401/api/login`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisi, setPassVisi] = useState(true);

    const handleEmailChange = (value) => setEmail(value);
    const handlePassChange = (value) => setPassword(value);

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            const userData = {
                email: email,
                password: password
            };
            loginUser(userData);
        }
    };

    // const storeData = async (accessToken, user_id, user_admin) => {
    //     try {
    //         await AsyncStorage.setItem('userToken', accessToken);
    //         await AsyncStorage.setItem('userData', user_id);
    //         await AsyncStorage.setItem('userAdmin', user_admin);
    //         console.log(accessToken, user_id, user_admin)
    //     } catch (error) {
    //         console.error('Erreur lors de la sauvegarde des données:', error);
    //     }
    // };

    function loginUser(userData) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la connexion');
                }
                return response.json();
            })
            .then((dataJSON) => {
                const accessToken = dataJSON.accessToken
                const delimiterIndex = accessToken.indexOf('|');
                if (delimiterIndex !== -1) {
                    const partAfterDelimiter = accessToken.substring(delimiterIndex + 1);
                    login(partAfterDelimiter, dataJSON.user_id, dataJSON.admin);
                    console.log(login)
                    // navigation.navigate('Home');
                } else {
                    console.log('Delimiter "|" not found in accessToken');
                }
                // navigation.navigate('Home');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/Logo.png')} />
                <TextInput
                    label="Email"
                    mode="outlined"
                    style={styles.input}
                    value={email}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Entrez votre email"
                    theme={inputTheme}
                    right={<TextInput.Icon icon='email' color='white' style={{ marginTop: 14 }} />}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    value={password}
                    onChangeText={handlePassChange}
                    secureTextEntry={passVisi}
                    right={<TextInput.Icon icon={passVisi ? 'eye-off' : 'eye'} onPress={() => setPassVisi(!passVisi)} color='white' style={{ marginTop: 14 }} />}
                    theme={inputTheme}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (email !== '' && password !== '') {
                            handleLogin();
                            navigation.navigate('Home');
                        } else {
                            Alert.alert('Veuillez remplir tous les champs.');
                        }
                    }}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginText}>Se connecter</Text>
                </TouchableOpacity>
                <Text style={styles.registerPrompt}>Vous n'avez pas encore de compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                    <Text style={styles.registerButton}>Créez un compte</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    );
}
const inputTheme = {
    colors: {
        primary: 'white',
        text: 'white',
        placeholder: 'white',
        background: 'transparent',
        onSurface: 'white',
        underlineColor: 'transparent',
        outlineColor: 'white',
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141218',
        paddingTop: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 55,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#282c34',
    },
    loginButton: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0BCFF',
        padding: 10,
        borderRadius: 10,
    },
    loginText: {
        color: 'white',
        fontSize: 18,
    },
    registerPrompt: {
        marginTop: 20,
        color: 'white',
    },
    registerButton: {
        color: '#D0BCFF',
        fontSize: 16,
        marginTop: 5,
    },
});
