import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import User from '../../models/UserController';

export default function SignUp({ navigation }) {
    const url = `https://zabalo.alwaysdata.net/sae401/api/users`;

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passVisi, setPassVisi] = useState(true);

    const handleNomChange = (value) => setNom(value);
    const handleEmailChange = (value) => setEmail(value);
    const handlePassChange = (value) => setPassword(value);

    
    const handleSignIn = () => {
        if (email !== '' && password !== '' && nom !== '') {
            const userData = {
                name: nom,
                email: email,
                password: password
            };
            getUtilisateur(userData);
        } else {
            Alert.alert('Veuillez remplir tous les champs.');
        }
    };

    function getUtilisateur(userData) { 
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    Alert.alert("Compte créé avec succès !");
                } else {
                    Alert.alert("Erreur lors de la création du compte !");
                }
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                const users = dataJSON;
                let l = [];
                for (let user of users) {
                    let newUser = new User(
                        user.id,
                        user.name,
                        user.email,
                        user.email_verified_at,
                        user.password,
                        user.remember_token,
                        user.created_at,
                        user.update_at,
                        user.administrateur
                    );
                    l.push(newUser);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert("Erreur lors de la création du compte !");
            });
    }


    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                onChangeText={handleNomChange}
                value={nom}
                placeholder="Nom d'utilisateur"
                theme={{ colors: { onSurfaceVariant: 'white' } }}
                activeOutlineColor="white"
                outlineColor="white"
                textColor="white"
            />
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




            <TouchableOpacity
                onPress={() => {
                    if (nom !== '' && email !== '' && password !== '') {
                        handleSignIn();
                        navigation.navigate('Login');
                    } else {
                        Alert.alert('Veuillez remplir tous les champs.');
                    }
                }}
                style={styles.loginBtn}
            >
                <Text style={styles.loginText}>S'inscrire</Text>
            </TouchableOpacity>


            <Text style={styles.texte}>Vous avez déjà un compte ?</Text>

            <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={styles.SignInBtn}>
                <Text style={styles.loginText}>Connectez vous !</Text>
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
    icon: {
        color: 'white',
    },
    input: {
        width: Dimensions.get("window").width / 1.4,
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#0000004D',
        color: 'white',
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
