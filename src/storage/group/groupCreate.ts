import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "./storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";


export async function groupCreate(newGroup:string){
    try{
        const storedGroups = await groupsGetAll()

       const normalizedNewGroup = newGroup.trim().toLowerCase();
    
        // Normalizando os grupos já salvos
        const normalizedStoredGroups = storedGroups.map(group => group.toLowerCase());

        const groupAlreadyExists = normalizedStoredGroups.includes(normalizedNewGroup);

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome.')//o new é para estanciar a classe
        }

        const storage = JSON.stringify([...storedGroups,newGroup])/*Transformando para string
        para poder salvar no dispositivo.*/

        await AsyncStorage.setItem(GROUP_COLLECTION, storage)//salvando no dispositivo.


    }catch(error){
        throw error
    }
}
/*O setItem serve para armazenar no storage, ou seja, salvar dados passados pelo usuário.

--Utilizo o await pois é uma função assíncrona.

-- o asyncStorage utiliza os parâmetros de chave='GROUP_COLLECTION' e valor 'newGroup',
e ambos devem ser do tipo string

--Porém o setItem  não vai adicionar os valores que passarmos ele apenas vai ler a coleção que criei
e setar um novo valor para ela.


--Para isso tenho que criar uma listagem de tudo que foi adicionado colocar para string e passar para o
setItem 

const storedGroups = await groupsGetAll()= listando todos os valores criados pelo usuário

const storage = JSON.stringify([...storedGroups,newGroup]) = transformando para string para poder passar
para o setItem e armazenar no storage.
*/