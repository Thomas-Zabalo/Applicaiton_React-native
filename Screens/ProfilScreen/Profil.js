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
                console.log(dataJSON);
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
    };

    return (
        <View style={styles.container}>


            {user && (
                <View style={styles.profileContainer}>
                    <Icon
                        name="exit-to-app"
                        size={24}
                        color="red"
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onPress={logout}
                    />
                    <Text style={styles.title}>Mon profil</Text>
                    <Image source={{ uri: 'https://images6.alphacoders.com/133/1331323.jpeg' }} style={styles.profileImage} />
                    <TextInput
                        style={styles.input}
                        value={editedEmail}
                        onChangeText={setEditedEmail}
                        placeholder="Email"
                        editable={false}
                        theme={{ colors: { onSurfaceVariant: 'white' } }}
                        activeOutlineColor="white"
                        outlineColor="white"
                        textColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Nom"
                        editable={false}
                        theme={{ colors: { onSurfaceVariant: 'white' } }}
                        activeOutlineColor="white"
                        outlineColor="white"
                        textColor="white"
                    />


                    <Text style={styles.characterCount}>Nombre de personnages: {user.personnages.length}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Mes personnages', { userId: user.id })}
                        disabled={!user || user.personnages.length === 0}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Modifier</Text>
                    </TouchableOpacity>



                </View>
            )}
            {!user && (
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Connectez-vous ou inscrivez-vous</Text> 
                    <Button title="Se connecter" onPress={() => navigation.navigate('Accueil', { screen: 'Login' })} />
                    <Button title="S'inscrire" onPress={() => navigation.navigate('Accueil', { screen: 'Inscription' })} />
                </View>
            )}
        </View>
    );
}

export default Profil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#141218',
        paddingTop: 65,
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
        width: 150,
        height: 150,
        borderRadius: 75,
        marginVertical: 10,
    },
    input: {
        width: Dimensions.get("window").width / 1.4,
        marginVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#0000004D',
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
});
