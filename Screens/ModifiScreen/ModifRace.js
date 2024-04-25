import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import Race from "../../models/RaceController";

export default function ModifRaces(props) {
    const id = props.route.params.id
    const [lPerso, setLPerso] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');

    //Affichage des informations du personnages
    const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
    useEffect(() => {
        PersoUser(url);
    }, [id]);


    function PersoUser(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
                setSelectedItem(dataJSON.sousraces.races_id)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        const url = "https://zabalo.alwaysdata.net/sae401/api/races";
        getPersonnage(url);
    }, []);

    function getPersonnage(url) {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let races = dataJSON;
                let l = [];
                for (let r of races) {
                    let race = new Race(
                        r.id,
                        r.nom,
                        r.description,
                        r.icone,
                    );
                    l.push(race);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
    };

    console.log(selectedItem)

    const renderItem = ({ item }) => {
        const isSelected = selectedItem === item.id;

        return (
            <Card style={styles.card}>
                {isSelected ? (
                    // Afficher la description si la carte est sélectionnée
                    <Card.Content>
                        <Title style={{ fontSize: 16 }}>{item.nom}</Title>
                        <Text style={{ fontSize: 14 }}>{item.description}</Text>
                    </Card.Content>
                ) : (
                    // Sinon, afficher l'image
                    <Card.Cover source={{ uri: item.icone }} style={{ backgroundColor: 'black' }} />
                )}
                <Card.Actions>
                    <TouchableOpacity
                        style={[styles.checkboxButton, isSelected && styles.selectedButton]}
                        onPress={() => toggleSelect(item.id)}>
                        <Text style={styles.buttonText}>{isSelected ? '✓' : 'Choisir'}</Text>
                    </TouchableOpacity>
                </Card.Actions>
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingTop: 42, paddingBottom: 100 }}
                data={lPerso}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
            {selectedItem !== null && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.bouton}
                        onPress={() => {
                            props.navigation.navigate("SousRace", { race: selectedItem, id: id });
                        }}>
                        <Text style={styles.boutonText}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        flex: 1,
        margin: 4,
        backgroundColor: '#FFF',
    },
    checkboxButton: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    selectedButton: {
        backgroundColor: '#D0BCFF',
        borderWidth: 0,
    },
    buttonText: {
        fontSize: 14,
        padding: 8,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignSelf: 'center',
        paddingHorizontal: 24,
    },
    bouton: {
        backgroundColor: '#D0BCFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    boutonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
