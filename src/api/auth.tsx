// Define the type for the user data
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}
interface UserConfirm {
    username: string;
    verificationCode: string;
}
interface UserSignIn {
    username: string;
    password: string;
}

export const signUp = async (userData: UserData): Promise<void> => {
    const endpoint = `${process.env.REACT_APP_AWS_DOMAIN}/signup`;  // Replace with your actual endpoint URL
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const resJSON = await response.json()
        if (!response.ok) {
            throw new Error(resJSON);
        }
        console.log('Sign up successful:', resJSON);
        // Handle further actions like navigation or showing success message
    } catch (error) {
        console.error('Sign up error:', error);
        // Handle errors, e.g., show error message to the user
    }
};


export const confirm = async (userConfirm: UserConfirm): Promise<void> => {
    const endpoint = `${process.env.REACT_APP_AWS_DOMAIN}/confirm`;  // Replace with your actual endpoint URL
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userConfirm),
        });
        const resJSON = await response.json()
        if (!response.ok) {
            throw new Error(resJSON);
        }
        console.log('Confirmation successful:', resJSON);
        // Handle further actions like navigation or showing success message
    } catch (error) {
        console.error('Confirmation error:', error);
        // Handle errors, e.g., show error message to the user
    }
};


export const signIn = async (userSignIn: UserSignIn): Promise<void> => {
    const endpoint = `https://s14bh1g6nl.execute-api.us-east-1.amazonaws.com/test/signin`;  // Replace with your actual endpoint URL
    console.log(endpoint)
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userSignIn),
        });
        const resJSON = await response.json()
        const accessToken = resJSON["tokens"]["IdToken"]
        const refreshToken = resJSON["tokens"]["RefreshToken"]

        if (!accessToken) {
            throw new Error(resJSON);
        }
        await saveTokens(accessToken, refreshToken);
        return resJSON;
        // Handle further actions like navigation or showing success message
    } catch (error) {
        console.error('Signin error:', error);
        // Handle errors, e.g., show error message to the user
    }
};

// Function to get tokens from storage
export const getTokens = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
};
// Function to handle token refresh
const refreshTokens = async (refreshToken: string) => {
    const response = await fetch(`${process.env.REACT_APP_AWS_DOMAIN}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
  
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
  
    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data;
    await saveTokens(accessToken, newRefreshToken);
    return accessToken;
  };

// Function to save tokens to storage
export const saveTokens = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
};

// Function to remove tokens from storage
export const removeTokens = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
};

// Function to make an authenticated fetch request
export const authenticatedFetch = async (url: string , options: any = {}) => {
  let { accessToken, refreshToken } = await getTokens();

  if (!accessToken) {
    throw new Error('No access token available');
  }
  console.log(url)
  console.log("fetching trends")
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const resJSON = await response.json()
  console.log(resJSON)
  if (resJSON.statusCode === 401 && refreshToken) {
    // Attempt to refresh tokens
    try {
      accessToken = await refreshTokens(refreshToken);
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return retryResponse;
    } catch (error) {
      await removeTokens();
      throw new Error('Authentication failed, please log in again.');
    }
  }

  return resJSON;
};