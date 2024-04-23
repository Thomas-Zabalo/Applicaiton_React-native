import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
// import Personnage from "../../models/PersonnageController";
import { List } from "react-native-paper";

function Detail(props) {
    const { id } = props.route.params;

    const [lPerso, setLPerso] = useState(null);
    const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;

    useEffect(() => {
        getPersonnage();
    }, []);

    function getPersonnage() {
        fetch(url)
            .then((response) => response.json())
            .then((dataJSON) => {
                console.log(dataJSON);
                setLPerso(dataJSON);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <ScrollView style={styles.container}>
            {lPerso && (
                <List.Section>
                    <List.Accordion title="Origine">
                        <List.Item
                            title={lPerso.origines.nom}
                            description={lPerso.origines.description}
                            titleStyle={styles.nom}
                            descriptionStyle={styles.description}
                        />
                    </List.Accordion>

                    <List.Accordion title="Classe">
                        <List.Item
                            title={lPerso.sousclasses.classes.nom}
                            description={lPerso.sousclasses.classes.description}
                            titleStyle={styles.nom}
                            descriptionStyle={styles.description}
                        />
                    </List.Accordion>

                    <List.Accordion title="Sous Classe">
                        <List.Item
                            title={lPerso.sousclasses.nom}
                            description={lPerso.sousclasses.description}
                            titleStyle={styles.nom}
                            descriptionStyle={styles.description}
                        />
                    </List.Accordion>

                    <List.Accordion title="Race">
                        <List.Item
                            title={lPerso.sousraces.races.nom}
                            description={lPerso.sousraces.races.description}
                            titleStyle={styles.nom}
                            descriptionStyle={styles.description}
                        />
                    </List.Accordion>

                    {lPerso.sousraces.races.nom !== lPerso.sousraces.nom && (
                        <List.Accordion title="Sous Race">
                            <List.Item
                                title={lPerso.sousraces.nom}
                                description={lPerso.sousraces.description}
                                titleStyle={styles.nom}
                                descriptionStyle={styles.description}
                            />
                        </List.Accordion>
                    )}

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((niveau) => (
                        <List.Accordion key={niveau} title={`Niveau ${niveau}`}>
                            <List.Item
                                title={lPerso.sousraces.races.nom}
                                description={lPerso.sousraces.races.description}
                                titleStyle={styles.nom}
                                descriptionStyle={styles.description}
                            />
                        </List.Accordion>
                    ))}
                </List.Section>
            )}
        </ScrollView>
    );
}
export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#141218",
    },
    nom: {
        fontSize: 24,
        paddingTop: 8,
        color: "white",
    },
    descriptionContainer: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginBottom: 20, // Augmenter la marge inférieure pour éviter le chevauchement avec le contenu suivant
    },
    description: {
        fontSize: 16,
        color: "white",
    },
});

