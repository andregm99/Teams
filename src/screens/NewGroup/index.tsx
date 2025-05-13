import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";


import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/input";


export function NewGroup (){
    const[group,setGroup] = useState('')

    const navigation = useNavigation();



   async function handleNew (){

        try{
            if (group.trim().length === 0) {
                return  Alert.alert('Novo grupo','Informe o nome da turma.')
            }

            await groupCreate(group) //salvando no storage o nome do grupo.
            
            navigation.navigate('Players',{group})//Aqui estou dizendo a rota e o parâmetro que espero passar.

        }catch(error){
            if (error instanceof AppError) { 
                Alert.alert('Novo grupo',error.message)
            }else{
                Alert.alert('Novo grupo','Não foi possível criar um novo grupo.')
                console.log(error)
            }   
        }
    }



    return(
      <Container>
            <Header showBackbutton/>
            <Content>
                <Icon/>

                <Highlight 
                    title="Nova turma" 
                    subtitle="Crie a turma para adicionar pessoas"
                    />

                <Input
                    placeholder="Digite o nome da turma"
                    onChangeText={setGroup}
                />


                <Button 
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                    />
            </Content>
      </Container>
    )
}