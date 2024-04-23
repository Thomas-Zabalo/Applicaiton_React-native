import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Nav from "./components/Nav";
import { AuthProvider } from './LocalStorage/AuthContext';

export default function App(){
  return(
    <AuthProvider>
    <Nav/>
    </AuthProvider>
    )
}