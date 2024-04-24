import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
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

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/Logo.png')} />
                <TextInput
                    label="Nom"
                    mode="outlined"
                    style={styles.input}
                    value={nom}
                    onChangeText={handleNomChange}
                    autoCapitalize="none"
                    placeholder="Nom d'utilisateur"
                    theme={inputTheme}
                    right={<TextInput.Icon icon='account-circle' color='white' style={{ marginTop: 14 }}/>}
                />

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
                    right={<TextInput.Icon icon='email' color='white' style={{ marginTop: 14 }}/>}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    value={password}
                    onChangeText={handlePassChange}
                    secureTextEntry={passVisi}
                    right={<TextInput.Icon icon={passVisi ? 'eye-off' : 'eye'} onPress={() => setPassVisi(!passVisi)} color='white' style={{ marginTop: 14 }}/>}
                    theme={inputTheme}
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
                    style={styles.loginButton}
                >
                    <Text style={styles.loginText}>S'inscrire</Text>
                </TouchableOpacity>

                <Text style={styles.registerPrompt}>Vous avez déjà un compte ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerButton}>Connectez vous</Text>
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
