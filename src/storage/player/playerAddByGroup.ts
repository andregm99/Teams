import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/group/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer:PlayerStorageDTO,group:string) {
    try{

        //listando o grupo
        const storedPlayers = await playersGetByGroup(group)

        //Verificando espaços e colocando pra minusculo
        const normalizedNewGroup = newPlayer.name.trim().toLowerCase()

        //Colocando todos os jogadores já salvos para minúsculo
        const normalizedStoredGroups = storedPlayers.map(players=>players.name.toLowerCase())


        //Verificando se o jogador já foi adicionado.
        const playerAlreadyExists = normalizedStoredGroups.includes(normalizedNewGroup)
       

        if (playerAlreadyExists) {
            throw new AppError('Essa pessoa já esta adicionada em um time aqui.')
        }

        const storage = JSON.stringify([...storedPlayers,newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,storage)
    }catch(error){
        throw (error)
    }
}

