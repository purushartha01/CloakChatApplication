import axios from 'axios';


const apiURL=axios.create({baseURL:'http://localhost:3000/',withCredentials:true})

const createAuthHeader=(token)=>{
    return 'Bearer '.concat(token);
}


export {
    apiURL,
    createAuthHeader
}