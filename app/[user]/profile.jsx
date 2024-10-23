import { Image, Text, View, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import Icon from 'react-native-vector-icons/FontAwesome5';

const profile = () => {
  const { theme } = useTheme()
  const colors = colorsPalette[theme]
  const username = "Maximus"
  const [email,setEmail] = useState('maximus@gmail.com')
  const [isEditing,setIsEditing] = useState(false)
  const [colorIcon, setColorIcon] = useState(colors.primary)
  useEffect(()=>{
    if(isEditing){
      setColorIcon(colors.alert)
    }
    else{
      setColorIcon(colors.primary)
    }
  },[isEditing])
  return (
    <ScrollView style={{backgroundColor:colors.background_c1}}>
      <View className="flex-1" >
        <View className="justify-center items-center py-5">
          <Image 
              className="w-40 h-40  rounded-full" 
              source={require("../../assets/chiot1.jpg")} />
          <View className="">
            <Text className="text-4xl font-medium px-16" style={{color:colors.primary}}>{username}</Text>
            <TouchableOpacity onPress={()=>{setIsEditing((prev)=>{return !prev})}} className="absolute right-0 ">
              <Icon  name="edit" size={30} color={colorIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center">
          <View className="items-center border rounded-md w-2/4" >
            <Text className="absolute -top-2.5 left-3 px-1" style={{backgroundColor:colors.background_c1}}>email</Text>
            {!isEditing ?
            
            <Text className="py-3 px-2">{email}</Text>
            :
            <TextInput
              className="justify-center py-5 rounded-lg text-center focus:border-2" 
              style={[{color:colors.text, backgroundColor:colors.background, borderColor:colors.primary}]}
              onChangeText={(item) => {setEmail(item)}}
              placeholder="Entrez l'identifiant"
              placeholderTextColor={colors.secondary}
              value={email}
            />
          }
          </View>
        </View>
      </View>
    </ScrollView>
    )
  }
  
  export default profile
  
