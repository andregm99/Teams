import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION,PLAYER_COLLECTION } from "./storageConfig";

import { groupsGetAll } from "./groupsGetAll";
import { Alert } from "react-native";

export async function groupRemoveByName(groupDeleted:string) {
    try{
        const storedGroups = await groupsGetAll()
        const groups = storedGroups.filter(group=> group!== groupDeleted)

        await AsyncStorage.setItem(GROUP_COLLECTION,JSON.stringify(groups).toLowerCase())/*Aqui estou garantindo
        que os outros grupos continuem cadastrados */

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)/*Aqui estou removendo de fato */
    }catch(error){
        console.log(error)
        Alert.alert('Remover Grupo','Não foi possível remover grupo')
    }
}