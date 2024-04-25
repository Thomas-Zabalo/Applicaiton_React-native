import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Personnage from "../../models/PersonnageController";

export default function ModifCreation(props) {
    console.log(props)
    const id = props.route.params.id;
    const sousraces_id = props.route.params.sousraces_id;
    const sousclasses_id = props.route.params.sousclasses_id;
    const origines_id = props.route.params.origines_id;
    const [nom, setNom] = useState("");
    const handleNomChange = (value) => setNom(value);


    const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
    useEffect(() => {
        PersoUser(url);
    }, [id]);


    function PersoUser(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON)
                setNom(dataJSON.nom)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = async () => {
        const accessToken = await AsyncStorage.getItem('userToken');
        if (nom !== '') {
            const persoData = {
                sousraces_id: sousraces_id,
                origines_id: origines_id,
                sousclasses_id: sousclasses_id,
                nom: nom
            };
            console.log(persoData)
            const url = `https://zabalo.alwaysdata.net/sae401/api/personnages/${id}`;
            modifPerso(url, persoData, accessToken);
        } else {
            Alert.alert("Veuillez entrer un nom pour le personnage.");
        }
    };

    const modifPerso = (url, persoData, accessToken) => {
        console.log(url, persoData, accessToken)
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(persoData)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
                props.navigation.navigate("Profil")
            })
            .catch((error) => {
                console.error(error);
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
                title="Modifier mon personnage"
                onPress={handleSubmit}
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
