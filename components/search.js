import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function Search({ navigation }) {
    const [nom, setNom] = useState('');

    const handleSearch = () => {
        navigation.navigate('Liste des personnages', { searchNom: nom });
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Rechercher un personnage"
                onChangeText={setNom}
                value={nom}
                onSubmitEditing={handleSearch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
});
