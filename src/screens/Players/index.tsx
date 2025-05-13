import { useState,useEffect, useRef } from "react";
import { useRoute,useNavigation } from "@react-navigation/native";


import { Alert, FlatList, TextInput } from "react-native";


import { Header } from "@components/Header";
import { Container,Form,HeaderList,NumberOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByname";
import { Loading } from "@components/loading";


export function Players (){
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName,setNewPlayerName] = useState('')
    const [team,setTeam]=useState('')
    const [players,setPlayers] = useState<PlayerStorageDTO[]>([])


    type RouteParams= {
        group:string
    }

    const navigation = useNavigation()
    
    const route = useRoute();/*O useRoute serve para recebermos os parâmetros de uma rota para outra*/

    const {group} = route.params as RouteParams 

    const newPlayerNameInputRef = useRef<TextInput>(null)

    
    //Adicionando jogador
    async function handleAddPlayer() {
        if (newPlayerName.trim().length===0 || !team) {
            return Alert.alert('Nova pessoa','Informe o nome da pessoa, e selecione um time para poder adicionar.')
        }
        const newPlayer ={
            name:newPlayerName,
            team
        }

        try{
            await playerAddByGroup(newPlayer,group)

            newPlayerNameInputRef.current?.blur()//tirando foco do input.
            setNewPlayerName('')
            fetchPlayersByTeam()

        }catch(error){
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            }else{
                console.log(error)
                Alert.alert('Nova pessoa','Não foi possível adicionar.')
            }
        }
    }

    //Filtrando jogadores pelo time
    async function fetchPlayersByTeam() {
        try{
            setIsLoading(true)
            const playersByTeam = await playersGetByGroupAndTeam(group , team)

            setPlayers(playersByTeam)//salvando no storage
            

        }catch(error){
            console.log(error)
            Alert.alert('Pessoas','Não foi possível carregar as pessoas do time selecionado.')
        }finally{
            setIsLoading(false)
        }
    }

    //removendo jogadores do time 
    async function handlePlayerRemove(playerName:string) {
        try{
            await playerRemoveByGroup(playerName,group)

            fetchPlayersByTeam()

        }catch(error){
            console.log(error)
            Alert.alert('Remover pessoa','Não foi possível remover a pessoa selecionada.')
        }
    }

    //Deletando grupo
    async function groupRemove() {
        try{
            await groupRemoveByName(group)
            navigation.navigate('groups')
        }catch(error){
            console.log(error)
            Alert.alert('Remover','Não foi possível remover o grupo.')
        }
    }

    async function handleGroupRemove() {
        Alert.alert('Remove','Deseja remover o grupo?',[
            {text:'Não', style:"cancel"},
            {text:'Sim', onPress:()=> groupRemove() }
        ])
    }

    useEffect(()=>{
        fetchPlayersByTeam()
    },[team])

    return(
        <Container>
            <Header showBackbutton/>

            <Highlight
                title={group}
                subtitle="adicione a galera e separe o time"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect= {false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>
            <HeaderList>
                <FlatList
                    data={['Time a','Time b']}
                    keyExtractor={item=>item}
                    renderItem={({ item })=>(
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={()=>setTeam(item)}
                        />
                    )}
                    horizontal
                    
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            {
                isLoading? <Loading/> :
            
                <FlatList
                    data={players}
                    keyExtractor={item=>item.name}
                    renderItem={({item})=>(
                        <PlayerCard 
                            name={item.name}
                            OnRemove={()=>handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={()=>(
                        <ListEmpty message="Não há pessoas nesse time"/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[{paddingBottom:100},players.length === 0 && {flex:1}]}
                />
            }

            <Button 
                title="Remover turma" 
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    )
}