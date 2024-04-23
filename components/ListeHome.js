import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, SectionList } from "react-native";
import { Card, Title, Button } from "react-native-paper";
import Personnage from "../models/PersonnageController";

export default function ListeHome(props) {
    const [lPerso, setLPerso] = useState();
    const url = "https://zabalo.alwaysdata.net/sae401/api/personnages";

    useEffect(() => {
        getPersonnage();
    }, []);

    function getPersonnage() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((dataJSON) => {
                console.log(dataJSON)
                let personnages = dataJSON.slice(0, 5);
                let l = [];
                for (let p of personnages) {
                    let personnage = new Personnage(
                        p.sousraces_id,
                        p.origines_id,
                        p.sousclasses_id,
                        p.users_id,
                        p.nom,
                        p.id,
                        p.user,
                        p.sousclasses
                    );
                    l.push(personnage);
                }
                setLPerso(l);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={lPerso}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: item.sousclasses.icone }} />
                        <Card.Content>
                            <Title style={{ fontSize: 14 }}>{item.nom}</Title>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                onPress={() => {
                                    props.navigation.navigate("Détail du personnage", { id: item.id });
                                }}>
                                Details
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.horizontalListContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingBottom:42
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    card: {
        flex: 1,
        margin: 4, // Adjust margin between cards
        width: Dimensions.get("window").width / 2 - 16, // Divide window width by 2 for 2 columns and adjust for margin
    },
    horizontalListContent: {
        marginBottom: 12,
    },
});