import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, Modal, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../LocalStorage/AuthContext';

import { launchImageLibrary } from 'react-native-image-picker';

function Profil({ navigation }) {
    const { userAdmin, userToken, logout } = useAuth();
    const accessToken = userToken;

    const [user, setUser] = useState(null);
    const [nom, setEditedName] = useState('');
    const [email, setEditedEmail] = useState('');

    const selectImage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source);
            }
        });
    };

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


    const url = "https://zabalo.alwaysdata.net/sae401/api/logout";

    function deconnexion() {

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        fetch(url, fetchOptions)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Erreur lors de la déconnexion');
                }
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                navigation.navigate('Home', { screen: 'Home' });
                logout();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const dismissKeyboard = () => {
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
                        onPress={deconnexion}
                        style={styles.logoutIcon}
                    />
                    <Text style={styles.title}>Mon profil</Text>

                    <View style={styles.profileImageContainer}>
                        <Image source={{ uri: user.icone }} style={styles.profileImage} />
                        <Icon name="edit" size={24} color="white" style={styles.editIcon} onPress={selectImage} />
                    </View>

                    <TextInput
                        label="Nom"
                        mode="outlined"
                        style={styles.input}
                        value={nom}
                        onChange={e => setEditedName(e.target.value)}
                        autoCapitalize="none"
                        keyboardType="Nom d'utilisateur"
                        placeholder="Entrez votre nom d'utilisateur"
                        theme={inputTheme}
                        right={<TextInput.Icon icon='account-circle' color='white' style={{ marginTop: 14 }} />}
                    />
                    <TextInput
                        label="Email"
                        mode="outlined"
                        style={styles.input}
                        value={email}
                        onChange={e => setEditedEmail(e.target.value)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Entrez votre email"
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
            )
            }
            {
                !user && (
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
                )
            }
        </View >

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
    profileImageContainer: {
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalImage: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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