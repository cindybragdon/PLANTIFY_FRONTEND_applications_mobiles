import {Text, View, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform, StyleSheet, Image} from 'react-native'
import React, {useState} from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import { TouchableOpacity } from 'react-native'
import { useRouter, Link} from 'expo-router'
import { setToken, signUp } from '../../lib/axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const SignUp = () => { 
  
  const router = useRouter()
  const { theme } = useTheme()
  const [alertUsername, setAlertUsername] = useState(false)
  const [alertEmail, setAlertEmail] = useState(false)
  const [alertMDP, setAlertMDP] = useState(false)
  const [msgErreur, setMsgErreur] = useState("")
  const [loading, setLoading] = useState(false)
  const colors = colorsPalette[theme]
  

  const [form, setForm] = useState({username:"",email:"",password:""})
  
  const submit = async () => {

    if(form.username == "" || form.password == "" || form.email == ""){
      if(form.username == ""){
          setAlertUsername(true)
      }
      else{
        setAlertUsername(false)
      }
      if(form.password == ""){
        setAlertMDP(true)
      }
      else{
        setAlertMDP(false)
      }
      if(form.email == ""){
        setAlertEmail(true)
      }
      else{
        setAlertEmail(false)
      }
      return null
    } 

    console.log(`Trying to SignUp with username : ${form.username}, email : ${form.email} and password : ${form.password}`)

    try{
        setLoading(true)
        const result = await signUp(form.username, form.email ,form.password)
        
        setLoading(false)
        setForm({username:"", email:"", password:""})
        router.push(`../${result.id}/profile`)

    } catch(error){
        setLoading(false)
        console.log(error)
        if(error.message.includes("Request failed with status code 409")){
          
          setMsgErreur("Email et/ou Identifiant déjà utilisé")
        }
        else{
          setMsgErreur("Désolé : Il y a un problème de notre côté, veuillez réessayer plus tard.")
        }
        console.log("Error : ",error)
    }

  }   
  return (

    <KeyboardAvoidingView 
          className="flex-1 items-center"
          style={{backgroundColor:colors.background}}

          keyboardVerticalOffset={0}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <SafeAreaView 
          className="flex-1 items-center"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-6xl font-bold tracking-[4px] text-center uppercase pt-24 pb-8" style={{color:colors.green}}>Plantify</Text>
              <Image className="h-[200] w-[200] mb-[8]" style={styles.image} source={require('../../assets/images/rubberplant.png')} />

              <View className="flex-1 justify-center items-center gap-8" >
              <Text className={"mb-16 text-3xl"} style={{color:colors.green}}>  Créez votre compte </Text>
                {loading ? <ActivityIndicator size="large" color={colors.green} /> : null}

                {!msgErreur == "" ? 
                <View
                  className="items-center justify-center py-5 rounded-lg border-2" style={[{width:WIDTH_BTN,color:colors.green,backgroundColor:colors.lightAlert,borderColor:colors.alert} ]}
                >
                  <Text style={{color:colors.alert}}>{msgErreur}</Text> 
                </View>
                : null
              }
                <View>
                  <View className="flex-row items-center" >
                    <TextInput
                      className="justify-center py-5 rounded-lg text-center focus:border-2" 
                      style={[{width:WIDTH_BTN, color:colors.text, backgroundColor:colors.green, borderColor:colors.primary},alertEmail ? {paddingRight:56,borderWidth:2,borderColor:colors.alert} : {}]}
                      onChangeText={(item) => {setForm({...form,email : item})}}
                      placeholder="Entrez votre courriel"
                      placeholderTextColor={colors.textgreen}
                      value={form.email}
                      />
                    {alertEmail ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                  </View>
                  {alertEmail ? <Text style={{color:colors.alert, paddingTop:5}}>Courriel : Ce champs doit être rempli</Text> : null}
                </View>
                <View>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                    <TextInput
                      className="justify-center py-5 rounded-lg text-center focus:border-2" 
                      style={[{width:WIDTH_BTN,color:colors.text, backgroundColor:colors.green, borderColor:colors.primary},alertUsername ? {paddingRight:56,borderWidth:2,borderColor:colors.alert} : {}]}
                      onChangeText={(item) => {setForm({...form,username : item})}}
                      placeholder="Entrez l'identifiant"
                      placeholderTextColor={colors.textgreen}
                      value={form.username}
                      />
                    {alertUsername ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                  </View>

                  
                  {alertUsername ? <Text style={{color:colors.alert, paddingTop:5}}>Identifiant : Ce champs doit être rempli</Text> : null}
                </View>
                <View className="">
                  <View className="m-3 z-0 flex-row items-center">

                    <TextInput
                        className="justify-center py-5 rounded-lg text-center focus:border-2" 
                        style={[{width:WIDTH_BTN, color:colors.text, backgroundColor:colors.green, borderColor:colors.primary},alertMDP ? {paddingRight:56,borderWidth:2,borderColor:colors.alert} : {}]}
                        onChangeText={(item) => {setForm({...form,password : item})}}
                        placeholder='Entrez le mot de passe'
                        placeholderTextColor={colors.textgreen}
                        value={form.password}
                        />
                    {alertMDP ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                  </View>
                
                  {alertMDP? <Text style={{color:colors.alert, paddingTop:5}}>Mot de passe : Ce champs doit être rempli</Text> : null}

                </View>
                <TouchableOpacity className="py-4 rounded-xl px-3" style={[{width:WIDTH_BTN,color:colors.text, backgroundColor:colors.primary}]} onPress={submit}>
                    <Text className="text-center font-medium text-2xl"  style={{color:colors.green}}>Créez le compte</Text>
                </TouchableOpacity>
                <View className="border-b border-gray-300 my-2.5 w-3/4" />
                <Text class="text-3xl font-bold underline" style={{color:colors.text}}>Si vous avez déja un compte, <Link style={{color:colors.mediumgreen}} href="./signin">Sign-in</Link></Text>

                
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
      height: 100,  
      width: 400,   
      resizeMode: 'contain',
  },
});

export default SignUp


