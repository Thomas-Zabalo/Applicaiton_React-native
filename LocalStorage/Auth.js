// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
        console.log('Token utilisateur stocké avec succès !');
    } catch (error) {
        console.error('Erreur lors du stockage du token utilisateur :', error);
    }
};

export const retrieveToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
            // Le token a été récupéré avec succès
            console.log('Token utilisateur récupéré :', token);
            return token;
        } else {
            // Aucun token n'a été trouvé, l'utilisateur doit se connecter
            console.log('Aucun token utilisateur trouvé.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du token utilisateur :', error);
        return null;
    }
};
