import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'
import { getIdFromJwt } from '../lib/axios'
import Animated, { Easing, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const index = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]
  
    const drop_y = useSharedValue(1);
    const dropletOpacity = useSharedValue(1);

    useEffect(() => {
        // drop_y descend jusqu'a 700, dans une duration de 1.5 secondes. 
        // opacity descend jusqu'a 0, dans une duration de 1.5 secondes.
        const waterDropAnimation = () => {
            drop_y.value = withTiming(700, { duration: 1500, easing: Easing.ease });
            dropletOpacity.value = withTiming(0, { duration: 1500, easing: Easing.ease});
            //reset les drops en 1.2 secondes, pour un effet plus smooth. 
            setTimeout(() => {
                drop_y.value = -100;
                dropletOpacity.value = 1;
            }, 1200);
        };

        waterDropAnimation();

        // appel lanimation a tous les 2secondes
        const interval = setInterval(waterDropAnimation, 2000);
        return () => clearInterval(interval);
    }, []);

    const dropletStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: drop_y.value }],
            opacity: dropletOpacity.value,
        };
    });

      

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
            <Image
                className="mb-[56]"
                source={require('../assets/images/plants.png')}
                style={styles.image}
            />
            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px] mb-[2]`} style={{ color: colors.green }}>
                Plantify 🌿
            </Text>
            <Text className={`text-m font-serif mb-[32]`} style={{ color: colors.green }}>
                Parce qu'une plante morte, ça décore moins!
            </Text>

            <Animated.View style={[styles.droplet1, dropletStyle]}>
                <Image source={require('../assets/images/waterdrop.png')} style={styles.dropletImage} />
            </Animated.View>

            <Animated.View style={[styles.droplet, dropletStyle]}>
                <Image source={require('../assets/images/waterdrop.png')} style={styles.dropletImage} />
            </Animated.View>

            <Animated.View style={[styles.droplet2, dropletStyle]}>
                <Image source={require('../assets/images/waterdrop.png')} style={styles.dropletImage} />
            </Animated.View>

            <View className="flex-row justify-evenly w-[80%] px-[2]">
                <TouchableOpacity
                    className={`rounded-[12] py-[12] px-[24]`}
                    style={{ backgroundColor: colors.green }}
                    onPress={() => { router.push("./auth/signin") }}
                >
                    <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>
                        Sign-in
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`rounded-[12] py-[12] px-[24]`}
                    style={{ backgroundColor: colors.green }}
                    onPress={() => { router.push("./auth/signup") }}
                >
                    <Text className={`text-3xl text-center`} style={{ color: colors.lightText }}>
                        Sign-Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
    },
    droplet: {
        position: 'absolute',
        top: 250,
        left: '50%',
        marginLeft: -15,
    },
    droplet1: {
        position: 'absolute',
        top: 200,
        left: '50%',
        marginLeft: 100,
    },
    droplet2: {
        position: 'absolute',
        top: 200,
        left: '50%',
        marginLeft: -150,
    },
    dropletImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    }
});

export default index;


