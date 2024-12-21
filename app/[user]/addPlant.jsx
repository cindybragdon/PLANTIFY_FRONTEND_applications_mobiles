import {Text, View, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../../assets/colorsPalette'
import { getIdFromJwt } from '../../lib/axios'


const  WIDTH_BTN = Dimensions.get('window').width - 56

const addPlant = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]
    const [form, setForm] = useState({name:"",type:"",age:"",location:""})

    

    return (
        <KeyboardAvoidingView 
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-evenly items-center"
        style={[{backgroundColor:colors.background}]}
      >
        
        <View className={`flex-1  justify-center`} style={{ backgroundColor: colors.background }}>

            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}> Ajouter une plante </Text>
            <View className="items-center">
            <Image className="h-[200] w-[200] mb-[28] mt-[24] rounded-full" style={styles.image} source={require('../../assets/images/succulent.png')} />
            </View>
            <View className="p-12">
            <View className="" >
                <TextInput
                    className="justify-center py-5 rounded-lg text-center mb-2"
                    style={[
                    { width: WIDTH_BTN, color: colors.textgreen, backgroundColor: colors.green },
                    {   }
                    ]}
                    onChangeText={(item) => setForm({ ...form, name: item })}
                    placeholder="Entrez le nom de votre plante"  
                    placeholderTextColor={colors.textgreen}
                    value={form.name}
                    />
                    <TextInput
                    className="justify-center py-5 rounded-lg text-center mb-2"
                    style={[
                    { width: WIDTH_BTN, color: colors.textgreen, backgroundColor: colors.green },
                    {   }
                    ]}
                    onChangeText={(item) => setForm({ ...form, type: item })}
                    placeholder="Entrez le type de votre plante"  
                    placeholderTextColor={colors.textgreen}
                    value={form.type}
                    />
                    <TextInput
                    className="justify-center py-5 rounded-lg text-center mb-2"
                    style={[
                    { width: WIDTH_BTN, color: colors.textgreen, backgroundColor: colors.green },
                    {   }
                    ]}
                    onChangeText={(item) => setForm({ ...form, age: item })}
                    placeholder="Entrez l'age de votre plante"  
                    placeholderTextColor={colors.textgreen}
                    value={form.age}
                    />
                    <TextInput
                    className="justify-center py-5 rounded-lg text-center mb-2"
                    style={[
                    { width: WIDTH_BTN, color: colors.textgreen, backgroundColor: colors.green },
                    {   }
                    ]}
                    onChangeText={(item) => setForm({ ...form, location: item })}
                    placeholder="Entrez la location de votre plante"  
                    placeholderTextColor={colors.textgreen}
                    value={form.location}
                    />
                </View>
                </View>
            <View className="items-center">
            <TouchableOpacity className={`rounded-[12] py-[12] px-[24] `} style={{ backgroundColor: colors.green }} onPress={() => { router.push("./[user]/Collection") }}>
                  <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>Ajouter</Text>
            </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
  
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