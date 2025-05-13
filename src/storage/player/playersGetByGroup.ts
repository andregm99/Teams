import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/group/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";


export async function playersGetByGroup(group:string) {
    try{
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
        /*${PLAYER_COLLECTION}-${group} aqui estou lendo a coleção de dados e o grupo criado. */

        
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

        return players
    }catch(error){
        throw(error)
    }
}