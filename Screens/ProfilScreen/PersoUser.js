import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import Personnage from "../../models/PersonnageController";

export default function PersoUser({ navigation, route }) {
    const [lPerso, setLPerso] = useState([]);

    // Fonction pour récupérer les personnages de l'utilisateur
    const retrieveData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('@UserData:accessToken');
            const user_id = await AsyncStorage.getItem('@UserData:user_id');
            if (accessToken !== null && user_id !== null) {
                const newUrl = `https://zabalo.alwaysdata.net/sae401/api/users/${user_id}`;
                getUser(newUrl, accessToken);
            } else {
                setLPerso([]);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setLPerso([]);
        }
    };

    // Fonction pour récupérer les personnages de l'utilisateur depuis l'API
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
                console.log('Data JSON:', dataJSON.personnages);
                let personnages = dataJSON.personnages;
                let l = [];
                for (let p of personnages) {
                    let personnage = new Personnage(
                        p.sousraces_id,
                        p.origines_id,
                        p.sousclasses_id,
                        p.users_id,
                        p.nom,
                        p.id
                    );
                    l.push(personnage);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
                setLPerso([]);
            });
    }

    // Fonction pour supprimer un personnage avec confirmation
    const handleSuppression = (id) => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer ce personnage ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Suppression annulée"),
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => supprimerPersonnage(id)
                }
            ]
        );
    };

    // Fonction pour modifier un personnage
    const handleModification = (personnage) => {
        navigation.navigate("Race", { selectedRaceId: personnage.sousraces_id });
    };
    

    // Fonction pour supprimer effectivement le personnage
    const supprimerPersonnage = async (id) => {
        try {
            const accessToken = await AsyncStorage.getItem('@UserData:accessToken');
            if (!accessToken) {
                throw new Error("Access token is missing.");
            }

            const deleteUrl = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
            const fetchOptions = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };

            const response = await fetch(deleteUrl, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Rafraîchir la liste des personnages après suppression
            retrieveData();
            Alert.alert("Suppresion", "Personnage supprimé avec succès.");
        } catch (error) {
            console.error('Error deleting character:', error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression du personnage.");
        }
    };

    // Appeler retrieveData lors du premier rendu de composant et lorsque le composant obtient le focus
    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={lPerso}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                        <Card.Content>
                            <Title style={{ fontSize: 14 }}>{item.nom}</Title>
                        </Card.Content>
                        <Card.Actions>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigation.navigate('Detail de mon personnage', { id: item.id });
                                }}
                            >
                                <Text style={styles.buttonText}>Details</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleModification(item)}>
                                <Text style={styles.buttonText}>Modifier</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleSuppression(item.id)}>
                                <Text style={styles.buttonText}>Supprimer</Text>
                            </TouchableOpacity>
                        </Card.Actions>
                    </Card>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "#141218",
    },
    card: {
        marginVertical: 4, // Ajuster la marge entre les cartes
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D0BCFF',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        marginRight: 5, // Ajouter une marge à droite pour le bouton "Supprimer"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
