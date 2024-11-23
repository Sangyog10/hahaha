export const handleLogin = async (email, password) => {
    try {
        const res = await fetch("http://192.168.1.117:3000/api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            console.log("login failed")
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
};
