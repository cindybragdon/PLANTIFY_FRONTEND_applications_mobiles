import {Text, View, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform, Image, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import { TouchableOpacity } from 'react-native'
import { Link, useRouter} from 'expo-router'
import { signIn } from '../../lib/axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context'


const  WIDTH_BTN = Dimensions.get('window').width - 56

const signin = () => { 
  
  const router = useRouter()
  const { theme } = useTheme()
  const [alertIdentifier, setAlertIdentifier] = useState(false)
  const [alertMDP, setAlertMDP] = useState(false)
  const [msgErreur, setMsgErreur] = useState("")
  const [loading, setLoading] = useState(false)
  const colors = colorsPalette[theme]
  

  const [form, setForm] = useState({usernameOrEmail:"jenna",password:"abc123"})
  
  const submit = async () => {

    if(form.usernameOrEmail == "" || form.password == ""){
      if(form.usernameOrEmail == ""){
          setAlertIdentifier(true)
          if(form.password == ""){
            setAlertMDP(true)
          }
          else{
            setAlertMDP(false)
          }
      }
      else{
        setAlertIdentifier(false)
        setAlertMDP(true)
      }
      return null
    }

    console.log(`Trying to signIn with usernameOrEmail : ${form.usernameOrEmail} and password : ${form.password}`)

    try{
        setLoading(true)
        const result = await signIn(form.usernameOrEmail,form.password)
        setLoading(false)
        setForm({usernameOrEmail:"",password:""})
        router.push(`../${result.id}/profile`)

    } catch(error){
        setLoading(false)
        if(error.message == "AxiosError: Request failed with status code 401"){
          setMsgErreur("Identifiant ou mot de passe incorrect")
        }
        else{
          setMsgErreur("Désolé : Il y a un problème de notre côté, veuillez réessayer plus tard.")
        }
        console.log("Error : ",error.message)
    }

  }   
  return (
    <KeyboardAvoidingView 
            keyboardVerticalOffset={0}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 justify-evenly items-center"
            style={[{backgroundColor:colors.background}]}
          >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-7xl font-bold tracking-[2px] text-center uppercase pt-24 pb-2" style={{color:colors.green}}>Plantify</Text>
              <Image className="mb-[56]" style={styles.image} source={require('../../assets/images/alocasia.png')} />

              <View className="flex-1 justify-center items-center gap-8" >
                <Text className="text-4xl font-semibold pb-2" style={{color:colors.green}}>Connectez-vous</Text>
                {loading ? <ActivityIndicator size="large" color={colors.green} /> : null}
                
                {!msgErreur == "" ? 
                <View
                  className="items-center justify-center py-5 rounded-lg border-2" style={[{width:WIDTH_BTN,color:colors.text,backgroundColor:colors.lightAlert,borderColor:colors.alert} ]}
                >
                  <Text className="text-md" style={{color:colors.alert}}>{msgErreur}</Text> 
                </View>
                : null
                }
                
                <View>
                  <View className="flex-row items-center">
                    <TextInput
                      className="justify-center py-5 rounded-lg text-center" 
                      style={[{color:colors.textgreen,backgroundColor:colors.green, width:WIDTH_BTN},alertIdentifier ? {paddingRight:56,borderWidth:2,borderColor:colors.alert} : {}]}
                      onChangeText={(item) => {setForm({...form,usernameOrEmail : item})}}
                      placeholder="Entrez l'email"
                      placeholderTextColor={colors.textgreen}
                      value={form.usernameOrEmail}
                      />
                    {alertIdentifier ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                  </View>
                  
                  <View className="justify-end items-center"  style={{width:WIDTH_BTN}} >
                      <Link href="./recovery">
                          <Text style={{color:colors.mediumgreen}}>Email oublié?</Text>
                      </Link>
                  </View>
                  {alertIdentifier ? <Text className="pt-1" style={{color:colors.alert}}>Email : Ce champs doit être rempli</Text> : null}
                </View>
                <View>
                  <View className="flex-row items-center" >
                    <TextInput
                        className="justify-center py-5 rounded-lg text-center" 
                        style={[{width:WIDTH_BTN,color:colors.textgreen,backgroundColor:colors.green},alertMDP ? {paddingRight:56,borderWidth:2,borderColor:colors.alert} : {}]}
                        onChangeText={(item) => {setForm({...form,password : item})}}
                        placeholder='Entrez le mot de passe'
                        placeholderTextColor={colors.textgreen}
                        value={form.password}
                      />
                    {alertMDP ? <Icon name="exclamation-triangle" size={30} color={colors.alert} style={{ position: 'absolute',right: 15, }}/>: null}
                  </View>
                  <View className="justify-start items-center"  style={{width:WIDTH_BTN}} >
                    <Link href="./recovery">
                        <Text style={{color:colors.mediumgreen}}>Mot de passe oublié?</Text>
                    </Link>
                  </View>
                  {alertMDP? <Text className="pt-1" style={{color:colors.alert}}>Mot de passe : Ce champs doit être rempli</Text> : null}
                
                </View>
                <View className="pt-4">
                  <TouchableOpacity className="py-4 rounded-xl px-7" style={[{width:WIDTH_BTN,color:colors.text,backgroundColor:colors.green}]} onPress={submit}>
                      <Text className="text-center font-medium text-2xl" style={[{color:colors.textgreen}]}>Se connecter</Text>
                  </TouchableOpacity>
                <View className="" />
                </View>
                <Text class="text-3xl font-bold underline" style={{color:colors.text}}>Si vous n'avez pas de compte, <Link style={{color:colors.mediumgreen}} href="./signup">Sign-up</Link></Text>
                
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

export default signin;