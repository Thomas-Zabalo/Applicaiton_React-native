import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Creation(props) {
    const [nom, setNom] = useState("");
    console.log(props);
    const handleNomChange = (value) => setNom(value);

    const createPersonnage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('@UserData:accessToken');
            const user_id = await AsyncStorage.getItem('@UserData:user_id');

            const { origines_id, sousclasses_id, sousraces_id } = props.route.params;

            if (!accessToken || !user_id) {
                throw new Error("Access token or user ID is missing.");
            }

            const newUrl = "https://zabalo.alwaysdata.net/sae401/api/personnages";
            const data = { origines_id, sousclasses_id, sousraces_id, user_id, nom };

            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            };

            const response = await fetch(newUrl, fetchOptions);
            console.log('response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('responseData:', responseData);

            if (responseData.success) {
                Alert.alert("Success", "Personnage créé avec succès.");
                navigation.navigate('Profil');
            } else {
                Alert.alert("Erreur", "Erreur lors de la création du personnage.");
            }
        } catch (error) {
            console.error('Error creating character:', error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de la création du personnage.");
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handleNomChange}
                value={nom}
                placeholder="Nom du personnage"
            />
            <Button
                title="Créer Personnage"
                onPress={createPersonnage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
