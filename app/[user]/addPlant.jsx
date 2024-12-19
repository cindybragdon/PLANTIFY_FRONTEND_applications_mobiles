import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../../assets/colorsPalette'
import { getIdFromJwt } from '../../lib/axios'


const addPlant = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    return (
      
        <View className={`flex-1  justify-center`} style={{ backgroundColor: colors.background }}>

            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}> Ajouter une plante </Text>
            <View className="items-center">
            <Image className="h-[200] w-[200] mb-[28] mt-[24] rounded-full" style={styles.image} source={require('../../assets/images/succulent.png')} />
            </View>
            <View className="p-12">
            {/* <TouchableOpacity 
              onPress={() => {refresh.current = true;router.push("../camera")} }
              className="rounded-full " 
              
              style={isEditing ? {borderWidth:4, borderColor:colors.lightAlert} : {}}
            >
              
                <Image 
                  className="w-40 h-40  rounded-full" 
                  source={{uri:profilePic}} /> 
                :
                <View className="w-40 h-40 rounded-full bg-gray-400 justify-center items-center mb-10">
                  <Text className=" text-white font-bold">
                    No profile picture
                  </Text>
                </View>
            </TouchableOpacity> */}
            </View>
            <View className="items-center">
            <TouchableOpacity className={`rounded-[12] py-[12] px-[24] `} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./auth/") }}>
                  <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>Ajouter</Text>
            </TouchableOpacity>
            </View>
        </View>
  
    )

}

const styles = StyleSheet.create({
    image: {
        height: 100,  
        width: 100,   
        resizeMode: 'contain',
        
    },
});

export default addPlant;