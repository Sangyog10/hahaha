import Cookies from 'js-cookie';

// Function to check if user is authenticated
const isAuthenticated = () => {
    const token = Cookies.get('token');
    console.log("Token ho yo : ", token)
    return token ? true : false;
};

// Function to get the user info (payload from the token)
const getUserInfo = () => {
    const token = Cookies.get('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload
            return { name: payload.name, userId: payload.userId };
        } catch (e) {
            return null;
        }
    }
    return null;
};

export { isAuthenticated, getUserInfo };