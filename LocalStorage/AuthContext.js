import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userAdmin, setUserAdmin] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const userData = await AsyncStorage.getItem('userData');
                const admin = await AsyncStorage.getItem('userAdmin');
                
                setUserToken(token);
                setUserData(userData ? JSON.parse(userData) : null);
                setUserAdmin(admin);
            } catch (error) {
                console.error('Error loading authentication data:', error);
            }
        };

        loadData();
    }, []);

    const login = async (token, userData, admin) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('userAdmin', admin.toString());
            
            setUserToken(token);
            setUserData(userData);
            setUserAdmin(admin.toString());
        } catch (error) {
            console.error('Error saving authentication data:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userAdmin');
            
            setUserToken(null);
            setUserData(null);
            setUserAdmin(null);
        } catch (error) {
            console.error('Error removing authentication data:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, userData, userAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
