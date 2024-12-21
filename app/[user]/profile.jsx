import { Image, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import OverlayMessage from '../../components/OverlayMessage';
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { colorsPalette } from '../../assets/colorsPalette';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fetchProfileData, setToken, updateProfileData, deleteUserById, getToken, getIdFromJwt, getUser } from '../../lib/axios';
import { useGlobalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Circle } from 'react-native-maps';


const WIDTH = Dimensions.get('window').width;

const profile = () => {
  const { theme } = useTheme();
  const colors = colorsPalette[theme];
  const router = useRouter();
  const refresh = useRef(false);
  const markerImage = require("../../assets/images/profile/logoMV.png");

  const [username, setUsername] = useState("Default");
  const [email, setEmail] = useState('Default@abc.ca');
  const [profilePic, setProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  useEffect(() => {
    // Fetch profile data

      const loadData = async () => {
        try{

          const profileData = await getUser();
          console.log(profileData);
          if(!profileData) throw new Error('Failed fetching data -> no Data')
            console.log(profileData)
          setUsername(profileData.username);
          setEmail(profileData.email);

          const photo = await AsyncStorage.getItem('photo');
          if(photo){
            // setProfilePic(profileData.profilePic);
            setProfilePic(photo)
          
          }
        }catch(error){
          console.log('Profile : Failed Loading profileData : ', error)
          router.push("/auth/signin")
        }
      };
      loadData();
    
  }, []);

  const logOut = () => {
    setToken('');
    router.push('/');
  };

  const supprimerUser = async () => {
    try {
      const profileData = await getUser();
      await deleteUserById(profileData.userId);
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="w-full" style={{ flex: 1 }}>
        <View className="justify-center items-center py-5">
          <TouchableOpacity
            onPress={() => { refresh.current = true; router.push("../camera"); }}
            className="rounded-full"
            disabled={!isEditing}
            style={isEditing ? { borderWidth: 4, borderColor: colors.lightAlert } : {}}
          >
            {profilePic !== "" ?
              <Image
                className="w-40 h-40 rounded-full"
                source={{ uri: profilePic }}
              />
              :
              <View className="w-40 h-40 rounded-full bg-gray-400 justify-center items-center mb-10">
                <Text className="text-white font-bold">
                  No profile picture
                </Text>
              </View>
            }
          </TouchableOpacity>
          <View className="mt-10">
            {!isEditing ?
              <Text className="text-4xl font-medium px-16" style={{ color: colors.primary }}>{username}</Text>
              :
              <TextInput
                className="justify-center text-center text-4xl font-medium px-16"
                style={[{ color: colors.primary, backgroundColor: colors.background_c1 }]}
                onChangeText={(item) => { setUsername(item); }}
                placeholder="Entrez l'identifiant"
                placeholderTextColor={colors.secondary}
                value={username}
              />
            }
          </View>
        </View>

        <View className="w-full h-40 border mt-10">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 45.61828,
              longitude: -73.60657,
              latitudeDelta: 0.15,
              longitudeDelta: 0.07,
            }}
          >
            <Marker
              coordinate={{ latitude: 45.61828, longitude: -73.60657 }}
            >
              <Image
                className="rounded-full border-2 border-green-700"
                source={markerImage}
              />
            </Marker>
            <Circle
              center={{ latitude: 45.61828, longitude: -73.60657 }}
              radius={5000}
            />
          </MapView>
        </View>

        <View className="w-full items-center">
          <View className="flex-row justify-center items-center py-10 gap-5">
            <TouchableOpacity onPress={logOut} className={`rounded-[12] py-[12] px-[24]`}
                    style={{ backgroundColor: colors.green }}>
              <Text className="pr-1" style={{ color: colors.lightText }}>Déconnexion</Text>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsEditing((prev) => { return !prev; }); }} className={`rounded-[12] py-[12] px-[24]`}
                    style={{ backgroundColor: colors.green }}>
              <Text className="pr-1" style={{ color: colors.lightText }}>Modifier</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <View>
        <TouchableOpacity
  onPress={supprimerUser}
  className={`rounded-[12] py-[12]`}
  style={{
    backgroundColor: colors.alert,
    width: '33%', 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
  }}
>
  <Text style={{ color: colors.lightText, textAlign: 'center', fontSize: 16 }}>
    Supprimer 
    <Icon name="trash-alt" size={20} color={colors.lightText} />
  </Text>
</TouchableOpacity>
          </View>

      </View>
      <OverlayMessage
        message={isEditSuccess ? "Changes saved successfully!" : "Error changes did not save"}
        styles={isEditSuccess ? { backgroundColor: "#bbf7d0", borderColor: "#22c55e" } : { backgroundColor: "#fecaca", borderColor: "#dc2626" }}
        visible={messageVisible}
        onDismiss={() => { setMessageVisible(false); }}
      />
    </View>
  );
};

export default profile;
