//Importerar http-klient
import axios from 'axios';

//Variabel för url
const url = 'api/posts/';

//Skapar klass för CRUD
class PostService {
    //Hämta varor
    static getPosts(){
        return new Promise(async (resolve, reject) => {
            try {
            const res = await axios.get(url);
            const data = res.data;
            resolve( //Vid lyckad hämtning, hämta data
            data.map(post => ({
                ...post
            })) //loopar genom erhållen data
         );
         } catch(err) {
             reject(err); //Visa error
         }
        });
    }
    //Lägg till vara
    static insertPost(section, goods, quantity, store) {
        return axios.post(url, {
            section, goods, quantity, store
        });
    }
    //Radera vara
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
    //Uppdatera vara
    static updatePost(id, section, goods, quantity, store) {
        return axios.put(`${url}${id}`, { section, goods, quantity, store});
    }
}

//Exportera klassen
export default PostService;
