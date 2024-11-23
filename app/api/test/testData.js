export const testData =  async() =>{
    try {
        const res = await fetch("https://2815-2400-1a00-bda0-a12-f8aa-dd0d-1acb-e750.ngrok-free.app/api/v1/mocktest");
        const data = await res.json();
        console.log(data);
        if(!res.ok){
            throw new Error(data.message || 'Test data not found');
        }
        return data;
    }
    catch (error) {
        return { error: error.message };
    }

    
}