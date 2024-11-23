export const handleSignUp = async (name, email, password) => {
    try {
        const res = await fetch("https://2815-2400-1a00-bda0-a12-f8aa-dd0d-1acb-e750.ngrok-free.app/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
};
