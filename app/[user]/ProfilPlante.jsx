import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../../assets/colorsPalette'
import { getIdFromJwt } from '../../lib/axios'


const profilPlante = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    return (
      
        <View className={`flex-1  justify-center`} style={{ backgroundColor: colors.background }}>

            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}> CLAUDETTE 🪴</Text>
            <View className="items-center">
            <Image className="h-[200] w-[200] mb-[28] mt-[24] rounded-full" style={styles.image} source={require('../../assets/images/plants.png')} />
            </View>
            <View className="p-12">
            <Text className={`text-lg font-serif mb-[16] text-left`} style={{ color: colors.green }}> Surnom : </Text>
            <Text className={`text-lg font-serif mb-[16] text-left`} style={{ color: colors.green }}> Type : </Text>
            <Text className={`text-lg font-serif mb-[16] text-left`} style={{ color: colors.green }}> Fréquence d'arrosage : </Text>
            <Text className={`text-lg font-serif mb-[16] text-left`} style={{ color: colors.green }}> Âge : </Text>
            <Text className={`text-lg font-serif mb-[16] text-left`} style={{ color: colors.green }}> Location : </Text>
            </View>
            <View className="items-center">
            <TouchableOpacity className={`rounded-[12] py-[12] px-[24] `} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/") }}>
                  <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>Modifier les infos</Text>
            </TouchableOpacity>
            </View>
        </View>
  
    )

}

const styles = StyleSheet.create({
    image: {
        height: 200,  
        width: 200,   
        resizeMode: 'contain',
        
    },
});

export default profilPlante;