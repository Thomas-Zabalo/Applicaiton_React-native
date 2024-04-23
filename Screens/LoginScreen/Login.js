import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import User from "../../models/UserController";

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {

    const url = `https://zabalo.alwaysdata.net/sae401/api/login`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passVisi, setPassVisi] = useState(true);

    const handleEmailChange = (value) => setEmail(value);
    const handlePassChange = (value) => setPassword(value);

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            let u = new User(email, password);
            getUtilisateur(u);
        }
    };

    useEffect(() => {
        getUtilisateur();
    }, []);

    let body = {
        email: email,
        password: password
    }

    const storeData = async (accessToken, user_id, user_admin) => {
        try {
            await AsyncStorage.setItem('userToken', accessToken);
            await AsyncStorage.setItem('userData', user_id);
            await AsyncStorage.setItem('userAdmin', user_admin);

            
        } catch (error) {
            // Gestion des erreurs lors de la sauvegarde des données
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    function getUtilisateur() {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/jsons',
            },
            body: JSON.stringify(body)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON.admin);
                const accessToken = dataJSON.accessToken;
                const delimiterIndex = accessToken.indexOf('|');
                const token = accessToken.substring(delimiterIndex + 1);

                if (dataJSON.status == 1) {
                    storeData(token, dataJSON.user_id, dataJSON.admin)
                    navigation.navigate('Home')
                }
                return "Problème de connexion"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/Logo.png")} />


            <TextInput
                style={styles.input}
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Email"
                keyboardType='email-address'
                theme={{ colors: { onSurfaceVariant: 'white' } }}
                activeOutlineColor="white"
                outlineColor="white"
                textColor="white"
            />
            <TextInput
                style={styles.input}
                onChangeText={handlePassChange}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry={passVisi}
                right={
                    <TextInput.Icon
                        icon={passVisi ? 'eye-off' : 'eye'}
                        onPress={() => setPassVisi(!passVisi)}
                        color={'white'}
                        size={24}
                        style={styles.icon}
                    />
                }
                theme={{ colors: { onSurfaceVariant: 'white' } }}
                activeOutlineColor="white"
                outlineColor="white"
                textColor="white"
            />



            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>Se connecter</Text>
            </TouchableOpacity>

            <Text style={styles.texte}>Vous n'avez pas encore de compte ?</Text>

            <TouchableOpacity onPress={() => { navigation.navigate('Inscription') }} style={styles.SignInBtn}>
                <Text style={styles.loginText}>Créez un compte !</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#141218',
        paddingTop: 65,
    },

    input: {
        width: Dimensions.get("window").width / 1.4,
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#0000004D',
    },
    texte: {
        color: 'white',
        marginVertical: 20,
    },
    SignInBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D0BCFF",
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#D0BCFF",
    },
});
