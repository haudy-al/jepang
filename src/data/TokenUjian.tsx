import axios from 'axios';

export const UjianToken = async (ujian_id: number, user_id: number) => {
   
    try {
        const response = await axios.get(`https://api.haudy.my.id/api/ujian-token/${ujian_id}/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':'dewa'
            },
        });

        return response.data;
        
    } catch (error) {
        console.log(error);
        return null;
    }
};