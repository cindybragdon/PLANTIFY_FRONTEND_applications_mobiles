import { Text, View, Image, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect , useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../../assets/colorsPalette'
import { getIdFromJwt, waterPlant  } from '../../lib/axios'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

//Animation Olivier https://www.npmjs.com/package/react-native-countdown-circle-timer

const profilPlante = ({ plant }) => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]
    const refresh = useRef(false)
    //const [isWatered, setIsWatered] = useState(false);
    const [key, setKey] = useState(0);

    const handleWatering = async () => {
      try {
          await waterPlant(plant.id, plant.watering_interval);
          setIsWatered(true);
          setKey((prevKey) => prevKey + 1); 
      } catch (error) {
          console.error('Error watering plant:', error);
      }
  };

    return (
      
        <View className={`flex-1  justify-center`} style={{ backgroundColor: colors.background }}>

            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}> CLAUDETTE 🪴</Text>
            <View className="items-center">
            </View>
            <View className="p-12">
            <View className='items-center'>
            <TouchableOpacity 
            >
                <Image 
                  className="w-40 h-40  rounded-full" 
                  source={{}} /> 
                
                <View className="w-40 h-40 rounded-full bg-gray-400 justify-center items-center ">
                  <Text className=" text-white font-bold">
                    No profile picture
                  </Text>
                </View>
            </TouchableOpacity>
            </View>
            
            <View>
            <CountdownCircleTimer
                key={key}
                isPlaying={isWatered}
                duration={plant.watering_interval * 3600} 
                colors={['#4CAF50', '#FF9800', '#F44336']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                    setIsWatered(false);
                    return { shouldRepeat: false };
                }}
            >
                {({ remainingTime }) => (
                    <Text>
                        {Math.floor(remainingTime / 3600)}h {Math.floor((remainingTime % 3600) / 60)}m
                    </Text>
                )}
            </CountdownCircleTimer>
            </View> 
            
            <Button title="Arrosée!" onPress={handleWatering} />
           
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