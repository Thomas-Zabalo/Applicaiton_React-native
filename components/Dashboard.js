import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

export default function Dashboard() {
    const { authUser,
        setAuthUser,
        isLogIn,
        setIsLogin } = useAuth()

    const LogIn = (e) => {
        e.preventDefault()
        setIsLogin(true)
        setAuthUser({
            Name: 'Flo'
        })
    }
    const LogOut = (e) => {
        e.preventDefault()
        setIsLogin(false)
        setAuthUser(null)
    }

    return (
        <View>
            <Text>User is currently: {isLogIn ? 'Logged In' : 'Logged Out'} </Text>
            {isLogIn ? (<Text>User name: {authUser.Name} </Text>) : null}
            {isLogIn ?
                <Button onClick={(e) => { LogIn(e) }}>Log In</Button> :
                <Button onClick={(e) => { LogOut(e) }}>Log Out</Button>}
        </View>
    )
}

const styles = StyleSheet.create({})