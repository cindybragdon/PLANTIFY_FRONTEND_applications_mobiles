import axios from 'axios';
import { IP_BACKEND } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création d'une instance Axios avec une URL de base
export const api = axios.create({
    baseURL: IP_BACKEND
});

// Fonction pour enregistrer le JWT dans AsyncStorage
export async function setToken(token) {
    try {
        if (token) {
            await AsyncStorage.setItem('jwt', token);
        } else {
            throw new Error('Impossible de définir un token null ou undefined');
        }
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du token :', error);
    }
}

// Fonction pour récupérer le JWT depuis AsyncStorage
export async function getToken() {
    try {
        return await AsyncStorage.getItem('jwt');
    } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
        return null;
    }
}



// Fonction pour enregistrer le JWT dans AsyncStorage
export async function setUser(user) {
    try {
        if (user) {
            userString = JSON.stringify(user)
            await AsyncStorage.setItem('user', userString);
        } else {
            throw new Error('Impossible de définir un user null ou undefined');
        }
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du user :', error);
    }
}

// Fonction pour récupérer le JWT depuis AsyncStorage
export async function getUser() {
    try {
        user = await AsyncStorage.getItem('user');
        return JSON.parse(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du user :', error);
        return null;
    }
}

// Ajouter un intercepteur pour inclure automatiquement le JWT dans les en-têtes des requêtes
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Token utilisé pour la requête axios ligne 67 :', token);
        return config;
    },
    (error) => Promise.reject(error)
);

// Fonction pour se connecter
export async function signIn(email, password) {
    try {
        const signInData = { email, password };
        const userAuth = await api.post(`/user/login`, signInData);

        if (userAuth.status !== 200) throw new Error('Échec de la connexion');
        await setToken(userAuth.data.token);
        console.log("valeur du token axios ligne 81 :", userAuth.data.token )
        await setUser(userAuth.data.user);
        return userAuth.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw new Error(error.message);
    }
}

// Fonction pour créer un compte
export async function signUp(username, email, password) {
    try {
        const signUpData = { username, email, password };
        const userAuth = await api.post(`/user`, signUpData);

        if (userAuth.status !== 201) throw new Error('Échec de l\'inscription');
        await setToken(userAuth.data.token);
        await setUser(userAuth.data.user);
        return userAuth.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        throw new Error(error.message);
    }
}

// Fonction pour récupérer les données du profil d'un utilisateur
export async function fetchProfileData(id) {
    try {
        const profileData = await api.get(`/user/${id}`);
        if (profileData.status !== 200) throw new Error('Impossible de récupérer le profil');
        return profileData.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du profil :', error);
        throw new Error(error.message);
    }
}

// Fonction pour récupérer les plantes d'un utilisateur
export async function fetchPlantsUser(id) {
    try {
        console.log(`id ligne 121 ${id}`);
        const plantsData = await api.get(`/myPlant/${id}`);
        if (plantsData.status !== 200) throw new Error('Impossible de récupérer les plantes de l\'utilisateur');
        return plantsData.data;
    } catch (error) {
        
        console.error('Erreur lors de la récupération des plantes axios 125 :', error);
        throw new Error(error.message);
    }
}

// Fonction pour mettre à jour les données d'un profil utilisateur
export async function updateProfileData(userData) {
    try {
        const updateData = await api.put(`/user/${userData.id}`, userData);
        if (updateData.status !== 200) throw new Error('Échec de la mise à jour du profil');
        return updateData.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
        throw new Error(error.message);
    }
}

// Fonction pour ajouter une plante pour un utilisateur
export async function addPlantToUser(name, type, age, location, userId) {
    try {
        const plantData = { name, type, age, location, userId };
        const newPlant = await api.post(`/myPlant`, plantData);
        if (newPlant.status !== 201) throw new Error('Échec de l\'ajout de la plante');
        return newPlant.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la plante :', error);
        throw new Error(error.message);
    }
}

// Fonction pour récupérer toutes les plantes disponibles dans le dictionnaire
export async function fetchPlantDictionary() {
    try {
        const plantsDict = await api.get(`/plantDictionnary`);
        if (plantsDict.status !== 200) throw new Error('Impossible de récupérer le dictionnaire des plantes');
        return plantsDict.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du dictionnaire des plantes :', error);
        throw new Error(error.message);
    }
}
