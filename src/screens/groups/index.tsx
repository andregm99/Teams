import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

import { Container } from './styles';
import { Header } from '@components/Header';
import {Highlight} from '@components/Highlight'
import {GroupCard} from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/loading';



export  function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups,setGroups] = useState<string[]>([]);

  const navigation = useNavigation()

  function handleNewGroup (){
    navigation.navigate('NewGroup')/*Para as rotas aparecerem devo tipar ela no navigation.d.ts */
  }

  async function fetchGroups() {
    try{
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)// colocando os dados salvos no storage para a flatlist.
      
    }catch(error){
      console.log(error)
      Alert.alert('Turmas','Não foi possível carregar as turmas.')
    }finally{
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group:string){
    navigation.navigate('Players',{group})
  }

  useFocusEffect(useCallback(()=> {
    fetchGroups()
  },[]))
  
//useFocusEffect irá chamar minha função fetchGroups() sempre que estivermos nessa tela.
//sempre que usar o useFocusEffect tenho que usar o useCallback.

  return (
  <Container>
    <Header />

    <Highlight
     title='Turmas' 
     subtitle='Jogue com a sua turma'/>
    {
      isLoading? <Loading/>:
    
      <FlatList
        data={groups}
        keyExtractor={item =>item}
        renderItem={({ item })=>(
          <GroupCard 
            title={item}
            onPress={()=>handleOpenGroup(item)}
          />
        )}

        contentContainerStyle={groups.length===0 && {flex:1}}//centralizando mensagem na tela
        ListEmptyComponent={()=> <ListEmpty message='Que tal cadastrar a primeira turma?'/>}

        showsVerticalScrollIndicator={false}
      />
    }
    
    <Button 
      title='Criar nova turma'
      onPress={handleNewGroup}
    />

  </Container>
  );
}

