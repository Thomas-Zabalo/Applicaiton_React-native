import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import Classe from "../../models/ClasseController";

export default function Classes(props) {
    const sousraces_id = props.route.params.sousraces_id;
    const [lPerso, setLPerso] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const url = "https://zabalo.alwaysdata.net/sae401/api/classes";

    useEffect(() => {
        getClasses();
    }, []);

    function getClasses() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(dataJSON => {
                let l = dataJSON.map(c => new Classe(c.nom, c.description, c.icone, c.id));
                setLPerso(l);
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
                        <Title>{item.nom}</Title>
                        <Text>{item.description}</Text>
                    </Card.Content>
                ) : (
                    <Card.Cover source={{ uri: item.icone }} />
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
                data={lPerso}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
            />
            {selectedItem !== null && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.bouton}
                        onPress={() => props.navigation.navigate("SousClasse", { id: selectedItem, sousraces_id })}>
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