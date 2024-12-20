import axios from 'axios';
import { IP_BACKEND } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: IP_BACKEND
});

// Function to set the JWT in AsyncStorage
export async function setToken(token) {
    try {
        if (token != null && token !== undefined) {
            await AsyncStorage.setItem('jwt', token);
        } else {
            throw new Error('Cannot set null or undefined token');
        }
    } catch (error) {
        console.error('Error setting token:', error);
    }
}

// Function to get the JWT from AsyncStorage
export async function getToken() {
    try {
        return await AsyncStorage.getItem('jwt');
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    async (config) => {
        const token = await getToken(); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Sign In function
export async function signIn(email, password) {
    try {
        const signInData = { email, password };

        const userAuth = await api.post(`/user/login`, signInData);
        
        if (userAuth.status !== 200) throw new Error('Login failed');
        await setToken(userAuth.data.token);
        return userAuth.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Sign Up function
export async function signUp(username, email, password) {
    try {
        const signUpData = { email, username, password };
        const userAuth = await api.post(`/user`, signUpData);
        if (userAuth.status !== 201) throw new Error('Sign up failed');
        await setToken(userAuth.data.token);
        return userAuth.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fetch profile data
export async function fetchProfileData(id) {
    try {
        const profileData = await api.get(`/user/${id}`);
        if (profileData.status !== 200) throw new Error('Failed to fetch profile');
        return profileData.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fetch plants for a user
export async function fetchPlantsUser(id) {
    try {
        const plantsData = await api.get(`/myPlant/${id}`);
        if (plantsData.status !== 200) throw new Error('Failed to fetch user plants');
        return plantsData.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Update profile data
export async function updateProfileData(userData) {
    try {
        const updateData = await api.put(`/user/${userData.id}`, userData, {
            headers: { Authorization: 'none' },
        });
        if (updateData.status !== 200) throw new Error('Failed to update profile');
        return updateData.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Delete user by ID
export async function deleteUserById(id) {
    try {
        const deleteUser = await api.delete(`/user/${id}`);
        if (deleteUser.status !== 200) throw new Error('Failed to delete user');
    } catch (error) {
        throw new Error(error.message);
    }
}

// Get user ID from JWT
export async function getIdFromJwt() {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No token found in AsyncStorage');
        }

        console.log('Token retrieved:', token); // Log the token for debugging
        
        const response = await api.post('/user/authenticate', { token });

        console.log('Authentication response:', response); // Log the full response for debugging

        if (response.status !== 200) {
            throw new Error('Failed to authenticate token');
        }

        if (!response.data || !response.data.id) {
            throw new Error('User ID not found in token');
        }

        return response.data.id;
    } catch (error) {
        console.error('Error getting user ID from JWT:', error);
        throw new Error(error.message);
    }
}


// Update the watering timer for a plant
export async function waterPlant(plantId, wateringInterval) {
    try {
        const response = await api.put(`/myPlant/${plantId}/water`, { wateringInterval });
        return response.data;
    } catch (error) {
        console.error('Error watering plant:', error);
        throw new Error(error.message);
    }
}
