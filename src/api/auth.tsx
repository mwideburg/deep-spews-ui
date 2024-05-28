// Define the type for the user data
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
    const endpoint = `${process.env.REACT_APP_AWS_DOMAIN}/signin`;  // Replace with your actual endpoint URL
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userSignIn),
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