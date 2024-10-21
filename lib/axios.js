import axios from 'axios';
import { IP_BACKEND } from '../config';
const api = axios.create({
    baseURL:IP_BACKEND
})

export async function signIn(usernameOrEmail, password){
    try {
        console.log(`Trying to signIn with username: ${usernameOrEmail} and password: ${password}`);

        const signInData = {
            usernameOrEmail: usernameOrEmail,
            password: password
        };

        const userAuth = await api.post(`/auth/signin`, signInData,{
            header:{
                Authorization: 'none',
            },
        });
        if(!(userAuth.status == 200)) throw Error;
        
        return userAuth.data
    } catch (error){
        throw new Error(error)
    }
}

export async function signUp(username, email , password){
    try {
        console.log(`Trying to signUp with email: ${email}, username: ${username} and password: ${password}`);

        const signUpData = {
            email:email,
            username: username,
            password: password
        };

        const userAuth = await api.post(`/auth/signup`, signUpData,{
            header:{
                Authorization: 'none',
            },
        });
        if(!(userAuth.status == 201)) throw Error;
        
        return userAuth.data
    } catch (error){
        throw new Error(error)
    }
}
