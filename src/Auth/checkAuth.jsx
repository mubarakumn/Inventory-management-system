import axios from 'axios';

export const checkAuth = async ()=>{
    try {
        const response = await axios.get('http://localhost:4000/user/checkAuth', { withCredentials: true})

        if(response.status === 200){
            return response.data.userData;             
        }
    } catch (error) {
        return false;
    }
}