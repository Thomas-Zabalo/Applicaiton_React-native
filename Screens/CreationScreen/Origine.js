import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import Origine from "./../../models/OrigineController";

export default function Origines(props) {
    const sousraces_id = props.route.params.sousraces_id;
    const sousclasses_id = props.route.params.sousclasses_id;

    const [lPerso, setLPerso] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const url = "https://zabalo.alwaysdata.net/sae401/api/origines";

    useEffect(() => {
        getOrigines();
    }, []);

    function getOrigines() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(dataJSON => {
                let origines = dataJSON.map(sr => new Origine(
                    sr.nom,
                    sr.description,
                    sr.icone,
                    sr.id
                ));
                setLPerso(origines);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const toggleSelect = (itemId) => {
        setSelectedItem(itemId);
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItem === item.id;

        return (
            <Card style={styles.card}>
                {isSelected ? (
                    <Card.Content>
                        <Title style={{ fontSize: 16 }}>{item.nom}</Title>
                        <Text style={{ fontSize: 14 }}>{item.description}</Text>
                    </Card.Content>
                ) : (
                    <Card.Cover source={{ uri: item.icone }} />
                )}
                <Card.Actions>
                    <TouchableOpacity
                        style={[styles.checkboxButton, isSelected && styles.selectedButton]}
                        onPress={() => toggleSelect(item.id)}>
                        <Text style={styles.buttonText}>{isSelected ? '✓' : 'Choisir cette origine'}</Text>
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
                            props.navigation.navigate("Creation", {
                                sousraces_id,
                                origines_id: selectedItem,
                                sousclasses_id
                            });
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