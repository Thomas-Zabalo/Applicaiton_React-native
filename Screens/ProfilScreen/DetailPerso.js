import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

function DetailPerso(props) {
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
                <>
                    <Text style={styles.title}>{lPerso.nom} - Créé par {lPerso.user.name}</Text>
                    <View style={styles.detailContainer}>

                        <Card style={styles.card}>
                            <Card.Title
                                title="Race"
                                subtitle={lPerso.sousraces.races.nom}
                                left={(props) => <Avatar.Image {...props} source={{ uri: lPerso.sousraces.races.icone }} size={48} />}
                                titleStyle={styles.cardTitle}
                                subtitleStyle={styles.cardSubtitle}
                            />
                            <Card.Content>
                                <Text style={styles.cardContentText}>{lPerso.sousraces.races.description}</Text>
                            </Card.Content>
                        </Card>
                        {lPerso.sousraces.races.nom !== lPerso.sousraces.nom && (
                            <Card style={styles.card}>
                                <Card.Title
                                    title="Sous Race"
                                    subtitle={lPerso.sousraces.nom}
                                    left={(props) => <Avatar.Image {...props} source={{ uri: lPerso.sousraces.icone }} size={48} />}
                                    titleStyle={styles.cardTitle}
                                    subtitleStyle={styles.cardSubtitle}
                                />
                                <Card.Content>
                                    <Text style={styles.cardContentText}>{lPerso.sousraces.description}</Text>
                                </Card.Content>
                            </Card>
                        )}

                        <Card style={styles.card}>
                            <Card.Title
                                title="Classe"
                                subtitle={lPerso.origines.nom}
                                left={(props) => <Avatar.Image {...props} source={{ uri: lPerso.sousclasses.classes.icone }} size={48} />}
                                titleStyle={styles.cardTitle}
                                subtitleStyle={styles.cardSubtitle}
                            />
                            <Card.Content>
                                <Text style={styles.cardContentText}>{lPerso.sousclasses.classes.description}</Text>
                            </Card.Content>
                        </Card>

                        <Card style={styles.card}>
                            <Card.Title
                                title="Sous Classe"
                                subtitle={lPerso.sousclasses.nom}
                                left={(props) => <Avatar.Image {...props} source={{ uri: lPerso.sousclasses.icone }} size={48} />}
                                titleStyle={styles.cardTitle}
                                subtitleStyle={styles.cardSubtitle}
                            />
                            <Card.Content>
                                <Text style={styles.cardContentText}>{lPerso.sousclasses.description}</Text>
                            </Card.Content>
                        </Card>

                        <Card style={styles.card}>
                            <Card.Title
                                title="Origine"
                                subtitle={lPerso.origines.nom}
                                left={(props) => <Avatar.Image {...props} source={{ uri: lPerso.origines.icone }} size={48} />}
                                titleStyle={styles.cardTitle}
                                subtitleStyle={styles.cardSubtitle}
                            />
                            <Card.Content>
                                <Text style={styles.cardContentText}>{lPerso.origines.description}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                </>
            )}
        </ScrollView>
    );
}
export default DetailPerso;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#141218',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailContainer: {
        padding: 8,
    },
    card: {
        backgroundColor: '#FFF',
        margin: 10,
        borderRadius: 8,
    },
    cardTitle: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardSubtitle: {
        marginLeft: 16,
        fontSize: 16
    },
    cardContentText: {
        fontSize: 14,
        marginTop: 8
    }
});

