
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../../assets/colorsPalette'
import { getIdFromJwt } from '../../lib/axios'

const collection = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    return (
        <View className={`flex-1 items-center justify-center`} style={{ backgroundColor: colors.background }}>
            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}>MA COLLECTION</Text>
            <Text className={`text-m font-serif mb-[34]`} style={{ color: colors.green }}>50 shades of green</Text>

            <View className="flex justify-evenly w-[80%] px-[20]">
                <TouchableOpacity className={`rounded-[12] py-[12] px-[24] mb-[12]`} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/") }}>
                    <Text className={`text-lg text-center`} style={{ color: colors.lightText }}>Ajouter une plante</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`rounded-[12] py-[12] px-[24] mb-[12]`} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/") }}>
                    <Text className={`text-lg text-center`} style={{ color: colors.lightText }}>Catalogue de plante</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

export default collection;