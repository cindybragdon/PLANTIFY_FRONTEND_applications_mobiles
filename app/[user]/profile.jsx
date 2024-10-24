import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions , Button} from 'react-native'
import OverlayMessage from '../../components/OverlayMessage'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import Icon from 'react-native-vector-icons/FontAwesome5';

const WIDTH = Dimensions.get('window').width

const profile = () => {
  const { theme } = useTheme()
  const colors = colorsPalette[theme]

  //fakeData
  const username = "Maximus"
  const [email,setEmail] = useState('maximus@gmail.com')
  const [profilePic, setProfilePic] = useState(require("../../assets/images/profile/chiot1.jpg"))

  //States
  const [isEditing,setIsEditing] = useState(false)
  const [colorIcon, setColorIcon] = useState(colors.primary)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  //Prevent certain effects on mount
  useEffect(() => {
    setIsMounted(true); // Set to true on mount

    return () => {
      setIsMounted(false); // Clean up on unmount
    };
  }, []);

  //Saves and gives a feedback to user
  const handleSave = () => {
    //TODO

    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000); // Simulating a save delay
  };

  //Handle changes in editing/non-editing mode
  useEffect(()=>{
    if(!isMounted) return
    if(isEditing){
      setColorIcon(colors.alert)
    }
    else{
      setColorIcon(colors.primary)
      handleSave()
    }
  },[isEditing])

  //Should be in a component, but for today will stay here
  //Item in the flat list rendering
  const renderItem = ({item}) =>{
    return (
    <TouchableOpacity onPress={()=>{setProfilePic(item.source)}} className="w-1/2">
      <Image source={item.source} className="rounded-full" style={{width:(WIDTH-90)/2,height:(WIDTH-90)/2}}/>
    </TouchableOpacity>

  )
}
  
  return (
    <>
      <ScrollView style={{backgroundColor:colors.background_c1}}>
        <View className="flex-1" >
          <View className="justify-center items-center py-5">
            <TouchableOpacity 
              onPress={() => setIsModalVisible(true)} 
              className="rounded-full " 
              disabled={!isEditing} 
              style={isEditing ? {borderWidth:4, borderColor:colors.lightAlert} : {}}
            >
              <Image 
                  className="w-40 h-40  rounded-full" 
                  source={profilePic} />
            </TouchableOpacity>
            <View className="">
              <Text className="text-4xl font-medium px-16" style={{color:colors.primary}}>{username}</Text>
              <TouchableOpacity onPress={()=>{setIsEditing((prev)=>{return !prev})}} className="absolute right-0 ">
                <Icon  name="edit" size={30} color={colorIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="items-center">
            <View className="items-center border rounded-md w-2/4" style={{borderColor:isEditing ?  colors.lightAlert :colors.primary}}>
              <Text className="absolute z-10 -top-2.5 left-3 px-1" style={{backgroundColor:colors.background_c1, color:colors.text}}>email</Text>
              {!isEditing ?
                <Text className="py-3 px-2" style={{color:colors.text}}>{email}</Text>
                :
                <TextInput
                className="justify-center z-0 py-5 rounded-lg text-center w-full" 
                style={[{color:colors.text, backgroundColor:colors.background_c1}]}
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
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        >
        
        <TouchableOpacity 
          style={{backgroundColor: 'rgba(0, 0, 0, 0.25)'}}
          className="flex-1 items-center justify-end   " 
          onPress={() => setIsModalVisible(false)}
        >
          <View className="w-full h-1/3">
            <FlatList data={[{id:1,source:require("../../assets/images/profile/chiot1.jpg")},{id:2,source:require("../../assets/images/profile/chiot4.jpg")}]}
                      renderItem={renderItem}     
                      keyExtractor={item => item.id} 
                      className="flex-row pt-5"
                      horizontal={true}
                      contentContainerStyle={{paddingHorizontal:30, gap:30}}
                      style={{backgroundColor:colors.background}}
                      />
          </View>            
        </TouchableOpacity>
      </Modal>
      <OverlayMessage
        message="Changes saved successfully!"
        visible={messageVisible}
        onDismiss={() => {setMessageVisible(false)}}
      />
     </>
    )
  }
  
  export default profile
  
