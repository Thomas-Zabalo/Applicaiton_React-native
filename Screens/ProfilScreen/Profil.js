import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Profil({ navigation }) {
    const [user, setUser] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            retrieveData();
        }, [])
    );

    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('userToken');
            const user_id = await AsyncStorage.getItem('userData');
            if (accessToken !== null && user_id !== null) {
                const newUrl = `https://zabalo.alwaysdata.net/sae401/api/users/` + user_id;
                getUser(newUrl, accessToken);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setUser(null);
        }
    };


    function getUser(url, token) {
        console.log(token)
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                setUser(dataJSON);
                setEditedName(dataJSON.name);
                setEditedEmail(dataJSON.email);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const logout = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('userToken');
            const fetchOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
            const response = await fetch('https://zabalo.alwaysdata.net/sae401/api/logout', fetchOptions);
            if (response.ok) {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('userAdmin');

                setUser(null);
                navigation.navigate('Home', { screen: 'Home' });
            } else {
                console.error('Erreur lors de la déconnexion:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }

    }; const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (

        <View style={styles.container} onPress={dismissKeyboard}>


            {user && (
                <View style={styles.profileContainer}>
                    <Icon
                        name="exit-to-app"
                        size={30}
                        color="#f44336"
                        onPress={logout}
                        style={styles.logoutIcon}
                    />
                    <Text style={styles.title}>Mon profil</Text>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: user.icone }} style={styles.profileImage} />
                        <TextInput
                            label="Email"
                            mode="outlined"
                            style={styles.input}
                            value={user.email}
                            // onChangeText={handleEmailChange}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Entrez votre email"
                            theme={inputTheme}
                            right={<TextInput.Icon icon='account-circle' color='white' style={{ marginTop: 14 }} />}
                        />
                        <TextInput
                            label="Email"
                            mode="outlined"
                            style={styles.input}
                            value={user.name}
                            // onChangeText={handleEmailChange}
                            autoCapitalize="none"
                            keyboardType="Nom d'utilisateur"
                            placeholder="Entrez votre nom d'utilisateur"
                            theme={inputTheme}
                            right={<TextInput.Icon icon='email' color='white' style={{ marginTop: 14 }} />}
                        />
                        <Text style={styles.characterCount}>Nombre de personnages: {user.personnages.length}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Mes personnages', { userId: user.id })}
                            disabled={user.personnages.length === 0}
                        >
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {!user && (
                <View style={styles.container}>
                    <Text style={styles.title}>Connectez-vous ou inscrivez-vous</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.signupButton]}
                        onPress={() => navigation.navigate('Inscription')}
                    >
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default Profil;

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
    },
    roundedBottom: {
        width: '100%',
        height: 30,
        backgroundColor: 'purple',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        marginTop: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 25,
        marginVertical: 10,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#282c34',
        borderRadius: 5,
    },
    button: {
        borderColor: '#D0BCFF',
        borderWidth: 1,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 10,
    },

    buttonText: {
        color: '#D0BCFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    characterCount: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
    loginContainer: {
        alignItems: 'center',
    },
    logoutIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
