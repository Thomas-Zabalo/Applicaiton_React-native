// App.js
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Page liée à la page d'acceuil (liste personnage + detail personnage)
import HomeScreen from '../Screens/HomeScreen/Home';
import ListePersonnage from '../Screens/HomeScreen/Liste';
import Detail from '../Screens/HomeScreen/Detail';
import ListeHome from '../components/ListeHome';

//Accès profil et personnage de l'utilisateur
import Profil from '../Screens/ProfilScreen/Profil';
import PersoUser from '../Screens/ProfilScreen/PersoUser';
import DetailPerso from '../Screens/ProfilScreen/DetailPerso';


//Création d'un personnage
import ModifRace from '../Screens/ModifiScreen/ModifRace';
import ModifSousRace from '../Screens/ModifiScreen/ModifSousRace';
import ModifClasses from '../Screens/ModifiScreen/ModifClasse';
import ModifSousClasses from '../Screens/ModifiScreen/ModifSousClasse';
import ModifOrigines from '../Screens/ModifiScreen/ModifOrigine';
import ModifCreation from '../Screens/ModifiScreen/ModifCreation';

//Création d'un personnage
import Race from '../Screens/CreationScreen/Race';
import SousRace from '../Screens/CreationScreen/SousRace';
import Classes from '../Screens/CreationScreen/Classe';
import SousClasses from '../Screens/CreationScreen/SousClasse';
import Origines from '../Screens/CreationScreen/Origine';
import Creation from '../Screens/CreationScreen/Creation';

//Connexion et Incription
import LoginScreen from '../Screens/LoginScreen/Login';
import SignUp from '../Screens/LoginScreen/SignUp';
import { useAuth } from '../LocalStorage/AuthContext';



function AccueilScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Liste des personnage" component={ListePersonnage} />
      <Stack.Screen name="Détail du personnage" component={Detail} />
      <Stack.Screen name="ListeHome" component={ListeHome} />
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

function PersonnageScreen({ navigation }) {
  const { userToken } = useAuth();
  const Stack = createStackNavigator();

  useEffect(() => {
    if (!userToken) {
      navigation.navigate('Login');
    }
  }, [userToken, navigation]);

  return (
    <Stack.Navigator initialRouteName='Race'>
      {userToken ? (
        <>
          <Stack.Screen name="Race" component={Race} options={{ headerShown: false }} />
          <Stack.Screen name="SousRace" component={SousRace} />
          <Stack.Screen name="Classe" component={Classes} />
          <Stack.Screen name="SousClasse" component={SousClasses} />
          <Stack.Screen name="Origine" component={Origines} />
          <Stack.Screen name="Creation" component={Creation} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}


function ProfilScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Profil '>
      <Stack.Screen name="Profil " component={Profil} options={{ headerShown: false }} />
      <Stack.Screen name="Mes personnages" component={PersoUser} />
      <Stack.Screen name="Detail de mon personnage" component={DetailPerso} />
      {/*/Modification de son personnage */}
      <Stack.Screen name="Race" component={ModifRace} />
      <Stack.Screen name="SousRace" component={ModifSousRace} />
      <Stack.Screen name="Classe" component={ModifClasses} />
      <Stack.Screen name="SousClasse" component={ModifSousClasses} />
      <Stack.Screen name="Origine" component={ModifOrigines} />
      <Stack.Screen name="Creation" component={ModifCreation} />
    </Stack.Navigator>
  )
}

export default function Nav() {
  const Tab = createMaterialBottomTabNavigator();

  // Fonction pour récupérer des données
  const retrieveData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('@UserData:accessToken');
      const user_id = await AsyncStorage.getItem('@UserData:user_id');
      if (accessToken !== null && user_id !== null) {
        console.log(accessToken, user_id);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
  // Appel de la fonction storeData lors de l'exécution de l'application
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Tab.Navigator
        initialRouteName="Accueil"
        shifting={true}
        barStyle={{ backgroundColor: '#141218' }}
        activeColor="#B561EB"
        inactiveColor="gray"
      >
        <Tab.Screen
          name="Accueil"
          component={AccueilScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Création"
          component={PersonnageScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="create" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141218',
    color: "#fff",
    paddingTop: 20,
  },
});
