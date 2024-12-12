import { Text, View , Image, StyleSheet} from 'react-native'
import React, { useState, useEffect} from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { TouchableOpacity } from 'react-native'
import { Link, useFocusEffect, useRouter} from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'
import { getIdFromJwt } from '../lib/axios'
import Redirect from '../lib/redirect'


const index = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    useFocusEffect(() => {
        try{
            const getId = async () => {
                
                const id = await getIdFromJwt()
                if(!id){
                    console.log("no jwt")
                    return null
                }
                router.push(`/${id}/profile`)
                
            }
            getId()
            
        }catch(error){
            console.log(error)
        }
    })
    return (
        <View className={`flex-1  items-center`} style={{backgroundColor:colors.background}} >
                    <Image className="m-28" style={styles.image} source={require('../assets/images/plants.png')} />
            <Text className={`text-5xl font-bold tracking-[4px] text-center uppercase `} style={{color:colors.green}} > Plantify 🌿 </Text>
            <Text className={"mb-16 text-m font-serif"} style={{color:colors.green}}>  Parce qu'une plante morte, ça décore moins! </Text>
            <View className="flex-row justify-evenly w-4/5 px-5">
            <TouchableOpacity className={`rounded-xl p-5`} style={{backgroundColor:colors.green}} onPress={() => { router.push("./auth/signin")}}>
                <Text className={`text-4xl`} style={{color:colors.lightText}} >Sign-in</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`rounded-xl p-5`} style={{backgroundColor:colors.green}} onPress={() => { router.push("./auth/signup")}}>
                <Text className={`text-4xl`} style={{color:colors.lightText}} >Sign-Up</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

      image: {
      height:400,
      width: 400, 
      resizeMode: 'contain'
    }
});


export default index