import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Searchbar } from "react-native-paper";
import ListeHome from '../../components/ListeHome';

function HomeScreen(props) {
    const [nom, setNom] = useState('');
    console.log(props)

    const handleSearch = () => {
        props.navigation.navigate('Liste des personnage', { searchnom: nom });
        setNom('')
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Baldur Gate 3</Text>

            <View>
                <Searchbar
                    placeholder="Rechercher un personnage"
                    onChangeText={setNom}
                    value={nom}
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>Build</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Créez votre personnage</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('Création', { screen: 'Race' });
                    }}>
                        <Text style={styles.link}>Créer mon personnage</Text>
                    </TouchableOpacity>
                </View>
                <Card>
                    <Card.Cover source={{ uri: "https://images6.alphacoders.com/133/1331323.jpeg" }} />
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>Communauté</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Liste des personnages</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Liste des personnage') }}>
                        <Text style={styles.link}>Voir plus</Text>
                    </TouchableOpacity>
                </View>
                <ListeHome  {...props} />
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        paddingHorizontal: 16,
        paddingTop: 65,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 15,
    },
    heading: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
    },
    link: {
        color: '#D0BCFF',
        textDecorationLine: 'underline',
    },
    section: {
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
    }
});
