import { Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { colorsPalette } from '../../assets/colorsPalette';
import { getUser, fetchPlantsUser } from '../../lib/axios';
import { Animated } from 'react-native';

const Collection = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const colors = colorsPalette[theme];
    const [plants, setPlants] = useState({ myPlants: [] });
    const [refreshing, setRefreshing] = useState(false);
    const animations = useRef([]);

    // Fetch data when the component first loads or refreshes
    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getUser();
            if (currentUser) {
                const plantData = await fetchPlantsUser(currentUser.userId);
                setPlants(plantData); // Set plants after fetching
            }
        };
        fetchData();
    }, []); // Run once when the component mounts

    // Trigger animations after the plants data is updated
    useEffect(() => {
        if (plants.myPlants.length > 0) {
            // Initialize animations if not already done
            animations.current = plants.myPlants.map(() => new Animated.Value(0));

            // Trigger animations with a delay for each item
            animations.current.forEach((anim, index) => {
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 500,
                    delay: index * 100, // Stagger animations
                    useNativeDriver: true,
                }).start();
            });
        }
    }, [plants.myPlans]); // Re-run when plants data is updated

    // Handle pull-to-refresh to reload the plant data
    const onRefresh = async () => {
        setRefreshing(true);
        const currentUser = await getUser();
        if (currentUser) {
            const plantData = await fetchPlantsUser(currentUser.userId);
            setPlants(plantData); // Refresh the plants data
        }
        setRefreshing(false);
    };

    const renderItem = ({ item, index }) => {
        const animation = animations.current[index]; // Get the animation for the current item

        if (!animation) {
            return null; // If no animation, return null
        }

        const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0], // Animate from 50px to 0px
        });

        return (
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    opacity: animation, // Use the animated value for opacity
                    padding: 20,
                    backgroundColor: colors.cardBackground,
                    marginVertical: 10,
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                }}
            >
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>{item.myplant_name}</Text>
                <Text style={{ color: colors.secondaryText }}>{item.myplant_type}</Text>
                {item.image_myplant && (
                    <Image
                        source={{ uri: item.image_myplant }}
                        style={{ width: 100, height: 100, marginTop: 10 }}
                    />
                )}
            </Animated.View>
        );
    };

    return (
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
            <Text className={`text-5xl uppercase font-bold text-center tracking-[4px]`} style={{ color: colors.green }}>MA COLLECTION</Text>
            <Text className={`text-m font-serif mb-[34]`} style={{ color: colors.green }}>50 shades of green</Text>

            <View className="flex justify-evenly w-[80%] px-[20]">
                <TouchableOpacity
                    className={`rounded-[12] py-[12] px-[24] mb-[12]`}
                    style={{ backgroundColor: colors.green }}
                    onPress={() => { router.push("./[user]/addPlant") }}
                >
                    <Text className={`text-lg text-center`} style={{ color: colors.lightText }}>Ajouter une plante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`rounded-[12] py-[12] px-[24] mb-[12]`}
                    style={{ backgroundColor: colors.green }}
                    onPress={() => { router.push("./[user]/addPlant") }}
                >
                    <Text className={`text-lg text-center`} style={{ color: colors.lightText }}>Catalogue de plante</Text>
                </TouchableOpacity>
            </View>

            {/* Affichage des plantes dans un ScrollView */}
            {plants?.myPlants?.length > 0 ? (
                <ScrollView
                    contentContainerStyle={{ width: '100%', padding: 10 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {plants.myPlants.map((plant, index) => renderItem({ item: plant, index }))}
                </ScrollView>
            ) : (
                <Text style={{ color: colors.secondaryText }}>Aucune plante ajoutée à votre collection.</Text>
            )}
        </View>
    );
};

export default Collection;
