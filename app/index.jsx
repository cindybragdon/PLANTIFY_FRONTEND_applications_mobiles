import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'
import { getIdFromJwt } from '../lib/axios'
import Redirect from '../lib/redirect'


const index = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    useFocusEffect(() => {
        try {
            const getId = async () => {
                const id = await getIdFromJwt()
                if (!id) {
                    console.log("no jwt")
                    return null
                }
                router.push(`/${id}/profile`)
            }
            getId()
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <View className={`flex-1 items-center justify-center`} style={{ backgroundColor: colors.background }}>
            <Image className="h-[200] w-[200] mb-[56]" style={styles.image} source={require('../assets/images/plants.png')} />
            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px] mb-[16]`} style={{ color: colors.green }}>Plantify 🌿</Text>
            <Text className={`text-m font-serif mb-[32]`} style={{ color: colors.green }}>Parce qu'une plante morte, ça décore moins!</Text>
            <View className="flex-row justify-evenly w-[80%] px-[20]">
                <TouchableOpacity className={`rounded-[12] py-[12] px-[24]`} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/signin") }}>
                    <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>Sign-in</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`rounded-[12] py-[12] px-[24]`} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/signup") }}>
                    <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>Sign-Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 400,  
        width: 400,   
        resizeMode: 'contain',
    },
});


export default index
