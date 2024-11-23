export const getAllMock = async () => {
    try {
        const res = await fetch("http://localhost:4000/api/v1/mocktest", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            console.log("fetching failed")
            throw new Error(data.message || 'Fetch Failed');
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
};
