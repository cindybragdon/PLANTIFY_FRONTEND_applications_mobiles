import { Text, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { TouchableOpacity } from 'react-native'
import { Link, useRouter} from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'
import Redirect from '../lib/redirect'
const index = () => {
    const { theme } = useTheme()
    // const theme="dark"
    const router = useRouter()
    const colors = colorsPalette[theme]
    return <Redirect href="./1/profile" />;


    return (
        <View className={`flex-1 justify-evenly items-center`} style={{backgroundColor:colors.background_c1}} >
            <Text className={`text-6xl font-bold tracking-[2px] text-center uppercase`} style={{color:colors.primary}} >ChatMV</Text>
            <TouchableOpacity className={`rounded p-6`} style={{backgroundColor:colors.primary}} onPress={() => { router.push("./auth/signin")}}>
                <Text className={`text-4xl`} style={{color:colors.lightText}} >Sign-in</Text>
            </TouchableOpacity>
            <Text class="text-3xl font-bold underline" style={{color:colors.text}}>If you don't already have an account <Link style={{color:colors.link}} href="./auth/signup">Sign-up</Link></Text>
        </View>
    )
}


export default index