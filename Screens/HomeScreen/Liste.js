import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Personnage from "../../models/PersonnageController";

export default function ListePersonnage({ navigation, route }) {

    const [lPerso, setLPerso] = useState([]);
    const searchNom = route.params && route.params.searchnom ? route.params.searchnom : null;

    let url = "https://zabalo.alwaysdata.net/sae401/api/personnages";

    if (searchNom) {
        url += `?nom=${searchNom}`;
    }

    useEffect(() => {
        getPersonnage();
    }, []);

    function getPersonnage() {
        const fetchOptions = { method: "GET" };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                let personnages = dataJSON;
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
                                    navigation.navigate("Détail du personnage", { id: item.id });
                                }}>
                                Details
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
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
        flex: 1,
        margin: 4, // Adjust margin between cards
    },
});
