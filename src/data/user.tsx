import { decodeJWT } from '../middlewares/authMiddleware';
import axios from 'axios';

export const user = async () => {
    const data = decodeJWT();
    if (!data) {
        return null;
    }
    const sub = data.sub;

    try {
        const response = await axios.get(`https://api.haudy.my.id/api/user/${sub}`, {
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