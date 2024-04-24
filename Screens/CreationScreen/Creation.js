import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Creation(props) {
    const [nom, setNom] = useState("");
    console.log(props);
    const handleNomChange = (value) => setNom(value);

    async function createPersonnage() {
        const accessToken = await AsyncStorage.getItem('userToken')
        const user_id = await AsyncStorage.getItem('userData');
        const { origines_id, sousclasses_id, sousraces_id } = props.route.params;

        const newUrl = "https://zabalo.alwaysdata.net/sae401/api/personnages";
        const data = { origines_id, sousclasses_id, sousraces_id, user_id, nom };
        console.log(data)

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        };
        fetch(newUrl, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => { console.log(dataJSON) })
            .catch(error => {
                console.log(error);
            });
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
