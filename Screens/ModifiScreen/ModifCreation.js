import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                onChangeText={setNom}
                value={nom}
                placeholder="Nom du personnage"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Modifier mon personnage</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#141218",
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: '#D0BCFF',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
        fontSize: 18,
        color: "white",
        backgroundColor: '#282c34',
    },
    button: {
        backgroundColor: '#D0BCFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
});

