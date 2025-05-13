import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "./storageConfig";

export async function groupsGetAll (){
    try{

        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);//lendo dados armazenados
    
        const groups: string[] = storage ? JSON.parse(storage) : [];

        return groups;
    }catch(error){
        throw error;
    }

}
/*Com o getItem() pega as informações que estão armazenadas no dispositivo 

--eu vou colocar as informações em um array de objetos(JSON.parse) para depois no groupCreate transformar
em string(JSON.stringfy), pois o asyncStorage salva as informações como string.
*/